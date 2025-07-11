# CADT Freshman Coding Competition Leaderboard

A modern, responsive web application for displaying and managing leaderboard data for the CADT (Cambodian Academy of Digital Technology) Freshman Coding Competition.

## 🌟 Features

### 📊 Multiple Leaderboard Views
- **Overall Leaderboard**: Complete ranking of all participants
- **Round 1 & Round 2**: Individual round-specific rankings
- **Team Leaderboard**: Team-based competition results
- **Group Leaderboard**: Group-based rankings and statistics

### 🔍 Advanced Search & Filtering
- Real-time search by participant name or HackerRank ID
- Group-based filtering
- Responsive pagination with customizable results per page
- Live data updates every 5 minutes

### 📱 Responsive Design
- Mobile-first approach with optimized layouts
- Tablet and desktop-specific optimizations
- Modern UI with gradient backgrounds and smooth animations
- Consistent design system across all components

### ⚡ Performance Features
- Client-side data caching with Firebase integration
- Optimized re-rendering with React hooks
- Lazy loading and pagination
- Real-time data synchronization via Firebase Firestore
- Efficient HackerRank API polling with rate limiting

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Database**: Firebase Firestore for real-time data storage
- **API Integration**: HackerRank API for fetching competition data
- **Package Manager**: pnpm
- **Fonts**: Custom Niradei font family

## 📁 Project Structure

```
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Homepage (Overall leaderboard)
│   └── leaderboard/             # Leaderboard pages
│       ├── round1/              # Round 1 leaderboard
│       ├── round2/              # Round 2 leaderboard
│       ├── team/                # Team leaderboard
│       └── test/                # Test pages
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   ├── layout/                  # Layout components
│   └── leaderboard/             # Leaderboard-specific components
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions and API
├── types/                       # TypeScript type definitions
├── assets/                      # Static assets (fonts, images)
└── public/                      # Public static files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NewLeaderboard-main
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure Environment Variables**
   - Copy the example environment file
   ```bash
   cp .env.example .env.local
   ```
   
   - Update the environment variables in `.env.local`:
   ```bash
   # Environment
   NODE_ENV=development
   
   # API Token for authentication
   NEXT_PUBLIC_TOKEN=your_api_token
   
   # Mock Data Toggle (for development/testing)
   NEXT_PUBLIC_USE_MOCK_DATA=false
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_URL=your_firebase_database_url
   
   # HackerRank API Endpoints
   NEXT_PUBLIC_HACKERRANK_ROUND1_URL=your_round1_api_endpoint
   NEXT_PUBLIC_HACKERRANK_ROUND2_URL=your_round2_api_endpoint
   NEXT_PUBLIC_HACKERRANK_ROUND_TEAM_URL=your_team_api_endpoint
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## ⚙️ Configuration

### Environment Variables
The application uses several environment variables for configuration. Copy `.env.example` to `.env.local` and update the values:

```bash
# Environment
NODE_ENV=development

# API Token for authentication
NEXT_PUBLIC_TOKEN=your_api_token

# Mock Data Toggle (useful for development/testing)
NEXT_PUBLIC_USE_MOCK_DATA=false

# Firebase Database URL
NEXT_PUBLIC_FIREBASE_URL=your_firebase_database_url

# HackerRank API Endpoints
NEXT_PUBLIC_HACKERRANK_ROUND1_URL=your_round1_api_endpoint
NEXT_PUBLIC_HACKERRANK_ROUND2_URL=your_round2_api_endpoint
NEXT_PUBLIC_HACKERRANK_ROUND_TEAM_URL=your_team_api_endpoint
```

### Firebase Configuration
- **NEXT_PUBLIC_FIREBASE_URL**: Firebase Realtime Database URL for storing leaderboard data
- **Mock Data**: Set `NEXT_PUBLIC_USE_MOCK_DATA=true` for development without live API calls

### HackerRank API Configuration
- **Round-specific endpoints**: Separate URLs for Round 1, Round 2, and Team competitions
- **Authentication**: Uses `NEXT_PUBLIC_TOKEN` for API access

### Leaderboard Settings
Configuration can be found in `lib/constants.ts`:

```typescript
export const LEADERBOARD_CONFIG = {
  ROUNDS: [1, 2],                              // Available rounds
  QUESTIONS_COUNT: 6,                          // Questions per round
  GROUPS: ["G1", "G2", "G3", ...],            // Available groups
  REFRESH_INTERVAL: 300000,                    // Auto-refresh interval (5 min)
  MAX_PARTICIPANTS: 200,                       // Maximum participants
  PARTICIPANTS_PER_PAGE_OPTIONS: [25, 50, 100], // Pagination options
  DEFAULT_PARTICIPANTS_PER_PAGE: 200,         // Default page size
}
```

### Color Scheme
```typescript
export const COLORS = {
  PRIMARY: "#F58C29",    // Orange theme color
  SECONDARY: "#15284C",  // Dark blue
  SUCCESS: "#10B981",    // Green
  ERROR: "#EF4444",      // Red
  WARNING: "#F59E0B",    // Yellow
}
```

## 🎨 UI Components

### Leaderboard Components
- **LeaderboardTable**: Main table component with sorting and pagination
- **LeaderboardRow**: Individual participant/team row with ranking
- **SearchAndFilters**: Search bar with filtering capabilities
- **Pagination**: Custom pagination with tab-based navigation

### Layout Components
- **Navigation**: Top navigation with responsive mobile menu
- **LoadingSpinner**: Consistent loading states
- **ErrorMessage**: Error handling with retry functionality

## 📊 Data Flow

1. **Data Fetching**: HackerRank API integration fetches real-time competition data
2. **Data Storage**: Firebase Firestore stores and synchronizes leaderboard data
3. **State Management**: React hooks manage local state and caching
4. **Filtering**: Client-side filtering for search and group selection
5. **Pagination**: Efficient pagination with configurable page sizes
6. **Auto-refresh**: Automatic data updates every 5 minutes from HackerRank API

## 🔧 Custom Hooks

- `useOverallLeaderboard()`: Overall leaderboard data management
- `useRound1Leaderboard()`: Round 1 specific data and filtering
- `useRound2Leaderboard()`: Round 2 specific data and filtering
- `useTeamLeaderboard()`: Team-based leaderboard functionality
- `useGroupOverallLeaderboard()`: Group statistics and rankings

## 🎯 Key Features Explained

### Search Functionality
- Real-time search across participant names and HackerRank IDs
- Debounced input for optimal performance
- Responsive design with mobile-optimized layout

### Ranking System
- Dynamic rank calculation based on scores
- Visual rank indicators with icons for top 3 positions
- Color-coded performance indicators

### Group Management
- Support for 10 groups (G1-G10)
- Group-specific filtering and statistics
- Team composition tracking

### Responsive Design
- Mobile-first approach with breakpoint-specific layouts
- Touch-friendly interface elements
- Optimized for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏫 About CADT

The Cambodian Academy of Digital Technology (CADT) is a leading institution in Cambodia focused on digital technology education and innovation. This leaderboard system supports their freshman coding competition, encouraging students to develop their programming skills through competitive coding challenges.

## 📞 Support

For support or questions about this project, please contact the development team or create an issue in the repository.

---

Built with ❤️ for the CADT Freshman Coding Competition
