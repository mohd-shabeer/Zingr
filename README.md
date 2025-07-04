# 💘 Zingr - Modern Dating App

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

<div align="center">
  <h3>✨ Spark. Connect. Love. ✨</h3>
  <p>A modern, feature-rich dating application built with React Native, Expo, and cutting-edge UI/UX design principles.</p>
</div>

---

## 🌟 Features

### 🔥 Core Dating Features
- **Smart Discovery**: AI-powered profile recommendations
- **Advanced Matching**: Compatibility-based algorithm
- **Real-time Chat**: Instant messaging with rich media support
- **Profile Verification**: Multi-step verification system
- **Premium Features**: Enhanced visibility and exclusive features
- **Safety First**: Comprehensive safety and privacy controls

### 📱 Modern UI/UX
- **Glassmorphism Design**: Beautiful blur effects and transparency
- **Smooth Animations**: 60fps animations with React Native Reanimated
- **Responsive Layout**: Adaptive design for all screen sizes
- **Dark Mode Ready**: Complete dark theme support
- **Accessibility**: VoiceOver/TalkBack optimized

### 🛡️ Privacy & Security
- **End-to-End Encryption**: Secure messaging
- **Privacy Controls**: Granular privacy settings
- **Photo Verification**: AI-powered photo authentication
- **Report System**: Comprehensive user safety tools

## 📸 Screenshots

<div align="center">
  <img src="./screenshots/home.png" width="200" alt="Home Screen" />
  <img src="./screenshots/profile.png" width="200" alt="Profile Screen" />
  <img src="./screenshots/chat.png" width="200" alt="Chat Screen" />
  <img src="./screenshots/settings.png" width="200" alt="Settings Screen" />
</div>

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **iOS Simulator** or **Android Emulator**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohd-shabeer/Zingr.git
   cd zingr-dating-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app

## 🏗️ Project Structure

```
zingr-dating-app/
├── app/                          # App Router pages
│   ├── (tabs)/                   # Tab navigation pages
│   │   ├── home.jsx             # Discovery/Swipe page
│   │   ├── chat-list.jsx        # Messages list
│   │   ├── my-profile.jsx       # User profile
│   │   └── settings.jsx         # Settings page
│   ├── _layout.jsx              # Root layout
│   ├── index.jsx                # Splash screen
│   ├── chat.jsx                 # Individual chat
│   ├── edit-profile.jsx         # Profile editing
│   ├── premium.jsx              # Premium features
│   ├── verification.jsx         # Profile verification
│   ├── privacy-settings.jsx     # Privacy controls
│   ├── filters.jsx              # Search filters
│   ├── terms.jsx                # Terms of service
│   ├── privacy.jsx              # Privacy policy
│   ├── contact-support.jsx      # Support page
│   └── discovery-preferences.jsx # Discovery settings
├── assets/                       # Static assets
│   ├── fonts/                   # Custom fonts (Poppins)
│   └── images/                  # Images and icons
├── helpers/                      # Utility functions
│   └── common.js                # Common utilities
├── global.css                   # Global styles
├── tailwind.config.js           # Tailwind configuration
└── README.md                    # This file
```

## 🛠️ Tech Stack

### Core Technologies
- **React Native** - Cross-platform mobile development
- **Expo SDK 53** - Development platform and tools
- **Expo Router** - File-based navigation
- **NativeWind** - Tailwind CSS for React Native

### UI/UX Libraries
- **React Native Reanimated** - High-performance animations
- **React Native Gesture Handler** - Native gesture recognition
- **Expo Linear Gradient** - Beautiful gradient effects
- **Expo Blur** - Glassmorphism blur effects
- **React Native Safe Area Context** - Safe area handling

### Fonts & Icons
- **Poppins Font Family** - Modern typography
- **Expo Vector Icons** - Comprehensive icon library
  - AntDesign, Ionicons, MaterialIcons, Feather

### Additional Features
- **Expo Status Bar** - Status bar management
- **React Native Slider** - Interactive sliders
- **Animated API** - Smooth animations

## 🎨 Design System

### Color Palette
```javascript
const colors = {
  primary: {
    rose: '#ff6b6b',
    roseSecondary: '#ee5a52',
    pink: '#fce7f3',
    pinkLight: '#fdf2f8'
  },
  gradients: {
    primary: ['#ff6b6b', '#ee5a52'],
    background: ['#fdf2f8', '#fce7f3', '#fbcfe8'],
    success: ['#10b981', '#059669'],
    premium: ['#fbbf24', '#f59e0b']
  }
}
```

### Typography
- **Font Family**: Poppins (9 weights + italics)
- **Scale**: 12px - 48px with consistent spacing
- **Line Heights**: Optimized for readability

### Spacing System
- **Base Unit**: 4px
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- **Components**: Consistent padding and margins

## 📱 App Features Breakdown

### 🏠 Discovery (Home)
- Swipeable profile cards with smooth animations
- Multiple photo support with indicators
- Real-time like/pass feedback
- Smart recommendation algorithm
- Profile preview with key information

### 💬 Messaging
- Real-time chat interface
- Image sharing capabilities
- Typing indicators
- Read receipts
- Online status

### 👤 Profile Management
- Comprehensive profile editing
- Photo upload and management
- Interest selection
- Personal details and preferences
- Profile analytics

### ⚙️ Settings & Privacy
- Granular privacy controls
- Discovery preferences
- Notification settings
- Account management
- Safety features

### 💎 Premium Features
- Enhanced visibility
- Advanced filters
- Super likes and boosts
- Read receipts
- Unlimited likes

## 🔧 Development

### Code Quality
- **ESLint** configuration for code consistency
- **Prettier** for code formatting
- **Husky** pre-commit hooks
- **Component-based architecture**

### Performance Optimization
- **Image optimization** with caching
- **Lazy loading** for better performance
- **Memory management** for large lists
- **Native driver** for 60fps animations

### Testing
```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📱 Supported Platforms

- **iOS** 13.0+
- **Android** API 21+ (Android 5.0+)
- **Expo Go** for development

## 🚀 Deployment

### Build for Production

1. **Configure app.json**
   ```json
   {
     "expo": {
       "name": "Zingr",
       "slug": "zingr-dating-app",
       "version": "1.0.0",
       "orientation": "portrait",
       "platforms": ["ios", "android"]
     }
   }
   ```

2. **Build the app**
   ```bash
   # iOS
   npx expo build:ios

   # Android
   npx expo build:android
   ```

3. **Submit to stores**
   ```bash
   npx expo submit
   ```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- **Email**: mohammedshabeer2520@gmail.com

## 🙏 Acknowledgments

- [Expo Team](https://expo.dev/) for the amazing development platform
- [React Native Community](https://reactnative.dev/) for continuous innovation
- [Pexels](https://pexels.com/) for beautiful stock photos
- All contributors and beta testers

---

<div align="center">
  <p>Made with ❤️ for meaningful connections</p>
  <p>© 2025 Zingr. All rights reserved.</p>
</div>