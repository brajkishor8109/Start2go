## Start2Go

Start2Go is a modern tour & travel web experience for exploring Indian destinations, browsing curated tour packages, booking trips, and sharing travel stories with the community.

### Tech stack

- **Frontend**: React (CDN) + Tailwind CSS (CDN) single-page app in `public/index.html`
- **Backend**: Node.js + Express.js
- **Database**: MongoDB via Mongoose
- **Auth**: JWT-based login/signup with secure password hashing (bcrypt)

### Features

- **Home**: Hero, destination search, featured packages, popular destinations, testimonials, newsletter, FAQ, Google Maps.
- **Destinations**: Goa, Rajasthan, Kerala, Kashmir, Ladakh, Himachal Pradesh, Andaman & Nicobar Islands with images, descriptions, best time to visit, and attractions.
- **Tour packages**: Golden Triangle, Kerala Backwaters, Kashmir Honeymoon, Goa Beach Holiday, Ladakh Adventure with price, duration, facilities, ratings, and booking CTA.
- **Booking system**: Booking form (name, email, phone, travellers, date, package, notes) posts to `/api/bookings`.
- **Auth**: Signup (name, email, password, profile photo upload), login (email, password), JWT stored in `localStorage`, protected endpoints.
- **Travel stories**: Users can post stories with title, text, and media URLs, like stories, and comment (API support included).
- **Dashboard**: View and delete your stories, view your bookings, edit profile.
- **Extras**: WhatsApp chat button, Google Maps embed, newsletter form, FAQ accordion, social links, SEO meta tags and JSON-LD schema.

### Backend API routes

- **Auth**
  - `POST /api/auth/signup` – create a user, returns `{ token, user }`.
  - `POST /api/auth/login` – login, returns `{ token, user }`.
  - `GET /api/auth/me` – get current user (requires `Authorization: Bearer <token>`).
  - `PUT /api/auth/me` – update user name/profile photo (requires auth).
- **Destinations**
  - `GET /api/destinations` – list destinations.
- **Packages**
  - `GET /api/packages` – list packages.
- **Bookings**
  - `POST /api/bookings` – create booking (requires auth).
  - `GET /api/bookings/me` – list bookings for current user (requires auth).
- **Stories**
  - `GET /api/stories` – public list of stories with user info.
  - `POST /api/stories` – create a story (requires auth).
  - `GET /api/stories/me` – list current user stories (requires auth).
  - `PUT /api/stories/:id` – update own story (requires auth).
  - `DELETE /api/stories/:id` – delete own story (requires auth).
  - `POST /api/stories/:id/like` – toggle like on a story (requires auth).
  - `POST /api/stories/:id/comments` – add a comment to a story (requires auth).
- **Blog**
  - `GET /api/blogs` – list blog posts (backed by Mongo if you seed it; UI also includes static blog content).

### Running the project locally

1. **Install Node dependencies**

   ```bash
   cd "c:\Users\brajkishor kushwaha\OneDrive\Documents"
   npm install
   ```

2. **Configure environment variables**

   - Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env   # On Windows PowerShell: copy .env.example .env
   ```

   - Edit `.env`:
     - Set `MONGO_URI` to your MongoDB connection string.
     - Set `JWT_SECRET` to a long random string.
     - Set `ADMIN_EMAILS` with comma-separated emails allowed as admin (example: `ADMIN_EMAILS=hellostart2go@gmail.com`).
     - For booking alerts (email/SMS), add:
       - `OWNER_EMAIL=your_email@example.com`
       - `FROM_EMAIL=your_smtp_sender@example.com` (optional; default is `SMTP_USER`)
       - `SMTP_HOST=smtp.gmail.com`
       - `SMTP_PORT=587`
       - `SMTP_SECURE=false`
       - `SMTP_USER=your_smtp_username`
       - `SMTP_PASS=your_smtp_password_or_app_password`
       - `OWNER_PHONE=+91xxxxxxxxxx` (optional, SMS)
       - `TWILIO_ACCOUNT_SID=...` (optional, SMS)
       - `TWILIO_AUTH_TOKEN=...` (optional, SMS)
       - `TWILIO_FROM_NUMBER=+1xxxxxxxxxx` (optional, SMS)

3. **Start MongoDB**

   - Ensure MongoDB is running locally (default `mongodb://localhost:27017`) or update `MONGO_URI` accordingly.

4. **Run the backend + SPA**

   ```bash
   npm run dev   # uses nodemon for backend
   # or
   npm start     # plain node backend/server.js
   ```

   - Open `http://localhost:5000` in your browser.
   - Express serves the React + Tailwind SPA from `public/index.html`.

5. **Using the app**

   - **Sign up** via the Signup page to create a user.
   - **Login** to get a JWT stored in `localStorage`.
   - **Dashboard** becomes available for logged-in users to manage profile, bookings, and stories.
   - **Travel stories** page lets logged-in users post stories and like others.

### Notes

- For images/videos in stories and profile photos, this demo uses **URLs** (e.g. from an image hosting service) instead of file uploads to keep the backend simple.
- Tailwind and React are loaded via CDNs for fast initial setup with no build step; you can later migrate to a bundler (Vite/CRA) if desired.
- Admin panel is available at `http://localhost:5000/admin` after login with an admin email.
- Admin panel supports create, edit, and delete for packages, destinations, vehicles, hotels, and blogs.

