# Travel Companion App

An advanced, mobile-optimized travel communication platform that delivers real-time, location-aware trip planning with intelligent AI assistance and seamless cross-platform connectivity.

## Features

- **User Authentication**: Secure login and registration system
- **Flight Booking**: Real-time flight search and booking with seat selection
- **Hotel Reservations**: Find and book hotels with various filtering options
- **Restaurant Reservations**: Search restaurants by cuisine, price range, meal type, and special features
- **Ride Booking**: Book rides with real-time tracking
- **Trip Planning**: AI-powered trip planning and recommendations
- **Travel Soundtrack**: Generate custom playlists based on travel destinations
- **Mobile Optimization**: Designed for both iOS and Android devices
- **Real-time Updates**: Live data synchronization via WebSockets
- **Payment Integration**: Secure payment processing for bookings

## Technology Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **Real-time Communication**: Socket.IO
- **UI Components**: Shadcn/UI + Tailwind CSS
- **API Integrations**:
  - Aviation API for flight data
  - RapidAPI for hotels and restaurants
  - Amadeus for travel bookings
  - Google Maps for location services
  - Stripe for payments
  - Twilio for communications
  - OpenAI for AI assistant features

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/travel-companion-app.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/travel_app
   STRIPE_SECRET_KEY=your_stripe_key
   AVIATION_API_KEY=your_aviation_api_key
   GOOGLE_MAPS_API_KEY=your_google_maps_key
   RAPID_API_KEY=your_rapid_api_key
   OPENAI_API_KEY=your_openai_key
   AMADEUS_API_KEY=your_amadeus_key
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token
   TWILIO_PHONE_NUMBER=your_twilio_phone
   ```

4. Initialize the database:
   ```
   npm run db:push
   ```

5. Start the development server:
   ```
   npm run dev
   ```

### Setting up Google OAuth

To enable Google authentication:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Set the application type to "Web application"
6. Add your domain to the "Authorized JavaScript origins" (e.g., `https://your-domain.com`)
7. Add your callback URL to "Authorized redirect URIs" (e.g., `https://your-domain.com/auth/google/callback`)
8. Copy the Client ID and Client Secret
9. Add these credentials to your `.env` file:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   HOST=your_domain.com
   ```

For local development, use:
- JavaScript origin: `http://localhost:5000`
- Redirect URI: `http://localhost:5000/auth/google/callback`

For Replit deployment, use:
- JavaScript origin: `https://your-replit-app.replit.dev`
- Redirect URI: `https://your-replit-app.replit.dev/auth/google/callback`

## Project Structure

- `/client`: Frontend React application
  - `/components`: Reusable UI components
  - `/pages`: Application pages
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions and API clients
  - `/styles`: CSS and styling files
- `/server`: Backend Express application
  - `/services`: Business logic and external API integrations
  - `/routes.ts`: API route definitions
  - `/storage.ts`: Data storage abstraction
  - `/auth.ts`: Authentication logic
  - `/websocket.ts`: WebSocket implementation
- `/shared`: Code shared between frontend and backend
  - `/schema.ts`: Data schema definitions
  - `/mockData.ts`: Mock data for development

## Deployment

This application can be deployed on any platform that supports Node.js applications, such as:
- Vercel
- Heroku
- AWS
- Digital Ocean
- Railway

## License

This project is licensed under the MIT License - see the LICENSE file for details.# Ai-travel
# Ai-travel
