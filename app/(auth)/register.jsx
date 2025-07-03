import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
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

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    phoneNumber: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [focusedField, setFocusedField] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const formSlide = useRef(new Animated.Value(100)).current;
  const heartPulse = useRef(new Animated.Value(1)).current;
  const stepProgressAnim = useRef(new Animated.Value(0)).current;
  const inputShake = useRef(new Animated.Value(0)).current;

  // Floating elements
  const floatingElements = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const totalSteps = 3;

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
            duration: 5000 + index * 800,
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
      setTimeout(() => animation.start(), index * 1200);
    });

    return () => {
      pulseAnimation.stop();
      elementAnimations.forEach(animation => animation.stop());
    };
  }, []);

  // Animate step progress
  useEffect(() => {
    Animated.timing(stepProgressAnim, {
      toValue: (currentStep - 1) / (totalSteps - 1),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
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

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        Alert.alert('Missing Information', 'Please fill in all required fields');
        shakeInput();
        return;
      }
      if (!validateEmail(formData.email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
        shakeInput();
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.password || !formData.confirmPassword) {
        Alert.alert('Missing Information', 'Please fill in all password fields');
        shakeInput();
        return;
      }
      if (!validatePassword(formData.password)) {
        Alert.alert('Weak Password', 'Password must be at least 8 characters with uppercase, lowercase, and numbers');
        shakeInput();
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Password Mismatch', 'Passwords do not match');
        shakeInput();
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = async () => {
    if (!agreeToTerms || !agreeToPrivacy) {
      Alert.alert('Agreement Required', 'Please agree to our Terms of Service and Privacy Policy');
      shakeInput();
      return;
    }

    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Registration Successful!',
        'Welcome to Zingr! Please check your email to verify your account.',
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/email-verification'),
          },
        ]
      );
    }, 2500);
  };

  const handleSocialRegister = (provider) => {
    Alert.alert('Social Registration', `Register with ${provider} - Feature coming soon!`);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                outputRange: [0, -180],
              }),
            },
            {
              rotate: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
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

  const renderInput = (field, placeholder, keyboardType = 'default', secureTextEntry = false, icon) => {
    const isFocused = focusedField === field;
    const value = formData[field];
    const hasError = field === 'email' && value.length > 0 && !validateEmail(value) ||
                     field === 'phoneNumber' && value.length > 0 && !validatePhone(value) ||
                     field === 'password' && value.length > 0 && !validatePassword(value) ||
                     field === 'confirmPassword' && value.length > 0 && value !== formData.password;

    return (
      <View style={styles.inputGroup}>
        <View style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          hasError && styles.inputError
        ]}>
          <LinearGradient
            colors={isFocused 
              ? ['rgba(255, 107, 107, 0.08)', 'rgba(238, 90, 82, 0.04)']
              : ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']
            }
            style={styles.inputGradient}
          >
            <View style={styles.inputIcon}>
              <Ionicons 
                name={icon} 
                size={20} 
                color={isFocused ? "#ff6b6b" : "#9CA3AF"} 
              />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={(text) => updateFormData(field, text)}
              keyboardType={keyboardType}
              autoCapitalize={field === 'email' ? 'none' : 'words'}
              autoCorrect={false}
              secureTextEntry={secureTextEntry}
              onFocus={() => setFocusedField(field)}
              onBlur={() => setFocusedField('')}
            />
            {field === 'password' && (
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
            )}
            {field === 'confirmPassword' && (
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#9CA3AF" 
                />
              </TouchableOpacity>
            )}
            {value.length > 0 && !hasError && field !== 'password' && field !== 'confirmPassword' && (
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
            )}
          </LinearGradient>
        </View>
        {hasError && (
          <Text style={styles.errorText}>
            {field === 'email' && 'Please enter a valid email address'}
            {field === 'phoneNumber' && 'Please enter a valid phone number'}
            {field === 'password' && 'Password must be at least 8 characters with uppercase, lowercase, and numbers'}
            {field === 'confirmPassword' && 'Passwords do not match'}
          </Text>
        )}
      </View>
    );
  };

  const renderStep1 = () => (
    <View>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepSubtitle}>Let's start with the basics</Text>
      
      {renderInput('firstName', 'First Name *', 'default', false, 'person-outline')}
      {renderInput('lastName', 'Last Name *', 'default', false, 'person-outline')}
      {renderInput('email', 'Email Address *', 'email-address', false, 'mail-outline')}
      {renderInput('phoneNumber', 'Phone Number (Optional)', 'phone-pad', false, 'call-outline')}
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text style={styles.stepTitle}>Create Password</Text>
      <Text style={styles.stepSubtitle}>Make it strong and secure</Text>
      
      {renderInput('password', 'Password *', 'default', !showPassword, 'lock-closed-outline')}
      
      {formData.password.length > 0 && (
        <View style={styles.passwordStrength}>
          <Text style={styles.strengthLabel}>Password Strength:</Text>
          <View style={styles.strengthBar}>
            {[1, 2, 3, 4, 5].map((level) => (
              <View
                key={level}
                style={[
                  styles.strengthSegment,
                  getPasswordStrength(formData.password) >= level && {
                    backgroundColor: 
                      getPasswordStrength(formData.password) <= 2 ? '#ef4444' :
                      getPasswordStrength(formData.password) <= 3 ? '#f59e0b' : '#10b981'
                  }
                ]}
              />
            ))}
          </View>
          <Text style={styles.strengthText}>
            {getPasswordStrength(formData.password) <= 2 ? 'Weak' :
             getPasswordStrength(formData.password) <= 3 ? 'Medium' : 'Strong'}
          </Text>
        </View>
      )}
      
      {renderInput('confirmPassword', 'Confirm Password *', 'default', !showConfirmPassword, 'lock-closed-outline')}
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text style={styles.stepTitle}>Almost Done!</Text>
      <Text style={styles.stepSubtitle}>Just a few more details</Text>
      
      {renderInput('dateOfBirth', 'Date of Birth (MM/DD/YYYY)', 'numeric', false, 'calendar-outline')}
      
      <View style={styles.agreementSection}>
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, agreeToTerms && styles.checkboxActive]}>
            {agreeToTerms && (
              <Ionicons name="checkmark" size={14} color="white" />
            )}
          </View>
          <Text style={styles.checkboxText}>
            I agree to the <Text style={styles.linkText}>Terms of Service</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => setAgreeToPrivacy(!agreeToPrivacy)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, agreeToPrivacy && styles.checkboxActive]}>
            {agreeToPrivacy && (
              <Ionicons name="checkmark" size={14} color="white" />
            )}
          </View>
          <Text style={styles.checkboxText}>
            I agree to the <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.benefitsSection}>
        <Text style={styles.benefitsTitle}>What you'll get:</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Ionicons name="heart" size={16} color="#ff6b6b" />
            <Text style={styles.benefitText}>Smart matching algorithm</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="shield-checkmark" size={16} color="#10b981" />
            <Text style={styles.benefitText}>Verified profiles</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="chatbubbles" size={16} color="#8b5cf6" />
            <Text style={styles.benefitText}>Unlimited messaging</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf2f8' }}>
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3', '#fbcfe8']}
        style={{ flex: 1 }}
      >
        {/* Floating Elements */}
        {renderFloatingElement(floatingElements[0], width * 0.1, height * 0.1, 'heart', '#ff6b6b', 18)}
        {renderFloatingElement(floatingElements[1], width * 0.85, height * 0.15, 'star', '#fbbf24', 16)}
        {renderFloatingElement(floatingElements[2], width * 0.15, height * 0.3, 'flash', '#8b5cf6', 20)}
        {renderFloatingElement(floatingElements[3], width * 0.8, height * 0.35, 'diamond', '#ec4899', 14)}
        {renderFloatingElement(floatingElements[4], width * 0.5, height * 0.2, 'sparkles', '#10b981', 16)}

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={currentStep === 1 ? () => router.back() : handlePrevious}
            activeOpacity={0.8}
          >
            <BlurView intensity={30} tint="light" style={styles.backButtonBlur}>
              <Ionicons name="arrow-back" size={24} color="#6B7280" />
            </BlurView>
          </TouchableOpacity>
          
          <BlurView intensity={20} tint="light" style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Step {currentStep} of {totalSteps}</Text>
          </BlurView>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: stepProgressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            >
              <LinearGradient
                colors={['#ff6b6b', '#ee5a52']}
                style={styles.progressGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>
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
              {currentStep === 1 && (
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
                      <AntDesign name="heart" size={28} color="white" />
                      <View style={styles.logoSpark}>
                        <Ionicons name="flash" size={10} color="#fbbf24" />
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

                  <Text style={styles.welcomeTitle}>Join Zingr</Text>
                  <Text style={styles.welcomeSubtitle}>Find your perfect match today ✨</Text>
                </View>
              )}

              {/* Registration Form */}
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
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}

                    {/* Navigation Buttons */}
                    <View style={styles.buttonContainer}>
                      {currentStep < totalSteps ? (
                        <TouchableOpacity
                          style={styles.nextButton}
                          onPress={handleNext}
                          activeOpacity={0.9}
                        >
                          <LinearGradient
                            colors={['#ff6b6b', '#ee5a52']}
                            style={styles.nextGradient}
                          >
                            <Text style={styles.nextText}>Continue</Text>
                            <Ionicons name="arrow-forward" size={20} color="white" />
                          </LinearGradient>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={[styles.registerButton, (!agreeToTerms || !agreeToPrivacy) && styles.buttonDisabled]}
                          onPress={handleRegister}
                          disabled={isLoading || !agreeToTerms || !agreeToPrivacy}
                          activeOpacity={0.9}
                        >
                          <LinearGradient
                            colors={['#ff6b6b', '#ee5a52']}
                            style={styles.registerGradient}
                          >
                            {isLoading ? (
                              <View style={styles.loadingContainer}>
                                <Animated.View style={[styles.loadingDot, styles.loadingDot1]} />
                                <Animated.View style={[styles.loadingDot, styles.loadingDot2]} />
                                <Animated.View style={[styles.loadingDot, styles.loadingDot3]} />
                              </View>
                            ) : (
                              <>
                                <Ionicons name="heart" size={20} color="white" />
                                <Text style={styles.registerText}>Create Account</Text>
                                <Ionicons name="sparkles" size={16} color="white" />
                              </>
                            )}
                          </LinearGradient>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Social Registration (only on step 1) */}
                    {currentStep === 1 && (
                      <>
                        <View style={styles.divider}>
                          <View style={styles.dividerLine} />
                          <Text style={styles.dividerText}>or sign up with</Text>
                          <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.socialButtons}>
                          <TouchableOpacity 
                            style={styles.socialButton}
                            onPress={() => handleSocialRegister('Google')}
                            activeOpacity={0.8}
                          >
                            <BlurView intensity={20} tint="light" style={styles.socialButtonBlur}>
                              <AntDesign name="google" size={20} color="#DB4437" />
                              <Text style={styles.socialButtonText}>Google</Text>
                            </BlurView>
                          </TouchableOpacity>
                          
                          <TouchableOpacity 
                            style={styles.socialButton}
                            onPress={() => handleSocialRegister('Apple')}
                            activeOpacity={0.8}
                          >
                            <BlurView intensity={20} tint="light" style={styles.socialButtonBlur}>
                              <AntDesign name="apple1" size={20} color="#000" />
                              <Text style={styles.socialButtonText}>Apple</Text>
                            </BlurView>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </LinearGradient>
                </BlurView>
              </Animated.View>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <BlurView intensity={20} tint="light" style={styles.loginBlur}>
                  <Text style={styles.loginPrompt}>Already have an account? </Text>
                  <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
                    <LinearGradient
                      colors={['#ff6b6b', '#ee5a52']}
                      style={styles.loginLinkGradient}
                    >
                      <Text style={styles.loginLink}>Sign In</Text>
                      <Ionicons name="log-in" size={14} color="white" />
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

export default Register;

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
    paddingBottom: 16,
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
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressGradient: {
    flex: 1,
    borderRadius: 2,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 16,
  },
  logoContainer: {
    marginBottom: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  logoSpark: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 2,
  },
  pulseRing: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
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
    marginBottom: 20,
  },
  formBlur: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  formGradient: {
    padding: 24,
    borderRadius: 24,
  },
  stepTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
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
  passwordStrength: {
    marginBottom: 16,
  },
  strengthLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  strengthBar: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  agreementSection: {
    marginTop: 16,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#374151',
    flex: 1,
  },
  linkText: {
    color: '#ff6b6b',
    fontFamily: 'Poppins-Medium',
  },
  benefitsSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
    borderRadius: 16,
  },
  benefitsTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#374151',
  },
  buttonContainer: {
    marginTop: 24,
  },
  nextButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  nextGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  nextText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  registerButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  registerGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  registerText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  buttonDisabled: {
    opacity: 0.6,
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
    marginVertical: 20,
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
  loginContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  loginPrompt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    marginRight: 4,
  },
  loginLinkGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 4,
  },
  loginLink: {
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