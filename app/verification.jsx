import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

const verificationSteps = [
  {
    id: 1,
    title: "Take a Photo",
    description: "Take a clear photo of your face",
    icon: "camera",
    status: "pending", // pending, in-progress, completed, failed
    instructions: "Hold your phone at arm's length and look directly at the camera",
  },
  {
    id: 2,
    title: "Facial Recognition",
    description: "We'll verify it matches your profile",
    icon: "scan",
    status: "pending",
    instructions: "Our AI will compare your verification photo with your profile photos",
  },
  {
    id: 3,
    title: "Manual Review",
    description: "Final review by our team",
    icon: "shield-checkmark",
    status: "pending",
    instructions: "Our safety team will manually review your verification",
  },
];

const verificationPoses = [
  {
    id: 1,
    title: "Look Straight",
    description: "Face the camera directly",
    image: "👨‍💼", // In real app, use actual image
    completed: false,
  },
  {
    id: 2,
    title: "Smile",
    description: "Show a natural smile",
    image: "😊",
    completed: false,
  },
  {
    id: 3,
    title: "Turn Right",
    description: "Turn your head slightly right",
    image: "👤",
    completed: false,
  },
];

const Verification = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState("not-started"); // not-started, in-progress, pending, verified, failed
  const [currentPose, setCurrentPose] = useState(0);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const stepAnim = useRef(new Animated.Value(0)).current;
  const verifiedAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
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
    ]).start();

    // Pulse animation for verification badge
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const startVerification = () => {
    setVerificationStatus("in-progress");
    setCurrentStep(0);
    
    Animated.timing(stepAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const takePhoto = () => {
    // Simulate photo capture
    Alert.alert(
      "Photo Capture",
      "In a real app, this would open the camera",
      [
        { text: "Cancel" },
        { text: "Simulate Success", onPress: () => handlePhotoSuccess() },
      ]
    );
  };

  const handlePhotoSuccess = () => {
    const newPhotos = [...capturedPhotos];
    newPhotos[currentPose] = `photo_${currentPose + 1}`;
    setCapturedPhotos(newPhotos);
    
    const newPoses = [...verificationPoses];
    newPoses[currentPose].completed = true;
    
    if (currentPose < verificationPoses.length - 1) {
      setCurrentPose(currentPose + 1);
    } else {
      // All photos captured, start processing
      processVerification();
    }
  };

  const processVerification = () => {
    setVerificationStatus("pending");
    
    // Simulate processing
    setTimeout(() => {
      setVerificationStatus("verified");
      
      Animated.sequence([
        Animated.timing(verifiedAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(verifiedAnim, {
          toValue: 1.1,
          useNativeDriver: true,
        }),
        Animated.spring(verifiedAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);
  };

  const renderStepIndicator = (step, index) => {
    const isActive = index === currentStep;
    const isCompleted = verificationStatus === "verified" || 
                       (verificationStatus === "pending" && index <= 2);

    return (
      <View key={step.id} style={styles.stepIndicator}>
        <View style={styles.stepLine}>
          <LinearGradient
            colors={isCompleted ? ['#10b981', '#059669'] : ['#E5E7EB', '#E5E7EB']}
            style={[
              styles.stepLineGradient,
              index === 0 && { borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
              index === verificationSteps.length - 1 && { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
            ]}
          />
        </View>
        
        <LinearGradient
          colors={isCompleted 
            ? ['#10b981', '#059669'] 
            : isActive 
            ? ['#ff6b6b', '#ee5a52']
            : ['#E5E7EB', '#D1D5DB']
          }
          style={styles.stepCircle}
        >
          {isCompleted ? (
            <Ionicons name="checkmark" size={16} color="white" />
          ) : (
            <Text className="font-poppins-bold text-white text-sm">{step.id}</Text>
          )}
        </LinearGradient>
      </View>
    );
  };

  const renderVerificationStep = (step, index) => (
    <View key={step.id} style={styles.verificationStep}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.stepContainer}
      >
        <LinearGradient
          colors={step.status === "completed" 
            ? ['#10b981', '#059669']
            : step.status === "in-progress"
            ? ['#ff6b6b', '#ee5a52']
            : ['#9CA3AF', '#6B7280']
          }
          style={styles.stepIcon}
        >
          <Ionicons 
            name={step.status === "completed" ? "checkmark" : step.icon} 
            size={24} 
            color="white" 
          />
        </LinearGradient>
        
        <View style={styles.stepContent}>
          <Text className="font-poppins-semibold text-gray-900 text-lg mb-1">
            {step.title}
          </Text>
          <Text className="font-poppins text-gray-600 text-sm mb-2">
            {step.description}
          </Text>
          <Text className="font-poppins text-gray-500 text-xs">
            {step.instructions}
          </Text>
        </View>
        
        {step.status === "completed" && (
          <LinearGradient
            colors={['#dcfce7', '#bbf7d0']}
            style={styles.completedBadge}
          >
            <Text className="font-poppins-bold text-green-700 text-xs">DONE</Text>
          </LinearGradient>
        )}
      </LinearGradient>
    </View>
  );

  const renderPoseCard = (pose, index) => {
    const isActive = index === currentPose && verificationStatus === "in-progress";
    const isCompleted = pose.completed;

    return (
      <View key={pose.id} style={styles.poseCard}>
        <LinearGradient
          colors={isCompleted 
            ? ['rgba(16, 185, 129, 0.1)', 'rgba(5, 150, 105, 0.1)']
            : isActive
            ? ['rgba(255, 107, 107, 0.1)', 'rgba(238, 90, 82, 0.1)']
            : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']
          }
          style={[
            styles.poseContainer,
            isActive && { borderWidth: 2, borderColor: '#ff6b6b' },
            isCompleted && { borderWidth: 2, borderColor: '#10b981' },
          ]}
        >
          <View style={styles.poseImageContainer}>
            <Text style={styles.poseEmoji}>{pose.image}</Text>
            {isCompleted && (
              <View style={styles.poseCheckmark}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.checkmarkCircle}
                >
                  <Ionicons name="checkmark" size={12} color="white" />
                </LinearGradient>
              </View>
            )}
          </View>
          
          <Text className="font-poppins-semibold text-gray-900 text-sm mb-1">
            {pose.title}
          </Text>
          <Text className="font-poppins text-gray-600 text-xs text-center">
            {pose.description}
          </Text>
        </LinearGradient>
      </View>
    );
  };

  if (verificationStatus === "verified") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf2f8' }}>
        <LinearGradient
          colors={['#fdf2f8', '#fce7f3', '#fbcfe8']}
          style={{ flex: 1 }}
        >
          <View style={styles.successContainer}>
            <Animated.View
              style={{
                opacity: verifiedAnim,
                transform: [{ scale: verifiedAnim }],
              }}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
                style={styles.successCard}
              >
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.successIcon}
                  >
                    <MaterialIcons name="verified" size={48} color="white" />
                  </LinearGradient>
                </Animated.View>
                
                <Text className="font-poppins-bold text-2xl text-gray-900 text-center mb-4">
                  Verification Complete!
                </Text>
                <Text className="font-poppins text-gray-600 text-center text-base leading-6 mb-8">
                  Congratulations! Your profile is now verified. This helps build trust and increases your chances of meaningful connections.
                </Text>
                
                <View style={styles.benefitsContainer}>
                  <View style={styles.benefitItem}>
                    <LinearGradient
                      colors={['#dbeafe', '#bfdbfe']}
                      style={styles.benefitIcon}
                    >
                      <Ionicons name="shield-checkmark" size={20} color="#3B82F6" />
                    </LinearGradient>
                    <Text className="font-poppins-medium text-gray-900 text-sm">Verified Badge</Text>
                  </View>
                  
                  <View style={styles.benefitItem}>
                    <LinearGradient
                      colors={['#dcfce7', '#bbf7d0']}
                      style={styles.benefitIcon}
                    >
                      <Ionicons name="trending-up" size={20} color="#10B981" />
                    </LinearGradient>
                    <Text className="font-poppins-medium text-gray-900 text-sm">More Matches</Text>
                  </View>
                  
                  <View style={styles.benefitItem}>
                    <LinearGradient
                      colors={['#fce7f3', '#fbcfe8']}
                      style={styles.benefitIcon}
                    >
                      <Ionicons name="heart" size={20} color="#E11D48" />
                    </LinearGradient>
                    <Text className="font-poppins-medium text-gray-900 text-sm">Trust Score</Text>
                  </View>
                </View>
                
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => Alert.alert("Done", "Navigate back to profile")}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#ff6b6b', '#ee5a52']}
                    style={styles.doneButtonGradient}
                  >
                    <Text className="font-poppins-bold text-white text-lg">Done</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          </View>
        </LinearGradient>
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf2f8' }}>
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3', '#fbcfe8']}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
          style={styles.header}
        >
          <View className="flex-row justify-between items-center px-6 py-4">
            <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#6B7280" />
            </TouchableOpacity>
            
            <View className="items-center">
              <View style={styles.headerTitle}>
                <LinearGradient
                  colors={['#3B82F6', '#2563EB']}
                  style={styles.verificationIcon}
                >
                  <MaterialIcons name="verified" size={20} color="white" />
                </LinearGradient>
                <Text className="font-poppins-bold text-xl text-gray-900 ml-2">Verification</Text>
              </View>
              <Text className="font-poppins text-sm text-gray-500">Get your blue checkmark</Text>
            </View>
            
            <TouchableOpacity style={styles.headerButton}>
              <Feather name="help-circle" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {verificationStatus === "not-started" && (
              <>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                    style={styles.heroContainer}
                  >
                    <LinearGradient
                      colors={['#3B82F6', '#2563EB']}
                      style={styles.heroIcon}
                    >
                      <MaterialIcons name="verified" size={32} color="white" />
                    </LinearGradient>
                    
                    <Text className="font-poppins-bold text-2xl text-gray-900 text-center mb-4">
                      Get Verified
                    </Text>
                    <Text className="font-poppins text-gray-600 text-center text-base leading-6 mb-6">
                      Stand out with a verified badge and increase your matches by showing you're a real person
                    </Text>
                    
                    <View style={styles.statsRow}>
                      <View style={styles.statItem}>
                        <Text className="font-poppins-bold text-2xl text-blue-600">2x</Text>
                        <Text className="font-poppins text-gray-600 text-sm">More Trust</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text className="font-poppins-bold text-2xl text-blue-600">3x</Text>
                        <Text className="font-poppins text-gray-600 text-sm">More Matches</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text className="font-poppins-bold text-2xl text-blue-600">5x</Text>
                        <Text className="font-poppins text-gray-600 text-sm">Profile Views</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>

                {/* Process Steps */}
                <View style={styles.processSection}>
                  <Text className="font-poppins-bold text-xl text-gray-900 text-center mb-6">
                    How It Works
                  </Text>
                  
                  {/* Step Indicators */}
                  <View style={styles.stepIndicators}>
                    {verificationSteps.map((step, index) => renderStepIndicator(step, index))}
                  </View>
                  
                  {/* Step Details */}
                  <View style={styles.stepsContainer}>
                    {verificationSteps.map((step, index) => renderVerificationStep(step, index))}
                  </View>
                </View>

                {/* Start Button */}
                <View style={styles.startSection}>
                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={startVerification}
                    activeOpacity={0.9}
                  >
                    <LinearGradient
                      colors={['#ff6b6b', '#ee5a52']}
                      style={styles.startButtonGradient}
                    >
                      <MaterialIcons name="verified" size={20} color="white" />
                      <Text className="font-poppins-bold text-white text-lg ml-2">
                        Start Verification
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <Text className="font-poppins text-gray-500 text-center text-sm mt-4">
                    Takes about 2-3 minutes • Free • Secure
                  </Text>
                </View>
              </>
            )}

            {verificationStatus === "in-progress" && (
              <>
                {/* Photo Capture Section */}
                <View style={styles.captureSection}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                    style={styles.captureContainer}
                  >
                    <Text className="font-poppins-bold text-xl text-gray-900 text-center mb-2">
                      Photo Verification
                    </Text>
                    <Text className="font-poppins text-gray-600 text-center text-sm mb-6">
                      Follow the poses below to verify your identity
                    </Text>
                    
                    {/* Current Pose */}
                    <View style={styles.currentPoseContainer}>
                      <LinearGradient
                        colors={['#ff6b6b', '#ee5a52']}
                        style={styles.currentPoseCircle}
                      >
                        <Text style={styles.currentPoseEmoji}>
                          {verificationPoses[currentPose]?.image}
                        </Text>
                      </LinearGradient>
                      
                      <Text className="font-poppins-bold text-xl text-gray-900 mt-4 mb-2">
                        {verificationPoses[currentPose]?.title}
                      </Text>
                      <Text className="font-poppins text-gray-600 text-center">
                        {verificationPoses[currentPose]?.description}
                      </Text>
                    </View>
                    
                    {/* Pose Progress */}
                    <View style={styles.posesGrid}>
                      {verificationPoses.map((pose, index) => renderPoseCard(pose, index))}
                    </View>
                    
                    {/* Capture Button */}
                    <TouchableOpacity
                      style={styles.captureButton}
                      onPress={takePhoto}
                      activeOpacity={0.9}
                    >
                      <LinearGradient
                        colors={['#ff6b6b', '#ee5a52']}
                        style={styles.captureButtonGradient}
                      >
                        <Feather name="camera" size={20} color="white" />
                        <Text className="font-poppins-bold text-white text-lg ml-2">
                          Take Photo
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </>
            )}

            {verificationStatus === "pending" && (
              <View style={styles.pendingSection}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                  style={styles.pendingContainer}
                >
                  <View style={styles.loadingContainer}>
                    <View style={styles.loadingSpinner} />
                  </View>
                  
                  <Text className="font-poppins-bold text-xl text-gray-900 text-center mb-4">
                    Processing Verification
                  </Text>
                  <Text className="font-poppins text-gray-600 text-center text-base leading-6">
                    We're reviewing your photos. This usually takes 2-3 minutes. You'll receive a notification when it's complete.
                  </Text>
                </LinearGradient>
              </View>
            )}

          </Animated.View>
        </ScrollView>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    padding: 20,
    paddingTop: 32,
  },
  heroContainer: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  processSection: {
    padding: 20,
  },
  stepIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  stepIndicator: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepLine: {
    position: 'absolute',
    top: 15,
    left: '50%',
    right: '-50%',
    height: 4,
    zIndex: 0,
  },
  stepLineGradient: {
    flex: 1,
    height: '100%',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepsContainer: {
    gap: 16,
  },
  verificationStep: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  completedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  startSection: {
    padding: 20,
  },
  startButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  captureSection: {
    padding: 20,
    paddingTop: 32,
  },
  captureContainer: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  currentPoseContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  currentPoseCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentPoseEmoji: {
    fontSize: 48,
  },
  posesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  poseCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  poseContainer: {
    width: 80,
    height: 100,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poseImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  poseEmoji: {
    fontSize: 32,
  },
  poseCheckmark: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  checkmarkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  captureButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  pendingSection: {
    padding: 20,
    paddingTop: 80,
  },
  pendingContainer: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  loadingContainer: {
    marginBottom: 24,
  },
  loadingSpinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderTopColor: '#ff6b6b',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  successCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  benefitItem: {
    alignItems: 'center',
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  doneButton: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  doneButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
});