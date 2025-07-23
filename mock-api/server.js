const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
app.use(cors());

// Mock data
const mockHotels = [
  {
    id: '1',
    name: 'Marriott Marquis New York',
    address: '1535 Broadway',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    zipCode: '10036',
    phone: '+1-212-398-1900',
    email: 'info@marriottmarquisny.com',
    website: 'https://www.marriottmarquisny.com',
    rating: 4.5,
    reviewCount: 2847,
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'],
    images: ['https://example.com/hotel1.jpg'],
    availableRooms: 45,
    priceRange: { min: 299, max: 599, currency: 'USD' },
    distance: 0.5,
    coordinates: { latitude: 40.7589, longitude: -73.9851 }
  },
  {
    id: '2',
    name: 'Marriott Marquis San Francisco',
    address: '780 Mission St',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    zipCode: '94103',
    phone: '+1-415-896-1600',
    email: 'info@marriottmarquissf.com',
    website: 'https://www.marriottmarquissf.com',
    rating: 4.3,
    reviewCount: 1923,
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Business Center'],
    images: ['https://example.com/hotel2.jpg'],
    availableRooms: 32,
    priceRange: { min: 399, max: 799, currency: 'USD' },
    distance: 1.2,
    coordinates: { latitude: 37.7849, longitude: -122.4094 }
  }
];

const mockReservations = [
  {
    id: '1',
    confirmationNumber: 'MR123456789',
    guestName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-123-4567',
    checkIn: '2024-02-15',
    checkOut: '2024-02-18',
    roomType: 'Deluxe King',
    numberOfGuests: 2,
    status: 'CONFIRMED',
    totalAmount: 897.00,
    currency: 'USD',
    hotel: mockHotels[0],
    specialRequests: 'Late check-in requested',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
];

// GraphQL Schema
const schema = buildSchema(`
  scalar Date
  scalar DateTime

  type Query {
    reservation(confirmationNumber: String!): Reservation
    searchHotels(
      location: String!
      checkIn: Date!
      checkOut: Date!
      guests: Int
      roomType: String
    ): [Hotel!]!
    hotels: [Hotel!]!
    hotel(id: ID!): Hotel
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): Reservation!
    updateReservation(input: UpdateReservationInput!): Reservation!
    cancelReservation(confirmationNumber: String!): Reservation!
  }

  input CreateBookingInput {
    guestName: String!
    email: String!
    phone: String!
    checkIn: Date!
    checkOut: Date!
    roomType: String!
    numberOfGuests: Int!
    hotelId: ID!
    specialRequests: String
  }

  input UpdateReservationInput {
    confirmationNumber: String!
    guestName: String
    email: String
    phone: String
    checkIn: Date
    checkOut: Date
    roomType: String
    numberOfGuests: Int
    specialRequests: String
  }

  type Reservation {
    id: ID!
    confirmationNumber: String!
    guestName: String!
    email: String!
    phone: String!
    checkIn: Date!
    checkOut: Date!
    roomType: String!
    numberOfGuests: Int!
    status: ReservationStatus!
    totalAmount: Float!
    currency: String!
    hotel: Hotel!
    specialRequests: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Hotel {
    id: ID!
    name: String!
    address: String!
    city: String!
    state: String!
    country: String!
    zipCode: String!
    phone: String!
    email: String!
    website: String!
    rating: Float!
    reviewCount: Int!
    amenities: [String!]!
    images: [String!]!
    availableRooms: Int!
    priceRange: PriceRange!
    distance: Float
    coordinates: Coordinates
  }

  type PriceRange {
    min: Float!
    max: Float!
    currency: String!
  }

  type Coordinates {
    latitude: Float!
    longitude: Float!
  }

  enum ReservationStatus {
    CONFIRMED
    PENDING
    CANCELLED
    COMPLETED
    NO_SHOW
  }
`);

// Resolvers
const root = {
  reservation: ({ confirmationNumber }) => {
    return mockReservations.find(r => r.confirmationNumber === confirmationNumber);
  },
  
  searchHotels: ({ location, checkIn, checkOut, guests, roomType }) => {
    // Simple mock search - in real implementation this would filter based on criteria
    return mockHotels.filter(hotel => 
      hotel.city.toLowerCase().includes(location.toLowerCase()) ||
      hotel.state.toLowerCase().includes(location.toLowerCase())
    );
  },
  
  hotels: () => {
    return mockHotels;
  },
  
  hotel: ({ id }) => {
    return mockHotels.find(h => h.id === id);
  },
  
  createBooking: ({ input }) => {
    const hotel = mockHotels.find(h => h.id === input.hotelId);
    if (!hotel) {
      throw new Error('Hotel not found');
    }
    
    const newReservation = {
      id: (mockReservations.length + 1).toString(),
      confirmationNumber: `MR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ...input,
      status: 'CONFIRMED',
      totalAmount: Math.floor(Math.random() * 500) + 200,
      currency: 'USD',
      hotel,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockReservations.push(newReservation);
    return newReservation;
  },
  
  updateReservation: ({ input }) => {
    const reservation = mockReservations.find(r => r.confirmationNumber === input.confirmationNumber);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    
    Object.assign(reservation, input, { updatedAt: new Date().toISOString() });
    return reservation;
  },
  
  cancelReservation: ({ confirmationNumber }) => {
    const reservation = mockReservations.find(r => r.confirmationNumber === confirmationNumber);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    
    reservation.status = 'CANCELLED';
    reservation.updatedAt = new Date().toISOString();
    return reservation;
  }
};

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL interface for testing
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Status endpoint for the frontend
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'running', 
    timestamp: new Date().toISOString(),
    graphqlEndpoint: '/graphql',
    hotelsCount: mockHotels.length,
    reservationsCount: mockReservations.length
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock GraphQL API server running on http://localhost:${PORT}`);
  console.log(`📊 GraphiQL interface available at http://localhost:${PORT}/graphql`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
}); 