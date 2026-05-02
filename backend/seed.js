const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('./models/Package');
const Hotel = require('./models/Hotel');
const Vehicle = require('./models/Vehicle');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/incredible_india_travel';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Seed Hotels for all destinations
    await Hotel.deleteMany({});
    const hotels = await Hotel.insertMany([
      // Goa
      {
        name: 'Beachside Villa Goa',
        location: 'Goa',
        description: 'Stunning beachside villa with Arabian Sea views.',
        pricePerNight: 6000,
        roomTypes: [{ name: 'Beach View', additionalCost: 0 }, { name: 'Private Pool Villa', additionalCost: 8000 }],
        amenities: ['Pool', 'Wifi', 'Beach Access'],
        imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
        website: 'https://www.booking.com/searchresults.html?ss=Goa',
        isAvailable: true
      },
      // Delhi
      {
        name: 'The Imperial Delhi',
        location: 'Delhi',
        description: 'Historic luxury in the heart of the capital.',
        pricePerNight: 7500,
        roomTypes: [{ name: 'Heritage Room', additionalCost: 0 }, { name: 'Imperial Suite', additionalCost: 10000 }],
        amenities: ['Spa', 'Fine Dining', 'Wifi'],
        imageUrl: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
        website: 'https://www.theimperialindia.com',
        isAvailable: true
      },
      // Rajasthan (Jaipur/Udaipur)
      {
        name: 'Pink City Palace Jaipur',
        location: 'Jaipur',
        description: 'Royal Rajasthani hospitality.',
        pricePerNight: 4500,
        roomTypes: [{ name: 'Royal Room', additionalCost: 0 }, { name: 'Maharaja Suite', additionalCost: 6000 }],
        amenities: ['Pool', 'Folk Music', 'Rooftop Cafe'],
        imageUrl: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
        website: 'https://www.tajhotels.com/en-in/taj/taj-mahal-palace-mumbai/',
        isAvailable: true
      },
      {
        name: 'Lake View Udaipur',
        location: 'Udaipur',
        description: 'Serene stay overlooking Lake Pichola.',
        pricePerNight: 5500,
        roomTypes: [{ name: 'Lake Facing', additionalCost: 0 }, { name: 'Luxury Suite', additionalCost: 7000 }],
        amenities: ['Boating', 'Wifi', 'Restaurant'],
        imageUrl: 'https://images.pexels.com/photos/12790310/pexels-photo-12790310.jpeg',
        website: 'https://www.booking.com/searchresults.html?ss=Udaipur',
        isAvailable: true
      },
      // Kerala
      {
        name: 'Backwater Retreat Alleppey',
        location: 'Alleppey',
        description: 'Traditional Kerala architecture by the water.',
        pricePerNight: 3500,
        roomTypes: [{ name: 'Cottage', additionalCost: 0 }, { name: 'Premium Villa', additionalCost: 3000 }],
        amenities: ['Backwater View', 'Ayurveda', 'Wifi'],
        imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
        website: 'https://www.booking.com/searchresults.html?ss=Alleppey',
        isAvailable: true
      },
      {
        name: 'Munnar Tea Garden Resort',
        location: 'Munnar',
        description: 'Stay amidst lush green tea plantations.',
        pricePerNight: 4000,
        roomTypes: [{ name: 'Valley View', additionalCost: 0 }, { name: 'Honeymoon Suite', additionalCost: 4000 }],
        amenities: ['Trekking', 'Wifi', 'Organic Food'],
        imageUrl: 'https://images.pexels.com/photos/6050623/pexels-photo-6050623.jpeg',
        website: 'https://www.booking.com/searchresults.html?ss=Munnar',
        isAvailable: true
      },
      // Himachal
      {
        name: 'Mountain View Manali',
        location: 'Manali',
        description: 'Breathtaking Himalayan views.',
        pricePerNight: 4000,
        roomTypes: [{ name: 'Garden View', additionalCost: 0 }, { name: 'Mountain View Premium', additionalCost: 2000 }],
        amenities: ['Heater', 'Wifi', 'Campfire'],
        imageUrl: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg',
        website: 'https://www.booking.com/searchresults.html?ss=Manali',
        isAvailable: true
      },
      // Kashmir
      {
        name: 'Dal Lake Houseboat',
        location: 'Kashmir',
        description: 'Experience living on the water.',
        pricePerNight: 5000,
        roomTypes: [{ name: 'Deluxe Boat', additionalCost: 0 }, { name: 'Super Deluxe Boat', additionalCost: 3000 }],
        amenities: ['Shikara Ride', 'Wifi', 'Authentic Food'],
        imageUrl: 'https://images.pexels.com/photos/2088166/pexels-photo-2088166.jpeg',
        website: 'https://www.booking.com/searchresults.html?ss=Kashmir',
        isAvailable: true
      },
      // Ladakh
      {
        name: 'Leh Heritage Home',
        location: 'Ladakh',
        description: 'Traditional Ladakhi hospitality.',
        pricePerNight: 3000,
        roomTypes: [{ name: 'Standard', additionalCost: 0 }, { name: 'Deluxe Mountain View', additionalCost: 1500 }],
        amenities: ['Organic Garden', 'Wifi', 'Library'],
        imageUrl: 'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,height=475,dpr=2/tour_img/648412de2d9fa.jpeg',
        website: 'https://www.booking.com/searchresults.html?ss=Ladakh',
        isAvailable: true
      },
      // Ooty
      {
        name: 'Nilgiri Mist Ooty',
        location: 'Ooty',
        description: 'Cozy resort in the Blue Mountains.',
        pricePerNight: 3800,
        roomTypes: [{ name: 'Mist View', additionalCost: 0 }, { name: 'Suite', additionalCost: 2500 }],
        amenities: ['Garden', 'Wifi', 'Restaurant'],
        imageUrl: 'https://wanderon-images.gumlet.io/blogs/new/2025/01/21/ooty-tamil-nadu.jpg',
        isAvailable: true
      },
      // Varanasi
      {
        name: 'Ganga Ghat Heritage',
        location: 'Varanasi',
        description: 'Stay near the holy Ganges.',
        pricePerNight: 3200,
        roomTypes: [{ name: 'Ghat View', additionalCost: 0 }, { name: 'Temple View', additionalCost: 1000 }],
        amenities: ['Aarti View', 'Wifi', 'Yoga'],
        imageUrl: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
        isAvailable: true
      },
      // Mumbai
      {
        name: 'Marine Drive Luxury',
        location: 'Mumbai',
        description: 'Overlooking the iconic Queens Necklace.',
        pricePerNight: 8000,
        roomTypes: [{ name: 'Sea View', additionalCost: 0 }, { name: 'Presidential Suite', additionalCost: 15000 }],
        amenities: ['Infinity Pool', 'Gym', 'Wifi'],
        imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
        isAvailable: true
      },
      // Sikkim
      {
        name: 'Gangtok Valley Resort',
        location: 'Sikkim',
        description: 'Views of the Kanchenjunga range.',
        pricePerNight: 4200,
        roomTypes: [{ name: 'Valley View', additionalCost: 0 }, { name: 'Cloud Suite', additionalCost: 2000 }],
        amenities: ['Trekking', 'Wifi', 'Local Cuisine'],
        imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
        isAvailable: true
      },
      // Andaman
      {
        name: 'Island Paradise Resort',
        location: 'Andaman',
        description: 'Crystal clear waters and white sands.',
        pricePerNight: 7000,
        roomTypes: [{ name: 'Beachfront', additionalCost: 0 }, { name: 'Private Villa', additionalCost: 5000 }],
        amenities: ['Scuba Diving', 'Spa', 'Wifi'],
        imageUrl: 'https://images.pexels.com/photos/13911674/pexels-photo-13911674.jpeg',
        isAvailable: true
      }
    ]);
    console.log('Hotels seeded for all destinations');

    // 2. Seed Vehicles (already exists but keeping for completeness)
    await Vehicle.deleteMany({});
    const vehicles = await Vehicle.insertMany([
      { name: 'Toyota Innova Crysta', type: 'SUV', capacity: 6, pricePerKm: 18, basePrice: 3000, imageUrl: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg', isAvailable: true },
      { name: 'Honda City', type: 'Sedan', capacity: 4, pricePerKm: 12, basePrice: 2000, imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', isAvailable: true },
      { name: 'Royal Enfield Classic', type: 'Bike', capacity: 2, pricePerKm: 8, basePrice: 1000, imageUrl: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg', isAvailable: true },
      { name: 'Volvo Tourist Bus', type: 'Bus', capacity: 40, pricePerKm: 45, basePrice: 15000, imageUrl: 'https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg', isAvailable: true }
    ]);
    console.log('Vehicles seeded');

    // 3. Seed Packages for all destinations
    await Package.deleteMany({});
    await Package.insertMany([
      {
        title: 'Goa Sun & Sand Vacation',
        slug: 'goa-sun-sand',
        description: 'Enjoy the best of Goan beaches, seafood, and nightlife.',
        price: 15999,
        duration: '4 Days / 3 Nights',
        facilities: ['Beach resort', 'Breakfast', 'Airport transfers', 'Sightseeing'],
        destinations: ['Goa'],
        imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
        startPoints: [{ location: 'Goa', additionalCost: 0 }, { location: 'Mumbai', additionalCost: 2000 }],
        endPoints: [{ location: 'Goa', additionalCost: 0 }]
      },
      {
        title: 'Golden Triangle Explorer (Delhi, Agra, Jaipur)',
        slug: 'golden-triangle-explorer',
        description: 'Explore the heritage of North India.',
        price: 19999,
        duration: '6 Days / 5 Nights',
        facilities: ['Luxury stays', 'Daily breakfast', 'AC transport', 'Guided tours'],
        destinations: ['Delhi', 'Agra', 'Jaipur'],
        imageUrl: 'https://images.pexels.com/photos/13911674/pexels-photo-13911674.jpeg',
        startPoints: [{ location: 'Delhi', additionalCost: 0 }, { location: 'Mumbai', additionalCost: 5000 }],
        endPoints: [{ location: 'Delhi', additionalCost: 0 }, { location: 'Jaipur', additionalCost: 1500 }]
      },
      {
        title: 'Kerala Serenity Backwaters',
        slug: 'kerala-serenity',
        description: 'Relax in houseboats and tea gardens.',
        price: 25999,
        duration: '7 Days / 6 Nights',
        facilities: ['Houseboat stay', 'Authentic meals', 'Private transfers'],
        destinations: ['Cochin', 'Alleppey', 'Munnar', 'Varkala'],
        imageUrl: 'https://images.pexels.com/photos/6050623/pexels-photo-6050623.jpeg',
        startPoints: [{ location: 'Cochin', additionalCost: 0 }, { location: 'Chennai', additionalCost: 3500 }],
        endPoints: [{ location: 'Cochin', additionalCost: 0 }, { location: 'Trivandrum', additionalCost: 1800 }]
      },
      {
        title: 'Himachal Peaks & Valleys',
        slug: 'himachal-peaks',
        description: 'Snow-capped mountains and cozy retreats.',
        price: 22999,
        duration: '6 Days / 5 Nights',
        facilities: ['Mountain view rooms', 'Paragliding', 'Trekking guide'],
        destinations: ['Manali', 'Shimla', 'Kasol', 'Dharamshala'],
        imageUrl: 'https://images.pexels.com/photos/13691356/pexels-photo-13691356.jpeg',
        startPoints: [{ location: 'Delhi', additionalCost: 1500 }, { location: 'Chandigarh', additionalCost: 0 }],
        endPoints: [{ location: 'Delhi', additionalCost: 1500 }, { location: 'Shimla', additionalCost: 0 }]
      },
      {
        title: 'Kashmir Paradise Honeymoon',
        slug: 'kashmir-paradise',
        description: 'Experience the "Heaven on Earth" with romantic Shikara rides.',
        price: 27999,
        duration: '5 Days / 4 Nights',
        facilities: ['Shikara ride', 'Houseboat stay', 'Breakfast & dinner'],
        destinations: ['Kashmir', 'Srinagar', 'Gulmarg', 'Pahalgam'],
        imageUrl: 'https://images.pexels.com/photos/2088166/pexels-photo-2088166.jpeg',
        startPoints: [{ location: 'Srinagar', additionalCost: 0 }, { location: 'Delhi', additionalCost: 4000 }],
        endPoints: [{ location: 'Srinagar', additionalCost: 0 }]
      },
      {
        title: 'Ladakh High Pass Adventure',
        slug: 'ladakh-adventure',
        description: 'A thrilling journey to the highest motorable passes.',
        price: 32999,
        duration: '7 Days / 6 Nights',
        facilities: ['Mountain stays', 'Inner line permits', 'Expert guide'],
        destinations: ['Ladakh', 'Leh', 'Pangong Lake', 'Nubra Valley'],
        imageUrl: 'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,height=475,dpr=2/tour_img/648412de2d9fa.jpeg',
        startPoints: [{ location: 'Leh', additionalCost: 0 }, { location: 'Delhi', additionalCost: 6000 }],
        endPoints: [{ location: 'Leh', additionalCost: 0 }]
      },
      {
        title: 'Ooty Hills Escape',
        slug: 'ooty-hills',
        description: 'Green tea gardens and pleasant weather.',
        price: 14999,
        duration: '4 Days / 3 Nights',
        facilities: ['Hill resort', 'Toy train experience', 'Breakfast'],
        destinations: ['Ooty', 'Coimbatore'],
        imageUrl: 'https://wanderon-images.gumlet.io/blogs/new/2025/01/21/ooty-tamil-nadu.jpg',
        startPoints: [{ location: 'Coimbatore', additionalCost: 0 }, { location: 'Bangalore', additionalCost: 2000 }],
        endPoints: [{ location: 'Ooty', additionalCost: 0 }]
      },
      {
        title: 'Varanasi Spiritual Journey',
        slug: 'varanasi-spiritual',
        description: 'Witness the holy Ganga Aarti and explore ancient temples.',
        price: 12999,
        duration: '3 Days / 2 Nights',
        facilities: ['Stay near Ghats', 'Morning boat ride', 'Guided temple tour'],
        destinations: ['Varanasi'],
        imageUrl: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
        startPoints: [{ location: 'Varanasi', additionalCost: 0 }, { location: 'Delhi', additionalCost: 3000 }],
        endPoints: [{ location: 'Varanasi', additionalCost: 0 }]
      },
      {
        title: 'Udaipur Romantic Lakes',
        slug: 'udaipur-lakes',
        description: 'Stay in the city of lakes and royal palaces.',
        price: 17999,
        duration: '4 Days / 3 Nights',
        facilities: ['Lake view hotel', 'Sunset boat ride', 'Palace tour'],
        destinations: ['Udaipur', 'Rajasthan'],
        imageUrl: 'https://images.pexels.com/photos/12790310/pexels-photo-12790310.jpeg',
        startPoints: [{ location: 'Udaipur', additionalCost: 0 }, { location: 'Ahmedabad', additionalCost: 1500 }],
        endPoints: [{ location: 'Udaipur', additionalCost: 0 }]
      },
      {
        title: 'Mumbai City Lights Tour',
        slug: 'mumbai-city',
        description: 'Explore the financial capital and its colonial architecture.',
        price: 13999,
        duration: '3 Days / 2 Nights',
        facilities: ['City hotel', 'Marine Drive tour', 'Bollywood tour'],
        destinations: ['Mumbai'],
        imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
        startPoints: [{ location: 'Mumbai', additionalCost: 0 }],
        endPoints: [{ location: 'Mumbai', additionalCost: 0 }]
      },
      {
        title: 'Sikkim Himalayan Majesty',
        slug: 'sikkim-majesty',
        description: 'Stunning monastery visits and lake excursions.',
        price: 24999,
        duration: '6 Days / 5 Nights',
        facilities: ['Gangtok stay', 'Tsomgo Lake trip', 'Breakfast & dinner'],
        destinations: ['Sikkim', 'Gangtok'],
        imageUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
        startPoints: [{ location: 'Bagdogra', additionalCost: 0 }, { location: 'Kolkata', additionalCost: 3500 }],
        endPoints: [{ location: 'Gangtok', additionalCost: 0 }]
      },
      {
        title: 'Andaman Island Retreat',
        slug: 'andaman-retreat',
        description: 'Pristine beaches and thrilling water sports.',
        price: 34999,
        duration: '6 Days / 5 Nights',
        facilities: ['Resort stay', 'Island hopping', 'Snorkeling session'],
        destinations: ['Andaman', 'Port Blair', 'Havelock'],
        imageUrl: 'https://images.pexels.com/photos/13911674/pexels-photo-13911674.jpeg',
        startPoints: [{ location: 'Port Blair', additionalCost: 0 }, { location: 'Chennai', additionalCost: 5000 }],
        endPoints: [{ location: 'Port Blair', additionalCost: 0 }]
      }
    ]);
    console.log('Packages seeded');

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
