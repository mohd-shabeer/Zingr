import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const heartPulse = useRef(new Animated.Value(1)).current;
  const buttonsSlide = useRef(new Animated.Value(100)).current;
  const slideTranslateX = useRef(new Animated.Value(0)).current;
  
  // Floating hearts animation
  const floatingHearts = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const slides = [
    {
      id: 1,
      title: "Find Your Perfect Match",
      subtitle: "Discover meaningful connections with people who share your interests and values",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      icon: "heart",
      color: ["#ff6b6b", "#ee5a52"],
      bgColor: ["#ffeaea", "#ffe0e0"]
    },
    {
      id: 2,
      title: "Smart Matching Algorithm",
      subtitle: "Our AI-powered system finds compatibility based on your preferences and behavior",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
      icon: "flash",
      color: ["#8b5cf6", "#7c3aed"],
      bgColor: ["#f3f0ff", "#ede9fe"]
    },
    {
      id: 3,
      title: "Safe & Secure Dating",
      subtitle: "Verified profiles, photo verification, and advanced safety features for peace of mind",
      image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
      icon: "shield-checkmark",
      color: ["#10b981", "#059669"],
      bgColor: ["#ecfdf5", "#d1fae5"]
    }
  ];

  useEffect(() => {
    // Initial entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Delay buttons animation
    setTimeout(() => {
      Animated.timing(buttonsSlide, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 1500);

    // Heart pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(heartPulse, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(heartPulse, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Floating hearts animation
    const heartAnimations = floatingHearts.map((heart, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(heart, {
            toValue: 1,
            duration: 3000 + index * 500,
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

    heartAnimations.forEach((animation, index) => {
      setTimeout(() => animation.start(), index * 800);
    });

    return () => {
      pulseAnimation.stop();
      heartAnimations.forEach(animation => animation.stop());
    };
  }, []);

  // Auto-advance slides with smooth animation
  useEffect(() => {
    const slideInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      
      Animated.timing(slideTranslateX, {
        toValue: -nextSlide * (width - 48),
        duration: 500,
        useNativeDriver: true,
      }).start();
      
      setCurrentSlide(nextSlide);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/register');
  };

  const handleSkip = () => {
    router.replace('/home');
  };

  const handleSlidePress = (index) => {
    if (index !== currentSlide) {
      Animated.timing(slideTranslateX, {
        toValue: -index * (width - 48),
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCurrentSlide(index);
    }
  };

  const renderFloatingHeart = (animValue, startX, startY, color = '#ff6b6b', size = 20) => (
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
                outputRange: [0, -200],
              }),
            },
            {
              scale: animValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 1, 0],
              }),
            },
            {
              rotate: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
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
      <AntDesign name="heart" size={size} color={color} />
    </Animated.View>
  );

  const renderSlide = (slide, index) => (
    <TouchableOpacity 
      key={slide.id} 
      style={styles.slide}
      onPress={() => handleSlidePress(index)}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={slide.bgColor}
        style={styles.slideContainer}
      >
        <View style={styles.slideHeader}>
          <LinearGradient
            colors={slide.color}
            style={styles.slideIcon}
          >
            <Ionicons name={slide.icon} size={24} color="white" />
          </LinearGradient>
          
          <View style={styles.slideImageContainer}>
            <Image 
              source={{ uri: slide.image }} 
              style={styles.slideImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.1)']}
              style={styles.imageOverlay}
            />
          </View>
        </View>
        
        <View style={styles.slideContent}>
          <Text style={styles.slideTitle}>{slide.title}</Text>
          <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
        </View>

        {/* Active slide indicator */}
        {index === currentSlide && (
          <View style={styles.activeSlideIndicator}>
            <LinearGradient
              colors={slide.color}
              style={styles.activeIndicatorGradient}
            />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf2f8' }}>
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4']}
        style={{ flex: 1 }}
      >
        {/* Floating Hearts */}
        {renderFloatingHeart(floatingHearts[0], width * 0.1, height * 0.15, '#ff6b6b', 16)}
        {renderFloatingHeart(floatingHearts[1], width * 0.85, height * 0.25, '#ec4899', 20)}
        {renderFloatingHeart(floatingHearts[2], width * 0.15, height * 0.5, '#f472b6', 18)}
        {renderFloatingHeart(floatingHearts[3], width * 0.8, height * 0.6, '#ff6b6b', 14)}

        {/* Skip Button */}
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <BlurView intensity={20} tint="light" style={styles.skipBlur}>
              <Text className="font-poppins-medium text-gray-600 text-sm">Skip</Text>
              <Ionicons name="arrow-forward" size={16} color="#6B7280" />
            </BlurView>
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Animated.View
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <Animated.View
                style={[
                  styles.logoContainer,
                  {
                    transform: [
                      { scale: logoScale },
                      { scale: heartPulse },
                    ],
                  },
                ]}
              >
                <LinearGradient
                  colors={['#ff6b6b', '#ee5a52']}
                  style={styles.logoCircle}
                >
                  <AntDesign name="heart" size={40} color="white" />
                  <View style={styles.logoSpark}>
                    <Ionicons name="flash" size={14} color="#fbbf24" />
                  </View>
                </LinearGradient>
                
                {/* Logo pulse rings */}
                <Animated.View 
                  style={[
                    styles.pulseRing,
                    {
                      transform: [{ scale: heartPulse }],
                      opacity: heartPulse.interpolate({
                        inputRange: [1, 1.1],
                        outputRange: [0.6, 0],
                      }),
                    }
                  ]}
                />
                <Animated.View 
                  style={[
                    styles.pulseRing,
                    { 
                      width: 130, 
                      height: 130,
                      transform: [{ scale: heartPulse }],
                      opacity: heartPulse.interpolate({
                        inputRange: [1, 1.1],
                        outputRange: [0.3, 0],
                      }),
                    }
                  ]}
                />
              </Animated.View>

              <Text style={styles.appName}>Zingr</Text>
              <Text style={styles.tagline}>Where Hearts Connect ✨</Text>
            </View>

            {/* Enhanced Features Slider */}
            <View style={styles.slidesContainer}>
              <View style={styles.slidesWrapper}>
                <Animated.View 
                  style={[
                    styles.slidesTrack,
                    {
                      transform: [{ translateX: slideTranslateX }]
                    }
                  ]}
                >
                  {slides.map((slide, index) => renderSlide(slide, index))}
                </Animated.View>
              </View>

              {/* Enhanced Slide Indicators */}
              <View style={styles.indicators}>
                {slides.map((slide, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSlidePress(index)}
                    style={[
                      styles.indicator,
                      index === currentSlide && styles.activeIndicator
                    ]}
                  >
                    {index === currentSlide && (
                      <LinearGradient
                        colors={slide.color}
                        style={styles.indicatorGradient}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Enhanced Stats Section */}
            <View style={styles.statsSection}>
              <BlurView intensity={30} tint="light" style={styles.statsBlur}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
                  style={styles.statsContainer}
                >
                  <View style={styles.statItem}>
                    <LinearGradient
                      colors={['#ff6b6b', '#ee5a52']}
                      style={styles.statIcon}
                    >
                      <Ionicons name="people" size={16} color="white" />
                    </LinearGradient>
                    <Text style={styles.statNumber}>2M+</Text>
                    <Text style={styles.statLabel}>Active Users</Text>
                  </View>
                  
                  <View style={styles.statDivider} />
                  
                  <View style={styles.statItem}>
                    <LinearGradient
                      colors={['#10b981', '#059669']}
                      style={styles.statIcon}
                    >
                      <AntDesign name="heart" size={16} color="white" />
                    </LinearGradient>
                    <Text style={styles.statNumber}>500K+</Text>
                    <Text style={styles.statLabel}>Matches Made</Text>
                  </View>
                  
                  <View style={styles.statDivider} />
                  
                  <View style={styles.statItem}>
                    <LinearGradient
                      colors={['#8b5cf6', '#7c3aed']}
                      style={styles.statIcon}
                    >
                      <MaterialIcons name="verified" size={16} color="white" />
                    </LinearGradient>
                    <Text style={styles.statNumber}>98%</Text>
                    <Text style={styles.statLabel}>Success Rate</Text>
                  </View>
                </LinearGradient>
              </BlurView>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Enhanced Action Buttons */}
        <Animated.View
          style={[
            styles.buttonsContainer,
            {
              transform: [{ translateY: buttonsSlide }],
            }
          ]}
        >
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#ff6b6b', '#ee5a52']}
              style={styles.signUpGradient}
            >
              <AntDesign name="heart" size={20} color="white" />
              <Text style={styles.signUpText}>Start Your Love Journey</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <BlurView intensity={30} tint="light" style={styles.loginBlur}>
              <Text style={styles.loginText}>Already have an account? 
                <Text style={styles.loginLink}> Sign In</Text>
              </Text>
            </BlurView>
          </TouchableOpacity>

          {/* Enhanced Social Login Options */}
          <View style={styles.socialSection}>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.socialText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <BlurView intensity={20} tint="light" style={styles.socialButtonBlur}>
                  <AntDesign name="google" size={24} color="#DB4437" />
                </BlurView>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <BlurView intensity={20} tint="light" style={styles.socialButtonBlur}>
                  <AntDesign name="apple1" size={24} color="#000" />
                </BlurView>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <BlurView intensity={20} tint="light" style={styles.socialButtonBlur}>
                  <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                </BlurView>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </Animated.View>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  skipContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  skipButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  skipBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  logoContainer: {
    marginBottom: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  logoSpark: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 3,
    zIndex: 3,
  },
  pulseRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#ff6b6b',
    zIndex: 1,
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 4,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  slidesContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  slidesWrapper: {
    height: 280,
    marginBottom: 20,
    overflow: 'hidden',
  },
  slidesTrack: {
    flexDirection: 'row',
    height: '100%',
  },
  slide: {
    width: width - 48,
    marginHorizontal: 12,
    borderRadius: 24,
    overflow: 'hidden',
  },
  slideContainer: {
    flex: 1,
    padding: 24,
    position: 'relative',
  },
  slideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  slideIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  slideImageContainer: {
    position: 'relative',
    flex: 1,
  },
  slideImage: {
    width: '100%',
    height: 120,
    borderRadius: 16,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderRadius: 16,
  },
  slideContent: {
    flex: 1,
  },
  slideTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 28,
  },
  slideSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    lineHeight: 22,
  },
  activeSlideIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  activeIndicatorGradient: {
    flex: 1,
    borderRadius: 2,
  },
  indicators: {
    flexDirection: 'row',
    gap: 8,
  },
  indicator: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(107, 114, 128, 0.3)',
    overflow: 'hidden',
  },
  activeIndicator: {
    width: 32,
  },
  indicatorGradient: {
    flex: 1,
    borderRadius: 2,
  },
  statsSection: {
    marginBottom: 32,
  },
  statsBlur: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  signUpButton: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  signUpGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 8,
  },
  signUpText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  loginButton: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  loginBlur: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
  },
  loginLink: {
    color: '#ff6b6b',
    fontFamily: 'Poppins-SemiBold',
  },
  socialSection: {
    alignItems: 'center',
    marginTop: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(107, 114, 128, 0.3)',
  },
  socialText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  socialButtonBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#ff6b6b',
    fontFamily: 'Poppins-Medium',
  },
  floatingHeart: {
    position: 'absolute',
    zIndex: 1,
  },
});