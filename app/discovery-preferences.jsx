import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from '@react-native-community/slider';
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
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

const DiscoveryPreferences = () => {
  // Basic Preferences
  const [ageRange, setAgeRange] = useState([22, 35]);
  const [maxDistance, setMaxDistance] = useState(25);
  const [interestedIn, setInterestedIn] = useState('everyone'); // men, women, everyone
  const [showMe, setShowMe] = useState('active'); // active, new, everyone
  
  // Advanced Filters
  const [heightRange, setHeightRange] = useState([150, 200]); // cm
  const [education, setEducation] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [interests, setInterests] = useState([]);
  const [lifestyle, setLifestyle] = useState({
    smoking: 'any',
    drinking: 'any',
    exercise: 'any',
    diet: 'any',
    pets: 'any',
    kids: 'any',
    religion: 'any',
    politics: 'any',
  });
  
  // Premium Filters
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [recentlyActive, setRecentlyActive] = useState(false);
  const [profileCompleteness, setProfileCompleteness] = useState(0);
  const [zodiacSigns, setZodiacSigns] = useState([]);
  
  // Modal States
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showOccupationModal, setShowOccupationModal] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showLifestyleModal, setShowLifestyleModal] = useState(false);
  
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

  const educationOptions = [
    'High School', 'Some College', 'Undergraduate Degree', 
    'Graduate Degree', 'PhD/Doctorate', 'Trade School', 'Other'
  ];

  const occupationOptions = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Creative Arts',
    'Business', 'Engineering', 'Law', 'Marketing', 'Sales', 'Other'
  ];

  const interestOptions = [
    'Photography', 'Travel', 'Coffee', 'Hiking', 'Art', 'Music', 'Cooking',
    'Fitness', 'Reading', 'Movies', 'Dancing', 'Yoga', 'Wine', 'Tech',
    'Nature', 'Sports', 'Gaming', 'Fashion', 'Writing', 'Meditation'
  ];

  const zodiacOptions = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const lifestyleOptions = {
    smoking: ['Never', 'Socially', 'Regularly', 'Any'],
    drinking: ['Never', 'Socially', 'Regularly', 'Any'],
    exercise: ['Never', 'Sometimes', 'Often', 'Daily', 'Any'],
    diet: ['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Any'],
    pets: ['Dog Lover', 'Cat Lover', 'No Pets', 'Other Pets', 'Any'],
    kids: ['Have Kids', 'Want Kids', 'Don\'t Want Kids', 'Any'],
    religion: ['Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist', 'Atheist', 'Agnostic', 'Other', 'Any'],
    politics: ['Liberal', 'Conservative', 'Moderate', 'Not Political', 'Any']
  };

  const renderGenderOption = (value, label, icon) => (
    <TouchableOpacity
      key={value}
      style={[styles.genderOption, interestedIn === value && styles.selectedGenderOption]}
      onPress={() => setInterestedIn(value)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={interestedIn === value 
          ? ['#ff6b6b', '#ee5a52']
          : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']
        }
        style={styles.genderOptionGradient}
      >
        <Ionicons 
          name={icon} 
          size={24} 
          color={interestedIn === value ? 'white' : '#6B7280'} 
        />
        <Text 
          className={`font-poppins-medium text-sm mt-2 ${
            interestedIn === value ? 'text-white' : 'text-gray-700'
          }`}
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSliderSection = (title, value, onValueChange, min, max, unit = '', step = 1) => (
    <View style={styles.sliderSection}>
      <View style={styles.sliderHeader}>
        <Text className="font-poppins-semibold text-gray-900 text-base">{title}</Text>
        <Text className="font-poppins-bold text-rose-600 text-base">
          {Array.isArray(value) 
            ? `${value[0]}${unit} - ${value[1]}${unit}`
            : `${value}${unit}`
          }
        </Text>
      </View>
      
      <View style={styles.sliderContainer}>
        {Array.isArray(value) ? (
          // Range slider implementation would go here
          <View style={styles.rangeSliderPlaceholder}>
            <LinearGradient
              colors={['#ff6b6b', '#ee5a52']}
              style={styles.rangeSliderTrack}
            />
            <Text className="font-poppins text-gray-500 text-sm text-center mt-2">
              Drag to adjust range
            </Text>
          </View>
        ) : (
          <Slider
            style={styles.slider}
            minimumValue={min}
            maximumValue={max}
            value={value}
            onValueChange={onValueChange}
            step={step}
            minimumTrackTintColor="#ff6b6b"
            maximumTrackTintColor="#E5E7EB"
            thumbStyle={styles.sliderThumb}
          />
        )}
      </View>
    </View>
  );

  const renderFilterChip = (item, isSelected, onPress) => (
    <TouchableOpacity
      key={item}
      style={styles.filterChip}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={isSelected 
          ? ['#ff6b6b', '#ee5a52']
          : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']
        }
        style={styles.filterChipGradient}
      >
        <Text 
          className={`font-poppins-medium text-sm ${
            isSelected ? 'text-white' : 'text-gray-700'
          }`}
        >
          {item}
        </Text>
        {isSelected && (
          <AntDesign name="check" size={14} color="white" style={{ marginLeft: 6 }} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSectionHeader = (title, subtitle, icon) => (
    <View style={styles.sectionHeader}>
      <LinearGradient
        colors={['#ff6b6b', '#ee5a52']}
        style={styles.sectionIcon}
      >
        <Ionicons name={icon} size={18} color="white" />
      </LinearGradient>
      <View style={styles.sectionText}>
        <Text className="font-poppins-bold text-lg text-gray-900">{title}</Text>
        {subtitle && (
          <Text className="font-poppins text-gray-600 text-sm">{subtitle}</Text>
        )}
      </View>
    </View>
  );

  const FilterModal = ({ visible, onClose, title, options, selected, onSelect, multiSelect = true }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.modalOverlay, { opacity: modalAnim }]}>
        <BlurView intensity={80} tint="light" style={styles.modalBlur}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={onClose}
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
                  <Text className="font-poppins-bold text-xl text-gray-900">{title}</Text>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.modalCloseButton}
                  >
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false} style={styles.modalOptions}>
                  <View style={styles.modalChipsContainer}>
                    {options.map((option) => 
                      renderFilterChip(
                        option,
                        multiSelect ? selected.includes(option) : selected === option,
                        () => onSelect(option)
                      )
                    )}
                  </View>
                </ScrollView>
                
                <TouchableOpacity
                  style={styles.modalDoneButton}
                  onPress={onClose}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#ff6b6b', '#ee5a52']}
                    style={styles.modalDoneGradient}
                  >
                    <Text className="font-poppins-bold text-white text-lg">Done</Text>
                  </LinearGradient>
                </TouchableOpacity>
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
              <Text className="font-poppins-bold text-xl text-gray-900">Discovery</Text>
              <Text className="font-poppins text-sm text-gray-500">Customize your matches</Text>
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
            {/* Basic Preferences */}
            {renderSectionHeader(
              "Basic Preferences", 
              "Set your core matching criteria",
              "heart-outline"
            )}
            
            <View style={styles.section}>
              {/* Interested In */}
              <View style={styles.preferenceGroup}>
                <Text className="font-poppins-semibold text-gray-900 text-base mb-4">
                  Interested In
                </Text>
                <View style={styles.genderOptions}>
                  {renderGenderOption('men', 'Men', 'man')}
                  {renderGenderOption('women', 'Women', 'woman')}
                  {renderGenderOption('everyone', 'Everyone', 'people')}
                </View>
              </View>

              {/* Age Range */}
              {renderSliderSection('Age Range', ageRange, setAgeRange, 18, 60, ' years')}

              {/* Distance */}
              {renderSliderSection('Maximum Distance', maxDistance, setMaxDistance, 1, 100, ' km')}
            </View>

            {/* Advanced Filters */}
            {renderSectionHeader(
              "Advanced Filters", 
              "Fine-tune your preferences",
              "options-outline"
            )}
            
            <View style={styles.section}>
              {/* Height Range */}
              {renderSliderSection('Height Range', heightRange, setHeightRange, 140, 220, ' cm')}

              {/* Education */}
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => showModal(setShowEducationModal)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                  style={styles.filterButtonGradient}
                >
                  <View style={styles.filterButtonContent}>
                    <Ionicons name="school-outline" size={20} color="#6B7280" />
                    <View style={styles.filterButtonText}>
                      <Text className="font-poppins-medium text-gray-900 text-base">Education</Text>
                      <Text className="font-poppins text-gray-600 text-sm">
                        {education.length === 0 ? 'Any education level' : `${education.length} selected`}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </LinearGradient>
              </TouchableOpacity>

              {/* Occupation */}
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => showModal(setShowOccupationModal)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                  style={styles.filterButtonGradient}
                >
                  <View style={styles.filterButtonContent}>
                    <Ionicons name="briefcase-outline" size={20} color="#6B7280" />
                    <View style={styles.filterButtonText}>
                      <Text className="font-poppins-medium text-gray-900 text-base">Occupation</Text>
                      <Text className="font-poppins text-gray-600 text-sm">
                        {occupation.length === 0 ? 'Any occupation' : `${occupation.length} selected`}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </LinearGradient>
              </TouchableOpacity>

              {/* Interests */}
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => showModal(setShowInterestsModal)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                  style={styles.filterButtonGradient}
                >
                  <View style={styles.filterButtonContent}>
                    <Ionicons name="heart-outline" size={20} color="#6B7280" />
                    <View style={styles.filterButtonText}>
                      <Text className="font-poppins-medium text-gray-900 text-base">Interests</Text>
                      <Text className="font-poppins text-gray-600 text-sm">
                        {interests.length === 0 ? 'Any interests' : `${interests.length} selected`}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Lifestyle Preferences */}
            {renderSectionHeader(
              "Lifestyle", 
              "Values and lifestyle compatibility",
              "leaf-outline"
            )}
            
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => showModal(setShowLifestyleModal)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                  style={styles.filterButtonGradient}
                >
                  <View style={styles.filterButtonContent}>
                    <Ionicons name="fitness-outline" size={20} color="#6B7280" />
                    <View style={styles.filterButtonText}>
                      <Text className="font-poppins-medium text-gray-900 text-base">Lifestyle Preferences</Text>
                      <Text className="font-poppins text-gray-600 text-sm">
                        Smoking, drinking, fitness, and more
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Premium Filters */}
            {renderSectionHeader(
              "Premium Filters", 
              "Exclusive filters for premium users",
              "diamond-outline"
            )}
            
            <View style={styles.section}>
              <LinearGradient
                colors={['rgba(251, 191, 36, 0.1)', 'rgba(245, 158, 11, 0.1)']}
                style={styles.premiumCard}
              >
                <View style={styles.premiumHeader}>
                  <LinearGradient
                    colors={['#fbbf24', '#f59e0b']}
                    style={styles.premiumIcon}
                  >
                    <Ionicons name="diamond" size={20} color="white" />
                  </LinearGradient>
                  <Text className="font-poppins-bold text-lg text-gray-900">Premium Filters</Text>
                </View>
                
                <Text className="font-poppins text-gray-600 text-sm mb-4">
                  Get more precise matches with advanced filtering options
                </Text>
                
                <View style={styles.premiumFeatures}>
                  <Text className="font-poppins text-gray-700 text-sm">• Verified profiles only</Text>
                  <Text className="font-poppins text-gray-700 text-sm">• Recently active users</Text>
                  <Text className="font-poppins text-gray-700 text-sm">• Profile completeness filter</Text>
                  <Text className="font-poppins text-gray-700 text-sm">• Zodiac sign compatibility</Text>
                </View>
                
                <TouchableOpacity
                  style={styles.premiumButton}
                  onPress={() => Alert.alert("Premium", "Upgrade to premium")}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#fbbf24', '#f59e0b']}
                    style={styles.premiumButtonGradient}
                  >
                    <Ionicons name="diamond" size={16} color="white" />
                    <Text className="font-poppins-bold text-white text-sm ml-2">Upgrade to Premium</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* Reset Filters */}
            <View style={styles.resetSection}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => Alert.alert("Reset", "Reset all filters to default?")}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                  style={styles.resetButtonGradient}
                >
                  <Feather name="refresh-ccw" size={20} color="#6B7280" />
                  <Text className="font-poppins-medium text-gray-700 text-base ml-2">
                    Reset All Filters
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

          </Animated.View>
        </ScrollView>

        {/* Modals */}
        <FilterModal
          visible={showEducationModal}
          onClose={() => hideModal(setShowEducationModal)}
          title="Education Level"
          options={educationOptions}
          selected={education}
          onSelect={(option) => {
            if (education.includes(option)) {
              setEducation(education.filter(e => e !== option));
            } else {
              setEducation([...education, option]);
            }
          }}
        />

        <FilterModal
          visible={showOccupationModal}
          onClose={() => hideModal(setShowOccupationModal)}
          title="Occupation"
          options={occupationOptions}
          selected={occupation}
          onSelect={(option) => {
            if (occupation.includes(option)) {
              setOccupation(occupation.filter(o => o !== option));
            } else {
              setOccupation([...occupation, option]);
            }
          }}
        />

        <FilterModal
          visible={showInterestsModal}
          onClose={() => hideModal(setShowInterestsModal)}
          title="Interests"
          options={interestOptions}
          selected={interests}
          onSelect={(option) => {
            if (interests.includes(option)) {
              setInterests(interests.filter(i => i !== option));
            } else if (interests.length < 10) {
              setInterests([...interests, option]);
            } else {
              Alert.alert("Limit Reached", "You can select up to 10 interests");
            }
          }}
        />

      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default DiscoveryPreferences;

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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionText: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    gap: 16,
  },
  preferenceGroup: {
    marginBottom: 8,
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  genderOption: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectedGenderOption: {
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  genderOptionGradient: {
    padding: 16,
    alignItems: 'center',
  },
  sliderSection: {
    marginBottom: 8,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderContainer: {
    paddingHorizontal: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#ff6b6b',
    width: 24,
    height: 24,
  },
  rangeSliderPlaceholder: {
    height: 40,
    justifyContent: 'center',
  },
  rangeSliderTrack: {
    height: 4,
    borderRadius: 2,
    width: '60%',
    alignSelf: 'center',
  },
  filterButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  filterButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  filterButtonText: {
    marginLeft: 12,
    flex: 1,
  },
  filterChip: {
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  premiumCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  premiumIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  premiumFeatures: {
    marginBottom: 16,
    gap: 4,
  },
  premiumButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  premiumButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  resetSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  resetButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  resetButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
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
    marginBottom: 20,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
  },
  modalOptions: {
    maxHeight: height - 350,
    marginBottom: 20,
  },
  modalChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalDoneButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalDoneGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
});