import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Dimensions,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

// Sample chat messages
const chatMessages = [
  {
    id: 1,
    text: "Hey! I love your photography work 📸",
    timestamp: "10:30 AM",
    isMyMessage: false,
    type: "text",
  },
  {
    id: 2,
    text: "Thank you so much! That means a lot 😊",
    timestamp: "10:32 AM",
    isMyMessage: true,
    type: "text",
  },
  {
    id: 3,
    text: "The golden hour shots are absolutely stunning",
    timestamp: "10:33 AM",
    isMyMessage: false,
    type: "text",
  },
  {
    id: 4,
    text: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    timestamp: "10:35 AM",
    isMyMessage: true,
    type: "image",
  },
  {
    id: 5,
    text: "This was from last weekend's shoot!",
    timestamp: "10:35 AM",
    isMyMessage: true,
    type: "text",
  },
  {
    id: 6,
    text: "Wow! That's incredible! 😍",
    timestamp: "10:38 AM",
    isMyMessage: false,
    type: "text",
  },
  {
    id: 7,
    text: "Would you like to grab coffee and talk photography?",
    timestamp: "10:40 AM",
    isMyMessage: false,
    type: "text",
  },
  {
    id: 8,
    text: "I'd love that! How about tomorrow afternoon?",
    timestamp: "10:42 AM",
    isMyMessage: true,
    type: "text",
  },
];

// Chat participant info
const chatPartner = {
  name: "Emma",
  age: 24,
  avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  isOnline: true,
  lastSeen: "Active now",
  isTyping: false,
};

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const typingAnim = useRef(new Animated.Value(0)).current;
  const imageModalAnim = useRef(new Animated.Value(0)).current;
  const imageScaleAnim = useRef(new Animated.Value(0.5)).current;

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

  useEffect(() => {
    // Simulate typing animation
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isTyping]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMyMessage: true,
        type: "text",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleImagePress = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
    
    // Animate modal in
    Animated.parallel([
      Animated.timing(imageModalAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(imageScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeImageModal = () => {
    Animated.parallel([
      Animated.timing(imageModalAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(imageScaleAnim, {
        toValue: 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setImageModalVisible(false);
      setSelectedImage(null);
    });
  };

  const handleProfilePress = () => {
    Alert.alert("Profile", `View ${chatPartner.name}'s profile`);
  };

  const handleVideoCall = () => {
    Alert.alert("Video Call", `Start video call with ${chatPartner.name}`);
  };

  const handleVoiceCall = () => {
    Alert.alert("Voice Call", `Start voice call with ${chatPartner.name}`);
  };

  const renderMessage = ({ item, index }) => {
    const isMyMessage = item.isMyMessage;
    const isFirstInGroup = index === 0 || messages[index - 1].isMyMessage !== isMyMessage;
    const isLastInGroup = index === messages.length - 1 || messages[index + 1].isMyMessage !== isMyMessage;

    return (
      <View style={[
        styles.messageContainer,
        isMyMessage ? styles.myMessageContainer : styles.theirMessageContainer
      ]}>
        {item.type === "image" ? (
          <TouchableOpacity
            onPress={() => handleImagePress(item.text)}
            style={[
              styles.imageMessage,
              isMyMessage ? styles.myImageMessage : styles.theirImageMessage
            ]}
          >
            <Image source={{ uri: item.text }} style={styles.messageImage} />
            <View style={styles.imageOverlay}>
              <Text className="font-poppins text-white text-xs">{item.timestamp}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <LinearGradient
            colors={isMyMessage 
              ? ['#ff6b6b', '#ee5a52'] 
              : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']
            }
            style={[
              styles.messageBubble,
              isMyMessage ? styles.myMessageBubble : styles.theirMessageBubble,
              isFirstInGroup && (isMyMessage ? styles.myFirstMessage : styles.theirFirstMessage),
              isLastInGroup && (isMyMessage ? styles.myLastMessage : styles.theirLastMessage),
            ]}
          >
            <Text 
              className={`font-poppins ${isMyMessage ? 'text-white' : 'text-gray-900'}`}
              style={styles.messageText}
            >
              {item.text}
            </Text>
            <Text 
              className={`font-poppins text-xs ${isMyMessage ? 'text-white/70' : 'text-gray-500'}`}
              style={styles.timestamp}
            >
              {item.timestamp}
            </Text>
          </LinearGradient>
        )}
      </View>
    );
  };

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.theirMessageContainer]}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={[styles.messageBubble, styles.theirMessageBubble, styles.typingBubble]}
      >
        <View style={styles.typingContainer}>
          <Animated.View style={[styles.typingDot, { opacity: typingAnim }]} />
          <Animated.View style={[styles.typingDot, { opacity: typingAnim }]} />
          <Animated.View style={[styles.typingDot, { opacity: typingAnim }]} />
        </View>
      </LinearGradient>
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
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="arrow-back" size={24} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.profileSection}
              onPress={handleProfilePress}
              activeOpacity={0.8}
            >
              <View style={styles.avatarContainer}>
                <Image source={{ uri: chatPartner.avatar }} style={styles.headerAvatar} />
                {chatPartner.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              <View style={styles.profileInfo}>
                <Text className="font-poppins-semibold text-gray-900 text-lg">
                  {chatPartner.name}
                </Text>
                <Text className="font-poppins text-gray-500 text-sm">
                  {chatPartner.isTyping ? "typing..." : chatPartner.lastSeen}
                </Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.callButtons}>
              <TouchableOpacity
                style={styles.callButton}
                onPress={handleVoiceCall}
              >
                <Ionicons name="call" size={20} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.callButton}
                onPress={handleVideoCall}
              >
                <Ionicons name="videocam" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          {/* Chat Messages */}
          <Animated.View
            style={{
              flex: 1,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.messagesContainer}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              ListFooterComponent={chatPartner.isTyping ? renderTypingIndicator : null}
            />
          </Animated.View>

          {/* Message Input */}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.inputContainer}
          >
            <View style={styles.inputWrapper}>
              <TouchableOpacity style={styles.attachButton}>
                <Feather name="paperclip" size={20} color="#6B7280" />
              </TouchableOpacity>
              
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Type a message..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  maxLength={500}
                  className="font-poppins"
                />
              </View>
              
              <TouchableOpacity style={styles.emojiButton}>
                <Feather name="smile" size={20} color="#6B7280" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  message.trim() ? styles.sendButtonActive : styles.sendButtonInactive
                ]}
                onPress={handleSendMessage}
                disabled={!message.trim()}
              >
                <LinearGradient
                  colors={message.trim() ? ['#ff6b6b', '#ee5a52'] : ['#E5E7EB', '#E5E7EB']}
                  style={styles.sendButtonGradient}
                >
                  <Ionicons 
                    name="send" 
                    size={18} 
                    color={message.trim() ? "white" : "#9CA3AF"} 
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>

        {/* Image Modal */}
        <Modal
          visible={imageModalVisible}
          transparent={true}
          animationType="none"
          onRequestClose={closeImageModal}
        >
          <Animated.View
            style={[
              styles.imageModalOverlay,
              {
                opacity: imageModalAnim,
              }
            ]}
          >
            <BlurView intensity={100} tint="light" style={styles.imageModalBlur}>
              <TouchableOpacity
                style={styles.imageModalCloseArea}
                onPress={closeImageModal}
                activeOpacity={1}
              >
                <Animated.View
                  style={[
                    styles.imageModalContent,
                    {
                      transform: [{ scale: imageScaleAnim }],
                      opacity: imageModalAnim,
                    }
                  ]}
                >
                  <TouchableOpacity
                    style={styles.imageCloseButton}
                    onPress={closeImageModal}
                  >
                    <LinearGradient
                      colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
                      style={styles.imageCloseButtonGradient}
                    >
                      <Ionicons name="close" size={24} color="#374151" />
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  {selectedImage && (
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.fullscreenImage}
                      resizeMode="contain"
                    />
                  )}
                  
                  <LinearGradient
                    colors={['transparent', 'rgba(255, 255, 255, 0.95)']}
                    style={styles.imageModalInfo}
                  >
                    <Text className="font-poppins-medium text-gray-800 text-lg">
                      {chatPartner.name}
                    </Text>
                    <Text className="font-poppins text-gray-600 text-sm">
                      Tap to close
                    </Text>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            </BlurView>
          </Animated.View>
        </Modal>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  callButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 4,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  myMessageBubble: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 4,
  },
  theirMessageBubble: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 20,
  },
  myFirstMessage: {
    borderTopRightRadius: 20,
  },
  myLastMessage: {
    borderBottomRightRadius: 20,
  },
  theirFirstMessage: {
    borderTopLeftRadius: 20,
  },
  theirLastMessage: {
    borderBottomLeftRadius: 20,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  imageMessage: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  myImageMessage: {
    alignSelf: 'flex-end',
  },
  theirImageMessage: {
    alignSelf: 'flex-start',
  },
  messageImage: {
    width: 200,
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 8,
  },
  typingBubble: {
    paddingVertical: 16,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b6b',
    marginHorizontal: 2,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 120,
  },
  textInput: {
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'center',
  },
  emojiButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonActive: {
    transform: [{ scale: 1 }],
  },
  sendButtonInactive: {
    transform: [{ scale: 0.95 }],
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Image Modal Styles
  imageModalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageModalBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalCloseArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageModalContent: {
    width: width - 40,
    maxHeight: height - 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  imageCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  imageCloseButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    minHeight: 300,
  },
  imageModalInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
});