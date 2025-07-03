import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
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
    FlatList,
    Image,
    Modal,
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

// Sample data for people who liked you
const likesData = [
  {
    id: 1,
    name: "Emma",
    age: 24,
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    job: "UX Designer",
    distance: "2.3 km away",
    likedAt: "2 hours ago",
    verified: true,
    isOnline: true,
    images: [
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    ],
    bio: "Adventure seeker & coffee lover ☕",
    interests: ["Travel", "Coffee", "Art", "Photography"],
    compatibility: 95,
  },
  {
    id: 2,
    name: "Sofia",
    age: 26,
    avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
    job: "Dance Instructor",
    distance: "1.8 km away",
    likedAt: "4 hours ago",
    verified: false,
    isOnline: false,
    images: [
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
      "https://images.pexels.com/photos/1878522/pexels-photo-1878522.jpeg",
    ],
    bio: "Dancing through life 💃",
    interests: ["Dancing", "Music", "Fitness", "Travel"],
    compatibility: 87,
  },
  {
    id: 3,
    name: "Isabella",
    age: 25,
    avatar:
      "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg",
    job: "Content Writer",
    distance: "3.1 km away",
    likedAt: "6 hours ago",
    verified: true,
    isOnline: true,
    images: [
      "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg",
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    ],
    bio: "Book lover & world explorer 📚✈️",
    interests: ["Reading", "Writing", "Travel", "Coffee"],
    compatibility: 92,
  },
  {
    id: 4,
    name: "Maya",
    age: 23,
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    job: "Photographer",
    distance: "2.7 km away",
    likedAt: "1 day ago",
    verified: true,
    isOnline: false,
    images: [
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    ],
    bio: "Capturing moments ✨",
    interests: ["Photography", "Art", "Nature", "Travel"],
    compatibility: 89,
  },
  {
    id: 5,
    name: "Aria",
    age: 27,
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    job: "Marketing Manager",
    distance: "4.2 km away",
    likedAt: "2 days ago",
    verified: false,
    isOnline: true,
    images: [
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
      "https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg",
    ],
    bio: "Creating connections 💕",
    interests: ["Marketing", "Yoga", "Wine", "Cooking"],
    compatibility: 84,
  },
];

// Sample super likes data
const superLikesData = [
  {
    id: 6,
    name: "Zoe",
    age: 22,
    avatar:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    job: "Student",
    distance: "1.2 km away",
    likedAt: "30 minutes ago",
    verified: true,
    isOnline: true,
    compatibility: 98,
    type: "super_like",
  },
];

const Likes = () => {
  const insets = useSafeAreaInsets();

  const tabBarHeight = Platform.OS === "ios" ? 85 + insets.bottom : 70;

  const [activeTab, setActiveTab] = useState("likes"); // 'likes' or 'super_likes'
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const heartPulse = useRef(new Animated.Value(1)).current;

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

    // Sparkle animation for super likes
    const sparkleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    sparkleAnimation.start();

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

    return () => {
      sparkleAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const showProfileDetail = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
    Animated.spring(modalAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const hideProfileDetail = () => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowProfileModal(false);
      setSelectedProfile(null);
    });
  };

  const handleLikeBack = (profile) => {
    Alert.alert(
      "It's a Match! 💕",
      `You and ${profile.name} liked each other!`,
      [
        { text: "Send Message", onPress: () => router.push("chat") },
        { text: "Keep Swiping", style: "cancel" },
      ]
    );
  };

  const handlePass = (profile) => {
    Alert.alert("Profile Passed", `You passed on ${profile.name}`);
  };

  const renderLikeItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.likeItem, { marginTop: index === 0 ? 0 : 12 }]}
      onPress={() => showProfileDetail(item)}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.85)"]}
        style={styles.likeContainer}
      >
        {/* Profile Image Section */}
        <View style={styles.profileImageSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            {/* Online indicator */}
            {item.isOnline && (
              <LinearGradient
                colors={["#10b981", "#059669"]}
                style={styles.onlineIndicator}
              >
                <View style={styles.onlineInnerDot} />
              </LinearGradient>
            )}

            {/* Verification badge */}
            {item.verified && (
              <LinearGradient
                colors={["#3b82f6", "#2563eb"]}
                style={styles.verificationBadge}
              >
                <MaterialIcons name="verified" size={12} color="white" />
              </LinearGradient>
            )}
          </View>

          {/* Compatibility score */}
          <LinearGradient
            colors={["#fef3c7", "#fde68a"]}
            style={styles.compatibilityBadge}
          >
            <AntDesign name="star" size={10} color="#d97706" />
            <Text style={styles.compatibilityText}>{item.compatibility}%</Text>
          </LinearGradient>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.age}>{item.age}</Text>
          </View>

          <Text style={styles.job} numberOfLines={1}>
            {item.job}
          </Text>

          <View style={styles.detailsContainer}>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={12} color="#9ca3af" />
              <Text style={styles.distance}>{item.distance}</Text>
            </View>
            <Text style={styles.likedAt}>{item.likedAt}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.passButton}
            onPress={() => handlePass(item)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#fee2e2", "#fecaca"]}
              style={styles.actionButtonGradient}
            >
              <MaterialIcons name="close" size={20} color="#ef4444" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => handleLikeBack(item)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#dcfce7", "#bbf7d0"]}
              style={styles.actionButtonGradient}
            >
              <AntDesign name="heart" size={18} color="#10b981" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSuperLikeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.superLikeItem}
      onPress={() => showProfileDetail(item)}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={["rgba(59, 130, 246, 0.1)", "rgba(147, 197, 253, 0.1)"]}
        style={styles.superLikeContainer}
      >
        {/* Sparkle Effect */}
        <Animated.View
          style={[
            styles.sparkleOverlay,
            {
              opacity: sparkleAnim,
              transform: [
                {
                  rotate: sparkleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <AntDesign
            name="star"
            size={16}
            color="#3b82f6"
            style={styles.sparkle1}
          />
          <AntDesign
            name="star"
            size={12}
            color="#60a5fa"
            style={styles.sparkle2}
          />
          <AntDesign
            name="star"
            size={10}
            color="#93c5fd"
            style={styles.sparkle3}
          />
        </Animated.View>

        <View style={styles.superLikeContent}>
          <View style={styles.superLikeImageContainer}>
            <Image
              source={{ uri: item.avatar }}
              style={styles.superLikeAvatar}
            />

            <LinearGradient
              colors={["#3b82f6", "#2563eb"]}
              style={styles.superLikeBadge}
            >
              <AntDesign name="star" size={16} color="white" />
            </LinearGradient>
          </View>

          <View style={styles.superLikeInfo}>
            <Text style={styles.superLikeName}>
              {item.name} super liked you!
            </Text>
            <Text style={styles.superLikeSubtext}>
              {item.compatibility}% compatibility • {item.likedAt}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.superLikeAction}
            onPress={() => handleLikeBack(item)}
          >
            <LinearGradient
              colors={["#3b82f6", "#2563eb"]}
              style={styles.superLikeActionGradient}
            >
              <Text style={styles.superLikeActionText}>Like Back</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const ProfileModal = () => (
    <Modal
      visible={showProfileModal}
      transparent={true}
      animationType="none"
      onRequestClose={hideProfileDetail}
    >
      <BlurView intensity={100} tint="dark" style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: modalAnim,
              transform: [
                {
                  scale: modalAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
                {
                  translateY: modalAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {selectedProfile && (
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.98)",
                "rgba(255, 255, 255, 0.95)",
              ]}
              style={styles.modalContent}
            >
              {/* Close button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={hideProfileDetail}
              >
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.9)",
                    "rgba(255, 255, 255, 0.7)",
                  ]}
                  style={styles.closeButtonGradient}
                >
                  <MaterialIcons name="close" size={24} color="#6b7280" />
                </LinearGradient>
              </TouchableOpacity>

              {/* Profile image */}
              <Image
                source={{ uri: selectedProfile.avatar }}
                style={styles.modalImage}
              />

              {/* Profile details */}
              <View style={styles.modalProfileInfo}>
                <View style={styles.modalNameRow}>
                  <Text style={styles.modalName}>
                    {selectedProfile.name}, {selectedProfile.age}
                  </Text>
                  {selectedProfile.verified && (
                    <MaterialIcons name="verified" size={20} color="#3b82f6" />
                  )}
                </View>

                <Text style={styles.modalJob}>{selectedProfile.job}</Text>
                <Text style={styles.modalBio}>{selectedProfile.bio}</Text>

                {/* Interests */}
                <View style={styles.modalInterests}>
                  {selectedProfile.interests?.map((interest, index) => (
                    <LinearGradient
                      key={index}
                      colors={["#fce7f3", "#fbcfe8"]}
                      style={styles.interestTag}
                    >
                      <Text style={styles.interestText}>{interest}</Text>
                    </LinearGradient>
                  ))}
                </View>

                {/* Action buttons */}
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalPassButton}
                    onPress={() => {
                      hideProfileDetail();
                      handlePass(selectedProfile);
                    }}
                  >
                    <LinearGradient
                      colors={["#fee2e2", "#fecaca"]}
                      style={styles.modalActionGradient}
                    >
                      <MaterialIcons name="close" size={24} color="#ef4444" />
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalLikeButton}
                    onPress={() => {
                      hideProfileDetail();
                      handleLikeBack(selectedProfile);
                    }}
                  >
                    <LinearGradient
                      colors={["#dcfce7", "#bbf7d0"]}
                      style={styles.modalActionGradient}
                    >
                      <AntDesign name="heart" size={22} color="#10b981" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          )}
        </Animated.View>
      </BlurView>
    </Modal>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fdf2f8",
        paddingBottom: tabBarHeight + 50, // Extra 10px for spacing
      }}
    >
      <LinearGradient
        colors={["#fdf2f8", "#fce7f3", "#fbcfe8"]}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.9)"]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#6b7280" />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <View style={styles.headerTitleContainer}>
                <Animated.View style={{ transform: [{ scale: heartPulse }] }}>
                  <LinearGradient
                    colors={["#ff6b6b", "#ee5a52"]}
                    style={styles.heartIcon}
                  >
                    <AntDesign name="heart" size={20} color="white" />
                  </LinearGradient>
                </Animated.View>
                <Text style={styles.headerTitle}>Likes</Text>
              </View>
              <Text style={styles.headerSubtitle}>
                {likesData.length + superLikesData.length} people like you
              </Text>
            </View>

            <TouchableOpacity style={styles.headerButton}>
              <Feather name="filter" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "likes" && styles.activeTab]}
              onPress={() => setActiveTab("likes")}
            >
              {activeTab === "likes" ? (
                <LinearGradient
                  colors={["#ff6b6b", "#ee5a52"]}
                  style={styles.activeTabGradient}
                >
                  <AntDesign name="heart" size={16} color="white" />
                  <Text style={styles.activeTabText}>
                    Likes ({likesData.length})
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveTabContent}>
                  <AntDesign name="heart" size={16} color="#9ca3af" />
                  <Text style={styles.inactiveTabText}>
                    Likes ({likesData.length})
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "super_likes" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("super_likes")}
            >
              {activeTab === "super_likes" ? (
                <LinearGradient
                  colors={["#3b82f6", "#2563eb"]}
                  style={styles.activeTabGradient}
                >
                  <AntDesign name="star" size={16} color="white" />
                  <Text style={styles.activeTabText}>
                    Super ({superLikesData.length})
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveTabContent}>
                  <AntDesign name="star" size={16} color="#9ca3af" />
                  <Text style={styles.inactiveTabText}>
                    Super ({superLikesData.length})
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Content */}
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {activeTab === "likes" ? (
            <FlatList
              data={likesData}
              renderItem={renderLikeItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <FlatList
              data={superLikesData}
              renderItem={renderSuperLikeItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <LinearGradient
                    colors={["#e0e7ff", "#c7d2fe"]}
                    style={styles.emptyIcon}
                  >
                    <AntDesign name="star" size={32} color="#6366f1" />
                  </LinearGradient>
                  <Text style={styles.emptyTitle}>No Super Likes Yet</Text>
                  <Text style={styles.emptySubtitle}>
                    When someone super likes you, they'll appear here
                  </Text>
                </View>
              }
            />
          )}
        </Animated.View>

        <ProfileModal />
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Likes;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    alignItems: "center",
    flex: 1,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  heartIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#1f2937",
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6b7280",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },
  tab: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  activeTab: {
    // Active tab styling handled by gradient
  },
  activeTabGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeTabText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginLeft: 6,
  },
  inactiveTabContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  inactiveTabText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#6b7280",
    marginLeft: 6,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  likeItem: {
    borderRadius: 20,
    overflow: "hidden",
  },
  likeContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  profileImageSection: {
    position: "relative",
    marginRight: 16,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  onlineInnerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
  },
  verificationBadge: {
    position: "absolute",
    top: -2,
    left: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  compatibilityBadge: {
    position: "absolute",
    bottom: -8,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  compatibilityText: {
    fontSize: 10,
    fontFamily: "Poppins-Bold",
    color: "#d97706",
    marginLeft: 2,
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1f2937",
  },
  age: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#6b7280",
    marginLeft: 4,
  },
  job: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#374151",
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distance: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#9ca3af",
    marginLeft: 2,
  },
  likedAt: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#9ca3af",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  passButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  likeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  actionButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  superLikeItem: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
  superLikeContainer: {
    padding: 20,
    position: "relative",
    borderWidth: 2,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  sparkleOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sparkle1: {
    position: "absolute",
    top: 20,
    right: 30,
  },
  sparkle2: {
    position: "absolute",
    top: 40,
    left: 25,
  },
  sparkle3: {
    position: "absolute",
    bottom: 25,
    right: 20,
  },
  superLikeContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  superLikeImageContainer: {
    position: "relative",
    marginRight: 16,
  },
  superLikeAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  superLikeBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  superLikeInfo: {
    flex: 1,
  },
  superLikeName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1f2937",
    marginBottom: 4,
  },
  superLikeSubtext: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#6b7280",
  },
  superLikeAction: {
    borderRadius: 16,
    overflow: "hidden",
  },
  superLikeActionGradient: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  superLikeActionText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: width - 40,
    maxHeight: height - 100,
    borderRadius: 24,
    overflow: "hidden",
  },
  modalContent: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  closeButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  modalProfileInfo: {
    padding: 24,
  },
  modalNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  modalName: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#1f2937",
    marginRight: 8,
  },
  modalJob: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#374151",
    marginBottom: 12,
  },
  modalBio: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#6b7280",
    lineHeight: 24,
    marginBottom: 20,
  },
  modalInterests: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  interestTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#be185d",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  modalPassButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  modalLikeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  modalActionGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
