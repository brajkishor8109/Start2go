const nodemailer = require('nodemailer');
const twilio = require('twilio');

function createEmailTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

function createTwilioClient() {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    return null;
  }
  return twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

async function sendBookingEmail(booking) {
  const transporter = createEmailTransporter();
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

  if (!transporter || !ownerEmail || !fromEmail) {
    return { sent: false, reason: 'Email config not found' };
  }

  const subject = `New booking: ${booking.name} (${booking._id})`;
  const message = [
    'A new package booking has been placed.',
    '',
    `Booking ID: ${booking._id}`,
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Travelers: ${booking.travelers}`,
    `Travel Date: ${new Date(booking.travelDate).toLocaleDateString('en-IN')}`,
    `Package ID: ${booking.packageId}`,
    `Start Point: ${booking.startPoint}`,
    `End Point: ${booking.endPoint}`,
    `Total Price: ${booking.totalPrice}`,
    `Notes: ${booking.notes || '-'}`,
  ].join('\n');

  await transporter.sendMail({
    from: fromEmail,
    to: ownerEmail,
    subject,
    text: message,
  });

  return { sent: true };
}

async function sendBookingSms(booking) {
  const client = createTwilioClient();
  const { TWILIO_FROM_NUMBER, OWNER_PHONE } = process.env;

  if (!client || !TWILIO_FROM_NUMBER || !OWNER_PHONE) {
    return { sent: false, reason: 'SMS config not found' };
  }

  const body = `New booking by ${booking.name}. Package: ${booking.packageId}, Date: ${new Date(
    booking.travelDate
  ).toLocaleDateString('en-IN')}, Total: ${booking.totalPrice}`;

  await client.messages.create({
    body,
    from: TWILIO_FROM_NUMBER,
    to: OWNER_PHONE,
  });

  return { sent: true };
}

async function sendBookingNotifications(booking) {
  const results = await Promise.allSettled([sendBookingEmail(booking), sendBookingSms(booking)]);

  return {
    email: results[0].status === 'fulfilled' ? results[0].value : { sent: false, reason: results[0].reason?.message },
    sms: results[1].status === 'fulfilled' ? results[1].value : { sent: false, reason: results[1].reason?.message },
  };
}

module.exports = {
  sendBookingNotifications,
};
