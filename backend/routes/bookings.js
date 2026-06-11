const express = require('express');
const Booking = require('../models/Booking');
const Package = require('../models/Package');
const Vehicle = require('../models/Vehicle');
const Hotel = require('../models/Hotel');
const { auth } = require('../middleware/auth');
const { sendBookingNotifications } = require('../services/notificationService');

const SERVICE_CITIES = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Ahmedabad', 'Jaipur', 'Pune', 'Goa', 'Lucknow', 'Varanasi'
];
const DISTANCE_RATE_PER_KM = 18;
const ROUTE_DISTANCE_KM = {
  'agra|delhi': 230,
  'ahmedabad|udaipur': 260,
  'bangalore|chennai': 345,
  'bangalore|hyderabad': 570,
  'chennai|pune': 1180,
  'darjeeling|kolkata': 630,
  'delhi|jaipur': 280,
  'delhi|mumbai': 1400,
  'goa|hyderabad': 660,
  'goa|mumbai': 590,
  'lucknow|varanasi': 320,
  'mumbai|pune': 150
};

const normalizeCityKey = (a, b) => [a.trim().toLowerCase(), b.trim().toLowerCase()].sort().join('|');
const getDistanceKm = (from, to) => {
  if (!from || !to) return 0;
  const key = normalizeCityKey(from, to);
  if (ROUTE_DISTANCE_KM[key]) return ROUTE_DISTANCE_KM[key];
  if (from.trim().toLowerCase() === to.trim().toLowerCase()) return 20;
  return 250;
};

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      travelers,
      travelDate,
      packageId,
      notes,
      vehicleId,
      hotelSelection, // Updated from hotelIds
      startPoint,
      endPoint,
    } = req.body;

    if (!name || !email || !phone || !travelers || !travelDate || !packageId || !startPoint || !endPoint) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    // 1. Fetch Package for base price and start/end point costs
    const tourPackage = await Package.findById(packageId);
    if (!tourPackage) return res.status(404).json({ message: 'Package not found' });

    let calculatedPrice = tourPackage.price;

    // 2. Add Start Point cost
    const startPointData = tourPackage.startPoints.find((sp) => sp.location === startPoint);
    if (startPointData) {
      calculatedPrice += startPointData.additionalCost;
    }

    // 3. Add End Point cost
    const endPointData = tourPackage.endPoints.find((ep) => ep.location === endPoint);
    if (endPointData) {
      calculatedPrice += endPointData.additionalCost;
    }

    // 4. Distance-based bus fare
    const distanceKm = getDistanceKm(startPoint, endPoint);
    calculatedPrice += distanceKm * DISTANCE_RATE_PER_KM;

    // 5. Add Vehicle cost
    if (vehicleId) {
      const vehicle = await Vehicle.findById(vehicleId);
      if (vehicle && vehicle.isAvailable) {
        calculatedPrice += vehicle.basePrice;
      }
    }

    // 5. Add Hotel costs with room types
    if (hotelSelection && Array.isArray(hotelSelection)) {
      for (const selection of hotelSelection) {
        const hotel = await Hotel.findById(selection.hotelId);
        if (hotel && hotel.isAvailable) {
          calculatedPrice += hotel.pricePerNight;
          const rType = hotel.roomTypes.find((r) => r.name === selection.roomType);
          if (rType) {
            calculatedPrice += rType.additionalCost;
          }
        }
      }
    }

    const totalPrice = calculatedPrice * travelers;

    const booking = await Booking.create({
      name,
      email,
      phone,
      travelers,
      travelDate,
      packageId,
      notes,
      vehicleId,
      hotelSelection,
      startPoint,
      endPoint,
      totalPrice,
    });

    sendBookingNotifications(booking).catch((notificationErr) => {
      console.error('Booking saved but notification failed:', notificationErr.message);
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    if (err && (err.name === 'ValidationError' || err.name === 'CastError')) {
      return res.status(400).json({ message: 'Invalid booking data' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

