import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
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

// Sample chat data
const chatData = [
  {
    id: 1,
    name: "Emma",
    age: 24,
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    lastMessage: "Hey! How was your day? 😊",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true,
    isTyping: false,
    matchedDate: "2 days ago",
  },
  {
    id: 2,
    name: "Sophie",
    age: 26,
    avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
    lastMessage: "Would love to grab coffee sometime!",
    timestamp: "15m ago",
    unreadCount: 0,
    isOnline: false,
    isTyping: false,
    matchedDate: "1 week ago",
  },
  {
    id: 3,
    name: "Isabella",
    age: 25,
    avatar:
      "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg",
    lastMessage: "That place looks amazing! 📸",
    timestamp: "1h ago",
    unreadCount: 1,
    isOnline: true,
    isTyping: true,
    matchedDate: "3 days ago",
  },
  {
    id: 4,
    name: "Liam",
    age: 28,
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    lastMessage: "Thanks for the photo tips!",
    timestamp: "3h ago",
    unreadCount: 0,
    isOnline: false,
    isTyping: false,
    matchedDate: "5 days ago",
  },
  {
    id: 5,
    name: "James",
    age: 29,
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
    lastMessage: "That recipe sounds delicious 🍳",
    timestamp: "1d ago",
    unreadCount: 0,
    isOnline: false,
    isTyping: false,
    matchedDate: "1 week ago",
  },
  {
    id: 6,
    name: "Alex",
    age: 27,
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    lastMessage: "See you at the gallery opening!",
    timestamp: "2d ago",
    unreadCount: 0,
    isOnline: true,
    isTyping: false,
    matchedDate: "2 weeks ago",
  },
];

// Recent matches data
const recentMatches = [
  {
    id: 7,
    name: "Maya",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    matchedDate: "Just now",
  },
  {
    id: 8,
    name: "David",
    avatar:
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    matchedDate: "30m ago",
  },
  {
    id: 9,
    name: "Anna",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    matchedDate: "1h ago",
  },
  {
    id: 10,
    name: "Ryan",
    avatar:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg",
    matchedDate: "2h ago",
  },
];

const ChatList = () => {
  const insets = useSafeAreaInsets();

  const tabBarHeight = Platform.OS === "ios" ? 85 + insets.bottom : 70;
  const [activeTab, setActiveTab] = useState("messages"); // 'messages' or 'matches'
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
  }, []);

  const formatTimestamp = (timestamp) => {
    return timestamp;
  };

  const handleChatPress = (chat) => {
    router.push("chat");
  };

  const handleMatchPress = (match) => {
    router.push("chat");
  };

  const renderRecentMatch = ({ item }) => (
    <TouchableOpacity
      style={styles.matchItem}
      onPress={() => handleMatchPress(item)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.7)"]}
        style={styles.matchContainer}
      >
        <View style={styles.matchImageContainer}>
          <Image source={{ uri: item.avatar }} style={styles.matchImage} />
          <LinearGradient
            colors={["#ff6b6b", "#ee5a52"]}
            style={styles.newMatchBadge}
          >
            <AntDesign name="heart" size={12} color="white" />
          </LinearGradient>
        </View>
        <Text
          className="font-poppins-medium text-gray-900 text-sm mt-2"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="font-poppins text-gray-500 text-xs">
          {item.matchedDate}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatPress(item)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.85)", "rgba(255, 255, 255, 0.75)"]}
        style={styles.chatContainer}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <View style={styles.nameContainer}>
              <Text className="font-poppins-semibold text-gray-900 text-base">
                {item.name}
              </Text>
              <Text className="font-poppins text-gray-500 text-sm ml-1">
                {item.age}
              </Text>
            </View>
            <Text className="font-poppins text-gray-400 text-xs">
              {formatTimestamp(item.timestamp)}
            </Text>
          </View>

          <View style={styles.messageContainer}>
            {item.isTyping ? (
              <View style={styles.typingContainer}>
                <View style={styles.typingDots}>
                  <View style={[styles.typingDot, { animationDelay: "0ms" }]} />
                  <View
                    style={[styles.typingDot, { animationDelay: "150ms" }]}
                  />
                  <View
                    style={[styles.typingDot, { animationDelay: "300ms" }]}
                  />
                </View>
                <Text className="font-poppins text-rose-500 text-sm ml-2">
                  typing...
                </Text>
              </View>
            ) : (
              <Text
                className={`font-poppins text-sm ${item.unreadCount > 0 ? "text-gray-900" : "text-gray-600"}`}
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
            )}

            {item.unreadCount > 0 && (
              <LinearGradient
                colors={["#ff6b6b", "#ee5a52"]}
                style={styles.unreadBadge}
              >
                <Text className="font-poppins-bold text-white text-xs">
                  {item.unreadCount > 9 ? "9+" : item.unreadCount}
                </Text>
              </LinearGradient>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

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
        {/* Header */}
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.9)"]}
          style={styles.header}
        >
          <View className="flex-row justify-between items-center px-6 py-4">
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="arrow-back" size={24} color="#6B7280" />
            </TouchableOpacity>

            <View className="items-center">
              <Text className="font-poppins-bold text-xl text-gray-900">
                Messages
              </Text>
              <Text className="font-poppins text-sm text-gray-500">
                {chatData.filter((chat) => chat.unreadCount > 0).length} new
                messages
              </Text>
            </View>

            <TouchableOpacity style={styles.headerButton}>
              <Feather name="search" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "messages" && styles.activeTab]}
              onPress={() => setActiveTab("messages")}
            >
              {activeTab === "messages" ? (
                <LinearGradient
                  colors={["#ff6b6b", "#ee5a52"]}
                  style={styles.activeTabGradient}
                >
                  <Text className="font-poppins-semibold text-white">
                    Messages
                  </Text>
                </LinearGradient>
              ) : (
                <Text className="font-poppins-medium text-gray-600">
                  Messages
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "matches" && styles.activeTab]}
              onPress={() => setActiveTab("matches")}
            >
              {activeTab === "matches" ? (
                <LinearGradient
                  colors={["#ff6b6b", "#ee5a52"]}
                  style={styles.activeTabGradient}
                >
                  <Text className="font-poppins-semibold text-white">
                    New Matches
                  </Text>
                </LinearGradient>
              ) : (
                <Text className="font-poppins-medium text-gray-600">
                  New Matches
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {activeTab === "messages" ? (
            <>
              {/* Recent Matches Section */}
              <View style={styles.recentMatchesSection}>
                <View className="flex-row justify-between items-center px-6 mb-4">
                  <Text className="font-poppins-bold text-lg text-gray-900">
                    Recent Matches
                  </Text>
                  <TouchableOpacity>
                    <Text className="font-poppins-medium text-rose-600">
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={recentMatches}
                  renderItem={renderRecentMatch}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                />
              </View>

              {/* Messages List */}
              <View style={styles.messagesSection}>
                <Text className="font-poppins-bold text-lg text-gray-900 px-6 mb-4">
                  Messages
                </Text>
                <FlatList
                  data={chatData}
                  renderItem={renderChatItem}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                />
              </View>
            </>
          ) : (
            /* New Matches Grid */
            <View style={styles.matchesGrid}>
              <Text className="font-poppins-bold text-lg text-gray-900 px-6 mb-4">
                Start a Conversation
              </Text>
              <FlatList
                data={recentMatches}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.gridMatchItem}
                    onPress={() => handleMatchPress(item)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={[
                        "rgba(255, 255, 255, 0.9)",
                        "rgba(255, 255, 255, 0.8)",
                      ]}
                      style={styles.gridMatchContainer}
                    >
                      <Image
                        source={{ uri: item.avatar }}
                        style={styles.gridMatchImage}
                      />
                      <LinearGradient
                        colors={["rgba(0, 0, 0, 0.7)", "transparent"]}
                        style={styles.gridMatchOverlay}
                      >
                        <View style={styles.gridMatchInfo}>
                          <Text className="font-poppins-bold text-white text-lg">
                            {item.name}
                          </Text>
                          <Text className="font-poppins text-white/80 text-sm">
                            {item.matchedDate}
                          </Text>
                        </View>
                      </LinearGradient>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{ padding: 20 }}
                columnWrapperStyle={{ justifyContent: "space-between" }}
              />
            </View>
          )}
        </Animated.View>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  header: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 8,
    // elevation: 4,
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
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.08,
    // shadowRadius: 8,
    // elevation: 4,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  activeTab: {
    backgroundColor: "transparent",
  },
  activeTabGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  recentMatchesSection: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  matchItem: {
    marginRight: 16,
    width: 80,
  },
  matchContainer: {
    alignItems: "center",
    padding: 12,
    borderRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.08,
    // shadowRadius: 12,
    // elevation: 6,
  },
  matchImageContainer: {
    position: "relative",
  },
  matchImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  newMatchBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  messagesSection: {
    flex: 1,
    paddingTop: 8,
  },
  chatItem: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  chatContainer: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.06,
    // shadowRadius: 16,
    // elevation: 6,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "white",
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  typingDots: {
    flexDirection: "row",
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ff6b6b",
    marginHorizontal: 2,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  matchesGrid: {
    flex: 1,
    paddingTop: 20,
  },
  gridMatchItem: {
    width: (width - 60) / 2,
    height: 240,
    marginBottom: 20,
  },
  gridMatchContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 6 },
    // shadowOpacity: 0.1,
    // shadowRadius: 16,
    // elevation: 8,
  },
  gridMatchImage: {
    width: "100%",
    height: "100%",
  },
  gridMatchOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
  },
  gridMatchInfo: {
    padding: 16,
  },
});
