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
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

const ContactSupport = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
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

    // Pulse animation for help icon
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const supportCategories = [
    { id: 'account', label: 'Account Issues', icon: 'person-circle', color: ['#ff6b6b', '#ee5a52'] },
    { id: 'billing', label: 'Billing & Payments', icon: 'card', color: ['#fbbf24', '#f59e0b'] },
    { id: 'technical', label: 'Technical Problems', icon: 'bug', color: ['#8b5cf6', '#7c3aed'] },
    { id: 'safety', label: 'Safety & Security', icon: 'shield-checkmark', color: ['#10b981', '#059669'] },
    { id: 'features', label: 'App Features', icon: 'apps', color: ['#06b6d4', '#0891b2'] },
    { id: 'other', label: 'Other', icon: 'help-circle', color: ['#6b7280', '#4b5563'] },
  ];

  const quickActions = [
    {
      id: 'chat',
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      icon: 'chatbubbles',
      status: 'Available now',
      statusColor: '#10b981',
      action: () => Alert.alert('Live Chat', 'Opening live chat...'),
    },
    {
      id: 'call',
      title: 'Phone Support',
      subtitle: '1-800-ZINGR-HELP',
      icon: 'call',
      status: 'Mon-Fri 9AM-6PM',
      statusColor: '#3B82F6',
      action: () => Alert.alert('Phone Support', 'Calling support...'),
    },
    {
      id: 'email',
      title: 'Email Support',
      subtitle: 'support@zingr.com',
      icon: 'mail',
      status: '24 hour response',
      statusColor: '#8b5cf6',
      action: () => Alert.alert('Email Support', 'Opening email client...'),
    },
  ];

  const faqItems = [
    { question: 'How do I delete my account?', category: 'account' },
    { question: 'Why was I charged twice?', category: 'billing' },
    { question: 'App keeps crashing', category: 'technical' },
    { question: 'Someone is bothering me', category: 'safety' },
    { question: 'How do I verify my profile?', category: 'features' },
  ];

  const handleSubmit = () => {
    if (!selectedCategory || !subject || !message) {
      Alert.alert('Incomplete Form', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Message Sent!',
        'Thank you for contacting us. We\'ll get back to you within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedCategory('');
              setSubject('');
              setMessage('');
            },
          },
        ]
      );
    }, 2000);
  };

  const renderCategoryChip = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryChip,
        selectedCategory === category.id && styles.selectedCategoryChip,
      ]}
      onPress={() => setSelectedCategory(category.id)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={selectedCategory === category.id 
          ? category.color
          : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']
        }
        style={styles.categoryChipGradient}
      >
        <Ionicons 
          name={category.icon} 
          size={20} 
          color={selectedCategory === category.id ? 'white' : '#6B7280'} 
        />
        <Text 
          style={[
            styles.categoryChipText,
            selectedCategory === category.id && styles.selectedCategoryChipText,
          ]}
        >
          {category.label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderQuickAction = (action) => (
    <TouchableOpacity
      key={action.id}
      style={styles.quickAction}
      onPress={action.action}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.quickActionGradient}
      >
        <LinearGradient
          colors={['#ff6b6b', '#ee5a52']}
          style={styles.quickActionIcon}
        >
          <Ionicons name={action.icon} size={24} color="white" />
        </LinearGradient>
        
        <View style={styles.quickActionContent}>
          <Text style={styles.quickActionTitle}>{action.title}</Text>
          <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
          <View style={styles.quickActionStatus}>
            <View style={[styles.statusDot, { backgroundColor: action.statusColor }]} />
            <Text style={[styles.statusText, { color: action.statusColor }]}>
              {action.status}
            </Text>
          </View>
        </View>
        
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderFAQItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.faqItem}
      onPress={() => Alert.alert('FAQ', `Opening: ${item.question}`)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.faqItemGradient}
      >
        <Ionicons name="help-circle-outline" size={20} color="#6B7280" />
        <Text style={styles.faqText}>{item.question}</Text>
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      </LinearGradient>
    </TouchableOpacity>
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
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.supportIcon}
                  >
                    <Feather name="help-circle" size={20} color="white" />
                  </LinearGradient>
                </Animated.View>
                <Text className="font-poppins-bold text-xl text-gray-900 ml-2">Support</Text>
              </View>
              <Text className="font-poppins text-sm text-gray-500">We're here to help</Text>
            </View>
            
            <TouchableOpacity style={styles.headerButton}>
              <Feather name="phone" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
              {/* Hero Section */}
              <View style={styles.heroSection}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                  style={styles.heroContainer}
                >
                  <Text style={styles.heroTitle}>How can we help you?</Text>
                  <Text style={styles.heroSubtitle}>
                    Choose from the options below or send us a message
                  </Text>
                </LinearGradient>
              </View>

              {/* Quick Actions */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Get Help Now</Text>
                <View style={styles.quickActions}>
                  {quickActions.map(renderQuickAction)}
                </View>
              </View>

              {/* Contact Form */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Send us a Message</Text>
                
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                  style={styles.formContainer}
                >
                  {/* Category Selection */}
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Category *</Text>
                    <View style={styles.categoriesGrid}>
                      {supportCategories.map(renderCategoryChip)}
                    </View>
                  </View>

                  {/* Subject */}
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Subject *</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.textInput}
                        value={subject}
                        onChangeText={setSubject}
                        placeholder="Brief description of your issue"
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                  </View>

                  {/* Message */}
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Message *</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={[styles.textInput, styles.messageInput]}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Please describe your issue in detail..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                      />
                    </View>
                  </View>

                  {/* Submit Button */}
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    activeOpacity={0.9}
                  >
                    <LinearGradient
                      colors={['#ff6b6b', '#ee5a52']}
                      style={styles.submitButtonGradient}
                    >
                      {isSubmitting ? (
                        <View style={styles.loadingContainer}>
                          <View style={styles.loadingDot} />
                          <View style={[styles.loadingDot, { animationDelay: '0.2s' }]} />
                          <View style={[styles.loadingDot, { animationDelay: '0.4s' }]} />
                        </View>
                      ) : (
                        <>
                          <Feather name="send" size={20} color="white" />
                          <Text style={styles.submitButtonText}>Send Message</Text>
                        </>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              {/* FAQ Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                  <TouchableOpacity>
                    <Text style={styles.seeAllText}>See All</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.faqList}>
                  {faqItems.map(renderFAQItem)}
                </View>
              </View>

              {/* Support Hours */}
              <View style={styles.section}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                  style={styles.supportHoursContainer}
                >
                  <View style={styles.supportHoursHeader}>
                    <LinearGradient
                      colors={['#3B82F6', '#2563EB']}
                      style={styles.clockIcon}
                    >
                      <Ionicons name="time" size={20} color="white" />
                    </LinearGradient>
                    <Text style={styles.supportHoursTitle}>Support Hours</Text>
                  </View>
                  
                  <View style={styles.hoursGrid}>
                    <View style={styles.hoursItem}>
                      <Text style={styles.hoursLabel}>Live Chat</Text>
                      <Text style={styles.hoursValue}>24/7</Text>
                    </View>
                    <View style={styles.hoursItem}>
                      <Text style={styles.hoursLabel}>Phone Support</Text>
                      <Text style={styles.hoursValue}>Mon-Fri 9AM-6PM</Text>
                    </View>
                    <View style={styles.hoursItem}>
                      <Text style={styles.hoursLabel}>Email Support</Text>
                      <Text style={styles.hoursValue}>24 hour response</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default ContactSupport;

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
  supportIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  heroContainer: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#ff6b6b',
  },
  quickActions: {
    gap: 12,
  },
  quickAction: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  quickActionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  formContainer: {
    borderRadius: 20,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#1F2937',
    marginBottom: 8,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 8,
  },
  selectedCategoryChip: {
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  categoryChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
    marginLeft: 8,
  },
  selectedCategoryChipText: {
    color: 'white',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textInput: {
    padding: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1F2937',
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 2,
  },
  faqList: {
    gap: 8,
  },
  faqItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  faqItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  faqText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1F2937',
    flex: 1,
    marginLeft: 12,
  },
  supportHoursContainer: {
    borderRadius: 20,
    padding: 20,
  },
  supportHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clockIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportHoursTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  hoursGrid: {
    gap: 12,
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  hoursLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
  },
  hoursValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
});