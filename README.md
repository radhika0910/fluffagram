# 📸 Flufffagram - Instagram Clone

A beautiful, modern Instagram clone built with React Native and Expo Router. Perfect for developers looking to understand social media app architecture or entrepreneurs wanting to launch their own photo-sharing platform.

## ✨ Features

- **📱 Cross-Platform**: Runs on iOS, Android, and Web
- **🎨 Modern UI**: Instagram-inspired design with smooth animations
- **📸 Photo Sharing**: Upload and share photos with captions
- **❤️ Social Interactions**: Like, comment, and engage with posts
- **🎬 Reels Support**: Short video content similar to Instagram Reels
- **👤 User Profiles**: Customizable user profiles with profile pictures
- **🔄 Real-time Updates**: Live feed updates and interactions
- **📱 Tab Navigation**: Intuitive bottom tab navigation
- **🚀 Performance Optimized**: Built with Redux Toolkit for state management

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo Router** - File-based routing system
- **Redux Toolkit** - Modern Redux for state management
- **TypeScript** - Type-safe development
- **React Native Reanimated** - Smooth animations
- **Safe Area Context** - Handle device-specific layouts

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development - Mac only)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Instagram-Clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app for physical device

## 🏗️ Project Structure

```
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── index.tsx      # Home/Feed screen
│   │   ├── explore.tsx    # Explore/Search screen
│   │   ├── reels.tsx      # Reels/Videos screen
│   │   └── profile.tsx    # User profile screen
│   ├── _layout.tsx        # Root layout with providers
│   └── splash.tsx         # Splash screen
├── redux/                 # State management
│   ├── slices/           # Redux Toolkit slices
│   └── store.js          # Redux store configuration
├── assets/               # Images, fonts, and other assets
└── components/           # Reusable React components
```

## 🚀 Getting Started Guide

### For Developers

1. **Understanding the Architecture**

   - The app uses Expo Router for navigation
   - Redux Toolkit manages global state
   - Each tab represents a major feature

2. **Key Files to Explore**

   - `app/_layout.tsx` - App initialization and providers
   - `redux/slices/appSlice.js` - Main app state management
   - `app/(tabs)/index.tsx` - Home feed implementation

3. **Adding New Features**
   - Create new screens in the `app/` directory
   - Add new state slices in `redux/slices/`
   - Follow the existing component patterns

### For Business Owners

1. **Customization**

   - Change app name in `app/splash.tsx`
   - Update logo in `assets/` directory
   - Modify color scheme in component styles

2. **Deployment**
   - Build for production: `npx expo build`
   - Submit to app stores using Expo's services
   - Configure app icons and splash screens

## 🎨 Customization

### Branding

- **App Name**: Change "Flufffagram" in `splash.tsx`
- **Logo**: Replace `assets/instagram_logo.jpg`
- **Colors**: Update styles throughout components
- **Developer Credit**: Modify in `splash.tsx`

### Features

- **API Integration**: Currently uses placeholder API, replace with your backend
- **Authentication**: Add login/signup screens
- **Push Notifications**: Integrate with Expo Notifications
- **Image Upload**: Connect to cloud storage (AWS S3, Cloudinary)

## 📱 Screens Overview

- **Splash Screen**: App initialization and branding
- **Home Feed**: Photo posts with likes and comments
- **Explore**: Discover new content and users
- **Reels**: Short video content
- **Profile**: User information and posted content

## 🔧 Configuration

### Environment Setup

Create a `.env` file for environment variables:

```env
API_BASE_URL=your_api_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### App Configuration

Update `app.json` for app-specific settings:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0"
  }
}
```

## 📈 Monetization Ideas

- **Premium Features**: Advanced filters, analytics
- **Advertising**: In-feed ads, sponsored posts
- **Subscriptions**: Pro accounts with extra features
- **E-commerce**: Shopping integration
- **Content Creator Tools**: Advanced editing, insights

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**

   ```bash
   npx expo start --clear
   ```

2. **Module resolution errors**

   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Platform-specific issues**
   - iOS: Check Xcode and simulator setup
   - Android: Verify Android Studio and SDK

## 📄 License

This project is available for commercial use. Please check the license file for specific terms.

## 🤝 Support

For support and customization services:

- 📧 Email: radhikabhoyarbussiness@gmail.com
- 💬 Discord: Your Discord
- 🐦 Twitter: @YourTwitter

## 🚀 Ready to Launch?

This Instagram clone is production-ready and can be customized for your specific needs. Whether you're building a niche social platform or learning React Native development, this codebase provides a solid foundation.

**What's Included:**

- ✅ Complete source code
- ✅ Documentation and setup guides
- ✅ Modern architecture and best practices
- ✅ Cross-platform compatibility
- ✅ Customization examples

Start building your social media empire today! 🚀

---

_Built with ❤️ by CodeRads_
