const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');

const app = express();
app.use(express.json());

// Mock Data
const mockUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    password: 'hashed_password_123',
    role: 'customer',
    bonvoyNumber: 'MR123456789',
    bonvoyPoints: 25000,
    bonvoyStatus: 'Gold',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    password: 'hashed_password_456',
    role: 'customer',
    bonvoyNumber: 'MR987654321',
    bonvoyPoints: 15000,
    bonvoyStatus: 'Silver',
    createdAt: '2024-01-20T14:15:00Z',
    updatedAt: '2024-01-20T14:15:00Z'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    password: 'hashed_password_789',
    role: 'admin',
    bonvoyNumber: 'MR555666777',
    bonvoyPoints: 50000,
    bonvoyStatus: 'Platinum',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z'
  }
];

const mockHotels = [
  {
    id: 'hotel_001',
    name: 'Marriott Marquis Times Square',
    location: 'New York, NY',
    address: '1535 Broadway, New York, NY 10036',
    description: 'Luxury hotel in the heart of Times Square',
    imageUrl: 'https://example.com/marriott-times-square.jpg',
    rating: 4.5
  },
  {
    id: 'hotel_002',
    name: 'The Ritz-Carlton Central Park',
    location: 'New York, NY',
    address: '50 Central Park S, New York, NY 10019',
    description: 'Elegant hotel overlooking Central Park',
    imageUrl: 'https://example.com/ritz-carlton-cp.jpg',
    rating: 4.8
  },
  {
    id: 'hotel_003',
    name: 'W Los Angeles - West Beverly Hills',
    location: 'Los Angeles, CA',
    address: '930 Hilgard Ave, Los Angeles, CA 90024',
    description: 'Modern luxury hotel in West LA',
    imageUrl: 'https://example.com/w-la-beverly-hills.jpg',
    rating: 4.3
  }
];

const mockRooms = [
  {
    id: 'room_001',
    hotelId: 'hotel_001',
    type: 'Deluxe King',
    description: 'Spacious king room with city views',
    price: 299.00,
    capacity: 2,
    amenities: 'WiFi, Mini Bar, Room Service, City View',
    imageUrl: 'https://example.com/deluxe-king.jpg',
    available: true
  },
  {
    id: 'room_002',
    hotelId: 'hotel_001',
    type: 'Executive Suite',
    description: 'Luxury suite with separate living area',
    price: 599.00,
    capacity: 4,
    amenities: 'WiFi, Mini Bar, Room Service, Lounge Access, City View',
    imageUrl: 'https://example.com/executive-suite.jpg',
    available: true
  },
  {
    id: 'room_003',
    hotelId: 'hotel_002',
    type: 'Park View King',
    description: 'King room with Central Park views',
    price: 449.00,
    capacity: 2,
    amenities: 'WiFi, Mini Bar, Room Service, Park View',
    imageUrl: 'https://example.com/park-view-king.jpg',
    available: true
  }
];

const mockAmenities = [
  {
    id: 'amenity_001',
    name: 'Swimming Pool',
    category: 'Recreation',
    description: 'Heated outdoor swimming pool',
    imageUrl: 'https://example.com/pool.jpg',
    hotelId: 'hotel_001'
  },
  {
    id: 'amenity_002',
    name: 'Fitness Center',
    category: 'Wellness',
    description: '24/7 fitness center with modern equipment',
    imageUrl: 'https://example.com/fitness.jpg',
    hotelId: 'hotel_001'
  },
  {
    id: 'amenity_003',
    name: 'Spa',
    category: 'Wellness',
    description: 'Full-service spa with massage therapy',
    imageUrl: 'https://example.com/spa.jpg',
    hotelId: 'hotel_002'
  }
];

const mockRestaurants = [
  {
    id: 'restaurant_001',
    name: 'Broadway Bistro',
    hotelId: 'hotel_001',
    cuisine: 'American',
    priceRange: '$$',
    openTime: '06:00',
    closeTime: '23:00',
    description: 'Casual American dining with Broadway flair',
    imageUrl: 'https://example.com/broadway-bistro.jpg'
  },
  {
    id: 'restaurant_002',
    name: 'Park View Dining',
    hotelId: 'hotel_002',
    cuisine: 'French',
    priceRange: '$$$',
    openTime: '07:00',
    closeTime: '22:00',
    description: 'Elegant French cuisine with park views',
    imageUrl: 'https://example.com/park-view-dining.jpg'
  }
];

const mockReservations = [
  {
    id: 'reservation_001',
    restaurantId: 'restaurant_001',
    date: '2024-02-15',
    time: '19:00',
    partySize: 4,
    status: 'confirmed',
    createdAt: '2024-01-25T12:00:00Z',
    updatedAt: '2024-01-25T12:00:00Z'
  },
  {
    id: 'reservation_002',
    restaurantId: 'restaurant_002',
    date: '2024-02-20',
    time: '20:00',
    partySize: 2,
    status: 'pending',
    createdAt: '2024-01-26T15:30:00Z',
    updatedAt: '2024-01-26T15:30:00Z'
  }
];

const mockExperiences = [
  {
    id: 'experience_001',
    name: 'Times Square Night Tour',
    hotelId: 'hotel_001',
    type: 'Sightseeing',
    description: 'Guided evening tour of Times Square',
    price: 75.00,
    duration: 120,
    imageUrl: 'https://example.com/times-square-tour.jpg',
    available: true
  },
  {
    id: 'experience_002',
    name: 'Central Park Horse Carriage',
    hotelId: 'hotel_002',
    type: 'Romantic',
    description: 'Romantic horse carriage ride through Central Park',
    price: 150.00,
    duration: 60,
    imageUrl: 'https://example.com/horse-carriage.jpg',
    available: true
  }
];

const mockBookings = [
  {
    id: 1,
    userId: 1,
    hotelId: 'hotel_001',
    roomId: 'room_001',
    checkIn: '2024-02-15',
    checkOut: '2024-02-18',
    guests: 2,
    totalPrice: 897.00,
    status: 'confirmed',
    orderId: 1,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    userId: 2,
    hotelId: 'hotel_002',
    roomId: 'room_003',
    checkIn: '2024-03-20',
    checkOut: '2024-03-25',
    guests: 2,
    totalPrice: 2245.00,
    status: 'confirmed',
    orderId: 2,
    createdAt: '2024-01-20T14:15:00Z',
    updatedAt: '2024-01-20T14:15:00Z'
  }
];

const mockOrders = [
  {
    id: 1,
    userId: 1,
    stripeId: 'pi_1234567890',
    amount: 897.00,
    currency: 'USD',
    status: 'paid',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    userId: 2,
    stripeId: 'pi_0987654321',
    amount: 2245.00,
    currency: 'USD',
    status: 'paid',
    createdAt: '2024-01-20T14:15:00Z',
    updatedAt: '2024-01-20T14:15:00Z'
  }
];

const mockReviews = [
  {
    id: 'review_001',
    userId: 1,
    hotelId: 'hotel_001',
    rating: 5,
    comment: 'Excellent service and beautiful rooms!',
    createdAt: '2024-02-18T16:00:00Z',
    updatedAt: '2024-02-18T16:00:00Z'
  },
  {
    id: 'review_002',
    userId: 2,
    hotelId: 'hotel_002',
    rating: 4,
    comment: 'Great location and friendly staff.',
    createdAt: '2024-03-25T12:30:00Z',
    updatedAt: '2024-03-25T12:30:00Z'
  }
];

const mockConversations = [
  {
    id: 'conversation_001',
    userId: 1,
    userMessage: 'I need help with my reservation',
    aiResponse: 'I\'d be happy to help with your reservation. Can you provide your confirmation number?',
    threadId: 'thread_001',
    timestamp: '2024-02-10T10:00:00Z'
  },
  {
    id: 'conversation_002',
    userId: 2,
    userMessage: 'What amenities are available at the hotel?',
    aiResponse: 'Our hotel offers a swimming pool, fitness center, spa, and multiple dining options. Would you like more details about any specific amenity?',
    threadId: 'thread_002',
    timestamp: '2024-02-12T14:30:00Z'
  }
];

// GraphQL Schema
const schema = buildSchema(`
  type Query {
    # User queries
    users: [User!]!
    user(id: Int!): User
    userByEmail(email: String!): User
    
    # Hotel queries
    hotels: [Hotel!]!
    hotel(id: String!): Hotel
    hotelsByLocation(location: String!): [Hotel!]!
    hotelsByRating(minRating: Float!): [Hotel!]!
    searchHotels(
      location: String!
      checkIn: String!
      checkOut: String!
      guests: Int
      roomType: String
    ): [Hotel!]!
    
    # Room queries
    rooms: [Room!]!
    room(id: String!): Room
    roomsByHotel(hotelId: String!): [Room!]!
    availableRooms(hotelId: String!, checkIn: String!, checkOut: String!): [Room!]!
    
    # Amenity queries
    amenities: [Amenity!]!
    amenity(id: String!): Amenity
    amenitiesByHotel(hotelId: String!): [Amenity!]!
    amenitiesByCategory(category: String!): [Amenity!]!
    
    # Restaurant queries
    restaurants: [Restaurant!]!
    restaurant(id: String!): Restaurant
    restaurantsByHotel(hotelId: String!): [Restaurant!]!
    restaurantsByCuisine(cuisine: String!): [Restaurant!]!
    
    # Reservation queries
    reservations: [Reservation!]!
    reservation(id: String!): Reservation
    reservationsByRestaurant(restaurantId: String!): [Reservation!]!
    reservationsByDate(date: String!): [Reservation!]!
    
    # Experience queries
    experiences: [Experience!]!
    experience(id: String!): Experience
    experiencesByHotel(hotelId: String!): [Experience!]!
    experiencesByType(type: String!): [Experience!]!
    
    # Experience Booking queries
    experienceBookings: [ExperienceBooking!]!
    experienceBooking(id: String!): ExperienceBooking
    experienceBookingsByExperience(experienceId: String!): [ExperienceBooking!]!
    
    # Booking queries
    bookings: [Booking!]!
    booking(id: Int!): Booking
    bookingsByUser(userId: Int!): [Booking!]!
    bookingsByHotel(hotelId: String!): [Booking!]!
    bookingsByStatus(status: String!): [Booking!]!
    
    # Order queries
    orders: [Order!]!
    order(id: Int!): Order
    ordersByUser(userId: Int!): [Order!]!
    ordersByStatus(status: String!): [Order!]!
    
    # Review queries
    reviews: [Review!]!
    review(id: String!): Review
    reviewsByHotel(hotelId: String!): [Review!]!
    reviewsByUser(userId: Int!): [Review!]!
    
    # Conversation queries
    conversations: [Conversation!]!
    conversation(id: String!): Conversation
    conversationsByUser(userId: Int!): [Conversation!]!
    
    # Analytics queries
    hotelAnalytics(hotelId: String!): HotelAnalytics
    bookingAnalytics: BookingAnalytics
    revenueAnalytics: RevenueAnalytics
    userAnalytics: UserAnalytics
    occupancyAnalytics: OccupancyAnalytics
  }

  type Mutation {
    # User mutations
    createUser(input: UserInput!): User!
    updateUser(id: Int!, input: UserInput!): User!
    deleteUser(id: Int!): User!
    
    # Hotel mutations
    createHotel(input: HotelInput!): Hotel!
    updateHotel(id: String!, input: HotelInput!): Hotel!
    deleteHotel(id: String!): Hotel!
    
    # Room mutations
    createRoom(input: RoomInput!): Room!
    updateRoom(id: String!, input: RoomInput!): Room!
    deleteRoom(id: String!): Room!
    
    # Amenity mutations
    createAmenity(input: AmenityInput!): Amenity!
    updateAmenity(id: String!, input: AmenityInput!): Amenity!
    deleteAmenity(id: String!): Amenity!
    
    # Restaurant mutations
    createRestaurant(input: RestaurantInput!): Restaurant!
    updateRestaurant(id: String!, input: RestaurantInput!): Restaurant!
    deleteRestaurant(id: String!): Restaurant!
    
    # Reservation mutations
    createReservation(input: ReservationInput!): Reservation!
    updateReservation(id: String!, input: ReservationInput!): Reservation!
    deleteReservation(id: String!): Reservation!
    
    # Experience mutations
    createExperience(input: ExperienceInput!): Experience!
    updateExperience(id: String!, input: ExperienceInput!): Experience!
    deleteExperience(id: String!): Experience!
    
    # Experience Booking mutations
    createExperienceBooking(input: ExperienceBookingInput!): ExperienceBooking!
    updateExperienceBooking(id: String!, input: ExperienceBookingInput!): ExperienceBooking!
    deleteExperienceBooking(id: String!): ExperienceBooking!
    
    # Booking mutations
    createBooking(input: BookingInput!): Booking!
    updateBooking(id: Int!, input: BookingInput!): Booking!
    deleteBooking(id: Int!): Booking!
    
    # Order mutations
    createOrder(input: OrderInput!): Order!
    updateOrder(id: Int!, input: OrderInput!): Order!
    deleteOrder(id: Int!): Order!
    
    # Review mutations
    createReview(input: ReviewInput!): Review!
    updateReview(id: String!, input: ReviewInput!): Review!
    deleteReview(id: String!): Review!
    
    # Conversation mutations
    createConversation(input: ConversationInput!): Conversation!
    updateConversation(id: String!, input: ConversationInput!): Conversation!
    deleteConversation(id: String!): Conversation!
  }

  type User {
    id: Int!
    name: String
    email: String!
    password: String!
    role: String!
    bonvoyNumber: String
    bonvoyPoints: Int!
    bonvoyStatus: String!
    createdAt: String!
    updatedAt: String!
    bookings: [Booking!]!
    orders: [Order!]!
    reviews: [Review!]!
    conversations: [Conversation!]!
  }

  type Hotel {
    id: String!
    name: String!
    location: String!
    address: String!
    description: String!
    imageUrl: String!
    rating: Float!
    amenities: [Amenity!]!
    rooms: [Room!]!
    restaurants: [Restaurant!]!
    experiences: [Experience!]!
    reviews: [Review!]!
    bookings: [Booking!]!
  }

  type Room {
    id: String!
    hotelId: String!
    hotel: Hotel!
    type: String!
    description: String!
    price: Float!
    capacity: Int!
    amenities: String!
    imageUrl: String!
    available: Boolean!
    bookings: [Booking!]!
  }

  type Amenity {
    id: String!
    name: String!
    category: String!
    description: String!
    imageUrl: String
    hotelId: String!
    hotel: Hotel!
  }

  type Restaurant {
    id: String!
    name: String!
    hotelId: String!
    hotel: Hotel!
    cuisine: String!
    priceRange: String!
    openTime: String!
    closeTime: String!
    description: String!
    imageUrl: String!
    reservations: [Reservation!]!
  }

  type Reservation {
    id: String!
    restaurantId: String!
    restaurant: Restaurant!
    date: String!
    time: String!
    partySize: Int!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Experience {
    id: String!
    name: String!
    hotelId: String!
    hotel: Hotel!
    type: String!
    description: String!
    price: Float!
    duration: Int!
    imageUrl: String!
    available: Boolean!
    bookings: [ExperienceBooking!]!
  }

  type ExperienceBooking {
    id: String!
    experienceId: String!
    experience: Experience!
    date: String!
    participants: Int!
    status: String!
    specialRequests: String
    createdAt: String!
    updatedAt: String!
  }

  type Booking {
    id: Int!
    userId: Int!
    user: User!
    hotelId: String!
    hotel: Hotel!
    roomId: String!
    room: Room!
    checkIn: String!
    checkOut: String!
    guests: Int!
    totalPrice: Float!
    status: String!
    orderId: Int
    order: Order
    createdAt: String!
    updatedAt: String!
  }

  type Order {
    id: Int!
    userId: Int!
    user: User!
    bookings: [Booking!]!
    stripeId: String!
    amount: Float!
    currency: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Review {
    id: String!
    userId: Int!
    user: User!
    hotelId: String!
    hotel: Hotel!
    rating: Int!
    comment: String!
    createdAt: String!
    updatedAt: String!
  }

  type Conversation {
    id: String!
    userId: Int!
    user: User!
    userMessage: String!
    aiResponse: String!
    threadId: String
    timestamp: String!
  }

  # Analytics Types
  type HotelAnalytics {
    hotelId: String!
    totalBookings: Int!
    averageRating: Float!
    occupancyRate: Float!
    revenue: Float!
    topAmenities: [String!]!
    popularRooms: [String!]!
  }

  type BookingAnalytics {
    totalBookings: Int!
    confirmedBookings: Int!
    cancelledBookings: Int!
    averageBookingValue: Float!
    topDestinations: [String!]!
    bookingTrends: [BookingTrend!]!
  }

  type BookingTrend {
    month: String!
    bookings: Int!
    revenue: Float!
  }

  type RevenueAnalytics {
    totalRevenue: Float!
    averageOrderValue: Float!
    revenueByMonth: [RevenueByMonth!]!
    topRevenueHotels: [String!]!
  }

  type RevenueByMonth {
    month: String!
    revenue: Float!
    bookings: Int!
  }

  type UserAnalytics {
    totalUsers: Int!
    activeUsers: Int!
    averageBonvoyPoints: Float!
    topUserSegments: [String!]!
  }

  type OccupancyAnalytics {
    averageOccupancy: Float!
    occupancyByHotel: [OccupancyByHotel!]!
    peakSeasons: [String!]!
  }

  type OccupancyByHotel {
    hotelId: String!
    occupancyRate: Float!
    totalRooms: Int!
    occupiedRooms: Int!
  }

  # Input Types
  input UserInput {
    name: String
    email: String!
    password: String!
    role: String
    bonvoyNumber: String
    bonvoyPoints: Int
    bonvoyStatus: String
  }

  input HotelInput {
    name: String!
    location: String!
    address: String!
    description: String!
    imageUrl: String!
    rating: Float
  }

  input RoomInput {
    hotelId: String!
    type: String!
    description: String!
    price: Float!
    capacity: Int!
    amenities: String!
    imageUrl: String!
    available: Boolean
  }

  input AmenityInput {
    name: String!
    category: String!
    description: String!
    imageUrl: String
    hotelId: String!
  }

  input RestaurantInput {
    name: String!
    hotelId: String!
    cuisine: String!
    priceRange: String!
    openTime: String!
    closeTime: String!
    description: String!
    imageUrl: String!
  }

  input ReservationInput {
    restaurantId: String!
    date: String!
    time: String!
    partySize: Int!
    status: String
  }

  input ExperienceInput {
    name: String!
    hotelId: String!
    type: String!
    description: String!
    price: Float!
    duration: Int!
    imageUrl: String!
    available: Boolean
  }

  input ExperienceBookingInput {
    experienceId: String!
    date: String!
    participants: Int!
    status: String
    specialRequests: String
  }

  input BookingInput {
    userId: Int!
    hotelId: String!
    roomId: String!
    checkIn: String!
    checkOut: String!
    guests: Int!
    totalPrice: Float!
    status: String
  }

  input OrderInput {
    userId: Int!
    stripeId: String!
    amount: Float!
    currency: String
    status: String
  }

  input ReviewInput {
    userId: Int!
    hotelId: String!
    rating: Int!
    comment: String!
  }

  input ConversationInput {
    userId: Int!
    userMessage: String!
    aiResponse: String!
    threadId: String
  }
`);

// Resolvers
const root = {
  // User resolvers
  users: () => mockUsers,
  user: ({ id }) => mockUsers.find(user => user.id === id),
  userByEmail: ({ email }) => mockUsers.find(user => user.email === email),
  
  // Hotel resolvers
  hotels: () => mockHotels,
  hotel: ({ id }) => mockHotels.find(hotel => hotel.id === id),
  hotelsByLocation: ({ location }) => mockHotels.filter(hotel => hotel.location.includes(location)),
  hotelsByRating: ({ minRating }) => mockHotels.filter(hotel => hotel.rating >= minRating),
  searchHotels: ({ location, checkIn, checkOut, guests, roomType }) => {
    return mockHotels.filter(hotel => hotel.location.includes(location));
  },
  
  // Room resolvers
  rooms: () => mockRooms,
  room: ({ id }) => mockRooms.find(room => room.id === id),
  roomsByHotel: ({ hotelId }) => mockRooms.filter(room => room.hotelId === hotelId),
  availableRooms: ({ hotelId, checkIn, checkOut }) => {
    return mockRooms.filter(room => room.hotelId === hotelId && room.available);
  },
  
  // Amenity resolvers
  amenities: () => mockAmenities,
  amenity: ({ id }) => mockAmenities.find(amenity => amenity.id === id),
  amenitiesByHotel: ({ hotelId }) => mockAmenities.filter(amenity => amenity.hotelId === hotelId),
  amenitiesByCategory: ({ category }) => mockAmenities.filter(amenity => amenity.category === category),
  
  // Restaurant resolvers
  restaurants: () => mockRestaurants,
  restaurant: ({ id }) => mockRestaurants.find(restaurant => restaurant.id === id),
  restaurantsByHotel: ({ hotelId }) => mockRestaurants.filter(restaurant => restaurant.hotelId === hotelId),
  restaurantsByCuisine: ({ cuisine }) => mockRestaurants.filter(restaurant => restaurant.cuisine === cuisine),
  
  // Reservation resolvers
  reservations: () => mockReservations,
  reservation: ({ id }) => mockReservations.find(reservation => reservation.id === id),
  reservationsByRestaurant: ({ restaurantId }) => mockReservations.filter(reservation => reservation.restaurantId === restaurantId),
  reservationsByDate: ({ date }) => mockReservations.filter(reservation => reservation.date === date),
  
  // Experience resolvers
  experiences: () => mockExperiences,
  experience: ({ id }) => mockExperiences.find(experience => experience.id === id),
  experiencesByHotel: ({ hotelId }) => mockExperiences.filter(experience => experience.hotelId === hotelId),
  experiencesByType: ({ type }) => mockExperiences.filter(experience => experience.type === type),
  
  // Experience Booking resolvers
  experienceBookings: () => [],
  experienceBooking: ({ id }) => null,
  experienceBookingsByExperience: ({ experienceId }) => [],
  
  // Booking resolvers
  bookings: () => mockBookings,
  booking: ({ id }) => mockBookings.find(booking => booking.id === id),
  bookingsByUser: ({ userId }) => mockBookings.filter(booking => booking.userId === userId),
  bookingsByHotel: ({ hotelId }) => mockBookings.filter(booking => booking.hotelId === hotelId),
  bookingsByStatus: ({ status }) => mockBookings.filter(booking => booking.status === status),
  
  // Order resolvers
  orders: () => mockOrders,
  order: ({ id }) => mockOrders.find(order => order.id === id),
  ordersByUser: ({ userId }) => mockOrders.filter(order => order.userId === userId),
  ordersByStatus: ({ status }) => mockOrders.filter(order => order.status === status),
  
  // Review resolvers
  reviews: () => mockReviews,
  review: ({ id }) => mockReviews.find(review => review.id === id),
  reviewsByHotel: ({ hotelId }) => mockReviews.filter(review => review.hotelId === hotelId),
  reviewsByUser: ({ userId }) => mockReviews.filter(review => review.userId === userId),
  
  // Conversation resolvers
  conversations: () => mockConversations,
  conversation: ({ id }) => mockConversations.find(conversation => conversation.id === id),
  conversationsByUser: ({ userId }) => mockConversations.filter(conversation => conversation.userId === userId),
  
  // Analytics resolvers
  hotelAnalytics: ({ hotelId }) => ({
    hotelId,
    totalBookings: mockBookings.filter(b => b.hotelId === hotelId).length,
    averageRating: 4.5,
    occupancyRate: 0.85,
    revenue: mockBookings.filter(b => b.hotelId === hotelId).reduce((sum, b) => sum + b.totalPrice, 0),
    topAmenities: ['Swimming Pool', 'Fitness Center', 'Spa'],
    popularRooms: ['Deluxe King', 'Executive Suite']
  }),
  bookingAnalytics: () => ({
    totalBookings: mockBookings.length,
    confirmedBookings: mockBookings.filter(b => b.status === 'confirmed').length,
    cancelledBookings: 0,
    averageBookingValue: mockBookings.reduce((sum, b) => sum + b.totalPrice, 0) / mockBookings.length,
    topDestinations: ['New York, NY', 'Los Angeles, CA'],
    bookingTrends: [
      { month: 'January', bookings: 15, revenue: 15000 },
      { month: 'February', bookings: 20, revenue: 20000 }
    ]
  }),
  revenueAnalytics: () => ({
    totalRevenue: mockOrders.reduce((sum, o) => sum + o.amount, 0),
    averageOrderValue: mockOrders.reduce((sum, o) => sum + o.amount, 0) / mockOrders.length,
    revenueByMonth: [
      { month: 'January', revenue: 15000, bookings: 15 },
      { month: 'February', revenue: 20000, bookings: 20 }
    ],
    topRevenueHotels: ['hotel_001', 'hotel_002']
  }),
  userAnalytics: () => ({
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.role === 'customer').length,
    averageBonvoyPoints: mockUsers.reduce((sum, u) => sum + u.bonvoyPoints, 0) / mockUsers.length,
    topUserSegments: ['Gold', 'Silver', 'Platinum']
  }),
  occupancyAnalytics: () => ({
    averageOccupancy: 0.85,
    occupancyByHotel: [
      { hotelId: 'hotel_001', occupancyRate: 0.90, totalRooms: 100, occupiedRooms: 90 },
      { hotelId: 'hotel_002', occupancyRate: 0.80, totalRooms: 80, occupiedRooms: 64 }
    ],
    peakSeasons: ['Summer', 'Holiday Season']
  })
};

// GraphQL endpoint
app.all('/graphql', createHandler({
  schema: schema,
  rootValue: root,
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Mock GraphQL API is running' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Mock GraphQL API server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  console.log(`Health check: http://localhost:${PORT}/health`);
}); 