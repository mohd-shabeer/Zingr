import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const Settings = () => {
  const insets = useSafeAreaInsets();

  const tabBarHeight = Platform.OS === "ios" ? 85 + insets.bottom : 70;
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [readReceipts, setReadReceipts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => console.log("Logout"),
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Delete Account"),
        },
      ]
    );
  };

  const renderSettingItem = (
    icon,
    title,
    subtitle,
    onPress,
    rightComponent
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.85)", "rgba(255, 255, 255, 0.75)"]}
        style={styles.settingContainer}
      >
        <View style={styles.settingLeft}>
          <LinearGradient
            colors={["#fce7f3", "#f3e8ff"]}
            style={styles.settingIcon}
          >
            <Ionicons name={icon} size={20} color="#E11D48" />
          </LinearGradient>
          <View style={styles.settingText}>
            <Text className="font-poppins-medium text-gray-900 text-base">
              {title}
            </Text>
            {subtitle && (
              <Text className="font-poppins text-gray-600 text-sm">
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {rightComponent || (
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSwitchItem = (icon, title, subtitle, value, onValueChange) => (
    <View style={styles.settingItem}>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.85)", "rgba(255, 255, 255, 0.75)"]}
        style={styles.settingContainer}
      >
        <View style={styles.settingLeft}>
          <LinearGradient
            colors={["#fce7f3", "#f3e8ff"]}
            style={styles.settingIcon}
          >
            <Ionicons name={icon} size={20} color="#E11D48" />
          </LinearGradient>
          <View style={styles.settingText}>
            <Text className="font-poppins-medium text-gray-900 text-base">
              {title}
            </Text>
            {subtitle && (
              <Text className="font-poppins text-gray-600 text-sm">
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#E5E7EB", true: "#FCA5A5" }}
          thumbColor={value ? "#E11D48" : "#9CA3AF"}
          ios_backgroundColor="#E5E7EB"
        />
      </LinearGradient>
    </View>
  );

  const renderSectionHeader = (title, icon) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderContent}>
        <LinearGradient
          colors={["#ff6b6b", "#ee5a52"]}
          style={styles.sectionIcon}
        >
          <Ionicons name={icon} size={18} color="white" />
        </LinearGradient>
        <Text className="font-poppins-bold text-lg text-gray-900 ml-3">
          {title}
        </Text>
      </View>
    </View>
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
          <View className="flex-row justify-between items-center px-6 py-4">
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="arrow-back" size={24} color="#6B7280" />
            </TouchableOpacity>

            <View className="items-center">
              <Text className="font-poppins-bold text-xl text-gray-900">
                Settings
              </Text>
              <Text className="font-poppins text-sm text-gray-500">
                Manage your preferences
              </Text>
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
            {/* Account Section */}
            {renderSectionHeader("Account", "person-circle-outline")}
            <View style={styles.section}>
              {renderSettingItem(
                "card-outline",
                "Premium Membership",
                "Unlock exclusive features",
                () => router.push("premium"),
                <LinearGradient
                  colors={["#fbbf24", "#f59e0b"]}
                  style={styles.premiumBadge}
                >
                  <Text className="font-poppins-bold text-white text-xs">
                    UPGRADE
                  </Text>
                </LinearGradient>
              )}

              {renderSettingItem(
                "create-outline",
                "Edit Profile",
                "Update your information",
                () => router.push("edit-profile")
              )}

              {renderSettingItem(
                "shield-checkmark-outline",
                "Verification",
                "Verify your profile",
                () => router.push("verification")
              )}

              {renderSettingItem(
                "lock-closed-outline",
                "Privacy Settings",
                "Control who can see you",
                () => router.push("privacy-settings")
              )}
            </View>

            {/* Preferences Section */}
            {renderSectionHeader("Preferences", "settings-outline")}
            <View style={styles.section}>
              {renderSwitchItem(
                "notifications-outline",
                "Push Notifications",
                "Get notified about matches and messages",
                notifications,
                setNotifications
              )}

              {renderSwitchItem(
                "location-outline",
                "Location Services",
                "Allow location access for matches",
                locationServices,
                setLocationServices
              )}

              {renderSwitchItem(
                "radio-outline",
                "Show Online Status",
                "Let others see when you're active",
                showOnline,
                setShowOnline
              )}

              {renderSwitchItem(
                "navigate-outline",
                "Show Distance",
                "Display distance to other users",
                showDistance,
                setShowDistance
              )}

              {renderSwitchItem(
                "checkmark-done-outline",
                "Read Receipts",
                "Let others know when you've read messages",
                readReceipts,
                setReadReceipts
              )}
            </View>

            {/* Discovery Section */}
            {renderSectionHeader("Discovery", "search-outline")}
            <View style={styles.section}>
              {renderSettingItem(
                "options-outline",
                "Discovery Preferences",
                "Age range, distance, and more",
                () => router.push("discovery-preferences")
              )}

              {renderSettingItem(
                "filter-outline",
                "Filters",
                "Set your matching criteria",
                () => router.push("filters")
              )}

              {renderSettingItem(
                "eye-off-outline",
                "Hide Profile",
                "Temporarily hide from discovery",
                () => Alert.alert("Hide Profile", "Toggle profile visibility")
              )}
            </View>

            {/* Support Section */}
            {renderSectionHeader("Support", "help-circle-outline")}
            <View style={styles.section}>
              {renderSettingItem(
                "chatbubble-ellipses-outline",
                "Contact Support",
                "Get help with your account",
                () => router.push("contact-support")
              )}

              {renderSettingItem(
                "document-text-outline",
                "Terms of Service",
                "Read our terms and conditions",
                () => router.push("terms")
              )}

              {renderSettingItem(
                "shield-outline",
                "Privacy Policy",
                "Learn about data protection",
                () => router.push("privacy")
              )}

              {renderSettingItem(
                "star-outline",
                "Rate the App",
                "Share your feedback",
                () => Alert.alert("Rate App", "Open app store rating")
              )}
            </View>

            {/* Danger Zone */}
            {renderSectionHeader("Account Actions", "warning-outline")}
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.settingItem}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.85)",
                    "rgba(255, 255, 255, 0.75)",
                  ]}
                  style={styles.settingContainer}
                >
                  <View style={styles.settingLeft}>
                    <LinearGradient
                      colors={["#fee2e2", "#fecaca"]}
                      style={styles.settingIcon}
                    >
                      <Ionicons
                        name="log-out-outline"
                        size={20}
                        color="#EF4444"
                      />
                    </LinearGradient>
                    <View style={styles.settingText}>
                      <Text className="font-poppins-medium text-red-600 text-base">
                        Logout
                      </Text>
                      <Text className="font-poppins text-gray-600 text-sm">
                        Sign out of your account
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#EF4444" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.settingItem}
                onPress={handleDeleteAccount}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.85)",
                    "rgba(255, 255, 255, 0.75)",
                  ]}
                  style={styles.settingContainer}
                >
                  <View style={styles.settingLeft}>
                    <LinearGradient
                      colors={["#fee2e2", "#fecaca"]}
                      style={styles.settingIcon}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#DC2626"
                      />
                    </LinearGradient>
                    <View style={styles.settingText}>
                      <Text className="font-poppins-medium text-red-700 text-base">
                        Delete Account
                      </Text>
                      <Text className="font-poppins text-gray-600 text-sm">
                        Permanently delete your account
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#DC2626" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* App Version */}
            <View style={styles.versionContainer}>
              <Text className="font-poppins text-gray-500 text-center text-sm">
                Version 1.0.0
              </Text>
              <Text className="font-poppins text-gray-400 text-center text-xs mt-1">
                Made with ❤️ for meaningful connections
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  header: {
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
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    paddingHorizontal: 20,
    gap: 12,
  },
  settingItem: {
    borderRadius: 16,
    overflow: "hidden",
  },
  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  premiumBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  versionContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 16,
  },
});
