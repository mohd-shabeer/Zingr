import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

const PrivacySettings = () => {
  // Privacy Settings State
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [showLastSeen, setShowLastSeen] = useState(false);
  const [showReadReceipts, setShowReadReceipts] = useState(true);
  const [allowLocationSharing, setAllowLocationSharing] = useState(true);
  const [showExactAge, setShowExactAge] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [hideFromFriends, setHideFromFriends] = useState(false);
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [showInSearch, setShowInSearch] = useState(true);
  const [allowScreenshots, setAllowScreenshots] = useState(true);
  
  // Discovery Settings
  const [onlyVerifiedUsers, setOnlyVerifiedUsers] = useState(false);
  const [hideUnverifiedUsers, setHideUnverifiedUsers] = useState(false);
  const [blockNewProfiles, setBlockNewProfiles] = useState(false);
  
  // Data Settings
  const [dataCollection, setDataCollection] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(true);
  const [analyticsTracking, setAnalyticsTracking] = useState(true);
  
  // Modals
  const [showBlockedUsers, setShowBlockedUsers] = useState(false);
  const [showDataExport, setShowDataExport] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;

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

  const showModal = (setModal) => {
    setModal(true);
    Animated.timing(modalAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = (setModal) => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setModal(false);
    });
  };

  const handleIncognitoToggle = (value) => {
    if (value) {
      Alert.alert(
        "Incognito Mode",
        "Your profile will be hidden from discovery. You can still message existing matches.",
        [
          { text: "Cancel" },
          { text: "Enable", onPress: () => setIncognitoMode(true) },
        ]
      );
    } else {
      setIncognitoMode(false);
    }
  };

  const handleDataExport = () => {
    Alert.alert(
      "Export Data",
      "We'll email you a copy of your data within 24 hours.",
      [
        { text: "Cancel" },
        { text: "Export", onPress: () => console.log("Export data") },
      ]
    );
  };

  const handleDeleteData = () => {
    Alert.alert(
      "Delete Personal Data",
      "This will permanently delete all your personal data. This action cannot be undone.",
      [
        { text: "Cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => console.log("Delete data") 
        },
      ]
    );
  };

  const renderSwitchItem = (icon, title, subtitle, value, onValueChange, iconColor = "#E11D48", isPremium = false) => (
    <View style={styles.settingItem}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.85)', 'rgba(255, 255, 255, 0.75)']}
        style={styles.settingContainer}
      >
        <View style={styles.settingLeft}>
          <LinearGradient
            colors={iconColor === "#E11D48" ? ['#fce7f3', '#f3e8ff'] : ['#dbeafe', '#bfdbfe']}
            style={styles.settingIcon}
          >
            <Ionicons name={icon} size={20} color={iconColor} />
            {isPremium && (
              <View style={styles.premiumBadge}>
                <LinearGradient
                  colors={['#fbbf24', '#f59e0b']}
                  style={styles.premiumBadgeGradient}
                >
                  <AntDesign name="star" size={8} color="white" />
                </LinearGradient>
              </View>
            )}
          </LinearGradient>
          <View style={styles.settingText}>
            <View style={styles.settingTitleRow}>
              <Text className="font-poppins-medium text-gray-900 text-base">{title}</Text>
              {isPremium && (
                <LinearGradient
                  colors={['#fbbf24', '#f59e0b']}
                  style={styles.premiumTag}
                >
                  <Text className="font-poppins-bold text-white text-xs">PRO</Text>
                </LinearGradient>
              )}
            </View>
            {subtitle && (
              <Text className="font-poppins text-gray-600 text-sm">{subtitle}</Text>
            )}
          </View>
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#E5E7EB', true: '#FCA5A5' }}
          thumbColor={value ? '#E11D48' : '#9CA3AF'}
          ios_backgroundColor="#E5E7EB"
          disabled={isPremium && !value} // Disable if premium and not enabled
        />
      </LinearGradient>
    </View>
  );

  const renderActionItem = (icon, title, subtitle, onPress, iconColor = "#E11D48", textColor = "text-gray-900") => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.85)', 'rgba(255, 255, 255, 0.75)']}
        style={styles.settingContainer}
      >
        <View style={styles.settingLeft}>
          <LinearGradient
            colors={iconColor === "#E11D48" 
              ? ['#fce7f3', '#f3e8ff'] 
              : iconColor === "#EF4444"
              ? ['#fee2e2', '#fecaca']
              : ['#dbeafe', '#bfdbfe']
            }
            style={styles.settingIcon}
          >
            <Ionicons name={icon} size={20} color={iconColor} />
          </LinearGradient>
          <View style={styles.settingText}>
            <Text className={`font-poppins-medium ${textColor} text-base`}>{title}</Text>
            {subtitle && (
              <Text className="font-poppins text-gray-600 text-sm">{subtitle}</Text>
            )}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSectionHeader = (title, icon, description) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderContent}>
        <LinearGradient
          colors={['#ff6b6b', '#ee5a52']}
          style={styles.sectionIcon}
        >
          <Ionicons name={icon} size={18} color="white" />
        </LinearGradient>
        <View style={styles.sectionTitleContainer}>
          <Text className="font-poppins-bold text-lg text-gray-900">{title}</Text>
          {description && (
            <Text className="font-poppins text-gray-600 text-sm mt-1">{description}</Text>
          )}
        </View>
      </View>
    </View>
  );

  const BlockedUsersModal = () => (
    <Modal
      visible={showBlockedUsers}
      transparent={true}
      animationType="none"
      onRequestClose={() => hideModal(setShowBlockedUsers)}
    >
      <Animated.View style={[styles.modalOverlay, { opacity: modalAnim }]}>
        <BlurView intensity={80} tint="light" style={styles.modalBlur}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => hideModal(setShowBlockedUsers)}
            activeOpacity={1}
          >
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [
                    {
                      scale: modalAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                  opacity: modalAnim,
                }
              ]}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
                style={styles.modalContainer}
              >
                <View style={styles.modalHeader}>
                  <Text className="font-poppins-bold text-xl text-gray-900">Blocked Users</Text>
                  <TouchableOpacity
                    onPress={() => hideModal(setShowBlockedUsers)}
                    style={styles.modalCloseButton}
                  >
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.emptyState}>
                  <LinearGradient
                    colors={['#f3f4f6', '#e5e7eb']}
                    style={styles.emptyIcon}
                  >
                    <Ionicons name="shield-checkmark" size={32} color="#9CA3AF" />
                  </LinearGradient>
                  <Text className="font-poppins-semibold text-gray-900 text-lg mb-2">No Blocked Users</Text>
                  <Text className="font-poppins text-gray-600 text-center">
                    Users you block will appear here. You can unblock them anytime.
                  </Text>
                </View>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
    </Modal>
  );

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
            <TouchableOpacity style={styles.headerButton} onPress={()=>router.back()}>
              <Ionicons name="arrow-back" size={24} color="#6B7280" />
            </TouchableOpacity>
            
            <View className="items-center">
              <View style={styles.headerTitle}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.privacyIcon}
                >
                  <Ionicons name="shield-checkmark" size={20} color="white" />
                </LinearGradient>
                <Text className="font-poppins-bold text-xl text-gray-900 ml-2">Privacy</Text>
              </View>
              <Text className="font-poppins text-sm text-gray-500">Control your privacy</Text>
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
            {/* Profile Visibility */}
            {renderSectionHeader(
              "Profile Visibility", 
              "eye-outline",
              "Control who can see your profile and information"
            )}
            <View style={styles.section}>
              {renderSwitchItem(
                "radio-outline",
                "Show Online Status",
                "Let others see when you're active",
                showOnlineStatus,
                setShowOnlineStatus
              )}
              
              {renderSwitchItem(
                "time-outline",
                "Show Last Seen",
                "Display when you were last active",
                showLastSeen,
                setShowLastSeen,
                "#E11D48",
                true
              )}
              
              {renderSwitchItem(
                "calendar-outline",
                "Show Exact Age",
                "Display your exact age instead of age range",
                showExactAge,
                setShowExactAge
              )}
              
              {renderSwitchItem(
                "navigate-outline",
                "Show Distance",
                "Display distance to other users",
                showDistance,
                setShowDistance
              )}
              
              {renderSwitchItem(
                "eye-off-outline",
                "Incognito Mode",
                "Hide your profile from discovery temporarily",
                incognitoMode,
                handleIncognitoToggle,
                "#E11D48",
                true
              )}
            </View>

            {/* Discovery Settings */}
            {renderSectionHeader(
              "Discovery Controls", 
              "search-outline",
              "Manage how you appear in others' discovery"
            )}
            <View style={styles.section}>
              {renderSwitchItem(
                "globe-outline",
                "Show in Search",
                "Allow others to find you in discovery",
                showInSearch,
                setShowInSearch
              )}
              
              {renderSwitchItem(
                "people-outline",
                "Hide from Friends",
                "Don't show my profile to imported contacts",
                hideFromFriends,
                setHideFromFriends
              )}
              
              {renderSwitchItem(
                "shield-checkmark-outline",
                "Only Verified Users",
                "Only show verified profiles in discovery",
                onlyVerifiedUsers,
                setOnlyVerifiedUsers,
                "#3B82F6"
              )}
              
              {renderSwitchItem(
                "hourglass-outline",
                "Block New Profiles",
                "Don't show profiles created in last 24 hours",
                blockNewProfiles,
                setBlockNewProfiles
              )}
            </View>

            {/* Communication Privacy */}
            {renderSectionHeader(
              "Communication", 
              "chatbubble-outline",
              "Control your messaging and interaction settings"
            )}
            <View style={styles.section}>
              {renderSwitchItem(
                "checkmark-done-outline",
                "Read Receipts",
                "Let others know when you've read messages",
                showReadReceipts,
                setShowReadReceipts
              )}
              
              {renderSwitchItem(
                "location-outline",
                "Location Sharing",
                "Share your location in messages",
                allowLocationSharing,
                setAllowLocationSharing
              )}
              
              {renderSwitchItem(
                "camera-outline",
                "Allow Screenshots",
                "Allow others to screenshot your messages",
                allowScreenshots,
                setAllowScreenshots,
                "#E11D48",
                true
              )}
            </View>

            {/* Data & Privacy */}
            {renderSectionHeader(
              "Data & Analytics", 
              "bar-chart-outline",
              "Control how your data is used and collected"
            )}
            <View style={styles.section}>
              {renderSwitchItem(
                "analytics-outline",
                "Data Collection",
                "Allow collection for app improvement",
                dataCollection,
                setDataCollection,
                "#6366F1"
              )}
              
              {renderSwitchItem(
                "megaphone-outline",
                "Personalized Ads",
                "Show ads based on your interests",
                personalizedAds,
                setPersonalizedAds,
                "#6366F1"
              )}
              
              {renderSwitchItem(
                "stats-chart-outline",
                "Analytics Tracking",
                "Allow anonymous usage analytics",
                analyticsTracking,
                setAnalyticsTracking,
                "#6366F1"
              )}
            </View>

            {/* Account Actions */}
            {renderSectionHeader(
              "Account Management", 
              "person-outline",
              "Manage blocked users and account data"
            )}
            <View style={styles.section}>
              {renderActionItem(
                "ban-outline",
                "Blocked Users",
                "View and manage blocked users",
                () => showModal(setShowBlockedUsers)
              )}
              
              {renderActionItem(
                "download-outline",
                "Export My Data",
                "Download a copy of your personal data",
                handleDataExport,
                "#3B82F6"
              )}
              
              {renderActionItem(
                "trash-outline",
                "Delete Personal Data",
                "Permanently delete all your data",
                handleDeleteData,
                "#EF4444",
                "text-red-600"
              )}
            </View>

            {/* Legal & Support */}
            {renderSectionHeader(
              "Legal & Support", 
              "document-text-outline",
              "Privacy policies and help resources"
            )}
            <View style={styles.section}>
              {renderActionItem(
                "shield-outline",
                "Privacy Policy",
                "Read our privacy policy",
                () => Alert.alert("Privacy Policy", "Open privacy policy"),
                "#10B981"
              )}
              
              {renderActionItem(
                "document-text-outline",
                "Data Protection Rights",
                "Learn about your data rights",
                () => Alert.alert("Data Rights", "Open data protection info"),
                "#10B981"
              )}
              
              {renderActionItem(
                "help-circle-outline",
                "Privacy Support",
                "Get help with privacy settings",
                () => Alert.alert("Support", "Contact privacy support"),
                "#10B981"
              )}
            </View>

            {/* Privacy Score */}
            <View style={styles.privacyScore}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                style={styles.privacyScoreContainer}
              >
                <View style={styles.privacyScoreHeader}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.privacyScoreIcon}
                  >
                    <Ionicons name="shield-checkmark" size={24} color="white" />
                  </LinearGradient>
                  <View style={styles.privacyScoreText}>
                    <Text className="font-poppins-bold text-lg text-gray-900">Privacy Score</Text>
                    <Text className="font-poppins text-gray-600 text-sm">Your privacy is well protected</Text>
                  </View>
                  <View style={styles.privacyScoreValue}>
                    <Text className="font-poppins-bold text-2xl text-green-600">85%</Text>
                  </View>
                </View>
                
                <View style={styles.privacyScoreBar}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={[styles.privacyScoreProgress, { width: '85%' }]}
                  />
                </View>
                
                <Text className="font-poppins text-gray-500 text-xs text-center mt-2">
                  Based on your current privacy settings
                </Text>
              </LinearGradient>
            </View>

          </Animated.View>
        </ScrollView>

        <BlockedUsersModal />
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default PrivacySettings;

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
  privacyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    gap: 12,
  },
  settingItem: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  premiumBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  premiumBadgeGradient: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  premiumTag: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  privacyScore: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  privacyScoreContainer: {
    borderRadius: 20,
    padding: 20,
  },
  privacyScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  privacyScoreIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  privacyScoreText: {
    flex: 1,
  },
  privacyScoreValue: {
    alignItems: 'center',
  },
  privacyScoreBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  privacyScoreProgress: {
    height: '100%',
    borderRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: width - 40,
    maxHeight: height - 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalContainer: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
});