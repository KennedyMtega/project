# Seller Application Implementation Plan

This document outlines the implementation plan specifically for the seller-side application of our agricultural marketplace platform. Similar to how Bolt separates its driver app from the rider app, this seller application is designed to cater to the unique needs of agricultural wholesalers while maintaining integration with the buyer application.

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Seller-Specific Features](#seller-specific-features)
4. [Implementation Phases](#implementation-phases)
5. [API Design](#api-design)
6. [Frontend Architecture](#frontend-architecture)
7. [Database Considerations](#database-considerations)
8. [Testing Strategy](#testing-strategy)
9. [Deployment Strategy](#deployment-strategy)

## Overview

The seller application serves as the business management platform for agricultural wholesalers. It provides tools for inventory management, order fulfillment, business analytics, and customer relationship management. The application is designed to be intuitive for sellers with varying levels of technical expertise, with a focus on efficiency and productivity.

## Technology Stack

The seller application shares the same core technology stack as the buyer application, with some specific optimizations:

### Backend
- **Framework**: Node.js with Express.js
- **Database**: PostgreSQL with Supabase for real-time capabilities
- **Authentication**: Supabase Auth with phone number verification (essential for rural sellers)
- **Real-time Communication**: WebSockets via Supabase Realtime for instant order notifications
- **File Storage**: Supabase Storage for crop images and verification documents
- **Geolocation Services**: PostGIS extension for location-based inventory management

### Frontend
- **Framework**: React with TypeScript
- **State Management**: React Context API with hooks
- **Routing**: React Router
- **Styling**: TailwindCSS with a seller-focused theme
- **Maps Integration**: Leaflet/React-Leaflet for delivery zone management
- **UI Components**: Custom component library optimized for inventory and order management
- **Offline Capabilities**: Service workers for basic offline functionality

### DevOps
- **Build Tool**: Vite
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend), Supabase (Backend)
- **Monitoring**: Sentry with seller-specific error tracking

## Seller-Specific Features

### Authentication and Profile
- Phone number-based registration and login (primary method)
- Email-based registration and login (secondary method)
- Business profile creation and management
- Business verification process
- Multiple user accounts for one business (owner, managers, staff)

### Inventory Management
- Crop listing creation and management
- Bulk inventory updates
- Inventory tracking and alerts
- Seasonal crop planning tools
- Image management for crop listings
- Pricing management (fixed, dynamic, bulk discounts)

### Order Management
- Real-time order notifications
- Order acceptance/rejection
- Order fulfillment tracking
- Delivery management
- Order history and reporting

### Analytics Dashboard
- Sales performance metrics
- Customer insights
- Inventory turnover analysis
- Seasonal trend analysis
- Competitive pricing insights

### Marketing Tools
- Premium listing management
- Promotional offers creation
- Customer targeting tools
- Loyalty program management

### Financial Management
- Payment receipt tracking
- Commission calculation
- Earnings reports
- Payout scheduling
- Tax documentation

## Implementation Phases

### Phase 1: Core Functionality (Weeks 1-3)

- Seller authentication with phone number verification
- Basic business profile management
- Simple inventory management (CRUD operations for crops)
- Basic order management (receive, accept/reject, mark as fulfilled)

### Phase 2: Enhanced Operations (Weeks 4-6)

- Advanced inventory management (bulk operations, inventory tracking)
- Comprehensive order fulfillment system
- Basic analytics dashboard
- Payment tracking and management
- Business verification process

### Phase 3: Business Growth Tools (Weeks 7-9)

- Advanced analytics and reporting
- Marketing and promotional tools
- Premium listing features
- Customer relationship management tools
- Seasonal planning tools

### Phase 4: Optimization and Integration (Weeks 10-12)

- Performance optimization
- Offline capabilities enhancement
- Advanced financial reporting
- Integration with external services (accounting, logistics)
- Comprehensive testing and quality assurance

## API Design

### Authentication API

```
POST /api/auth/register-phone           # Register with phone number (primary for sellers)
POST /api/auth/verify-phone             # Verify phone OTP
POST /api/auth/register                 # Register with email (secondary)
POST /api/auth/login-phone              # Login with phone number
POST /api/auth/login                    # Login with email
POST /api/auth/logout
GET /api/auth/user
```

### Seller Profile API

```
GET /api/sellers/:id                    # Get seller profile
PUT /api/sellers/:id                    # Update seller profile
POST /api/auth/seller/verification      # Submit business verification documents
GET /api/sellers/:id/verification/status # Check verification status
POST /api/sellers/:id/staff             # Add staff account
GET /api/sellers/:id/staff              # List staff accounts
PUT /api/sellers/:id/staff/:staffId     # Update staff permissions
DELETE /api/sellers/:id/staff/:staffId  # Remove staff account
```

### Inventory API

```
GET /api/sellers/:id/crops              # List seller's crops
POST /api/crops                         # Create new crop listing
PUT /api/crops/:id                      # Update crop listing
DELETE /api/crops/:id                   # Delete crop listing
POST /api/crops/bulk                    # Bulk create/update crops
POST /api/crops/:id/images              # Upload crop images
DELETE /api/crops/:id/images/:imageId   # Delete crop image
POST /api/crops/:id/feature             # Feature a crop listing (premium)
GET /api/sellers/:id/inventory/alerts   # Get inventory alerts
```

### Order Management API

```
GET /api/sellers/:id/orders             # List seller's orders
GET /api/orders/:id                     # Get order details
PUT /api/orders/:id/status              # Update order status
POST /api/orders/:id/tracking           # Update tracking information
GET /api/sellers/:id/orders/pending     # Get pending orders
GET /api/sellers/:id/orders/active      # Get active orders
GET /api/sellers/:id/orders/completed   # Get completed orders
GET /api/sellers/:id/orders/cancelled   # Get cancelled orders
```

### Analytics API

```
GET /api/sellers/:id/analytics/sales    # Sales analytics
GET /api/sellers/:id/analytics/performance # Performance metrics
GET /api/sellers/:id/analytics/customers # Customer insights
GET /api/sellers/:id/analytics/inventory # Inventory analytics
GET /api/sellers/:id/analytics/seasonal  # Seasonal trends
GET /api/sellers/:id/analytics/dashboard # Dashboard summary
```

### Financial API

```
GET /api/sellers/:id/payments           # List received payments
GET /api/payments/:id                   # Get payment details
POST /api/payments/:id/refund           # Process refund
GET /api/sellers/:id/earnings           # Get earnings summary
GET /api/sellers/:id/earnings/history   # Get earnings history
GET /api/sellers/:id/commissions        # Get commission details
```

### Marketing API

```
GET /api/sellers/:id/promotions         # List seller's promotions
POST /api/promotions                    # Create new promotion
PUT /api/promotions/:id                 # Update promotion
DELETE /api/promotions/:id              # Delete promotion
POST /api/sellers/:id/premium           # Purchase premium features
GET /api/sellers/:id/premium/status     # Check premium status
```

## Frontend Architecture

### Component Structure

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
  │   │   ├── SellerHeader.tsx
  │   │   ├── SellerFooter.tsx
  │   │   ├── SellerSidebar.tsx
  │   │   └── ...
  │   ├── auth/
  │   │   ├── PhoneLoginForm.tsx
  │   │   ├── EmailLoginForm.tsx
  │   │   ├── VerificationForm.tsx
  │   │   └── ...
  │   ├── profile/
  │   │   ├── BusinessProfileForm.tsx
  │   │   ├── VerificationDocuments.tsx
  │   │   ├── StaffManagement.tsx
  │   │   └── ...
  │   ├── inventory/
  │   │   ├── CropForm.tsx
  │   │   ├── InventoryList.tsx
  │   │   ├── BulkUpload.tsx
  │   │   ├── ImageManager.tsx
  │   │   └── ...
  │   ├── orders/
  │   │   ├── OrderList.tsx
  │   │   ├── OrderDetail.tsx
  │   │   ├── OrderFulfillment.tsx
  │   │   ├── DeliveryTracking.tsx
  │   │   └── ...
  │   ├── analytics/
  │   │   ├── SalesDashboard.tsx
  │   │   ├── PerformanceMetrics.tsx
  │   │   ├── InventoryAnalytics.tsx
  │   │   ├── CustomerInsights.tsx
  │   │   └── ...
  │   ├── marketing/
  │   │   ├── PromotionForm.tsx
  │   │   ├── PremiumFeatures.tsx
  │   │   ├── CustomerTargeting.tsx
  │   │   └── ...
  │   ├── financial/
  │   │   ├── EarningsSummary.tsx
  │   │   ├── PaymentHistory.tsx
  │   │   ├── CommissionDetails.tsx
  │   │   └── ...
  │   └── ...
  ├── pages/
  │   ├── Login.tsx
  │   ├── Register.tsx
  │   ├── Dashboard.tsx
  │   ├── Profile.tsx
  │   ├── Inventory.tsx
  │   ├── Orders.tsx
  │   ├── Analytics.tsx
  │   ├── Marketing.tsx
  │   ├── Financials.tsx
  │   ├── Settings.tsx
  │   └── ...
  ├── hooks/
  │   ├── useAuth.ts
  │   ├── useInventory.ts
  │   ├── useOrders.ts
  │   ├── useAnalytics.ts
  │   └── ...
  ├── context/
  │   ├── AuthContext.tsx
  │   ├── InventoryContext.tsx
  │   ├── OrderContext.tsx
  │   ├── NotificationContext.tsx
  │   └── ...
  ├── services/
  │   ├── api.ts
  │   ├── auth.ts
  │   ├── inventory.ts
  │   ├── orders.ts
  │   ├── analytics.ts
  │   ├── financial.ts
  │   └── ...
  ├── utils/
  │   ├── formatters.ts
  │   ├── validators.ts
  │   ├── imageProcessing.ts
  │   ├── offlineStorage.ts
  │   └── ...
  ├── types/
  │   ├── index.ts
  │   ├── api.ts
  │   ├── seller.types.ts
  │   ├── inventory.types.ts
  │   └── ...
  ├── assets/
  │   ├── images/
  │   ├── icons/
  │   └── ...
  ├── styles/
  │   ├── globals.css
  │   ├── seller-theme.css
  │   └── ...
  ├── App.tsx
  └── main.tsx
```

## Database Considerations

While the database schema is shared between buyer and seller applications, there are several seller-specific tables and fields that need special consideration:

### Seller Staff Table
```sql
CREATE TABLE seller_staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_profile_id UUID REFERENCES seller_profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'manager', 'staff')),
  permissions JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Inventory Alerts Table
```sql
CREATE TABLE inventory_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES seller_profiles(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('low_stock', 'expiring_soon', 'price_change_recommended')),
  threshold NUMERIC(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Promotions Table
```sql
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES seller_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'buy_x_get_y')),
  discount_value NUMERIC(10,2) NOT NULL,
  min_purchase_amount NUMERIC(10,2),
  applicable_crops UUID[] REFERENCES crops(id),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Seller Analytics Table
```sql
CREATE TABLE seller_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES seller_profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_sales NUMERIC(10,2) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  average_order_value NUMERIC(10,2) DEFAULT 0,
  new_customers INTEGER DEFAULT 0,
  returning_customers INTEGER DEFAULT 0,
  top_selling_crops UUID[] REFERENCES crops(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Testing Strategy

### Unit Testing
- Test individual components and functions
- Focus on inventory management and order processing logic
- Test offline functionality
- Use Jest for JavaScript/TypeScript testing

### Integration Testing
- Test API endpoints specific to seller operations
- Verify data flow between components
- Test real-time notifications
- Test payment processing and commission calculations

### End-to-End Testing
- Test complete seller journeys
- Focus on critical paths:
  - Crop listing creation and management
  - Order fulfillment process
  - Analytics dashboard functionality
  - Financial reporting

### Performance Testing
- Test under high inventory load
- Test real-time order processing capacity
- Test analytics generation speed
- Optimize for low-bandwidth environments

### Usability Testing
- Conduct testing with actual agricultural sellers
- Focus on ease of use for users with varying technical expertise
- Test on various devices (mobile, tablet, desktop)
- Test in low-connectivity scenarios

## Deployment Strategy

The seller application will follow the same deployment pipeline as the buyer application, with some specific considerations:

### Development Environment
- Local development with hot reloading
- Supabase local development for database
- Mock data generation for testing seller-specific features

### Staging Environment
- Deployed to Vercel preview environments
- Connected to Supabase staging project
- Automated deployments from feature branches
- Testing with simulated order flow

### Production Environment
- Deployed to Vercel production
- Connected to Supabase production project
- Automated deployments from main branch
- Continuous monitoring with Sentry
- Gradual rollout to sellers by region

### Offline Considerations
- Implement service workers for basic offline functionality
- Local storage for critical data
- Sync mechanisms for when connectivity is restored
- Graceful degradation of features in offline mode

---

This implementation plan provides a comprehensive roadmap specifically for the seller-side application of our agricultural marketplace platform. By following this structured approach and focusing on the unique needs of agricultural wholesalers, we can build a powerful tool that enables sellers to efficiently manage their business and connect with buyers.