import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email] = useState("alex@example.com"); // This would come from navigation params

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const successScale = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;
  const heartPulse = useRef(new Animated.Value(1)).current;
  const codeShake = useRef(new Animated.Value(0)).current;

  // Input refs for focus management
  const inputRefs = useRef([]);

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
      elementAnimations.forEach((animation) => animation.stop());
    };
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    let timer;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(codeShake, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(codeShake, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(codeShake, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(codeShake, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const successAnimation = () => {
    // Success scale animation
    Animated.spring(successScale, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Confetti animation
    Animated.timing(confettiAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const handleCodeChange = (text, index) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newCode.every((digit) => digit !== "") && !isLoading) {
      handleVerify(newCode);
    }
  };

  const handleKeyPress = (e, index) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      !verificationCode[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code = verificationCode) => {
    if (code.some((digit) => digit === "")) {
      Alert.alert("Incomplete Code", "Please enter all 6 digits");
      shakeAnimation();
      return;
    }

    setIsLoading(true);

    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false);
      const enteredCode = code.join("");

      // For demo purposes, accept any code that ends with '123'
      if (enteredCode.endsWith("123") || enteredCode === "123456") {
        setIsVerified(true);
        successAnimation();

        setTimeout(() => {
          Alert.alert(
            "Email Verified! 🎉",
            "Your email has been successfully verified. Welcome to Zingr!",
            [
              {
                text: "Continue",
                onPress: () => router.replace("/(tabs)/home"),
              },
            ]
          );
        }, 2000);
      } else {
        Alert.alert(
          "Invalid Code",
          "The verification code is incorrect. Please try again."
        );
        setVerificationCode(["", "", "", "", "", ""]);
        shakeAnimation();
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsResending(true);
    setCanResend(false);
    setCountdown(60);

    // Simulate resend process
    setTimeout(() => {
      setIsResending(false);
      Alert.alert(
        "Code Sent!",
        "A new verification code has been sent to your email."
      );
    }, 1000);
  };

  const handleEditEmail = () => {
    Alert.alert(
      "Edit Email Address",
      "Would you like to use a different email address?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Change Email", onPress: () => router.back() },
      ]
    );
  };

  const renderFloatingElement = (
    animValue,
    startX,
    startY,
    icon,
    color,
    size = 20
  ) => (
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
                outputRange: ["0deg", "180deg"],
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

  const renderConfetti = () => {
    const confettiPieces = Array.from({ length: 20 }, (_, i) => (
      <Animated.View
        key={i}
        style={[
          styles.confettiPiece,
          {
            left: Math.random() * width,
            backgroundColor: [
              "#ff6b6b",
              "#fbbf24",
              "#10b981",
              "#8b5cf6",
              "#ec4899",
            ][Math.floor(Math.random() * 5)],
            transform: [
              {
                translateY: confettiAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, height + 100],
                }),
              },
              {
                rotate: confettiAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "720deg"],
                }),
              },
            ],
            opacity: confettiAnim.interpolate({
              inputRange: [0, 0.1, 0.9, 1],
              outputRange: [0, 1, 1, 0],
            }),
          },
        ]}
      />
    ));

    return <View style={styles.confettiContainer}>{confettiPieces}</View>;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdf2f8" }}>
      <LinearGradient
        colors={["#fdf2f8", "#fce7f3", "#fbcfe8"]}
        style={{ flex: 1 }}
      >
        {/* Floating Elements */}
        {renderFloatingElement(
          floatingElements[0],
          width * 0.1,
          height * 0.15,
          "mail",
          "#ff6b6b",
          18
        )}
        {renderFloatingElement(
          floatingElements[1],
          width * 0.85,
          height * 0.25,
          "checkmark-circle",
          "#10b981",
          20
        )}
        {renderFloatingElement(
          floatingElements[2],
          width * 0.15,
          height * 0.4,
          "shield-checkmark",
          "#8b5cf6",
          16
        )}
        {renderFloatingElement(
          floatingElements[3],
          width * 0.8,
          height * 0.5,
          "star",
          "#fbbf24",
          14
        )}

        {/* Confetti for success */}
        {isVerified && renderConfetti()}

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
            <Text style={styles.headerTitle}>Email Verification</Text>
          </BlurView>
        </View>

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
                  transform: [{ scale: logoScale }, { scale: heartPulse }],
                },
              ]}
            >
              {isVerified ? (
                <Animated.View
                  style={[
                    styles.successIcon,
                    {
                      transform: [{ scale: successScale }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["#10b981", "#059669"]}
                    style={styles.successCircle}
                  >
                    <MaterialIcons name="verified" size={40} color="white" />
                  </LinearGradient>
                </Animated.View>
              ) : (
                <LinearGradient
                  colors={["#ff6b6b", "#ee5a52"]}
                  style={styles.logoCircle}
                >
                  <Ionicons name="mail" size={32} color="white" />
                  <View style={styles.logoSpark}>
                    <Ionicons name="flash" size={12} color="#fbbf24" />
                  </View>
                </LinearGradient>
              )}

              {/* Pulse rings */}
              {!isVerified && (
                <Animated.View
                  style={[
                    styles.pulseRing,
                    {
                      transform: [{ scale: heartPulse }],
                      opacity: heartPulse.interpolate({
                        inputRange: [1, 1.05],
                        outputRange: [0.4, 0],
                      }),
                    },
                  ]}
                />
              )}
            </Animated.View>

            <Text style={styles.title}>
              {isVerified ? "Email Verified! 🎉" : "Check Your Email"}
            </Text>
            <Text style={styles.subtitle}>
              {isVerified
                ? "Welcome to Zingr! Your account is now verified and ready to use."
                : `We've sent a 6-digit verification code to:`}
            </Text>

            {!isVerified && (
              <View style={styles.emailContainer}>
                <BlurView intensity={20} tint="light" style={styles.emailBlur}>
                  <Text style={styles.emailText}>{email}</Text>
                  <TouchableOpacity
                    onPress={handleEditEmail}
                    style={styles.editButton}
                  >
                    <Ionicons name="pencil" size={16} color="#ff6b6b" />
                  </TouchableOpacity>
                </BlurView>
              </View>
            )}
          </View>

          {!isVerified && (
            <View style={styles.verificationSection}>
              {/* Code Input - Direct without blur container */}
              <Text style={styles.codeLabel}>Enter Verification Code</Text>

              {/* Code Input */}
              <Animated.View
                style={[
                  styles.codeContainer,
                  {
                    transform: [{ translateX: codeShake }],
                  },
                ]}
              >
                {verificationCode.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={[styles.codeInput, digit && styles.codeInputFilled]}
                    value={digit}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    selectTextOnFocus
                    textAlign="center"
                  />
                ))}
              </Animated.View>

              {/* Hint in a separate container */}
              <View style={styles.hintContainer}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="#6B7280"
                />
                <Text style={styles.hintText}>
                  Hint: Try ending your code with "123" (e.g., 654123)
                </Text>
              </View>

              {/* Form container for button and other elements */}
              <BlurView
                intensity={40}
                tint="light"
                style={styles.verificationBlur}
              >
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.95)",
                    "rgba(255, 255, 255, 0.9)",
                  ]}
                  style={styles.verificationContainer}
                >
                  {/* Verify Button */}
                  <TouchableOpacity
                    style={[
                      styles.verifyButton,
                      isLoading && styles.buttonDisabled,
                    ]}
                    onPress={() => handleVerify()}
                    disabled={isLoading}
                    activeOpacity={0.9}
                  >
                    <LinearGradient
                      colors={["#ff6b6b", "#ee5a52"]}
                      style={styles.verifyGradient}
                    >
                      {isLoading ? (
                        <View style={styles.loadingContainer}>
                          <Animated.View
                            style={[styles.loadingDot, styles.loadingDot1]}
                          />
                          <Animated.View
                            style={[styles.loadingDot, styles.loadingDot2]}
                          />
                          <Animated.View
                            style={[styles.loadingDot, styles.loadingDot3]}
                          />
                        </View>
                      ) : (
                        <>
                          <Ionicons name="checkmark" size={20} color="white" />
                          <Text style={styles.verifyText}>Verify Email</Text>
                        </>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Resend Code */}
                  <View style={styles.resendSection}>
                    <Text style={styles.resendPrompt}>
                      Didn't receive the code?
                    </Text>
                    <TouchableOpacity
                      onPress={handleResendCode}
                      disabled={!canResend || isResending}
                      style={styles.resendButton}
                      activeOpacity={0.7}
                    >
                      {isResending ? (
                        <Text style={styles.resendingText}>Sending...</Text>
                      ) : canResend ? (
                        <Text style={styles.resendText}>Resend Code</Text>
                      ) : (
                        <Text style={styles.countdownText}>
                          Resend in {countdown}s
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Help Section */}
                  <View style={styles.helpSection}>
                    <View style={styles.helpItem}>
                      <Ionicons name="time-outline" size={16} color="#9CA3AF" />
                      <Text style={styles.helpText}>
                        Code expires in 10 minutes
                      </Text>
                    </View>
                    <View style={styles.helpItem}>
                      <Ionicons
                        name="shield-checkmark-outline"
                        size={16}
                        color="#9CA3AF"
                      />
                      <Text style={styles.helpText}>
                        Check spam folder if needed
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </BlurView>
            </View>
          )}

          {/* Success Actions */}
          {isVerified && (
            <Animated.View
              style={[
                styles.successActions,
                {
                  transform: [{ scale: successScale }],
                  opacity: successScale,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => router.replace("/(tabs)/home")}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={["#10b981", "#059669"]}
                  style={styles.continueGradient}
                >
                  <Ionicons name="heart" size={20} color="white" />
                  <Text style={styles.continueText}>Start Dating!</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    // paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },
  backButtonBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1F2937",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  successIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logoSpark: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 2,
  },
  pulseRing: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ff6b6b",
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
  },
  emailContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  emailBlur: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  emailText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1F2937",
    marginRight: 8,
  },
  editButton: {
    padding: 4,
  },
  verificationSection: {
    marginBottom: 32,
  },
  verificationBlur: {
    borderRadius: 24,
    overflow: "hidden",
  },
  verificationContainer: {
    padding: 24,
    borderRadius: 24,
  },
  codeLabel: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 24,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  codeInputWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
  codeInputGradient: {
    borderRadius: 12,
  },
  codeInput: {
    width: 45,
    height: 55,
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  hintContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 12,
  },
  hintText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#3B82F6",
    marginLeft: 6,
    textAlign: "center",
  },
  verifyButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  verifyGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  verifyText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
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
  resendSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  resendPrompt: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    marginBottom: 8,
  },
  resendButton: {
    padding: 8,
  },
  resendText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#ff6b6b",
  },
  resendingText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
  },
  countdownText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
  },
  helpSection: {
    gap: 8,
  },
  helpItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  helpText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
  },
  successActions: {
    alignItems: "center",
  },
  continueButton: {
    borderRadius: 20,
    overflow: "hidden",
    minWidth: 200,
  },
  continueGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  continueText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    pointerEvents: "none",
  },
  confettiPiece: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  floatingElement: {
    position: "absolute",
    zIndex: 1,
  },
  floatingElementInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
