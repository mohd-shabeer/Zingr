import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

const NotFound = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const heartAnim = useRef(new Animated.Value(1)).current;
  const floatingAnim1 = useRef(new Animated.Value(0)).current;
  const floatingAnim2 = useRef(new Animated.Value(0)).current;
  const floatingAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Heart pulse animation
    const heartPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(heartAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Floating hearts animations
    const floating1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const floating2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim2, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    const floating3 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim3, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim3, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    heartPulse.start();
    floating1.start();
    
    setTimeout(() => floating2.start(), 1000);
    setTimeout(() => floating3.start(), 2000);

    return () => {
      heartPulse.stop();
      floating1.stop();
      floating2.stop();
      floating3.stop();
    };
  }, []);

  const handleGoHome = () => {
    router.replace('/home');
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  const renderFloatingHeart = (animValue, startX, startY, color) => (
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
                outputRange: [0, -100],
              }),
            },
            {
              scale: animValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 1, 0],
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
      <AntDesign name="heart" size={20} color={color} />
    </Animated.View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf2f8' }}>
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3', '#fbcfe8']}
        style={{ flex: 1 }}
      >
        {/* Floating Hearts */}
        {renderFloatingHeart(floatingAnim1, width * 0.2, height * 0.3, '#ff6b6b')}
        {renderFloatingHeart(floatingAnim2, width * 0.8, height * 0.4, '#ec4899')}
        {renderFloatingHeart(floatingAnim3, width * 0.6, height * 0.2, '#f472b6')}

        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
                      {/* Main Content */}
            <View style={styles.content}>
              {/* 404 Illustration */}
              <View style={styles.illustrationContainer}>
                {/* Broken Heart Icon */}
                <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
                  <LinearGradient
                    colors={['#ff6b6b', '#ee5a52']}
                    style={styles.brokenHeartContainer}
                  >
                    <MaterialIcons name="heart-broken" size={48} color="white" />
                  </LinearGradient>
                </Animated.View>

                {/* 404 Text */}
                <View style={styles.errorCodeContainer}>
                  <Text style={styles.errorNumber}>4</Text>
                  <LinearGradient
                    colors={['#ff6b6b', '#ee5a52']}
                    style={styles.zeroContainer}
                  >
                    <AntDesign name="heart" size={24} color="white" />
                  </LinearGradient>
                  <Text style={styles.errorNumber}>4</Text>
                </View>

                {/* Decorative Elements */}
                <View style={styles.decorativeElements}>
                  <AntDesign name="heart" size={16} color="#ff6b6b" />
                  <View style={styles.dotsContainer}>
                    <View style={styles.decorativeDot} />
                    <View style={[styles.decorativeDot, { backgroundColor: '#ec4899' }]} />
                    <View style={[styles.decorativeDot, { backgroundColor: '#f472b6' }]} />
                  </View>
                </View>
              </View>

              {/* Text Content */}
              <View style={styles.textContent}>
                <Text style={styles.mainTitle}>
                  Oops! Love Lost
                </Text>
                <Text style={styles.subtitle}>
                  We can't find the page you're looking for.
                </Text>
                <Text style={styles.description}>
                  But don't worry, there are plenty of other amazing connections waiting for you!
                </Text>

                {/* Fun Stats */}
                <View style={styles.statsContainer}>
                  <Text style={styles.statsTitle}>
                    While you're here...
                  </Text>
                  <View style={styles.statsLayout}>
                    <View style={styles.statsTopRow}>
                      <View style={styles.statItemLeft}>
                        <LinearGradient
                          colors={['#10b981', '#059669']}
                          style={styles.statIcon}
                        >
                          <Ionicons name="people" size={18} color="white" />
                        </LinearGradient>
                        <Text style={styles.statNumber}>1.2M+</Text>
                        <Text style={styles.statLabel}>Active Users</Text>
                      </View>
                      
                      <View style={styles.statItemRight}>
                        <LinearGradient
                          colors={['#ff6b6b', '#ee5a52']}
                          style={styles.statIcon}
                        >
                          <AntDesign name="heart" size={18} color="white" />
                        </LinearGradient>
                        <Text style={styles.statNumber}>50K+</Text>
                        <Text style={styles.statLabel}>Daily Matches</Text>
                      </View>
                    </View>
                    
                    <View style={styles.statsBottomRow}>
                      <View style={styles.statItemCenter}>
                        <LinearGradient
                          colors={['#8b5cf6', '#7c3aed']}
                          style={styles.statIcon}
                        >
                          <Ionicons name="chatbubbles" size={18} color="white" />
                        </LinearGradient>
                        <Text style={styles.statNumber}>500K+</Text>
                        <Text style={styles.statLabel}>Messages Sent</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleGoHome}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#ff6b6b', '#ee5a52']}
                    style={styles.primaryButtonGradient}
                  >
                    <AntDesign name="home" size={18} color="white" />
                    <Text style={styles.primaryButtonText}>
                      Find Love Again
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleGoBack}
                  activeOpacity={0.8}
                >
                  <View style={styles.secondaryButtonContent}>
                    <Ionicons name="arrow-back" size={18} color="#6B7280" />
                    <Text style={styles.secondaryButtonText}>
                      Go Back
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Help Options */}
              <View style={styles.helpContainer}>
                <Text style={styles.helpTitle}>
                  Need help? We're here for you
                </Text>
                <View style={styles.helpButtons}>
                  <TouchableOpacity style={styles.helpButton} activeOpacity={0.8}>
                    <View style={styles.helpButtonContent}>
                      <Feather name="help-circle" size={16} color="#6B7280" />
                      <Text style={styles.helpButtonText}>Help Center</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.helpButton} activeOpacity={0.8}>
                    <View style={styles.helpButtonContent}>
                      <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
                      <Text style={styles.helpButtonText}>Contact Us</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
          </View>
        </Animated.View>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  brokenHeartContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  errorCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  errorNumber: {
    fontSize: 96,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    lineHeight: 96,
  },
  zeroContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  decorativeElements: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  decorativeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff6b6b',
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  statsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statsLayout: {
    alignItems: 'center',
  },
  statsTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  statsBottomRow: {
    width: '100%',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statItemLeft: {
    alignItems: 'center',
    flex: 1,
  },
  statItemRight: {
    alignItems: 'center',
    flex: 1,
  },
  statItemCenter: {
    alignItems: 'center',
    width: '50%',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginLeft: 8,
  },
  secondaryButton: {
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',
  },
  secondaryButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
    marginLeft: 8,
  },
  helpContainer: {
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 16,
  },
  helpButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  helpButton: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',
  },
  helpButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  helpButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    marginLeft: 6,
  },
  floatingHeart: {
    position: 'absolute',
    zIndex: 1,
  },
});