# Overview

TravelAI Platform is a comprehensive, AI-powered travel companion application that provides end-to-end travel planning and booking services. Built as a full-stack web application with mobile optimization, it offers flight booking, hotel reservations, ride booking, restaurant reservations, AI-driven trip planning, and personalized travel recommendations. The platform includes real-time features, payment processing, subscription tiers, and advanced AI assistants for cultural insights and proactive travel suggestions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite build system
- **UI Components**: Shadcn/UI component library with Tailwind CSS styling
- **State Management**: TanStack Query (React Query) for server state and caching
- **Routing**: Wouter for client-side routing with lazy loading for performance optimization
- **Mobile Optimization**: Custom hooks for responsive design, iOS/Android-specific optimizations, viewport handling, and PWA capabilities
- **Authentication**: Context-based authentication with session management
- **Real-time Updates**: Socket.IO client integration for live data synchronization

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Authentication**: Passport.js with local strategy and Google OAuth integration
- **Session Management**: Express-session with PostgreSQL session store (fallback to memory store)
- **Real-time Communication**: Socket.IO server for WebSocket connections
- **API Design**: RESTful endpoints with comprehensive error handling and validation
- **File Structure**: Modular service-based architecture with clear separation of concerns

## Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection Pooling**: Neon serverless PostgreSQL with connection pooling and SSL
- **Caching**: Node-cache for in-memory caching of API responses and frequently accessed data
- **Session Storage**: Database-backed sessions with memory fallback for development
- **Schema Management**: Drizzle Kit for database migrations and schema management

## Authentication and Authorization
- **Multi-provider Auth**: Local username/password and Google OAuth 2.0 integration
- **Password Security**: Scrypt-based password hashing with salt generation
- **Session Management**: Secure HTTP-only cookies with CSRF protection
- **User Profiles**: Comprehensive user preference system with AI-driven personalization
- **Guest Access**: Limited functionality for unauthenticated users
- **OTP Verification**: Phone and email verification using Twilio and custom email services

## Payment Processing
- **Primary Provider**: Stripe integration with Payment Intents API
- **Alternative Methods**: UPI payment system for Indian market
- **Subscription Management**: Tiered subscription system (Free, Premium, Business)
- **Commission Tracking**: Automated commission calculation for different booking types
- **Refund Handling**: Comprehensive refund and partial refund processing

# External Dependencies

## AI and Machine Learning Services
- **OpenAI GPT**: Trip planning, cultural insights, proactive suggestions, and personalized recommendations
- **Anthropic Claude**: Alternative AI service for enhanced conversational capabilities

## Travel and Booking APIs
- **Aviation Stack API**: Real-time flight data, schedules, and tracking information
- **RapidAPI Travel Advisor**: Hotel search, restaurant discovery, and local attractions
- **Amadeus API**: Professional travel booking and reservation management
- **IRCTC Air**: Flight booking integration for Indian domestic travel

## Payment and Financial Services
- **Stripe**: Payment processing, subscription management, and webhook handling
- **UPI Gateway**: Unified Payments Interface for Indian payment processing

## Communication and Messaging
- **Twilio**: SMS/phone verification, emergency notifications, and communication services
- **GetOTP API**: OTP generation and verification services

## Maps and Location Services
- **Google Maps API**: Location services, geocoding, and mapping functionality
- **Google Places API**: Place search, details, and local business information

## Authentication Services
- **Google OAuth 2.0**: Social login and contact integration
- **Google Contacts API**: Contact synchronization and social features

## Infrastructure and Monitoring
- **Neon Database**: Serverless PostgreSQL hosting with auto-scaling
- **WebSocket Support**: Real-time communication infrastructure
- **CDN Integration**: Asset delivery and performance optimization

## Development and Build Tools
- **Vite**: Fast build system with hot module replacement
- **ESBuild**: TypeScript compilation and bundling
- **Babel**: JavaScript transpilation for compatibility
- **Drizzle Kit**: Database schema management and migrations