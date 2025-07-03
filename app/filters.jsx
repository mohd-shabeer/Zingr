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
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

const Filter = () => {
  // Quick Filters
  const [onlineNow, setOnlineNow] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [recentlyActive, setRecentlyActive] = useState(false);
  const [hasPhotos, setHasPhotos] = useState(true);
  const [newProfiles, setNewProfiles] = useState(false);
  const [premiumUsers, setPremiumUsers] = useState(false);
  
  // Advanced Filters
  const [ageRange, setAgeRange] = useState([22, 35]);
  const [distance, setDistance] = useState(25);
  const [heightRange, setHeightRange] = useState([160, 190]);
  const [profileScore, setProfileScore] = useState(70);
  
  // Lifestyle Filters
  const [dealbreakers, setDealbreakers] = useState({
    smoking: false,
    drinking: false,
    drugs: false,
    kids: false,
    pets: false,
  });
  
  // Interest-based Filters
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  
  // Premium Filters
  const [zodiacCompatibility, setZodiacCompatibility] = useState(false);
  const [incomeRange, setIncomeRange] = useState(false);
  const [educationLevel, setEducationLevel] = useState(false);
  
  // Filter Stats
  const [potentialMatches, setPotentialMatches] = useState(1247);
  const [filtersActive, setFiltersActive] = useState(3);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;

  // Available options
  const interests = [
    "Travel", "Photography", "Music", "Fitness", "Cooking", "Art", 
    "Reading", "Movies", "Dancing", "Hiking", "Coffee", "Wine",
    "Gaming", "Sports", "Fashion", "Tech", "Nature", "Yoga"
  ];

  const educationOptions = [
    "High School", "Some College", "Bachelor's", "Master's", "PhD", "Trade School"
  ];

  const jobCategories = [
    "Technology", "Healthcare", "Finance", "Education", "Arts", "Business",
    "Engineering", "Law", "Marketing", "Science", "Other"
  ];

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

    // Animate stats
    setTimeout(() => {
      Animated.timing(statsAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 400);

    // Staggered card animations
    setTimeout(() => {
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 200);
  }, []);

  const applyFilters = () => {
    // Simulate filter application with loading
    Alert.alert("Filters Applied", `Found ${potentialMatches} potential matches`);
    router.back();
  };

  const clearAllFilters = () => {
    Alert.alert(
      "Clear Filters",
      "Are you sure you want to clear all filters?",
      [
        { text: "Cancel" },
        { text: "Clear All", onPress: () => {
          setOnlineNow(false);
          setVerifiedOnly(false);
          setRecentlyActive(false);
          setNewProfiles(false);
          setPremiumUsers(false);
          setAgeRange([18, 50]);
          setDistance(50);
          setDealbreakers({
            smoking: false,
            drinking: false,
            drugs: false,
            kids: false,
            pets: false,
          });
          setSelectedInterests([]);
          setEducationLevels([]);
          setJobTypes([]);
          setPotentialMatches(2847);
          setFiltersActive(0);
        }}
      ]
    );
  };

  const renderQuickFilter = (title, value, onValueChange, icon, isPremium = false) => (
    <Animated.View 
      style={[
        styles.quickFilter,
        {
          opacity: cardAnim,
          transform: [{
            translateY: cardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            })
          }]
        }
      ]}
    >
      <BlurView intensity={20} tint="light" style={styles.quickFilterBlur}>
        <LinearGradient
          colors={value 
            ? ['rgba(255, 107, 107, 0.15)', 'rgba(238, 90, 82, 0.15)']
            : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']
          }
          style={[styles.quickFilterGradient, value && { borderWidth: 1, borderColor: '#ff6b6b' }]}
        >
          <View style={styles.quickFilterContent}>
            <LinearGradient
              colors={value ? ['#ff6b6b', '#ee5a52'] : ['#f3f4f6', '#e5e7eb']}
              style={styles.quickFilterIcon}
            >
              <Ionicons 
                name={icon} 
                size={18} 
                color={value ? 'white' : '#6B7280'} 
              />
              {isPremium && (
                <View style={styles.premiumMini}>
                  <AntDesign name="star" size={8} color="#fbbf24" />
                </View>
              )}
            </LinearGradient>
            <Text 
              className={`font-poppins-medium text-sm ${
                value ? 'text-rose-700' : 'text-gray-700'
              }`}
            >
              {title}
            </Text>
          </View>
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#E5E7EB', true: '#FCA5A5' }}
            thumbColor={value ? '#ff6b6b' : '#9CA3AF'}
            ios_backgroundColor="#E5E7EB"
            style={styles.quickFilterSwitch}
          />
        </LinearGradient>
      </BlurView>
    </Animated.View>
  );

  const renderSlider = (title, value, onValueChange, min, max, unit = '', step = 1, isRange = false) => (
    <Animated.View 
      style={[
        styles.sliderContainer,
        {
          opacity: cardAnim,
          transform: [{
            translateY: cardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            })
          }]
        }
      ]}
    >
      <BlurView intensity={20} tint="light" style={styles.sliderBlur}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
          style={styles.sliderGradient}
        >
          <View style={styles.sliderHeader}>
            <Text className="font-poppins-semibold text-gray-900 text-base">{title}</Text>
            <LinearGradient
              colors={['#ff6b6b', '#ee5a52']}
              style={styles.sliderValueBadge}
            >
              <Text className="font-poppins-bold text-white text-sm">
                {isRange 
                  ? `${value[0]}${unit} - ${value[1]}${unit}`
                  : `${value}${unit}`
                }
              </Text>
            </LinearGradient>
          </View>
          
          <View style={styles.sliderWrapper}>
            <Slider
              style={styles.slider}
              minimumValue={min}
              maximumValue={max}
              value={isRange ? (value[0] + value[1]) / 2 : value}
              onValueChange={isRange 
                ? (val) => {
                  const range = value[1] - value[0];
                  const newMin = Math.max(min, val - range/2);
                  const newMax = Math.min(max, val + range/2);
                  onValueChange([Math.round(newMin), Math.round(newMax)]);
                }
                : onValueChange
              }
              step={step}
              minimumTrackTintColor="#ff6b6b"
              maximumTrackTintColor="#E5E7EB"
              thumbStyle={styles.sliderThumb}
            />
            <View style={styles.sliderLabels}>
              <Text className="font-poppins text-gray-500 text-xs">{min}{unit}</Text>
              <Text className="font-poppins text-gray-500 text-xs">{max}{unit}</Text>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </Animated.View>
  );

  const renderMultiSelect = (title, options, selected, onSelect, icon) => (
    <Animated.View 
      style={[
        styles.multiSelectContainer,
        {
          opacity: cardAnim,
          transform: [{
            translateY: cardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0],
            })
          }]
        }
      ]}
    >
      <BlurView intensity={20} tint="light" style={styles.multiSelectBlur}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
          style={styles.multiSelectGradient}
        >
          <View style={styles.multiSelectHeader}>
            <LinearGradient
              colors={['#ff6b6b', '#ee5a52']}
              style={styles.multiSelectIcon}
            >
              <Ionicons name={icon} size={18} color="white" />
            </LinearGradient>
            <Text className="font-poppins-semibold text-gray-900 text-base ml-3">{title}</Text>
            <Text className="font-poppins text-gray-500 text-sm ml-auto">
              {selected.length} selected
            </Text>
          </View>
          
          <View style={styles.optionsContainer}>
            {options.slice(0, 6).map((option, index) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionChip,
                  selected.includes(option) && styles.selectedChip
                ]}
                onPress={() => {
                  if (selected.includes(option)) {
                    onSelect(selected.filter(item => item !== option));
                  } else {
                    onSelect([...selected, option]);
                  }
                }}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={selected.includes(option) 
                    ? ['#ff6b6b', '#ee5a52']
                    : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']
                  }
                  style={styles.optionChipGradient}
                >
                  <Text 
                    className={`font-poppins-medium text-xs ${
                      selected.includes(option) ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {option}
                  </Text>
                  {selected.includes(option) && (
                    <AntDesign name="check" size={12} color="white" style={{ marginLeft: 4 }} />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
            
            {options.length > 6 && (
              <TouchableOpacity style={styles.seeMoreButton}>
                <Text className="font-poppins-medium text-rose-600 text-xs">
                  +{options.length - 6} more
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </BlurView>
    </Animated.View>
  );

  const renderDealbreaker = (key, title, icon) => (
    <TouchableOpacity
      key={key}
      style={[
        styles.dealbreakerItem,
        dealbreakers[key] && styles.dealbreakerActive
      ]}
      onPress={() => setDealbreakers({
        ...dealbreakers,
        [key]: !dealbreakers[key]
      })}
      activeOpacity={0.8}
    >
      <BlurView intensity={15} tint="light" style={styles.dealbreakerBlur}>
        <LinearGradient
          colors={dealbreakers[key] 
            ? ['#fee2e2', '#fecaca']
            : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']
          }
          style={styles.dealbreakerGradient}
        >
          <LinearGradient
            colors={dealbreakers[key] ? ['#EF4444', '#DC2626'] : ['#f3f4f6', '#e5e7eb']}
            style={styles.dealbreakerIcon}
          >
            <Ionicons 
              name={icon} 
              size={20} 
              color={dealbreakers[key] ? 'white' : '#6B7280'} 
            />
          </LinearGradient>
          <Text 
            className={`font-poppins-medium text-sm ${
              dealbreakers[key] ? 'text-red-700' : 'text-gray-700'
            }`}
          >
            {title}
          </Text>
          {dealbreakers[key] && (
            <AntDesign name="close" size={14} color="#EF4444" />
          )}
        </LinearGradient>
      </BlurView>
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
      <View style={styles.sectionContent}>
        <Text className="font-poppins-bold text-lg text-gray-900">{title}</Text>
        {subtitle && (
          <Text className="font-poppins text-gray-600 text-sm">{subtitle}</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf2f8' }}>
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3', '#fbcfe8']}
        style={{ flex: 1 }}
      >
        {/* Modern Header */}
        <BlurView intensity={20} tint="light" style={styles.headerBlur}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.header}
          >
            <View className="flex-row justify-between items-center px-6 py-4">
              <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#6B7280" />
              </TouchableOpacity>
              
              <View className="items-center">
                <Text className="font-poppins-bold text-xl text-gray-900">Smart Filters</Text>
                <Text className="font-poppins text-sm text-gray-500">Find your perfect match</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={clearAllFilters}
              >
                <Feather name="refresh-ccw" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </BlurView>

        {/* Enhanced Filter Stats */}
        <Animated.View
          style={[
            styles.statsContainer,
            {
              opacity: statsAnim,
              transform: [{ translateY: statsAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })}],
            }
          ]}
        >
          <BlurView intensity={30} tint="light" style={styles.statsBlur}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
              style={styles.statsCard}
            >
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <LinearGradient
                    colors={['#ff6b6b', '#ee5a52']}
                    style={styles.statIcon}
                  >
                    <Ionicons name="people" size={20} color="white" />
                  </LinearGradient>
                  <View style={styles.statText}>
                    <Text className="font-poppins-bold text-xl text-gray-900">
                      {potentialMatches.toLocaleString()}
                    </Text>
                    <Text className="font-poppins text-gray-600 text-sm">Potential Matches</Text>
                  </View>
                </View>
                
                <View style={styles.statDivider} />
                
                <View style={styles.statItem}>
                  <LinearGradient
                    colors={['#3B82F6', '#2563EB']}
                    style={styles.statIcon}
                  >
                    <Ionicons name="filter" size={20} color="white" />
                  </LinearGradient>
                  <View style={styles.statText}>
                    <Text className="font-poppins-bold text-xl text-gray-900">{filtersActive}</Text>
                    <Text className="font-poppins text-gray-600 text-sm">Active Filters</Text>
                  </View>
                </View>
              </View>
              
              {/* Match Quality Indicator */}
              <View style={styles.qualityIndicator}>
                <Text className="font-poppins-medium text-gray-700 text-sm mb-2">Match Quality</Text>
                <View style={styles.qualityBar}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={[styles.qualityProgress, { width: '85%' }]}
                  />
                </View>
                <Text className="font-poppins text-gray-500 text-xs mt-1">85% compatibility score</Text>
              </View>
            </LinearGradient>
          </BlurView>
        </Animated.View>

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
            {/* Quick Filters */}
            {renderSectionHeader(
              "Quick Filters", 
              "Fast access to popular filters",
              "flash-outline"
            )}
            
            <View style={styles.section}>
              {renderQuickFilter("Online Now", onlineNow, setOnlineNow, "radio")}
              {renderQuickFilter("Verified Only", verifiedOnly, setVerifiedOnly, "checkmark-circle")}
              {renderQuickFilter("Recently Active", recentlyActive, setRecentlyActive, "time")}
              {renderQuickFilter("Has Photos", hasPhotos, setHasPhotos, "camera")}
              {renderQuickFilter("New Profiles", newProfiles, setNewProfiles, "person-add", true)}
              {renderQuickFilter("Premium Users", premiumUsers, setPremiumUsers, "diamond", true)}
            </View>

            {/* Range Filters */}
            {renderSectionHeader(
              "Range Filters", 
              "Set your preferred ranges",
              "options-outline"
            )}
            
            <View style={styles.section}>
              {renderSlider("Age Range", ageRange, setAgeRange, 18, 60, " years", 1, true)}
              {renderSlider("Maximum Distance", distance, setDistance, 1, 100, " km")}
              {renderSlider("Height Range", heightRange, setHeightRange, 140, 220, " cm", 1, true)}
              {renderSlider("Profile Completeness", profileScore, setProfileScore, 0, 100, "%")}
            </View>

            {/* Interest-based Filters */}
            {renderSectionHeader(
              "Interests & Lifestyle", 
              "Find people with similar interests",
              "heart-outline"
            )}
            
            <View style={styles.section}>
              {renderMultiSelect("Interests", interests, selectedInterests, setSelectedInterests, "heart")}
              {renderMultiSelect("Education", educationOptions, educationLevels, setEducationLevels, "school")}
              {renderMultiSelect("Career", jobCategories, jobTypes, setJobTypes, "briefcase")}
            </View>

            {/* Dealbreakers */}
            {renderSectionHeader(
              "Dealbreakers", 
              "Automatically filter out unwanted traits",
              "close-circle-outline"
            )}
            
            <View style={styles.section}>
              <Text className="font-poppins text-gray-600 text-sm mb-4 px-4">
                These will completely hide profiles with selected traits
              </Text>
              
              <View style={styles.dealbreakersGrid}>
                {renderDealbreaker("smoking", "Smoking", "cloud-outline")}
                {renderDealbreaker("drinking", "Heavy Drinking", "wine-outline")}
                {renderDealbreaker("drugs", "Drug Use", "medical-outline")}
                {renderDealbreaker("kids", "Has Kids", "people-outline")}
                {renderDealbreaker("pets", "No Pets", "paw-outline")}
              </View>
            </View>

            {/* Premium Filters */}
            {renderSectionHeader(
              "Premium Filters", 
              "Advanced matching criteria",
              "diamond-outline"
            )}
            
            <View style={styles.section}>
              <BlurView intensity={30} tint="light" style={styles.premiumSectionBlur}>
                <LinearGradient
                  colors={['rgba(251, 191, 36, 0.1)', 'rgba(245, 158, 11, 0.1)']}
                  style={styles.premiumSection}
                >
                  <View style={styles.premiumHeader}>
                    <LinearGradient
                      colors={['#fbbf24', '#f59e0b']}
                      style={styles.premiumIcon}
                    >
                      <Ionicons name="diamond" size={24} color="white" />
                    </LinearGradient>
                    <View style={styles.premiumText}>
                      <Text className="font-poppins-bold text-lg text-gray-900">Premium Filters</Text>
                      <Text className="font-poppins text-gray-600 text-sm">
                        Get more precise matches with advanced options
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.premiumFilters}>
                    <View style={styles.premiumFilter}>
                      <Ionicons name="star-outline" size={20} color="#9CA3AF" />
                      <Text className="font-poppins text-gray-500 text-sm ml-3 flex-1">
                        Zodiac Compatibility
                      </Text>
                      <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
                    </View>
                    
                    <View style={styles.premiumFilter}>
                      <Ionicons name="card-outline" size={20} color="#9CA3AF" />
                      <Text className="font-poppins text-gray-500 text-sm ml-3 flex-1">
                        Income Range
                      </Text>
                      <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
                    </View>
                    
                    <View style={styles.premiumFilter}>
                      <Ionicons name="school-outline" size={20} color="#9CA3AF" />
                      <Text className="font-poppins text-gray-500 text-sm ml-3 flex-1">
                        Education Level
                      </Text>
                      <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
                    </View>
                  </View>
                  
                  <TouchableOpacity
                    style={styles.upgradeButton}
                    onPress={() => router.push("premium")}
                    activeOpacity={0.9}
                  >
                    <LinearGradient
                      colors={['#fbbf24', '#f59e0b']}
                      style={styles.upgradeButtonGradient}
                    >
                      <Ionicons name="diamond" size={16} color="white" />
                      <Text className="font-poppins-bold text-white text-sm ml-2">
                        Unlock Premium Filters
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
              </BlurView>
            </View>

          </Animated.View>
        </ScrollView>

        {/* Apply Filters Button */}
        <BlurView intensity={30} tint="light" style={styles.applyContainerBlur}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.applyContainer}
          >
            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyFilters}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#ff6b6b', '#ee5a52']}
                style={styles.applyButtonGradient}
              >
                <Ionicons name="checkmark" size={20} color="white" />
                <Text className="font-poppins-bold text-white text-lg ml-2">
                  Apply Filters ({potentialMatches.toLocaleString()} matches)
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </BlurView>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  headerBlur: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  header: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statsBlur: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  statsCard: {
    borderRadius: 24,
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },
  qualityIndicator: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  qualityBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  qualityProgress: {
    height: '100%',
    borderRadius: 3,
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
  sectionContent: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    gap: 12,
  },
  quickFilter: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  quickFilterBlur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  quickFilterGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
  },
  quickFilterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quickFilterIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  premiumMini: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickFilterSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  sliderContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sliderBlur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sliderGradient: {
    padding: 16,
    borderRadius: 20,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderValueBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sliderWrapper: {
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
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  multiSelectContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  multiSelectBlur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  multiSelectGradient: {
    padding: 16,
    borderRadius: 20,
  },
  multiSelectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  multiSelectIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectedChip: {
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  optionChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  seeMoreButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 16,
  },
  dealbreakersGrid: {
    gap: 8,
  },
  dealbreakerItem: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  dealbreakerActive: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  dealbreakerBlur: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  dealbreakerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  dealbreakerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  premiumSectionBlur: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  premiumSection: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  premiumText: {
    flex: 1,
  },
  premiumFilters: {
    gap: 12,
    marginBottom: 16,
  },
  premiumFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  upgradeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  upgradeButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  applyContainerBlur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  applyContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  applyButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  applyButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});