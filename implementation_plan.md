# Implementation Plan for Agricultural Marketplace App

This document outlines the comprehensive implementation plan for developing the agricultural marketplace application based on the project requirements. The plan is structured to ensure a systematic approach to development, focusing on best practices, scalability, and maintainability. Following the model of ride-hailing services like Bolt, this application will consist of two separate but interconnected applications: one for buyers and one for sellers.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Design](#architecture-design)
4. [Implementation Phases](#implementation-phases)
5. [API Design](#api-design)
6. [Frontend Architecture](#frontend-architecture)
7. [Database Schema](#database-schema)
8. [Testing Strategy](#testing-strategy)
9. [Deployment Strategy](#deployment-strategy)
10. [Maintenance and Scaling](#maintenance-and-scaling)

## Project Overview

The agricultural marketplace platform is inspired by ride-hailing services like Bolt, with separate applications for buyers and sellers. It connects crop buyers with wholesalers, facilitating the search, discovery, and purchase of agricultural products with features like proximity-based search, dynamic pricing, and real-time order tracking.

### Core Features

#### Buyer App Features
- User authentication with email/password and phone number verification
- Buyer profile management
- Crop search and filtering by various parameters
- Location-based seller discovery
- Order placement and management
- Payment processing
- Real-time order tracking
- Rating and review system for sellers

#### Seller App Features
- Seller authentication with email/password and phone number verification
- Business profile management
- Inventory and crop management
- Order management and fulfillment
- Payment receipt and processing
- Real-time order status updates
- Analytics dashboard
- Premium visibility options

## Technology Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: PostgreSQL with Supabase for real-time capabilities
- **Authentication**: Supabase Auth with phone number verification
- **Real-time Communication**: WebSockets via Supabase Realtime
- **File Storage**: Supabase Storage
- **Geolocation Services**: PostGIS extension for PostgreSQL

### Frontend

#### Buyer App
- **Framework**: React with TypeScript
- **State Management**: React Context API with hooks
- **Routing**: React Router
- **Styling**: TailwindCSS
- **Maps Integration**: Leaflet/React-Leaflet
- **UI Components**: Custom component library optimized for buyer experience

#### Seller App
- **Framework**: React with TypeScript
- **State Management**: React Context API with hooks
- **Routing**: React Router
- **Styling**: TailwindCSS
- **Maps Integration**: Leaflet/React-Leaflet
- **UI Components**: Custom component library optimized for seller operations

### DevOps
- **Build Tool**: Vite
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend), Supabase (Backend)
- **Monitoring**: Sentry

## Architecture Design

### System Architecture

The application will follow a microservices-oriented architecture with the following components:

1. **Authentication Service**: Handles user registration, login, and profile management
2. **Search Service**: Manages crop search and filtering
3. **Order Service**: Handles order placement, tracking, and management
4. **Payment Service**: Processes payments and manages transactions
5. **Notification Service**: Sends real-time updates and notifications
6. **Analytics Service**: Provides insights and metrics for sellers

### Data Flow

1. User authenticates through the Authentication Service
2. Authenticated users can search for crops via the Search Service
3. Users place orders through the Order Service
4. Payment Service processes the transaction
5. Notification Service sends updates to relevant parties
6. Order Service tracks the delivery status
7. Analytics Service collects data for reporting

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

- Set up project structure and development environment
- Implement basic authentication (registration, login, profile management)
- Create database schema and migrations
- Develop core API endpoints
- Set up CI/CD pipeline

### Phase 2: Core Features (Weeks 3-5)

- Implement crop search and filtering functionality
- Develop location-based seller discovery
- Create order placement and management system
- Implement basic payment processing
- Develop real-time notifications

### Phase 3: Enhanced Features (Weeks 6-8)

- Implement real-time order tracking
- Develop rating and review system
- Create analytics dashboard for sellers
- Implement premium visibility options
- Develop advanced filtering and sorting

### Phase 4: Refinement and Launch (Weeks 9-10)

- Conduct comprehensive testing`
- Optimize performance
- Implement security measures
- Prepare documentation
- Deploy to production

## API Design

### Authentication API

#### Shared Authentication Endpoints
```
POST /api/auth/register                 # Register with email/password
POST /api/auth/register-phone           # Register with phone number
POST /api/auth/verify-phone             # Verify phone OTP
POST /api/auth/login                    # Login with email/password
POST /api/auth/login-phone              # Login with phone number
POST /api/auth/logout
GET /api/auth/user
```

#### Buyer-specific Authentication
```
PUT /api/auth/buyer/profile             # Update buyer profile
```

#### Seller-specific Authentication
```
PUT /api/auth/seller/profile            # Update seller profile
POST /api/auth/seller/verification      # Submit business verification documents
```

### User API

#### Buyer API
```
GET /api/buyers/:id                     # Get buyer profile
PUT /api/buyers/:id                     # Update buyer profile
GET /api/buyers/:id/orders              # Get buyer's orders
GET /api/buyers/:id/favorites           # Get buyer's favorite sellers/crops
POST /api/buyers/:id/favorites          # Add to favorites
DELETE /api/buyers/:id/favorites/:itemId # Remove from favorites
```

#### Seller API
```
GET /api/sellers/:id                    # Get seller profile
PUT /api/sellers/:id                    # Update seller profile
GET /api/sellers/:id/reviews            # Get seller reviews
GET /api/sellers/:id/analytics          # Get seller analytics
```

#### Review API
```
POST /api/reviews                       # Create review (buyer only)
GET /api/reviews/:id                    # Get specific review
```

### Crop API

#### Buyer Crop Endpoints
```
GET /api/crops                          # List all crops (with filters)
GET /api/crops/:id                      # Get crop details
```

#### Seller Crop Endpoints
```
GET /api/sellers/:id/crops              # Get seller's crops
POST /api/crops                         # Create new crop listing
PUT /api/crops/:id                      # Update crop listing
DELETE /api/crops/:id                   # Delete crop listing
POST /api/crops/:id/feature             # Feature a crop listing (premium)
```

### Search API

#### Buyer Search Endpoints
```
GET /api/search?query=&category=&minPrice=&maxPrice=&distance=&lat=&lng=
GET /api/search/nearby                  # Find nearby sellers
GET /api/search/trending                # Get trending crops
```

### Order API

#### Buyer Order Endpoints
```
GET /api/buyers/:id/orders              # List buyer's orders
GET /api/orders/:id                     # Get order details
POST /api/orders                        # Create new order
PUT /api/orders/:id                     # Update order (cancel)
GET /api/orders/:id/tracking            # Track order status
```

#### Seller Order Endpoints
```
GET /api/sellers/:id/orders             # List seller's orders
GET /api/orders/:id                     # Get order details
PUT /api/orders/:id/status              # Update order status
POST /api/orders/:id/tracking           # Update tracking information
```

### Payment API

#### Buyer Payment Endpoints
```
POST /api/payments                      # Process payment
GET /api/payments/:id                   # Get payment details
POST /api/payments/verify               # Verify payment
```

#### Seller Payment Endpoints
```
GET /api/sellers/:id/payments           # Get seller's received payments
GET /api/payments/:id                   # Get payment details
POST /api/payments/:id/refund           # Process refund
```

### Analytics API (Seller only)

```
GET /api/sellers/:id/analytics/sales    # Sales analytics
GET /api/sellers/:id/analytics/performance # Performance metrics
GET /api/sellers/:id/analytics/customers # Customer insights
GET /api/sellers/:id/analytics/inventory # Inventory analytics
```

## Frontend Architecture

### Buyer App Component Structure

```
src/
  ├── components/
  │   ├── common/
  │   │   ├── Button.tsx
  │   │   ├── Input.tsx
  │   │   ├── Card.tsx
  │   │   ├── Modal.tsx
  │   │   └── ...
  │   ├── layout/
  │   │   ├── BuyerHeader.tsx
  │   │   ├── BuyerFooter.tsx
  │   │   ├── BuyerSidebar.tsx
  │   │   └── ...
  │   ├── auth/
  │   │   ├── EmailLoginForm.tsx
  │   │   ├── PhoneLoginForm.tsx
  │   │   ├── RegisterForm.tsx
  │   │   ├── VerifyPhoneForm.tsx
  │   │   └── ...
  │   ├── search/
  │   │   ├── SearchBar.tsx
  │   │   ├── FilterPanel.tsx
  │   │   ├── ResultsList.tsx
  │   │   └── ...
  │   ├── map/
  │   │   ├── MapView.tsx
  │   │   ├── Marker.tsx
  │   │   └── ...
  │   ├── order/
  │   │   ├── OrderForm.tsx
  │   │   ├── OrderSummary.tsx
  │   │   ├── TrackingView.tsx
  │   │   └── ...
  │   ├── buyer/
  │   │   ├── BuyerProfile.tsx
  │   │   ├── FavoritesList.tsx
  │   │   ├── OrderHistory.tsx
  │   │   └── ...
  │   └── ...
  ├── pages/
  │   ├── Home.tsx
  │   ├── Login.tsx
  │   ├── Register.tsx
  │   ├── VerifyPhone.tsx
  │   ├── Search.tsx
  │   ├── ProductDetail.tsx
  │   ├── Checkout.tsx
  │   ├── OrderTracking.tsx
  │   ├── BuyerProfile.tsx
  │   ├── Favorites.tsx
  │   └── ...
  ├── hooks/
  │   ├── useAuth.ts
  │   ├── useSearch.ts
  │   ├── useOrder.ts
  │   ├── useLocation.ts
  │   └── ...
  ├── context/
  │   ├── AuthContext.tsx
  │   ├── CartContext.tsx
  │   ├── LocationContext.tsx
  │   └── ...
  ├── services/
  │   ├── api.ts
  │   ├── auth.ts
  │   ├── search.ts
  │   ├── order.ts
  │   ├── payment.ts
  │   └── ...
  ├── utils/
  │   ├── formatters.ts
  │   ├── validators.ts
  │   ├── geolocation.ts
  │   ├── phoneUtils.ts
  │   └── ...
  ├── types/
  │   ├── index.ts
  │   ├── api.ts
  │   ├── buyer.types.ts
  │   ├── database.types.ts
  │   └── ...
  ├── assets/
  │   ├── images/
  │   ├── icons/
  │   └── ...
  ├── styles/
  │   ├── globals.css
  │   ├── buyer-theme.css
  │   └── ...
  ├── App.tsx
  └── main.tsx
```

> Note: For the Seller App component structure, please refer to the separate [Seller Implementation Plan](./seller_implementation_plan.md) document.

### Design System

The design system will be built with the following principles:

1. **Consistency**: Unified look and feel across the application
2. **Accessibility**: WCAG 2.1 AA compliance
3. **Responsiveness**: Mobile-first approach
4. **Reusability**: Component-based architecture

Key components of the design system:

- Typography system with defined heading and body text styles
- Color palette with primary, secondary, and accent colors
- Spacing system with consistent margins and paddings
- Component library with buttons, inputs, cards, modals, etc.
- Icon system using Lucide React

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  password TEXT,
  phone_number TEXT UNIQUE,
  full_name TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('buyer', 'seller')),
  avatar_url TEXT,
  is_phone_verified BOOLEAN DEFAULT FALSE,
  preferred_auth_method TEXT NOT NULL DEFAULT 'email' CHECK (preferred_auth_method IN ('email', 'phone')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Buyer Profiles Table
```sql
CREATE TABLE buyer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  delivery_preferences JSONB DEFAULT '{}'::jsonb,
  payment_methods JSONB DEFAULT '{}'::jsonb,
  notification_preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
```

### Seller Profiles Table
```sql
CREATE TABLE seller_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_description TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  average_rating NUMERIC(3,2) DEFAULT 0,
  total_ratings INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Locations Table
```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL,
  postal_code TEXT,
  coordinates GEOGRAPHY(POINT) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Crops Table
```sql
CREATE TABLE crops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES seller_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price_per_unit NUMERIC(10,2) NOT NULL,
  unit TEXT NOT NULL,
  quantity_available NUMERIC(10,2) NOT NULL,
  images TEXT[],
  location_id UUID REFERENCES locations(id),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  seller_id UUID REFERENCES seller_profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled')),
  total_amount NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(10,2) NOT NULL,
  commission_fee NUMERIC(10,2) NOT NULL,
  delivery_address_id UUID REFERENCES locations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  crop_id UUID REFERENCES crops(id) ON DELETE SET NULL,
  quantity NUMERIC(10,2) NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  seller_id UUID REFERENCES seller_profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Premium Listings Table
```sql
CREATE TABLE premium_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES seller_profiles(id) ON DELETE CASCADE,
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('basic', 'enhanced', 'premium')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  amount_paid NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Testing Strategy

### Unit Testing
- Test individual components and functions
- Use Jest for JavaScript/TypeScript testing
- Aim for >80% code coverage

### Integration Testing
- Test API endpoints and database interactions
- Use Supertest for API testing
- Verify data flow between components

### End-to-End Testing
- Test complete user journeys
- Use Cypress for E2E testing
- Cover critical paths like registration, search, and ordering

### Performance Testing
- Load testing with k6
- Measure response times and throughput
- Identify bottlenecks and optimize

## Deployment Strategy

### Development Environment
- Local development with hot reloading
- Supabase local development for database

### Staging Environment
- Deployed to Vercel preview environments
- Connected to Supabase staging project
- Automated deployments from feature branches

### Production Environment
- Deployed to Vercel production
- Connected to Supabase production project
- Automated deployments from main branch
- Continuous monitoring with Sentry

### CI/CD Pipeline
1. Run tests on pull requests
2. Build and deploy to staging on merge to develop
3. Build and deploy to production on merge to main
4. Run database migrations
5. Monitor for errors post-deployment

## Maintenance and Scaling

### Monitoring
- Implement error tracking with Sentry
- Set up performance monitoring
- Create alerts for critical issues

### Scaling Strategy
- Horizontal scaling for API servers
- Database read replicas for high traffic
- CDN for static assets
- Caching layer for frequently accessed data

### Backup and Recovery
- Regular database backups
- Point-in-time recovery
- Disaster recovery plan

### Security Measures
- Regular security audits
- Input validation and sanitization
- Rate limiting and DDoS protection
- Data encryption at rest and in transit

---

This implementation plan provides a comprehensive roadmap for developing the agricultural marketplace application. By following this structured approach, the development team can efficiently build a scalable, maintainable, and feature-rich platform that meets the requirements outlined in the project documentation.