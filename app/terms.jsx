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
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

const TermsOfService = () => {
  const [lastUpdated] = useState("December 15, 2024");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
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

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    Alert.alert("Terms Accepted", "Thank you for accepting our Terms of Service");
  };

  const handleContactSupport = () => {
    Alert.alert("Contact Support", "Navigate to support page");
  };

  const renderSection = (title, content, icon) => (
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
            <Ionicons name={icon} size={18} color="white" />
          </LinearGradient>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Text style={styles.sectionContent}>{content}</Text>
      </LinearGradient>
    </View>
  );

  const renderSubSection = (title, content) => (
    <View style={styles.subSection}>
      <Text style={styles.subSectionTitle}>{title}</Text>
      <Text style={styles.subSectionContent}>{content}</Text>
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
              <Text className="font-poppins-bold text-xl text-gray-900">Terms of Service</Text>
              <Text className="font-poppins text-sm text-gray-500">Last updated: {lastUpdated}</Text>
            </View>
            
            <TouchableOpacity style={styles.headerButton} onPress={handleContactSupport}>
              <Feather name="help-circle" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Introduction */}
            <View style={styles.introduction}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                style={styles.introContainer}
              >
                <LinearGradient
                  colors={['#3B82F6', '#2563EB']}
                  style={styles.introIcon}
                >
                  <MaterialIcons name="gavel" size={32} color="white" />
                </LinearGradient>
                
                <Text style={styles.introTitle}>Welcome to LoveConnect</Text>
                <Text style={styles.introText}>
                  These Terms of Service govern your use of our dating platform. By using our service, you agree to these terms. Please read them carefully.
                </Text>
                
                <View style={styles.quickStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>15</Text>
                    <Text style={styles.statLabel}>Sections</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>~10 min</Text>
                    <Text style={styles.statLabel}>Read Time</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* 1. Acceptance of Terms */}
            {renderSection(
              "1. Acceptance of Terms",
              "By accessing and using LoveConnect, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
              "checkmark-circle"
            )}

            {/* 2. Description of Service */}
            {renderSection(
              "2. Description of Service",
              "LoveConnect is a social networking and dating platform that allows users to create profiles, match with other users, and communicate through our messaging system. Our service is designed to help people find meaningful connections and relationships.",
              "heart"
            )}

            {/* 3. User Registration */}
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
                    <Ionicons name="person-add" size={18} color="white" />
                  </LinearGradient>
                  <Text style={styles.sectionTitle}>3. User Registration</Text>
                </View>
                
                {renderSubSection(
                  "Age Requirement",
                  "You must be at least 18 years old to use our service. Users under 18 are prohibited from creating accounts."
                )}
                
                {renderSubSection(
                  "Account Information",
                  "You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete."
                )}
                
                {renderSubSection(
                  "Account Security",
                  "You are responsible for safeguarding your password and for maintaining the confidentiality of your account."
                )}
              </LinearGradient>
            </View>

            {/* 4. User Conduct */}
            <View style={styles.section}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                style={styles.sectionContainer}
              >
                <View style={styles.sectionHeader}>
                  <LinearGradient
                    colors={['#EF4444', '#DC2626']}
                    style={styles.sectionIcon}
                  >
                    <Ionicons name="shield-checkmark" size={18} color="white" />
                  </LinearGradient>
                  <Text style={styles.sectionTitle}>4. User Conduct</Text>
                </View>
                
                <Text style={styles.sectionContent}>You agree not to:</Text>
                
                <View style={styles.prohibitedList}>
                  <Text style={styles.listItem}>• Use the service for any unlawful purpose</Text>
                  <Text style={styles.listItem}>• Harass, abuse, or harm other users</Text>
                  <Text style={styles.listItem}>• Post inappropriate or offensive content</Text>
                  <Text style={styles.listItem}>• Create fake or misleading profiles</Text>
                  <Text style={styles.listItem}>• Spam or send unsolicited communications</Text>
                  <Text style={styles.listItem}>• Violate any laws in your jurisdiction</Text>
                </View>
              </LinearGradient>
            </View>

            {/* 5. Privacy and Data */}
            {renderSection(
              "5. Privacy and Data",
              "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection and use of your personal information.",
              "lock-closed"
            )}

            {/* 6. Content and Intellectual Property */}
            {renderSection(
              "6. Content and Intellectual Property",
              "Users retain ownership of content they post. By posting content, you grant us a license to use, display, and distribute your content on our platform. You must not infringe on others' intellectual property rights.",
              "document-text"
            )}

            {/* 7. Premium Services */}
            <View style={styles.section}>
              <LinearGradient
                colors={['rgba(251, 191, 36, 0.1)', 'rgba(245, 158, 11, 0.1)']}
                style={[styles.sectionContainer, { borderWidth: 1, borderColor: '#fbbf24' }]}
              >
                <View style={styles.sectionHeader}>
                  <LinearGradient
                    colors={['#fbbf24', '#f59e0b']}
                    style={styles.sectionIcon}
                  >
                    <Ionicons name="diamond" size={18} color="white" />
                  </LinearGradient>
                  <Text style={styles.sectionTitle}>7. Premium Services</Text>
                </View>
                
                {renderSubSection(
                  "Subscription Terms",
                  "Premium features are offered on a subscription basis. Payments are charged to your payment method through your app store account."
                )}
                
                {renderSubSection(
                  "Auto-Renewal",
                  "Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period."
                )}
                
                {renderSubSection(
                  "Refunds",
                  "Refunds are handled according to the app store's refund policy. We do not provide direct refunds for premium services."
                )}
              </LinearGradient>
            </View>

            {/* 8. Termination */}
            {renderSection(
              "8. Termination",
              "We may terminate or suspend your account at any time for violations of these terms. You may also terminate your account at any time through the app settings. Upon termination, your right to use the service ceases immediately.",
              "ban"
            )}

            {/* 9. Disclaimers */}
            {renderSection(
              "9. Disclaimers",
              "The service is provided 'as is' without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free. We are not responsible for user-generated content or user interactions.",
              "warning"
            )}

            {/* 10. Limitation of Liability */}
            {renderSection(
              "10. Limitation of Liability",
              "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill.",
              "alert-circle"
            )}

            {/* 11. Changes to Terms */}
            {renderSection(
              "11. Changes to Terms",
              "We reserve the right to modify these terms at any time. We will notify users of significant changes through the app or email. Continued use of the service after changes constitutes acceptance of the new terms.",
              "refresh"
            )}

            {/* 12. Governing Law */}
            {renderSection(
              "12. Governing Law",
              "These terms are governed by and construed in accordance with the laws of the jurisdiction where our company is headquartered, without regard to conflict of law principles.",
              "globe"
            )}

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
                  <Text style={styles.sectionTitle}>Contact Us</Text>
                </View>
                
                <Text style={styles.sectionContent}>
                  If you have any questions about these Terms of Service, please contact us:
                </Text>
                
                <View style={styles.contactInfo}>
                  <Text style={styles.contactItem}>📧 legal@loveconnect.com</Text>
                  <Text style={styles.contactItem}>📞 1-800-LOVE-HELP</Text>
                  <Text style={styles.contactItem}>📍 123 Love Street, Romance City, RC 12345</Text>
                </View>
              </LinearGradient>
            </View>

          </Animated.View>
        </ScrollView>

        {/* Accept Terms Button */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
          style={styles.acceptContainer}
        >
          <TouchableOpacity
            style={[styles.acceptButton, acceptedTerms && styles.acceptedButton]}
            onPress={handleAcceptTerms}
            disabled={acceptedTerms}
            activeOpacity={acceptedTerms ? 1 : 0.9}
          >
            <LinearGradient
              colors={acceptedTerms 
                ? ['#10b981', '#059669'] 
                : ['#ff6b6b', '#ee5a52']
              }
              style={styles.acceptButtonGradient}
            >
              <Ionicons 
                name={acceptedTerms ? "checkmark" : "document-text"} 
                size={20} 
                color="white" 
              />
              <Text className="font-poppins-bold text-white text-lg ml-2">
                {acceptedTerms ? "Terms Accepted" : "Accept Terms of Service"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <Text className="font-poppins text-gray-500 text-center text-sm mt-3">
            By accepting, you agree to be bound by these terms
          </Text>
        </LinearGradient>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default TermsOfService;

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
  introduction: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  introContainer: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  introIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  introText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  quickStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
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
  subSection: {
    marginTop: 16,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#ff6b6b',
  },
  subSectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 6,
  },
  subSectionContent: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    lineHeight: 22,
  },
  prohibitedList: {
    marginTop: 12,
    paddingLeft: 8,
  },
  listItem: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 4,
  },
  contactInfo: {
    marginTop: 12,
    gap: 8,
  },
  contactItem: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1F2937',
  },
  acceptContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  acceptButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  acceptedButton: {
    opacity: 0.8,
  },
  acceptButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});