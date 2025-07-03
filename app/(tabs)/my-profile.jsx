import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
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

// User profile data
const userProfile = {
  id: 1,
  name: "Alex",
  age: 26,
  bio: "Adventure seeker, coffee enthusiast, and passionate photographer 📸",
  subtitle: "Living life one adventure at a time ✨",
  location: "New York, NY",
  images: [
    "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg",
    "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg",
  ],
  interests: [
    "Photography",
    "Travel",
    "Coffee",
    "Hiking",
    "Art",
    "Music",
    "Cooking",
    "Fitness",
  ],
  verified: true,
  education: "NYU Graduate",
  job: "Senior UX Designer",
  company: "TechCorp",
  height: "6'1\"",
  distance: "Lives here",
  zodiac: "Gemini",
  politics: "Liberal",
  religion: "Agnostic",
  smoking: "Never",
  drinking: "Socially",
  kids: "Want someday",
  pets: "Dog lover",
  languages: ["English", "Spanish", "French"],
  lookingFor: "Long-term relationship",
  profileViews: 156,
  likes: 89,
  matches: 23,
  joinDate: "January 2024",
};

const MyProfile = () => {
  const insets = useSafeAreaInsets();

  const tabBarHeight = Platform.OS === "ios" ? 85 + insets.bottom : 70;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllInterests, setShowAllInterests] = useState(false);

  // Animation values
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animate content on mount
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
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleImagePress = (index) => {
    setActiveImageIndex(index);
  };

  const handleEditProfile = () => {
    router.push("edit-profile");
  };

  const handleSettings = () => {
    Alert.alert("Settings", "Navigate to settings screen");
  };

  const handleShare = () => {
    Alert.alert("Share Profile", "Share profile functionality");
  };

  const renderStatCard = (title, value, icon) => (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.6)"]}
      style={[styles.statCard, { borderRadius: 20 }]}
      className="p-4 flex-1 mx-1"
    >
      <View className="items-center">
        <LinearGradient
          colors={["#fce7f3", "#f3e8ff"]}
          style={{ width: 48, height: 48, borderRadius: 24 }}
          className="items-center justify-center mb-3"
        >
          <Ionicons name={icon} size={24} color="#E11D48" />
        </LinearGradient>
        <Text className="font-poppins-bold text-2xl text-gray-900">
          {value}
        </Text>
        <Text className="font-poppins text-sm text-gray-600">{title}</Text>
      </View>
    </LinearGradient>
  );

  const renderInfoRow = (icon, label, value, color = "#6B7280") => (
    <View
      className="flex-row items-center py-3 px-4 mb-2"
      style={styles.infoRow}
    >
      <LinearGradient
        colors={["#f8fafc", "#f1f5f9"]}
        style={{ width: 40, height: 40, borderRadius: 20 }}
        className="items-center justify-center mr-4"
      >
        <MaterialIcons name={icon} size={20} color={color} />
      </LinearGradient>
      <View className="flex-1">
        <Text className="font-poppins text-sm text-gray-600">{label}</Text>
        <Text className="font-poppins-medium text-gray-900">{value}</Text>
      </View>
    </View>
  );

  const renderInterest = (interest, index) => (
    <LinearGradient
      key={index}
      colors={["#fce7f3", "#fbcfe8"]}
      style={styles.interestBadge}
    >
      <Text className="font-poppins-medium text-rose-700 text-sm">
        {interest}
      </Text>
    </LinearGradient>
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
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerOpacity,
            },
          ]}
        >
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.9)"]}
            style={styles.headerGradient}
            className="flex-row justify-between items-center px-6 py-4"
          >
            <TouchableOpacity style={styles.headerButton} onPress={() => {}}>
              <Ionicons name="arrow-back" size={24} color="#6B7280" />
            </TouchableOpacity>

            <View className="items-center">
              <Text className="font-poppins-bold text-xl text-gray-900">
                My Profile
              </Text>
              <Text className="font-poppins text-sm text-gray-500">
                Manage your profile
              </Text>
            </View>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleSettings}
            >
              <MaterialIcons name="settings" size={24} color="#6B7280" />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Main Profile Image */}
            <View className="relative mx-4 mt-4 mb-6">
              <View
                style={styles.mainImageContainer}
                className="rounded-3xl overflow-hidden"
              >
                <Image
                  source={{ uri: userProfile.images[activeImageIndex] }}
                  style={styles.mainImage}
                  resizeMode="cover"
                />

                {/* Image Overlay */}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.7)"]}
                  style={styles.imageOverlay}
                />

                {/* Profile Info Overlay */}
                <View style={styles.profileOverlay}>
                  <View className="flex-row items-center">
                    <Text className="font-poppins-bold text-3xl text-white mr-3">
                      {userProfile.name}
                    </Text>
                    <Text className="font-poppins-semibold text-3xl text-white/80">
                      {userProfile.age}
                    </Text>
                    {userProfile.verified && (
                      <View className="ml-3 bg-blue-500 rounded-full p-1">
                        <MaterialIcons
                          name="verified"
                          size={20}
                          color="white"
                        />
                      </View>
                    )}
                  </View>
                  <Text className="font-poppins text-white/90 text-lg mt-1">
                    {userProfile.job} at {userProfile.company}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <MaterialIcons name="location-on" size={16} color="white" />
                    <Text className="font-poppins text-white/80 ml-1">
                      {userProfile.location}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleEditProfile}
                    className="bg-white/90"
                  >
                    <Feather name="edit-3" size={20} color="#E11D48" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleShare}
                    className="bg-white/90 ml-3"
                  >
                    <Feather name="share" size={20} color="#E11D48" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Image Thumbnails */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-4"
                contentContainerStyle={{ paddingHorizontal: 4 }}
              >
                {userProfile.images.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleImagePress(index)}
                    style={[
                      styles.thumbnailContainer,
                      activeImageIndex === index && styles.activeThumbnail,
                    ]}
                    className="mr-3"
                  >
                    <Image
                      source={{ uri: image }}
                      style={styles.thumbnail}
                      resizeMode="cover"
                    />
                    {activeImageIndex === index && (
                      <View style={styles.thumbnailOverlay}>
                        <View className="w-6 h-6 bg-white rounded-full items-center justify-center">
                          <AntDesign name="check" size={14} color="#E11D48" />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}

                {/* Add Photo Button */}
                <TouchableOpacity
                  style={styles.addPhotoButton}
                  className="bg-white/90 border-2 border-dashed border-rose-300"
                >
                  <AntDesign name="plus" size={24} color="#E11D48" />
                  <Text className="font-poppins-medium text-rose-600 text-xs mt-1">
                    Add Photo
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            {/* Stats Section */}
            <View className="px-4 mb-6">
              <View className="flex-row">
                {renderStatCard(
                  "Profile Views",
                  userProfile.profileViews,
                  "eye-outline"
                )}
                {renderStatCard("Likes", userProfile.likes, "heart-outline")}
                {renderStatCard("Matches", userProfile.matches, "star-outline")}
              </View>
            </View>

            {/* About Section */}
            <View className="px-4 mb-6">
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.85)",
                  "rgba(255, 255, 255, 0.75)",
                ]}
                style={[styles.sectionCard, { borderRadius: 24 }]}
                className="p-6"
              >
                <Text className="font-poppins-bold text-xl text-gray-900 mb-4">
                  About Me
                </Text>
                <Text className="font-poppins text-gray-700 text-base leading-6 mb-4">
                  {userProfile.bio}
                </Text>
                <Text className="font-poppins-medium text-rose-600 text-base">
                  {userProfile.subtitle}
                </Text>
              </LinearGradient>
            </View>

            {/* Interests Section */}
            <View className="px-4 mb-6">
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.85)",
                  "rgba(255, 255, 255, 0.75)",
                ]}
                style={[styles.sectionCard, { borderRadius: 24 }]}
                className="p-6"
              >
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="font-poppins-bold text-xl text-gray-900">
                    Interests
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowAllInterests(!showAllInterests)}
                  >
                    <Text className="font-poppins-medium text-rose-600">
                      {showAllInterests ? "Show Less" : "Show All"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row flex-wrap">
                  {(showAllInterests
                    ? userProfile.interests
                    : userProfile.interests.slice(0, 6)
                  ).map((interest, index) => renderInterest(interest, index))}
                </View>
              </LinearGradient>
            </View>

            {/* Personal Details */}
            <View className="px-4 mb-6">
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.85)",
                  "rgba(255, 255, 255, 0.75)",
                ]}
                style={[styles.sectionCard, { borderRadius: 24 }]}
                className="p-6"
              >
                <Text className="font-poppins-bold text-xl text-gray-900 mb-4">
                  Details
                </Text>

                {renderInfoRow("school", "Education", userProfile.education)}
                {renderInfoRow("height", "Height", userProfile.height)}
                {renderInfoRow("star", "Zodiac", userProfile.zodiac)}
                {renderInfoRow("how-to-vote", "Politics", userProfile.politics)}
                {renderInfoRow("local-bar", "Drinking", userProfile.drinking)}
                {renderInfoRow("smoke-free", "Smoking", userProfile.smoking)}
                {renderInfoRow("child-care", "Kids", userProfile.kids)}
                {renderInfoRow("pets", "Pets", userProfile.pets)}
              </LinearGradient>
            </View>

            {/* Languages */}
            <View className="px-4 mb-6">
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.85)",
                  "rgba(255, 255, 255, 0.75)",
                ]}
                style={[styles.sectionCard, { borderRadius: 24 }]}
                className="p-6"
              >
                <Text className="font-poppins-bold text-xl text-gray-900 mb-4">
                  Languages
                </Text>
                <View className="flex-row flex-wrap">
                  {userProfile.languages.map((language, index) => (
                    <LinearGradient
                      key={index}
                      colors={["#dbeafe", "#bfdbfe"]}
                      style={{ borderRadius: 20 }}
                      className="px-4 py-2 mr-2 mb-2"
                    >
                      <Text className="font-poppins-medium text-blue-700">
                        {language}
                      </Text>
                    </LinearGradient>
                  ))}
                </View>
              </LinearGradient>
            </View>

            {/* Looking For */}
            <View className="px-4 mb-6">
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.85)",
                  "rgba(255, 255, 255, 0.75)",
                ]}
                style={[styles.sectionCard, { borderRadius: 24 }]}
                className="p-6"
              >
                <Text className="font-poppins-bold text-xl text-gray-900 mb-4">
                  Looking For
                </Text>
                <LinearGradient
                  colors={["#fce7f3", "#fbcfe8"]}
                  style={{ borderRadius: 16 }}
                  className="px-4 py-3"
                >
                  <Text className="font-poppins-medium text-rose-700 text-center">
                    {userProfile.lookingFor}
                  </Text>
                </LinearGradient>
              </LinearGradient>
            </View>

            {/* Account Info */}
            <View className="px-4 mb-8">
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.85)",
                  "rgba(255, 255, 255, 0.75)",
                ]}
                style={[styles.sectionCard, { borderRadius: 24 }]}
                className="p-6"
              >
                <Text className="font-poppins-bold text-xl text-gray-900 mb-4">
                  Account
                </Text>
                <Text className="font-poppins text-gray-600">
                  Member since {userProfile.joinDate}
                </Text>
              </LinearGradient>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  header: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  headerGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  mainImageContainer: {
    height: height * 0.6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  profileOverlay: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
  },
  actionButtons: {
    position: "absolute",
    top: 24,
    right: 24,
    flexDirection: "row",
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  thumbnailContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  activeThumbnail: {
    borderWidth: 3,
    borderColor: "#E11D48",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbnailOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(225, 29, 72, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  statCard: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 6 },
    // shadowOpacity: 0.08,
    // shadowRadius: 16,
    // elevation: 6,
  },
  sectionCard: {},
  infoRow: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 16,
  },
  interestBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    marginRight: 8,
    marginBottom: 8,
  },
});
