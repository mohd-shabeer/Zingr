import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Index = () => {
  // Animation refs
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(50)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const heartPulse = useRef(new Animated.Value(1)).current;
  const sparkleRotate = useRef(new Animated.Value(0)).current;
  const floatingHearts = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Main animation sequence
    const animationSequence = Animated.sequence([
      // Logo entrance
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      
      // Title entrance (delayed)
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(titleSlide, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      
      // Tagline entrance
      Animated.delay(100),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    // Heart pulse animation
    const heartPulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(heartPulse, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(heartPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Sparkle rotation animation
    const sparkleAnimation = Animated.loop(
      Animated.timing(sparkleRotate, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );

    // Floating hearts animation
    const floatingAnimation = floatingHearts.map((heart, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(heart, {
            toValue: 1,
            duration: 2000 + index * 500,
            useNativeDriver: true,
          }),
          Animated.timing(heart, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      )
    );

    // Start animations
    animationSequence.start();
    heartPulseAnimation.start();
    sparkleAnimation.start();
    
    // Staggered floating hearts
    floatingAnimation.forEach((animation, index) => {
      setTimeout(() => animation.start(), index * 800);
    });

    // Navigation timer
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 3000); // Extended to 3 seconds for better experience

    return () => {
      clearTimeout(timer);
      heartPulseAnimation.stop();
      sparkleAnimation.stop();
      floatingAnimation.forEach(animation => animation.stop());
    };
  }, []);

  const renderFloatingHeart = (animValue, startX, startY) => (
    <Animated.View
      style={[
        styles.floatingHeart,
        {
          left: startX,
          top: startY,
          transform: [
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -150],
              }),
            },
            {
              scale: animValue.interpolate({
                inputRange: [0, 0.3, 0.7, 1],
                outputRange: [0, 1, 1, 0],
              }),
            },
          ],
          opacity: animValue.interpolate({
            inputRange: [0, 0.2, 0.8, 1],
            outputRange: [0, 1, 1, 0],
          }),
        },
      ]}
    >
      <AntDesign name="heart" size={16} color="#ff6b6b" />
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4']}
        style={styles.gradient}
      >
        {/* Floating Hearts */}
        {renderFloatingHeart(floatingHearts[0], width * 0.2, height * 0.3)}
        {renderFloatingHeart(floatingHearts[1], width * 0.8, height * 0.4)}
        {renderFloatingHeart(floatingHearts[2], width * 0.6, height * 0.2)}

        {/* Main Content */}
        <View style={styles.content}>
          {/* Logo Section */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            {/* Main Logo Circle */}
            <LinearGradient
              colors={['#ff6b6b', '#ee5a52', '#dc2626']}
              style={styles.logoCircle}
            >
              {/* Sparkle Effect */}
              <Animated.View
                style={[
                  styles.sparkleContainer,
                  {
                    transform: [
                      {
                        rotate: sparkleRotate.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={[styles.sparkle, styles.sparkle1]} />
                <View style={[styles.sparkle, styles.sparkle2]} />
                <View style={[styles.sparkle, styles.sparkle3]} />
              </Animated.View>

              {/* Main Heart Icon */}
              <Animated.View
                style={[
                  styles.heartIcon,
                  {
                    transform: [{ scale: heartPulse }],
                  },
                ]}
              >
                <AntDesign name="heart" size={48} color="white" />
              </Animated.View>

              {/* Lightning Bolt for "Zing" */}
              <View style={styles.lightningBolt}>
                <Ionicons name="flash" size={20} color="#fbbf24" />
              </View>
            </LinearGradient>

            {/* Logo Shadow */}
            <View style={styles.logoShadow} />
          </Animated.View>

          {/* App Name */}
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleSlide }],
              },
            ]}
          >
            <Text style={styles.appName}>Zingr</Text>
            <View style={styles.titleUnderline}>
              <LinearGradient
                colors={['#ff6b6b', '#ee5a52']}
                style={styles.underlineGradient}
              />
            </View>
          </Animated.View>

          {/* Tagline */}
          <Animated.View
            style={[
              styles.taglineContainer,
              {
                opacity: taglineOpacity,
              },
            ]}
          >
            <Text style={styles.tagline}>Spark. Connect. Love.</Text>
            <View style={styles.taglineIcons}>
              <Ionicons name="flash" size={16} color="#ff6b6b" />
              <AntDesign name="heart" size={16} color="#ff6b6b" style={{ marginHorizontal: 12 }} />
              <Ionicons name="infinite" size={16} color="#ff6b6b" />
            </View>
          </Animated.View>

          {/* Loading Indicator */}
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBar}>
              <LinearGradient
                colors={['#ff6b6b', '#ee5a52']}
                style={styles.loadingProgress}
              />
            </View>
            <Text style={styles.loadingText}>Creating magic...</Text>
          </View>
        </View>

        {/* Bottom Branding */}
        <View style={styles.bottomBranding}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>Made with ❤️ for meaningful connections</Text>
        </View>
      </LinearGradient>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 20,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  logoShadow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    top: 10,
    zIndex: -1,
  },
  sparkleContainer: {
    position: 'absolute',
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkle: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#fbbf24',
    borderRadius: 4,
  },
  sparkle1: {
    top: 10,
    left: '50%',
    marginLeft: -4,
  },
  sparkle2: {
    bottom: 10,
    right: 15,
  },
  sparkle3: {
    left: 15,
    top: '50%',
    marginTop: -4,
  },
  heartIcon: {
    zIndex: 2,
  },
  lightningBolt: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 48,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    textAlign: 'center',
    letterSpacing: 2,
  },
  titleUnderline: {
    width: 80,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
  },
  underlineGradient: {
    flex: 1,
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  tagline: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
  },
  taglineIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  loadingProgress: {
    width: '70%',
    height: '100%',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  floatingHeart: {
    position: 'absolute',
    zIndex: 1,
  },
  bottomBranding: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 40,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});