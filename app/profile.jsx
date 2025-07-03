import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Sample profile data - in real app, this would come from route params
const profileData = {
  id: 1,
  name: "Emma",
  age: 24,
  bio: "Adventure seeker, coffee enthusiast, and passionate photographer 📸. Love exploring new places and capturing moments that tell a story.",
  subtitle: "Lives life to the fullest ✨",
  distance: "2.3 km away",
  images: [
    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
    "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg"
  ],
  interests: ["Photography", "Travel", "Coffee", "Hiking", "Art", "Music", "Cooking", "Fitness"],
  verified: true,
  education: "NYU Graduate",
  job: "UX Designer",
  company: "Tech Startup",
  height: "5'6\"",
  lastActive: "2 hours ago",
  profileScore: 98,
  zodiac: "Gemini",
  drinking: "Socially",
  smoking: "Never",
  politics: "Liberal",
  religion: "Agnostic",
  languages: ["English", "Spanish", "French"],
  lookingFor: "Long-term relationship",
  mutualFriends: 3,
  mutualInterests: 5,
  profileViews: 156,
  superLikes: 23
};

const ProfileDetailView = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const likeAnimValue = useRef(new Animated.Value(0)).current;
  const superLikeAnimValue = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial animation
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
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const opacity = Math.min(offsetY / 200, 1);
        headerOpacity.setValue(opacity);
      },
    }
  );

  const handleImagePress = (direction) => {
    if (direction === 'next' && currentImageIndex < profileData.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
    
    // Image scale animation
    Animated.sequence([
      Animated.timing(imageScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLike = () => {
    setLikeAnimation(true);
    Animated.sequence([
      Animated.timing(likeAnimValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setLikeAnimation(false);
    });
  };

  const handleSuperLike = () => {
    Animated.sequence([
      Animated.timing(superLikeAnimValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(superLikeAnimValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleMessage = () => {
    router.push('/chat');
  };

  const handleReport = () => {
    router.push('/report-user');
  };

  const renderInfoRow = (icon, label, value, iconColor = "#6B7280") => (
    <View style={styles.infoRow}>
      <LinearGradient
        colors={['#f8fafc', '#f1f5f9']}
        style={styles.infoIcon}
      >
        <MaterialIcons name={icon} size={18} color={iconColor} />
      </LinearGradient>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const renderInterest = (interest, index) => (
    <LinearGradient
      key={index}
      colors={['#fce7f3', '#fbcfe8']}
      style={styles.interestBadge}
    >
      <Text style={styles.interestText}>{interest}</Text>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf2f8' }}>
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3', '#fbcfe8']}
        style={{ flex: 1 }}
      >
        {/* Animated Header */}
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <BlurView intensity={30} tint="light" style={styles.headerBlur}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
              style={styles.headerGradient}
            >
              <TouchableOpacity 
                style={styles.headerButton} 
                onPress={() => router.back()}
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={24} color="#6B7280" />
              </TouchableOpacity>
              
              <View style={styles.headerTitle}>
                <Text style={styles.headerName}>{profileData.name}</Text>
                <Text style={styles.headerAge}>{profileData.age}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={handleReport}
                activeOpacity={0.8}
              >
                <Feather name="more-horizontal" size={24} color="#6B7280" />
              </TouchableOpacity>
            </LinearGradient>
          </BlurView>
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
            {/* Image Gallery */}
            <View style={styles.imageGallery}>
              <Animated.View style={{ transform: [{ scale: imageScale }] }}>
                <Image
                  source={{ uri: profileData.images[currentImageIndex] }}
                  style={styles.mainImage}
                  resizeMode="cover"
                />
              </Animated.View>
              
              {/* Image Navigation */}
              <TouchableOpacity 
                style={styles.imageNavLeft}
                onPress={() => handleImagePress('prev')}
                activeOpacity={0.3}
              />
              <TouchableOpacity 
                style={styles.imageNavRight}
                onPress={() => handleImagePress('next')}
                activeOpacity={0.3}
              />
              
              {/* Image Indicators */}
              <View style={styles.imageIndicators}>
                {profileData.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      index === currentImageIndex && styles.activeIndicator
                    ]}
                  />
                ))}
              </View>
              
              {/* Verification Badge */}
              {profileData.verified && (
                <BlurView intensity={30} tint="light" style={styles.verificationBadge}>
                  <LinearGradient
                    colors={['rgba(59, 130, 246, 0.9)', 'rgba(37, 99, 235, 0.9)']}
                    style={styles.verificationInner}
                  >
                    <MaterialIcons name="verified" size={16} color="white" />
                  </LinearGradient>
                </BlurView>
              )}

              {/* Profile Score */}
              <BlurView intensity={30} tint="light" style={styles.profileScoreBadge}>
                <LinearGradient
                  colors={['rgba(16, 185, 129, 0.9)', 'rgba(5, 150, 105, 0.9)']}
                  style={styles.scoreInner}
                >
                  <Text style={styles.scoreText}>{profileData.profileScore}%</Text>
                </LinearGradient>
              </BlurView>

              {/* Like Animation Overlay */}
              {likeAnimation && (
                <Animated.View
                  style={[
                    styles.likeOverlay,
                    {
                      opacity: likeAnimValue,
                      transform: [
                        {
                          scale: likeAnimValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.5, 1.2],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <AntDesign name="heart" size={80} color="#10B981" />
                </Animated.View>
              )}
            </View>

            {/* Profile Info */}
            <View style={styles.profileSection}>
              <BlurView intensity={30} tint="light" style={styles.profileBlur}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                  style={styles.profileContainer}
                >
                  {/* Basic Info */}
                  <View style={styles.basicInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.profileName}>{profileData.name}</Text>
                      <Text style={styles.profileAge}>{profileData.age}</Text>
                    </View>
                    
                    <View style={styles.jobRow}>
                      <MaterialIcons name="work" size={16} color="#6B7280" />
                      <Text style={styles.jobText}>
                        {profileData.job} at {profileData.company}
                      </Text>
                    </View>
                    
                    <View style={styles.locationRow}>
                      <MaterialIcons name="location-on" size={16} color="#6B7280" />
                      <Text style={styles.locationText}>{profileData.distance}</Text>
                      <Text style={styles.lastActiveText}>• Active {profileData.lastActive}</Text>
                    </View>

                    {/* Mutual Connections */}
                    <View style={styles.mutualInfo}>
                      <LinearGradient
                        colors={['#dbeafe', '#bfdbfe']}
                        style={styles.mutualBadge}
                      >
                        <Ionicons name="people" size={14} color="#3B82F6" />
                        <Text style={styles.mutualText}>
                          {profileData.mutualFriends} mutual friends
                        </Text>
                      </LinearGradient>
                      
                      <LinearGradient
                        colors={['#dcfce7', '#bbf7d0']}
                        style={styles.mutualBadge}
                      >
                        <Ionicons name="heart" size={14} color="#10B981" />
                        <Text style={styles.mutualText}>
                          {profileData.mutualInterests} shared interests
                        </Text>
                      </LinearGradient>
                    </View>
                  </View>

                  {/* Bio */}
                  <View style={styles.bioSection}>
                    <Text style={styles.sectionTitle}>About Me</Text>
                    <Text style={styles.bioText}>{profileData.bio}</Text>
                    <Text style={styles.subtitleText}>{profileData.subtitle}</Text>
                  </View>

                  {/* Interests */}
                  <View style={styles.interestsSection}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Interests</Text>
                      <TouchableOpacity onPress={() => setShowAllInterests(!showAllInterests)}>
                        <Text style={styles.toggleText}>
                          {showAllInterests ? 'Show Less' : 'Show All'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.interestsGrid}>
                      {(showAllInterests ? profileData.interests : profileData.interests.slice(0, 6))
                        .map((interest, index) => renderInterest(interest, index))
                      }
                    </View>
                  </View>

                  {/* Details */}
                  <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <View style={styles.detailsGrid}>
                      {renderInfoRow("school", "Education", profileData.education)}
                      {renderInfoRow("height", "Height", profileData.height)}
                      {renderInfoRow("star", "Zodiac", profileData.zodiac)}
                      {renderInfoRow("local-bar", "Drinking", profileData.drinking)}
                      {renderInfoRow("smoke-free", "Smoking", profileData.smoking)}
                      {renderInfoRow("how-to-vote", "Politics", profileData.politics)}
                    </View>
                  </View>

                  {/* Languages */}
                  <View style={styles.languagesSection}>
                    <Text style={styles.sectionTitle}>Languages</Text>
                    <View style={styles.languagesGrid}>
                      {profileData.languages.map((language, index) => (
                        <LinearGradient
                          key={index}
                          colors={['#e0e7ff', '#c7d2fe']}
                          style={styles.languageBadge}
                        >
                          <Text style={styles.languageText}>{language}</Text>
                        </LinearGradient>
                      ))}
                    </View>
                  </View>

                  {/* Looking For */}
                  <View style={styles.lookingForSection}>
                    <Text style={styles.sectionTitle}>Looking For</Text>
                    <LinearGradient
                      colors={['#fce7f3', '#fbcfe8']}
                      style={styles.lookingForBadge}
                    >
                      <Text style={styles.lookingForText}>{profileData.lookingFor}</Text>
                    </LinearGradient>
                  </View>
                </LinearGradient>
              </BlurView>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Action Buttons */}
        <BlurView intensity={30} tint="light" style={styles.actionsBlur}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.actionsContainer}
          >
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.passButton}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(239, 68, 68, 0.1)', 'rgba(220, 38, 38, 0.05)']}
                  style={styles.actionButtonGradient}
                >
                  <MaterialIcons name="close" size={28} color="#EF4444" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.messageButton}
                onPress={handleMessage}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(139, 92, 246, 0.1)', 'rgba(124, 58, 237, 0.05)']}
                  style={styles.actionButtonGradient}
                >
                  <Ionicons name="chatbubble" size={24} color="#8B5CF6" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.superLikeButton}
                onPress={handleSuperLike}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#3B82F6', '#2563EB']}
                  style={styles.actionButtonGradient}
                >
                  <Animated.View
                    style={{
                      transform: [
                        {
                          scale: superLikeAnimValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.2],
                          }),
                        },
                      ],
                    }}
                  >
                    <AntDesign name="star" size={22} color="white" />
                  </Animated.View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.likeButton}
                onPress={handleLike}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 150, 105, 0.05)']}
                  style={styles.actionButtonGradient}
                >
                  <AntDesign name="heart" size={28} color="#10B981" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </BlurView>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default ProfileDetailView;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: 44,
  },
  headerBlur: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  headerName: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  headerAge: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
    marginLeft: 8,
  },
  imageGallery: {
    height: height * 0.7,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageNavLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '30%',
    backgroundColor: 'transparent',
  },
  imageNavRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '30%',
    backgroundColor: 'transparent',
  },
  imageIndicators: {
    position: 'absolute',
    top: 60,
    left: 20,
    flexDirection: 'row',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginRight: 4,
  },
  activeIndicator: {
    backgroundColor: 'white',
    width: 20,
  },
  verificationBadge: {
    position: 'absolute',
    top: 60,
    right: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  verificationInner: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
  },
  profileScoreBadge: {
    position: 'absolute',
    top: 110,
    right: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  scoreInner: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  likeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileSection: {
    marginTop: -40,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  profileBlur: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  profileContainer: {
    padding: 24,
    borderRadius: 32,
  },
  basicInfo: {
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
  },
  profileAge: {
    fontSize: 28,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
    marginLeft: 8,
  },
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
    marginLeft: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  lastActiveText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    marginLeft: 8,
  },
  mutualInfo: {
    flexDirection: 'row',
    gap: 8,
  },
  mutualBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mutualText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
    marginLeft: 4,
  },
  bioSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#ff6b6b',
  },
  interestsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#ff6b6b',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#BE185D',
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailsGrid: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#9CA3AF',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
  },
  languagesSection: {
    marginBottom: 24,
  },
  languagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  languageText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#4338CA',
  },
  lookingForSection: {
    marginBottom: 16,
  },
  lookingForBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  lookingForText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#BE185D',
  },
  actionsBlur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  actionsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  passButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  messageButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  superLikeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  likeButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});