import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const formSlide = useRef(new Animated.Value(100)).current;
  const heartPulse = useRef(new Animated.Value(1)).current;
  const inputShake = useRef(new Animated.Value(0)).current;

  // Floating elements
  const floatingElements = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Initial entrance animation
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
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Form slide animation with delay
    setTimeout(() => {
      Animated.timing(formSlide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 400);

    // Heart pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(heartPulse, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(heartPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Floating elements animation
    const elementAnimations = floatingElements.map((element, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(element, {
            toValue: 1,
            duration: 4000 + index * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(element, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      )
    );

    elementAnimations.forEach((animation, index) => {
      setTimeout(() => animation.start(), index * 1000);
    });

    return () => {
      pulseAnimation.stop();
      elementAnimations.forEach(animation => animation.stop());
    };
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const shakeInput = () => {
    Animated.sequence([
      Animated.timing(inputShake, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(inputShake, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(inputShake, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(inputShake, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      shakeInput();
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      shakeInput();
      return;
    }

    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters');
      shakeInput();
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)/home');
    }, 2000);
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Social Login', `Login with ${provider} - Feature coming soon!`);
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/register');
  };

  const renderFloatingElement = (animValue, startX, startY, icon, color, size = 20) => (
    <Animated.View
      style={[
        styles.floatingElement,
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
              rotate: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
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
      <LinearGradient
        colors={[color, `${color}99`]}
        style={styles.floatingElementInner}
      >
        <Ionicons name={icon} size={size} color="white" />
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf2f8' }}>
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3', '#fbcfe8']}
        style={{ flex: 1 }}
      >
        {/* Floating Elements */}
        {renderFloatingElement(floatingElements[0], width * 0.1, height * 0.12, 'heart', '#ff6b6b', 18)}
        {renderFloatingElement(floatingElements[1], width * 0.85, height * 0.2, 'star', '#fbbf24', 16)}
        {renderFloatingElement(floatingElements[2], width * 0.15, height * 0.35, 'flash', '#8b5cf6', 20)}
        {renderFloatingElement(floatingElements[3], width * 0.8, height * 0.45, 'diamond', '#ec4899', 14)}

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <BlurView intensity={30} tint="light" style={styles.backButtonBlur}>
              <Ionicons name="arrow-back" size={24} color="#6B7280" />
            </BlurView>
          </TouchableOpacity>
          
          <BlurView intensity={20} tint="light" style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Sign In</Text>
          </BlurView>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
                    <AntDesign name="heart" size={32} color="white" />
                    <View style={styles.logoSpark}>
                      <Ionicons name="flash" size={12} color="#fbbf24" />
                    </View>
                  </LinearGradient>
                  
                  {/* Pulse rings */}
                  <Animated.View 
                    style={[
                      styles.pulseRing,
                      {
                        transform: [{ scale: heartPulse }],
                        opacity: heartPulse.interpolate({
                          inputRange: [1, 1.05],
                          outputRange: [0.4, 0],
                        }),
                      }
                    ]}
                  />
                </Animated.View>

                <Text style={styles.welcomeTitle}>Welcome Back to Zingr</Text>
                <Text style={styles.welcomeSubtitle}>Sign in to continue your love journey ✨</Text>
              </View>

              {/* Login Form */}
              <Animated.View
                style={[
                  styles.formContainer,
                  {
                    transform: [
                      { translateY: formSlide },
                      { translateX: inputShake }
                    ],
                  },
                ]}
              >
                <BlurView intensity={40} tint="light" style={styles.formBlur}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
                    style={styles.formGradient}
                  >
                    {/* Quick Stats */}
                    <View style={styles.quickStats}>
                      <View style={styles.statItem}>
                        <Ionicons name="people" size={16} color="#ff6b6b" />
                        <Text style={styles.statText}>2M+ Users</Text>
                      </View>
                      <View style={styles.statDivider} />
                      <View style={styles.statItem}>
                        <AntDesign name="heart" size={16} color="#10b981" />
                        <Text style={styles.statText}>500K+ Matches</Text>
                      </View>
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Email Address</Text>
                      <View style={[
                        styles.inputContainer,
                        emailFocused && styles.inputFocused,
                        !validateEmail(email) && email.length > 0 && styles.inputError
                      ]}>
                        <LinearGradient
                          colors={emailFocused 
                            ? ['rgba(255, 107, 107, 0.08)', 'rgba(238, 90, 82, 0.04)']
                            : ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']
                          }
                          style={styles.inputGradient}
                        >
                          <View style={styles.inputIcon}>
                            <Ionicons 
                              name="mail-outline" 
                              size={20} 
                              color={emailFocused ? "#ff6b6b" : "#9CA3AF"} 
                            />
                          </View>
                          <TextInput
                            style={styles.textInput}
                            placeholder="Enter your email"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                          />
                          {email.length > 0 && validateEmail(email) && (
                            <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                          )}
                        </LinearGradient>
                      </View>
                      {!validateEmail(email) && email.length > 0 && (
                        <Text style={styles.errorText}>Please enter a valid email</Text>
                      )}
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Password</Text>
                      <View style={[
                        styles.inputContainer,
                        passwordFocused && styles.inputFocused,
                        password.length > 0 && password.length < 6 && styles.inputError
                      ]}>
                        <LinearGradient
                          colors={passwordFocused 
                            ? ['rgba(255, 107, 107, 0.08)', 'rgba(238, 90, 82, 0.04)']
                            : ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']
                          }
                          style={styles.inputGradient}
                        >
                          <View style={styles.inputIcon}>
                            <Ionicons 
                              name="lock-closed-outline" 
                              size={20} 
                              color={passwordFocused ? "#ff6b6b" : "#9CA3AF"} 
                            />
                          </View>
                          <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                          />
                          <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeButton}
                            activeOpacity={0.7}
                          >
                            <Ionicons 
                              name={showPassword ? "eye-outline" : "eye-off-outline"} 
                              size={20} 
                              color="#9CA3AF" 
                            />
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                      {password.length > 0 && password.length < 6 && (
                        <Text style={styles.errorText}>Password must be at least 6 characters</Text>
                      )}
                    </View>

                    {/* Remember Me & Forgot Password */}
                    <View style={styles.optionsRow}>
                      <TouchableOpacity 
                        style={styles.rememberContainer}
                        onPress={() => setRememberMe(!rememberMe)}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                          {rememberMe && (
                            <Ionicons name="checkmark" size={14} color="white" />
                          )}
                        </View>
                        <Text style={styles.rememberText}>Remember me</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        onPress={handleForgotPassword}
                        style={styles.forgotButton}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                      style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                      onPress={handleLogin}
                      disabled={isLoading}
                      activeOpacity={0.9}
                    >
                      <LinearGradient
                        colors={['#ff6b6b', '#ee5a52']}
                        style={styles.loginGradient}
                      >
                        {isLoading ? (
                          <View style={styles.loadingContainer}>
                            <Animated.View style={[styles.loadingDot, styles.loadingDot1]} />
                            <Animated.View style={[styles.loadingDot, styles.loadingDot2]} />
                            <Animated.View style={[styles.loadingDot, styles.loadingDot3]} />
                          </View>
                        ) : (
                          <>
                            <Ionicons name="log-in-outline" size={20} color="white" />
                            <Text style={styles.loginText}>Sign In to Zingr</Text>
                            <Ionicons name="arrow-forward" size={16} color="white" />
                          </>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>or continue with</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    {/* Social Login Buttons */}
                    <View style={styles.socialButtons}>
                      <TouchableOpacity 
                        style={styles.socialButton}
                        onPress={() => handleSocialLogin('Google')}
                        activeOpacity={0.8}
                      >
                        <BlurView intensity={20} tint="light" style={styles.socialButtonBlur}>
                          <AntDesign name="google" size={20} color="#DB4437" />
                          <Text style={styles.socialButtonText}>Google</Text>
                        </BlurView>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.socialButton}
                        onPress={() => handleSocialLogin('Apple')}
                        activeOpacity={0.8}
                      >
                        <BlurView intensity={20} tint="light" style={styles.socialButtonBlur}>
                          <AntDesign name="apple1" size={20} color="#000" />
                          <Text style={styles.socialButtonText}>Apple</Text>
                        </BlurView>
                      </TouchableOpacity>
                    </View>

                    {/* Trust Indicators */}
                    <View style={styles.trustIndicators}>
                      <View style={styles.trustItem}>
                        <MaterialIcons name="security" size={16} color="#10b981" />
                        <Text style={styles.trustText}>256-bit SSL Encrypted</Text>
                      </View>
                      <View style={styles.trustItem}>
                        <MaterialIcons name="verified-user" size={16} color="#3b82f6" />
                        <Text style={styles.trustText}>Verified Platform</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </BlurView>
              </Animated.View>

              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <BlurView intensity={20} tint="light" style={styles.signUpBlur}>
                  <Text style={styles.signUpPrompt}>New to Zingr? </Text>
                  <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                    <LinearGradient
                      colors={['#ff6b6b', '#ee5a52']}
                      style={styles.signUpLinkGradient}
                    >
                      <Text style={styles.signUpLink}>Create Account</Text>
                      <Ionicons name="arrow-forward" size={14} color="white" />
                    </LinearGradient>
                  </TouchableOpacity>
                </BlurView>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    // paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  backButtonBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  logoContainer: {
    marginBottom: 24,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  logoSpark: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 2,
  },
  pulseRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ff6b6b',
    zIndex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 24,
  },
  formBlur: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  formGradient: {
    padding: 24,
    borderRadius: 24,
  },
  quickStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
    borderRadius: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: '#ff6b6b',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  inputGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1F2937',
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#ef4444',
    marginTop: 4,
    marginLeft: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  rememberText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },
  forgotButton: {
    padding: 4,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#ff6b6b',
  },
  loginButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  loadingDot1: {
    opacity: 0.4,
  },
  loadingDot2: {
    opacity: 0.6,
  },
  loadingDot3: {
    opacity: 0.8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  socialButtonBlur: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
  },
  trustIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },
  signUpContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  signUpPrompt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    marginRight: 4,
  },
  signUpLinkGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 4,
  },
  signUpLink: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  floatingElement: {
    position: 'absolute',
    zIndex: 1,
  },
  floatingElementInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});