import AntDesign from "@expo/vector-icons/AntDesign";
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
    Image,
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

// User profile data for editing
const initialProfileData = {
  name: "Alex",
  age: "26",
  bio: "Adventure seeker, coffee enthusiast, and passionate photographer 📸",
  job: "Senior UX Designer",
  company: "TechCorp",
  education: "NYU Graduate",
  height: "6'1\"",
  location: "New York, NY",
  interests: ["Photography", "Travel", "Coffee", "Hiking", "Art", "Music"],
  images: [
    "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    null, // Empty slots for new photos
    null,
    null,
  ],
};

const availableInterests = [
  "Photography", "Travel", "Coffee", "Hiking", "Art", "Music", "Cooking", "Fitness",
  "Reading", "Movies", "Dancing", "Yoga", "Wine", "Tech", "Nature", "Sports",
  "Gaming", "Fashion", "Writing", "Meditation", "Food", "Adventure", "Pets", "Netflix"
];

const EditProfile = () => {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [isLoading, setIsLoading] = useState(false);
  const [showInterests, setShowInterests] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const saveButtonAnim = useRef(new Animated.Value(1)).current;

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

  const handleSave = () => {
    setIsLoading(true);
    
    // Animate save button
    Animated.sequence([
      Animated.timing(saveButtonAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(saveButtonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Profile updated successfully!");
    }, 2000);
  };

  const handleImagePress = (index) => {
    Alert.alert(
      "Update Photo",
      "What would you like to do?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Take Photo", onPress: () => console.log("Take photo") },
        { text: "Choose from Library", onPress: () => console.log("Choose photo") },
        ...(profileData.images[index] ? [{ text: "Remove", style: "destructive", onPress: () => removeImage(index) }] : []),
      ]
    );
  };

  const removeImage = (index) => {
    const newImages = [...profileData.images];
    newImages[index] = null;
    setProfileData({ ...profileData, images: newImages });
  };

  const toggleInterest = (interest) => {
    const newInterests = profileData.interests.includes(interest)
      ? profileData.interests.filter(i => i !== interest)
      : [...profileData.interests, interest];
    
    if (newInterests.length <= 8) {
      setProfileData({ ...profileData, interests: newInterests });
    } else {
      Alert.alert("Limit Reached", "You can select up to 8 interests");
    }
  };

  const renderImageSlot = (image, index) => (
    <TouchableOpacity
      key={index}
      style={styles.imageSlot}
      onPress={() => handleImagePress(index)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.imageContainer}
      >
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.profileImage} />
            <View style={styles.imageOverlay}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.4)']}
                style={styles.imageActions}
              >
                <TouchableOpacity
                  style={styles.imageActionButton}
                  onPress={() => handleImagePress(index)}
                >
                  <Feather name="edit-2" size={16} color="white" />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </>
        ) : (
          <View style={styles.emptyImageSlot}>
            <LinearGradient
              colors={['#ff6b6b', '#ee5a52']}
              style={styles.addImageIcon}
            >
              <AntDesign name="plus" size={24} color="white" />
            </LinearGradient>
            <Text className="font-poppins text-gray-600 text-sm mt-2">Add Photo</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderInputField = (label, value, onChangeText, placeholder, multiline = false) => (
    <View style={styles.inputGroup}>
      <Text className="font-poppins-medium text-gray-900 text-base mb-2">{label}</Text>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.inputContainer}
      >
        <TextInput
          style={[styles.textInput, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          className="font-poppins"
        />
      </LinearGradient>
    </View>
  );

  const renderInterestChip = (interest, isSelected) => (
    <TouchableOpacity
      key={interest}
      style={styles.interestChip}
      onPress={() => toggleInterest(interest)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={isSelected 
          ? ['#ff6b6b', '#ee5a52']
          : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']
        }
        style={styles.interestChipGradient}
      >
        <Text 
          className={`font-poppins-medium text-sm ${
            isSelected ? 'text-white' : 'text-gray-700'
          }`}
        >
          {interest}
        </Text>
        {isSelected && (
          <AntDesign name="check" size={14} color="white" style={{ marginLeft: 4 }} />
        )}
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
              <Text className="font-poppins-bold text-xl text-gray-900">Edit Profile</Text>
              <Text className="font-poppins text-sm text-gray-500">Make yourself stand out</Text>
            </View>
            
            <TouchableOpacity style={styles.headerButton}>
              <Feather name="help-circle" size={24} color="#6B7280" />
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
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {/* Photos Section */}
              <View style={styles.section}>
                <Text className="font-poppins-bold text-lg text-gray-900 mb-4 px-6">
                  Your Photos
                </Text>
                <Text className="font-poppins text-gray-600 text-sm mb-6 px-6">
                  Add up to 6 photos. First photo will be your main profile picture.
                </Text>
                
                <View style={styles.photosGrid}>
                  {profileData.images.map((image, index) => renderImageSlot(image, index))}
                </View>
              </View>

              {/* Basic Info Section */}
              <View style={styles.section}>
                <Text className="font-poppins-bold text-lg text-gray-900 mb-6 px-6">
                  Basic Information
                </Text>
                
                <View className="px-6">
                  {renderInputField("Name", profileData.name, (text) => 
                    setProfileData({...profileData, name: text}), "Enter your name"
                  )}
                  
                  {renderInputField("Age", profileData.age, (text) => 
                    setProfileData({...profileData, age: text}), "Enter your age"
                  )}
                  
                  {renderInputField("Bio", profileData.bio, (text) => 
                    setProfileData({...profileData, bio: text}), "Tell people about yourself...", true
                  )}
                </View>
              </View>

              {/* Professional Info Section */}
              <View style={styles.section}>
                <Text className="font-poppins-bold text-lg text-gray-900 mb-6 px-6">
                  Professional Info
                </Text>
                
                <View className="px-6">
                  {renderInputField("Job Title", profileData.job, (text) => 
                    setProfileData({...profileData, job: text}), "Your job title"
                  )}
                  
                  {renderInputField("Company", profileData.company, (text) => 
                    setProfileData({...profileData, company: text}), "Where you work"
                  )}
                  
                  {renderInputField("Education", profileData.education, (text) => 
                    setProfileData({...profileData, education: text}), "Your education"
                  )}
                </View>
              </View>

              {/* Physical Info Section */}
              <View style={styles.section}>
                <Text className="font-poppins-bold text-lg text-gray-900 mb-6 px-6">
                  Additional Details
                </Text>
                
                <View className="px-6">
                  {renderInputField("Height", profileData.height, (text) => 
                    setProfileData({...profileData, height: text}), "Your height"
                  )}
                  
                  {renderInputField("Location", profileData.location, (text) => 
                    setProfileData({...profileData, location: text}), "City, State"
                  )}
                </View>
              </View>

              {/* Interests Section */}
              <View style={styles.section}>
                <View className="flex-row justify-between items-center px-6 mb-6">
                  <Text className="font-poppins-bold text-lg text-gray-900">
                    Interests ({profileData.interests.length}/8)
                  </Text>
                  <TouchableOpacity onPress={() => setShowInterests(!showInterests)}>
                    <Text className="font-poppins-medium text-rose-600">
                      {showInterests ? 'Show Less' : 'Edit'}
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.interestsContainer}>
                  {(showInterests ? availableInterests : profileData.interests).map((interest) => 
                    renderInterestChip(interest, profileData.interests.includes(interest))
                  )}
                </View>
              </View>

            </Animated.View>
          </ScrollView>

          {/* Save Button */}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.saveContainer}
          >
            <Animated.View style={{ transform: [{ scale: saveButtonAnim }] }}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={isLoading}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#ff6b6b', '#ee5a52']}
                  style={styles.saveButtonGradient}
                >
                  {isLoading ? (
                    <View style={styles.loadingContainer}>
                      <View style={styles.loadingDot} />
                      <View style={[styles.loadingDot, { animationDelay: '0.2s' }]} />
                      <View style={[styles.loadingDot, { animationDelay: '0.4s' }]} />
                    </View>
                  ) : (
                    <>
                      <Feather name="check" size={20} color="white" />
                      <Text className="font-poppins-bold text-white text-lg ml-2">
                        Save Changes
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default EditProfile;

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
  section: {
    marginBottom: 32,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  imageSlot: {
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageActions: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 16,
    padding: 6,
  },
  imageActionButton: {
    padding: 2,
  },
  emptyImageSlot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    borderRadius: 16,
    padding: 16,
  },
  textInput: {
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'top',
  },
  multilineInput: {
    height: 100,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
  },
  interestChip: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 8,
  },
  interestChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  saveButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
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
    opacity: 0.6,
  },
});