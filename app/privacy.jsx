import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
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
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

const PrivacyPolicy = () => {
  const [lastUpdated] = useState("December 15, 2024");
  const [privacyScore] = useState(95);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;

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

    // Animate privacy score
    setTimeout(() => {
      Animated.timing(scoreAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 500);
  }, []);

  const handleDataRequest = () => {
    Alert.alert("Data Request", "We'll email you a copy of your data within 24 hours");
  };

  const handleDeleteData = () => {
    Alert.alert(
      "Delete Data",
      "Are you sure you want to delete all your personal data? This action cannot be undone.",
      [
        { text: "Cancel" },
        { text: "Delete", style: "destructive", onPress: () => console.log("Delete data") },
      ]
    );
  };

  const renderSection = (title, content, icon, iconColor = '#ff6b6b') => (
    <View style={styles.section}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.sectionContainer}
      >
        <View style={styles.sectionHeader}>
          <LinearGradient
            colors={iconColor === '#ff6b6b' ? ['#ff6b6b', '#ee5a52'] : 
                   iconColor === '#10b981' ? ['#10b981', '#059669'] :
                   iconColor === '#3B82F6' ? ['#3B82F6', '#2563EB'] :
                   ['#8b5cf6', '#7c3aed']}
            style={styles.sectionIcon}
          >
            <Ionicons name={icon} size={18} color="white" />
          </LinearGradient>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Text style={styles.sectionContent}>{content}</Text>
      </LinearGradient>
    </View>
  );

  const renderDataType = (type, description, collected) => (
    <View style={styles.dataTypeRow}>
      <View style={styles.dataTypeInfo}>
        <Text style={styles.dataTypeName}>{type}</Text>
        <Text style={styles.dataTypeDesc}>{description}</Text>
      </View>
      <View style={[styles.dataTypeStatus, collected ? styles.collected : styles.notCollected]}>
        <Ionicons 
          name={collected ? "checkmark" : "close"} 
          size={14} 
          color={collected ? "#10b981" : "#EF4444"} 
        />
      </View>
    </View>
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
              <Text className="font-poppins-bold text-xl text-gray-900">Privacy Policy</Text>
              <Text className="font-poppins text-sm text-gray-500">Last updated: {lastUpdated}</Text>
            </View>
            
            <TouchableOpacity style={styles.headerButton} onPress={handleDataRequest}>
              <Feather name="download" size={24} color="#6B7280" />
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
            {/* Privacy Score */}
            <View style={styles.privacyScoreSection}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                style={styles.privacyScoreContainer}
              >
                <View style={styles.privacyScoreHeader}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.privacyScoreIcon}
                  >
                    <Ionicons name="shield-checkmark" size={32} color="white" />
                  </LinearGradient>
                  <View style={styles.privacyScoreText}>
                    <Text style={styles.privacyScoreTitle}>Your Privacy Score</Text>
                    <Text style={styles.privacyScoreSubtitle}>Based on our privacy practices</Text>
                  </View>
                  <View style={styles.privacyScoreValue}>
                    <Animated.Text style={styles.privacyScoreNumber}>
                      {scoreAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, privacyScore],
                      })}%
                    </Animated.Text>
                  </View>
                </View>
                
                <View style={styles.privacyScoreBar}>
                  <Animated.View
                    style={[
                      styles.privacyScoreProgress,
                      {
                        width: scoreAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', `${privacyScore}%`],
                        }),
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={['#10b981', '#059669']}
                      style={styles.progressGradient}
                    />
                  </Animated.View>
                </View>
                
                <View style={styles.privacyFeatures}>
                  <View style={styles.privacyFeature}>
                    <Ionicons name="lock-closed" size={16} color="#10b981" />
                    <Text style={styles.privacyFeatureText}>End-to-end encryption</Text>
                  </View>
                  <View style={styles.privacyFeature}>
                    <Ionicons name="eye-off" size={16} color="#10b981" />
                    <Text style={styles.privacyFeatureText}>No data selling</Text>
                  </View>
                  <View style={styles.privacyFeature}>
                    <Ionicons name="trash" size={16} color="#10b981" />
                    <Text style={styles.privacyFeatureText}>Easy data deletion</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Introduction */}
            <View style={styles.introduction}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                style={styles.introContainer}
              >
                <Text style={styles.introText}>
                  At LoveConnect, your privacy is our priority. This policy explains how we collect, use, protect, and share your personal information when you use our dating platform.
                </Text>
              </LinearGradient>
            </View>

            {/* Information We Collect */}
            <View style={styles.section}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                style={styles.sectionContainer}
              >
                <View style={styles.sectionHeader}>
                  <LinearGradient
                    colors={['#ff6b6b', '#ee5a52']}
                    style={styles.sectionIcon}
                  >
                    <Ionicons name="information-circle" size={18} color="white" />
                  </LinearGradient>
                  <Text style={styles.sectionTitle}>Information We Collect</Text>
                </View>
                
                <Text style={styles.sectionContent}>
                  We collect different types of information to provide and improve our service:
                </Text>
                
                <View style={styles.dataTypesContainer}>
                  {renderDataType("Profile Information", "Name, age, photos, bio", true)}
                  {renderDataType("Location Data", "Approximate location for matching", true)}
                  {renderDataType("Usage Data", "How you interact with the app", true)}
                  {renderDataType("Device Information", "Device type, OS version", true)}
                  {renderDataType("Communications", "Messages between users", true)}
                  {renderDataType("Payment Information", "For premium subscriptions", true)}
                  {renderDataType("Social Media", "If you connect social accounts", false)}
                  {renderDataType("Biometric Data", "Face verification (optional)", false)}
                </View>
              </LinearGradient>
            </View>

            {/* How We Use Information */}
            {renderSection(
              "How We Use Your Information",
              "We use your information to: provide matching services, improve our algorithms, ensure safety and security, process payments, send important updates, and comply with legal requirements. We never sell your personal data to third parties.",
              "cog",
              "#3B82F6"
            )}

            {/* Information Sharing */}
            {renderSection(
              "Information Sharing",
              "We only share your information with other users as part of our matching service, with service providers who help us operate the platform, when required by law, or with your explicit consent. We use strict contractual safeguards with all third parties.",
              "share",
              "#8b5cf6"
            )}

            {/* Data Security */}
            <View style={styles.section}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                style={styles.sectionContainer}
              >
                <View style={styles.sectionHeader}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.sectionIcon}
                  >
                    <Ionicons name="shield-checkmark" size={18} color="white" />
                  </LinearGradient>
                  <Text style={styles.sectionTitle}>Data Security</Text>
                </View>
                
                <Text style={styles.sectionContent}>
                  We implement industry-standard security measures to protect your data:
                </Text>
                
                <View style={styles.securityFeatures}>
                  <View style={styles.securityFeature}>
                    <LinearGradient
                      colors={['#dcfce7', '#bbf7d0']}
                      style={styles.securityFeatureIcon}
                    >
                      <Ionicons name="lock-closed" size={16} color="#10b981" />
                    </LinearGradient>
                    <Text style={styles.securityFeatureText}>SSL/TLS encryption for all data transmission</Text>
                  </View>
                  
                  <View style={styles.securityFeature}>
                    <LinearGradient
                      colors={['#dcfce7', '#bbf7d0']}
                      style={styles.securityFeatureIcon}
                    >
                      <Ionicons name="server" size={16} color="#10b981" />
                    </LinearGradient>
                    <Text style={styles.securityFeatureText}>Encrypted data storage on secure servers</Text>
                  </View>
                  
                  <View style={styles.securityFeature}>
                    <LinearGradient
                      colors={['#dcfce7', '#bbf7d0']}
                      style={styles.securityFeatureIcon}
                    >
                      <Ionicons name="eye" size={16} color="#10b981" />
                    </LinearGradient>
                    <Text style={styles.securityFeatureText}>Regular security audits and monitoring</Text>
                  </View>
                  
                  <View style={styles.securityFeature}>
                    <LinearGradient
                      colors={['#dcfce7', '#bbf7d0']}
                      style={styles.securityFeatureIcon}
                    >
                      <Ionicons name="people" size={16} color="#10b981" />
                    </LinearGradient>
                    <Text style={styles.securityFeatureText}>Limited employee access on need-to-know basis</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Your Rights */}
            {renderSection(
              "Your Privacy Rights",
              "You have the right to access, update, or delete your personal information. You can also opt out of certain communications, request data portability, and control how your information is used for marketing purposes.",
              "person",
              "#3B82F6"
            )}

            {/* Data Retention */}
            {renderSection(
              "Data Retention",
              "We retain your information for as long as your account is active or as needed to provide services. When you delete your account, we remove your personal information within 30 days, except where required by law.",
              "time",
              "#8b5cf6"
            )}

            {/* Cookies and Tracking */}
            {renderSection(
              "Cookies and Tracking",
              "We use cookies and similar technologies to improve your experience, analyze usage patterns, and provide personalized content. You can control cookie preferences through your device settings.",
              "analytics",
              "#ff6b6b"
            )}

            {/* International Transfers */}
            {renderSection(
              "International Data Transfers",
              "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers.",
              "globe",
              "#10b981"
            )}

            {/* Children's Privacy */}
            {renderSection(
              "Children's Privacy",
              "Our service is not intended for users under 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete the information immediately.",
              "shield",
              "#EF4444"
            )}

            {/* Changes to Policy */}
            {renderSection(
              "Changes to This Policy",
              "We may update this privacy policy from time to time. We will notify you of significant changes through the app or email. Your continued use of the service after changes constitutes acceptance of the updated policy.",
              "refresh",
              "#8b5cf6"
            )}

            {/* Data Management Actions */}
            <View style={styles.actionsSection}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                style={styles.actionsContainer}
              >
                <Text style={styles.actionsTitle}>Manage Your Data</Text>
                <Text style={styles.actionsSubtitle}>
                  Take control of your personal information
                </Text>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleDataRequest}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#3B82F6', '#2563EB']}
                      style={styles.actionButtonGradient}
                    >
                      <Ionicons name="download" size={18} color="white" />
                      <Text style={styles.actionButtonText}>Download My Data</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleDeleteData}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#EF4444', '#DC2626']}
                      style={styles.actionButtonGradient}
                    >
                      <Ionicons name="trash" size={18} color="white" />
                      <Text style={styles.actionButtonText}>Delete My Data</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            {/* Contact Information */}
            <View style={styles.section}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                style={styles.sectionContainer}
              >
                <View style={styles.sectionHeader}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.sectionIcon}
                  >
                    <Ionicons name="mail" size={18} color="white" />
                  </LinearGradient>
                  <Text style={styles.sectionTitle}>Contact Our Privacy Team</Text>
                </View>
                
                <Text style={styles.sectionContent}>
                  If you have questions about this privacy policy or our data practices:
                </Text>
                
                <View style={styles.contactInfo}>
                  <View style={styles.contactItem}>
                    <Ionicons name="mail" size={16} color="#6B7280" />
                    <Text style={styles.contactText}>privacy@loveconnect.com</Text>
                  </View>
                  <View style={styles.contactItem}>
                    <Ionicons name="call" size={16} color="#6B7280" />
                    <Text style={styles.contactText}>1-800-PRIVACY</Text>
                  </View>
                  <View style={styles.contactItem}>
                    <Ionicons name="location" size={16} color="#6B7280" />
                    <Text style={styles.contactText}>Data Protection Officer, 123 Privacy Lane</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

          </Animated.View>
        </ScrollView>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

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
  privacyScoreSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  privacyScoreContainer: {
    borderRadius: 24,
    padding: 24,
  },
  privacyScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  privacyScoreIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  privacyScoreText: {
    flex: 1,
  },
  privacyScoreTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  privacyScoreSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },
  privacyScoreValue: {
    alignItems: 'center',
  },
  privacyScoreNumber: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#10b981',
  },
  privacyScoreBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  privacyScoreProgress: {
    height: '100%',
    borderRadius: 4,
  },
  progressGradient: {
    flex: 1,
    borderRadius: 4,
  },
  privacyFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  privacyFeature: {
    alignItems: 'center',
    flex: 1,
  },
  privacyFeatureText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#10b981',
    textAlign: 'center',
    marginTop: 4,
  },
  introduction: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  introContainer: {
    borderRadius: 20,
    padding: 20,
  },
  introText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#4B5563',
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  sectionContainer: {
    borderRadius: 20,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    flex: 1,
  },
  sectionContent: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#4B5563',
    lineHeight: 24,
  },
  dataTypesContainer: {
    marginTop: 16,
    gap: 12,
  },
  dataTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  dataTypeInfo: {
    flex: 1,
  },
  dataTypeName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  dataTypeDesc: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },
  dataTypeStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collected: {
    backgroundColor: '#dcfce7',
  },
  notCollected: {
    backgroundColor: '#fee2e2',
  },
  securityFeatures: {
    marginTop: 16,
    gap: 12,
  },
  securityFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityFeatureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  securityFeatureText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1F2937',
    flex: 1,
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  actionsContainer: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  actionsTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  actionsSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginLeft: 6,
  },
  contactInfo: {
    marginTop: 16,
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1F2937',
    marginLeft: 8,
  },
});