import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

// Enhanced dating app user data with more realistic profiles
const datingProfiles = [
  {
    id: 1,
    name: "Emma",
    age: 24,
    bio: "Adventure seeker & coffee lover ☕",
    subtitle: "Lives life to the fullest ✨",
    distance: "2.3 km away",
    images: [
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    ],
    interests: ["Travel", "Coffee", "Hiking", "Photography"],
    verified: true,
    education: "NYU Graduate",
    job: "UX Designer",
    height: "5'6\"",
    lastActive: "2 hours ago",
    profileScore: 98,
    zodiac: "Gemini",
    drinking: "Socially",
    smoking: "Never",
  },
  {
    id: 2,
    name: "Liam",
    age: 27,
    bio: "Photographer capturing life's moments 📸",
    subtitle: "Art is my passion 🎨",
    distance: "1.8 km away",
    images: [
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    ],
    interests: ["Photography", "Art", "Music", "Travel"],
    verified: false,
    education: "Art Institute",
    job: "Freelance Photographer",
    height: "6'1\"",
    lastActive: "30 minutes ago",
    profileScore: 85,
    zodiac: "Leo",
    drinking: "Rarely",
    smoking: "Never",
  },
  {
    id: 3,
    name: "Sophia",
    age: 23,
    bio: "Dancing through life with rhythm & grace 💃",
    subtitle: "Music moves my soul 🎵",
    distance: "3.1 km away",
    images: [
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
      "https://images.pexels.com/photos/1878522/pexels-photo-1878522.jpeg",
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    ],
    interests: ["Dancing", "Music", "Fitness", "Yoga"],
    verified: true,
    education: "Dance Academy",
    job: "Dance Instructor",
    height: "5'4\"",
    lastActive: "5 minutes ago",
    profileScore: 92,
    zodiac: "Pisces",
    drinking: "Socially",
    smoking: "Never",
  },
  {
    id: 4,
    name: "James",
    age: 29,
    bio: "Fitness enthusiast & passionate chef 🍳",
    subtitle: "Cooking is my love language 💕",
    distance: "4.2 km away",
    images: [
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
      "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg",
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg",
    ],
    interests: ["Cooking", "Fitness", "Wine", "Hiking"],
    verified: true,
    education: "Culinary Institute",
    job: "Head Chef",
    height: "5'11\"",
    lastActive: "1 hour ago",
    profileScore: 96,
    zodiac: "Taurus",
    drinking: "Socially",
    smoking: "Never",
  },
  {
    id: 5,
    name: "Isabella",
    age: 26,
    bio: "Book lover & world explorer 📚✈️",
    subtitle: "Stories shape who we are ✨",
    distance: "1.5 km away",
    images: [
      "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg",
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      "https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg",
    ],
    interests: ["Reading", "Travel", "Writing", "Coffee"],
    verified: false,
    education: "Columbia University",
    job: "Content Writer",
    height: "5'5\"",
    lastActive: "15 minutes ago",
    profileScore: 88,
    zodiac: "Virgo",
    drinking: "Rarely",
    smoking: "Never",
  },
];

const Home = () => {
  const insets = useSafeAreaInsets();

  const tabBarHeight = Platform.OS === "ios" ? 85 + insets.bottom : 70;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState(new Set());
  const [passedProfiles, setPassedProfiles] = useState(new Set());
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // Enhanced animation values
  const cardScale = useRef(new Animated.Value(1)).current;
  const cardRotation = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const cardTranslateY = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const likeAnimation = useRef(new Animated.Value(0)).current;
  const passAnimation = useRef(new Animated.Value(0)).current;
  const superLikeAnimation = useRef(new Animated.Value(0)).current;
  const heartPulse = useRef(new Animated.Value(1)).current;
  const imageTranslateX = useRef(new Animated.Value(0)).current;
  const detailsSlideY = useRef(new Animated.Value(height)).current;

  // Background particles animation
  const particleAnimations = useRef(
    Array.from({ length: 6 }, () => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scale: new Animated.Value(1),
    }))
  ).current;

  const currentProfile = datingProfiles[currentIndex];

  // Enhanced background animation
  useEffect(() => {
    const animations = particleAnimations.map((particle, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(particle.translateX, {
            toValue: Math.random() * 100 - 50,
            duration: 3000 + index * 500,
            useNativeDriver: true,
          }),
          Animated.timing(particle.translateY, {
            toValue: Math.random() * 100 - 50,
            duration: 3000 + index * 500,
            useNativeDriver: true,
          }),
          Animated.timing(particle.scale, {
            toValue: 0.5 + Math.random() * 0.5,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
    });

    animations.forEach((animation) => animation.start());

    return () => animations.forEach((animation) => animation.stop());
  }, []);

  // Heart pulse animation
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(heartPulse, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(heartPulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();
    return () => pulseAnimation.stop();
  }, []);

  // Animate subtitle on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Reset animations for new card
  useEffect(() => {
    cardScale.setValue(1);
    cardRotation.setValue(0);
    cardOpacity.setValue(1);
    cardTranslateY.setValue(0);
    subtitleOpacity.setValue(0);
    likeAnimation.setValue(0);
    passAnimation.setValue(0);
    superLikeAnimation.setValue(0);
    setCurrentImageIndex(0);
    setShowProfileDetails(false);
    imageTranslateX.setValue(0);
    detailsSlideY.setValue(height);
  }, [currentIndex]);

  const handleImageTap = (side) => {
    if (!currentProfile) return;

    if (
      side === "right" &&
      currentImageIndex < currentProfile.images.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
      // Enhanced slide animation
      Animated.sequence([
        Animated.timing(imageTranslateX, {
          toValue: -width * 0.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(imageTranslateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (side === "left" && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      // Enhanced slide animation
      Animated.sequence([
        Animated.timing(imageTranslateX, {
          toValue: width * 0.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(imageTranslateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleSuperLike = () => {
    if (!currentProfile) return;

    // Super like animation
    Animated.parallel([
      Animated.timing(cardTranslateY, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(superLikeAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 0.8,
        useNativeDriver: true,
      }),
    ]).start(() => {
      goToNextProfile();
    });
  };

  const handleLike = () => {
    if (!currentProfile) return;

    setLikedProfiles((prev) => new Set([...prev, currentProfile.id]));

    // Enhanced like animation with bounce
    Animated.parallel([
      Animated.timing(cardRotation, {
        toValue: 15,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 0.9,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => {
      goToNextProfile();
    });
  };

  const handlePass = () => {
    if (!currentProfile) return;

    setPassedProfiles((prev) => new Set([...prev, currentProfile.id]));

    // Enhanced pass animation
    Animated.parallel([
      Animated.timing(cardRotation, {
        toValue: -15,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(passAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 0.9,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => {
      goToNextProfile();
    });
  };

  const toggleProfileDetails = () => {
    if (showProfileDetails) {
      // Hide details
      Animated.timing(detailsSlideY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowProfileDetails(false));
    } else {
      // Show details
      setShowProfileDetails(true);
      Animated.timing(detailsSlideY, {
        toValue: height * 0.4,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const goToNextProfile = () => {
    if (currentIndex < datingProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Navigation handlers
  const handleFiltersPress = () => {
    router.push("filters");
  };

  const handleChatPress = () => {
    router.push("/(tabs)/chat-list");
  };

  if (!currentProfile) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fdf2f8" }}>
        <LinearGradient
          colors={["#fdf2f8", "#fce7f3", "#fbcfe8"]}
          style={{ flex: 1 }}
        >
          {/* Animated Background Particles */}
          {particleAnimations.map((particle, index) => (
            <Animated.View
              key={index}
              style={[
                styles.backgroundParticle,
                {
                  transform: [
                    { translateX: particle.translateX },
                    { translateY: particle.translateY },
                    { scale: particle.scale },
                  ],
                },
              ]}
            >
              <LinearGradient
                colors={["rgba(255, 107, 107, 0.1)", "rgba(238, 90, 82, 0.05)"]}
                style={styles.particleGradient}
              />
            </Animated.View>
          ))}

          <View style={styles.emptyContainer}>
            <Animated.View
              style={[
                styles.emptyStateIcon,
                { transform: [{ scale: heartPulse }] },
              ]}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.85)"]}
                style={styles.emptyStateIconInner}
              >
                <AntDesign name="heart" size={64} color="#ff6b6b" />
              </LinearGradient>
            </Animated.View>

            <Text className="font-poppins-bold text-3xl text-gray-800 text-center mb-4">
              That's Everyone!
            </Text>
            <Text className="font-poppins text-gray-600 text-center text-lg mb-8 leading-6">
              You've seen all available profiles in your area.{"\n"}Check back
              later for new matches!
            </Text>

            <TouchableOpacity
              style={styles.restartButton}
              onPress={() => setCurrentIndex(0)}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#ff6b6b", "#ee5a52"]}
                style={styles.restartButtonGradient}
              >
                <Ionicons name="refresh" size={20} color="white" />
                <Text className="font-poppins-semibold text-white text-lg ml-2">
                  Discover Again
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fdf2f8",
        paddingBottom: tabBarHeight + 40, // Extra 10px for spacing
      }}
    >
      <LinearGradient
        colors={["#fdf2f8", "#fce7f3", "#fbcfe8"]}
        style={{ flex: 1 }}
      >
        {/* Animated Background Particles */}
        {particleAnimations.map((particle, index) => (
          <Animated.View
            key={index}
            style={[
              styles.backgroundParticle,
              {
                transform: [
                  { translateX: particle.translateX },
                  { translateY: particle.translateY },
                  { scale: particle.scale },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={["rgba(255, 107, 107, 0.08)", "rgba(238, 90, 82, 0.04)"]}
              style={styles.particleGradient}
            />
          </Animated.View>
        ))}

        {/* Modern Glass-morphism Header */}
        <BlurView intensity={20} tint="light" style={styles.headerBlur}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.85)"]}
            style={styles.headerGradient}
          >
            <View className="flex-row justify-between items-center px-6 py-4">
              <TouchableOpacity
                style={styles.modernHeaderButton}
                activeOpacity={0.7}
                onPress={handleFiltersPress}
              >
                <BlurView intensity={10} tint="light" style={styles.buttonBlur}>
                  <MaterialIcons name="tune" size={22} color="#6B7280" />
                </BlurView>
              </TouchableOpacity>

              <View className="items-center">
                <Text className="font-poppins-bold text-2xl text-gray-900">
                  Discover
                </Text>
                <Text className="font-poppins text-sm text-gray-500">
                  Find your perfect match
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modernHeaderButton}
                activeOpacity={0.7}
                onPress={handleChatPress}
              >
                <BlurView intensity={10} tint="light" style={styles.buttonBlur}>
                  <Ionicons
                    name="chatbubbles-outline"
                    size={22}
                    color="#6B7280"
                  />
                  <View className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border border-white" />
                </BlurView>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </BlurView>

        {/* Enhanced Main Card with Modern Design */}
        <View style={styles.cardArea}>
          <Animated.View
            style={[
              styles.modernCardContainer,
              {
                transform: [
                  { scale: cardScale },
                  { translateY: cardTranslateY },
                  {
                    rotateZ: cardRotation.interpolate({
                      inputRange: [-30, 0, 30],
                      outputRange: ["-20deg", "0deg", "20deg"],
                    }),
                  },
                ],
                opacity: cardOpacity,
              },
            ]}
          >
            {/* Profile Image Section with Modern Glass Effect */}
            <View style={styles.modernImageContainer}>
              <Animated.View
                style={{
                  transform: [{ translateX: imageTranslateX }],
                }}
              >
                <Image
                  source={{ uri: currentProfile.images[currentImageIndex] }}
                  style={styles.modernImage}
                  resizeMode="cover"
                />
              </Animated.View>

              {/* Elegant Image Navigation Areas */}
              <TouchableOpacity
                style={styles.imageNavLeft}
                onPress={() => handleImageTap("left")}
                activeOpacity={0.3}
              />
              <TouchableOpacity
                style={styles.imageNavRight}
                onPress={() => handleImageTap("right")}
                activeOpacity={0.3}
              />

              {/* Modern Image Indicators */}
              <View className="absolute top-4 left-4 flex-row">
                {currentProfile.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.modernIndicator,
                      index === currentImageIndex && styles.activeIndicator,
                    ]}
                  />
                ))}
              </View>

              {/* Enhanced Gradient Overlay */}
              <LinearGradient
                colors={[
                  "transparent",
                  "transparent",
                  "rgba(0,0,0,0.4)",
                  "rgba(0,0,0,0.8)",
                ]}
                style={styles.modernGradientOverlay}
              />

              {/* Online Status with Glow Effect */}
              <View style={styles.onlineStatusContainer}>
                <View style={styles.onlineStatusGlow} />
                <View style={styles.onlineStatus} />
              </View>

              {/* Modern Verification Badge */}
              {currentProfile.verified && (
                <BlurView
                  intensity={30}
                  tint="light"
                  style={styles.modernVerificationBadge}
                >
                  <LinearGradient
                    colors={[
                      "rgba(59, 130, 246, 0.9)",
                      "rgba(37, 99, 235, 0.9)",
                    ]}
                    style={styles.verificationInner}
                  >
                    <MaterialIcons name="verified" size={14} color="white" />
                  </LinearGradient>
                </BlurView>
              )}

              {/* Profile Score Badge */}
              <BlurView
                intensity={30}
                tint="light"
                style={styles.profileScoreBadge}
              >
                <LinearGradient
                  colors={["rgba(16, 185, 129, 0.9)", "rgba(5, 150, 105, 0.9)"]}
                  style={styles.scoreInner}
                >
                  <Text className="font-poppins-bold text-white text-xs">
                    {currentProfile.profileScore}%
                  </Text>
                </LinearGradient>
              </BlurView>

              {/* Enhanced Action Overlays */}
              <Animated.View
                style={[styles.modernActionOverlay, { opacity: likeAnimation }]}
              >
                <BlurView
                  intensity={20}
                  tint="light"
                  style={styles.actionOverlayBlur}
                >
                  <LinearGradient
                    colors={[
                      "rgba(16, 185, 129, 0.95)",
                      "rgba(34, 197, 94, 0.95)",
                    ]}
                    style={styles.actionOverlayInner}
                  >
                    <AntDesign name="heart" size={80} color="white" />
                    <Text className="font-poppins-bold text-4xl text-white mt-4 tracking-wider">
                      LIKE
                    </Text>
                  </LinearGradient>
                </BlurView>
              </Animated.View>

              <Animated.View
                style={[styles.modernActionOverlay, { opacity: passAnimation }]}
              >
                <BlurView
                  intensity={20}
                  tint="light"
                  style={styles.actionOverlayBlur}
                >
                  <LinearGradient
                    colors={[
                      "rgba(239, 68, 68, 0.95)",
                      "rgba(220, 38, 38, 0.95)",
                    ]}
                    style={styles.actionOverlayInner}
                  >
                    <MaterialIcons name="close" size={80} color="white" />
                    <Text className="font-poppins-bold text-4xl text-white mt-4 tracking-wider">
                      PASS
                    </Text>
                  </LinearGradient>
                </BlurView>
              </Animated.View>

              <Animated.View
                style={[
                  styles.modernActionOverlay,
                  { opacity: superLikeAnimation },
                ]}
              >
                <BlurView
                  intensity={20}
                  tint="light"
                  style={styles.actionOverlayBlur}
                >
                  <LinearGradient
                    colors={[
                      "rgba(59, 130, 246, 0.95)",
                      "rgba(37, 99, 235, 0.95)",
                    ]}
                    style={styles.actionOverlayInner}
                  >
                    <AntDesign name="star" size={80} color="white" />
                    <Text className="font-poppins-bold text-3xl text-white mt-4 tracking-wider">
                      SUPER LIKE
                    </Text>
                  </LinearGradient>
                </BlurView>
              </Animated.View>
            </View>

            {/* Modern Profile Info with Glass Effect */}
            <BlurView
              intensity={30}
              tint="light"
              style={styles.modernProfileInfo}
            >
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.95)",
                  "rgba(255, 255, 255, 0.85)",
                ]}
                style={styles.profileInfoGradient}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    <Text className="font-poppins-bold text-2xl text-gray-900">
                      {currentProfile.name}
                    </Text>
                    <Text className="font-poppins-semibold text-2xl text-gray-600 ml-2">
                      {currentProfile.age}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={toggleProfileDetails}
                    style={styles.moreInfoButton}
                    activeOpacity={0.7}
                  >
                    <BlurView
                      intensity={20}
                      tint="light"
                      style={styles.moreInfoBlur}
                    >
                      <Ionicons
                        name="information-circle"
                        size={20}
                        color="#6B7280"
                      />
                    </BlurView>
                  </TouchableOpacity>
                </View>

                {/* Job & Education with Icons */}
                <View className="flex-row items-center mb-3">
                  <View className="flex-row items-center bg-gray-50 px-3 py-1 rounded-full mr-2">
                    <MaterialIcons name="work" size={12} color="#6B7280" />
                    <Text className="font-poppins-medium text-gray-800 text-xs ml-1">
                      {currentProfile.job}
                    </Text>
                  </View>
                  <View className="flex-row items-center bg-gray-50 px-3 py-1 rounded-full">
                    <MaterialIcons name="school" size={12} color="#6B7280" />
                    <Text className="font-poppins text-gray-600 text-xs ml-1">
                      {currentProfile.education}
                    </Text>
                  </View>
                </View>

                <Text className="font-poppins text-gray-700 text-base mb-2">
                  {currentProfile.bio}
                </Text>

                <Animated.Text
                  style={[
                    { opacity: subtitleOpacity },
                    {
                      transform: [
                        {
                          translateY: subtitleOpacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                  className="font-poppins-medium text-rose-500 text-sm mb-4"
                >
                  {currentProfile.subtitle}
                </Animated.Text>

                {/* Enhanced Interests with Gradients */}
                <View className="flex-row flex-wrap mb-4">
                  {currentProfile.interests
                    .slice(0, 4)
                    .map((interest, index) => (
                      <LinearGradient
                        key={index}
                        colors={["#fce7f3", "#fbcfe8"]}
                        style={styles.modernInterestBadge}
                      >
                        <Text className="font-poppins-medium text-rose-700 text-xs">
                          {interest}
                        </Text>
                      </LinearGradient>
                    ))}
                </View>

                {/* Enhanced Bottom Info */}
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <MaterialIcons
                      name="location-on"
                      size={14}
                      color="#9CA3AF"
                    />
                    <Text className="font-poppins text-gray-500 text-xs ml-1">
                      {currentProfile.distance}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialIcons
                      name="access-time"
                      size={14}
                      color="#9CA3AF"
                    />
                    <Text className="font-poppins text-gray-500 text-xs ml-1">
                      Active {currentProfile.lastActive}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </BlurView>
          </Animated.View>
        </View>

        {/* Modern Action Buttons with Enhanced Design */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            onPress={handlePass}
            style={[styles.modernActionButton, styles.passButton]}
            activeOpacity={0.8}
          >
            <BlurView
              intensity={20}
              tint="light"
              style={styles.actionButtonBlur}
            >
              <LinearGradient
                colors={["rgba(239, 68, 68, 0.1)", "rgba(220, 38, 38, 0.05)"]}
                style={styles.actionButtonGradient}
              >
                <MaterialIcons name="close" size={28} color="#EF4444" />
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSuperLike}
            style={[styles.modernActionButton, styles.superLikeButton]}
            activeOpacity={0.8}
          >
            <BlurView
              intensity={20}
              tint="light"
              style={styles.actionButtonBlur}
            >
              <LinearGradient
                colors={["#3B82F6", "#2563EB"]}
                style={styles.actionButtonGradient}
              >
                <AntDesign name="star" size={22} color="white" />
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLike}
            style={[styles.modernActionButton, styles.likeButton]}
            activeOpacity={0.8}
          >
            <BlurView
              intensity={20}
              tint="light"
              style={styles.actionButtonBlur}
            >
              <LinearGradient
                colors={["rgba(16, 185, 129, 0.1)", "rgba(5, 150, 105, 0.05)"]}
                style={styles.actionButtonGradient}
              >
                <AntDesign name="heart" size={28} color="#10B981" />
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        </View>

        {/* Enhanced Progress Indicator */}
        <View style={styles.progressContainer}>
          {datingProfiles.map((_, index) => (
            <View
              key={index}
              style={[
                styles.modernProgressDot,
                index <= currentIndex && styles.activeProgressDot,
              ]}
            />
          ))}
        </View>

        {/* Profile Details Modal */}
        {showProfileDetails && (
          <Animated.View
            style={[
              styles.detailsModal,
              {
                transform: [{ translateY: detailsSlideY }],
              },
            ]}
          >
            <BlurView intensity={50} tint="light" style={styles.detailsBlur}>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.95)",
                  "rgba(255, 255, 255, 0.9)",
                ]}
                style={styles.detailsGradient}
              >
                {/* Handle Bar */}
                <View className="w-12 h-1 bg-gray-300 rounded-full self-center mt-3 mb-4" />

                <Text className="font-poppins-bold text-xl text-gray-900 text-center mb-6">
                  About {currentProfile.name}
                </Text>

                {/* Additional Profile Details */}
                <View className="space-y-4">
                  <View className="flex-row justify-between">
                    <Text className="font-poppins-medium text-gray-600">
                      Height
                    </Text>
                    <Text className="font-poppins text-gray-900">
                      {currentProfile.height}
                    </Text>
                  </View>

                  <View className="flex-row justify-between">
                    <Text className="font-poppins-medium text-gray-600">
                      Zodiac
                    </Text>
                    <Text className="font-poppins text-gray-900">
                      {currentProfile.zodiac}
                    </Text>
                  </View>

                  <View className="flex-row justify-between">
                    <Text className="font-poppins-medium text-gray-600">
                      Drinking
                    </Text>
                    <Text className="font-poppins text-gray-900">
                      {currentProfile.drinking}
                    </Text>
                  </View>

                  <View className="flex-row justify-between">
                    <Text className="font-poppins-medium text-gray-600">
                      Smoking
                    </Text>
                    <Text className="font-poppins text-gray-900">
                      {currentProfile.smoking}
                    </Text>
                  </View>
                </View>

                {/* All Interests */}
                <View className="mt-6">
                  <Text className="font-poppins-semibold text-gray-900 mb-3">
                    All Interests
                  </Text>
                  <View className="flex-row flex-wrap">
                    {currentProfile.interests.map((interest, index) => (
                      <LinearGradient
                        key={index}
                        colors={["#fce7f3", "#fbcfe8"]}
                        style={styles.modernInterestBadge}
                      >
                        <Text className="font-poppins-medium text-rose-700 text-xs">
                          {interest}
                        </Text>
                      </LinearGradient>
                    ))}
                  </View>
                </View>

                {/* Close Button */}
                <TouchableOpacity
                  onPress={toggleProfileDetails}
                  style={styles.closeDetailsButton}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#ff6b6b", "#ee5a52"]}
                    style={styles.closeDetailsGradient}
                  >
                    <Text className="font-poppins-semibold text-white">
                      Close
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </BlurView>
          </Animated.View>
        )}
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  // Background Particles
  backgroundParticle: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  particleGradient: {
    flex: 1,
    borderRadius: 40,
  },

  // Header Styles
  headerBlur: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
  },
  headerGradient: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  modernHeaderButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },
  buttonBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Main Container Styles
  cardArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },

  // Card Styles
  modernCardContainer: {
    flex: 1,
    borderRadius: 32,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 20,
  },
  modernImageContainer: {
    flex: 0.7, // Takes 70% of card height
    position: "relative",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
  },
  modernImage: {
    width: "100%",
    height: "100%",
  },
  modernGradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },

  // Image Navigation
  imageNavLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "35%",
    backgroundColor: "transparent",
  },
  imageNavRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "35%",
    backgroundColor: "transparent",
  },

  // Indicators
  modernIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginRight: 4,
  },
  activeIndicator: {
    backgroundColor: "white",
    width: 20,
  },

  // Status Indicators
  onlineStatusContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  onlineStatusGlow: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#10B981",
    opacity: 0.3,
    transform: [{ scale: 1.5 }],
  },
  onlineStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "white",
  },

  // Badges
  modernVerificationBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  verificationInner: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
  },
  profileScoreBadge: {
    position: "absolute",
    top: 70,
    right: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  scoreInner: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // Action Overlays
  modernActionOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 32,
    overflow: "hidden",
  },
  actionOverlayBlur: {
    flex: 1,
  },
  actionOverlayInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },

  // Profile Info
  modernProfileInfo: {
    flex: 0.3, // Takes 30% of card height
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
  },
  profileInfoGradient: {
    flex: 1,
    padding: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  moreInfoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  moreInfoBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Interest Badges
  modernInterestBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  // Action Buttons Container
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 20,
    gap: 24,
  },

  // Action Buttons
  modernActionButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  actionButtonBlur: {
    flex: 1,
  },
  actionButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
  },
  passButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  likeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  superLikeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  // Progress Container
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 100, // Space for tab bar
    paddingTop: 8,
  },

  // Progress Indicator
  modernProgressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(107, 114, 128, 0.3)",
    marginHorizontal: 3,
  },
  activeProgressDot: {
    backgroundColor: "#ff6b6b",
    width: 24,
  },

  // Empty State Container
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 120, // Space for tab bar
  },

  // Empty State
  emptyStateIcon: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 32,
    overflow: "hidden",
    shadowColor: "#ff6b6b",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
  },
  emptyStateIconInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 70,
  },
  restartButton: {
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#ff6b6b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  restartButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },

  // Details Modal
  detailsModal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
  },
  detailsBlur: {
    flex: 1,
  },
  detailsGradient: {
    flex: 1,
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  closeDetailsButton: {
    marginTop: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  closeDetailsGradient: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 16,
  },
});
