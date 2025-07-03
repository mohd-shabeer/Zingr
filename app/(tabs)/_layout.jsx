import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Enhanced tab configuration with likes page
const tabs = [
  {
    name: "home",
    icon: "heart",
    iconType: "AntDesign",
    label: "Discover",
    gradient: ["#ff6b6b", "#ee5a52"],
    notification: false,
  },
  {
    name: "likes",
    icon: "favorite",
    iconType: "MaterialIcons",
    label: "Likes",
    gradient: ["#ec4899", "#db2777"],
    notification: true,
    notificationCount: 12,
  },
  {
    name: "chat-list",
    icon: "chatbubbles",
    iconType: "Ionicons",
    label: "Chats",
    gradient: ["#8b5cf6", "#7c3aed"],
    notification: true,
    notificationCount: 3,
  },
  {
    name: "my-profile",
    icon: "person",
    iconType: "Ionicons",
    label: "Profile",
    gradient: ["#06b6d4", "#0891b2"],
    notification: false,
  },
  {
    name: "settings",
    icon: "settings",
    iconType: "Ionicons",
    label: "Settings",
    gradient: ["#10b981", "#059669"],
    notification: false,
  },
];

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const animatedValues = useRef(
    tabs.map(() => new Animated.Value(0))
  ).current;
  const scaleValues = useRef(
    tabs.map(() => new Animated.Value(1))
  ).current;
  const translateYValues = useRef(
    tabs.map(() => new Animated.Value(0))
  ).current;
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const heartBeatAnim = useRef(new Animated.Value(1)).current;
  const notificationPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate indicator position with smoother transition
    Animated.spring(indicatorAnim, {
      toValue: state.index,
      useNativeDriver: true,
      tension: 120,
      friction: 10,
    }).start();

    // Animate tabs with staggered effect
    animatedValues.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: state.index === index ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
        delay: index * 20, // Staggered animation
      }).start();
    });

    // Enhanced scale animation for active tab
    scaleValues.forEach((scale, index) => {
      Animated.spring(scale, {
        toValue: state.index === index ? 1.15 : 1,
        useNativeDriver: true,
        tension: 120,
        friction: 7,
      }).start();
    });

    // Bounce animation for active tab
    translateYValues.forEach((translateY, index) => {
      Animated.spring(translateY, {
        toValue: state.index === index ? -10 : 0,
        useNativeDriver: true,
        tension: 120,
        friction: 9,
      }).start();
    });
  }, [state.index]);

  useEffect(() => {
    // Pulse animation for active tab
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Heart beat animation for likes tab
    const heartBeatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(heartBeatAnim, {
          toValue: 1.2,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(heartBeatAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.delay(800),
      ])
    );

    // Notification pulse animation
    const notificationAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(notificationPulse, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(notificationPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    heartBeatAnimation.start();
    notificationAnimation.start();

    return () => {
      pulseAnimation.stop();
      heartBeatAnimation.stop();
      notificationAnimation.stop();
    };
  }, []);

  const getIconComponent = (iconType, iconName, size, color) => {
    switch (iconType) {
      case "AntDesign":
        return <AntDesign name={iconName} size={size} color={color} />;
      case "Ionicons":
        return <Ionicons name={iconName} size={size} color={color} />;
      case "MaterialIcons":
        return <MaterialIcons name={iconName} size={size} color={color} />;
      case "Feather":
        return <Feather name={iconName} size={size} color={color} />;
      default:
        return <Ionicons name={iconName} size={size} color={color} />;
    }
  };

  const onTabPress = (route, index) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      // Add haptic feedback
      if (Platform.OS === "ios") {
        // Add haptic feedback here if needed
      }
      navigation.navigate(route.name);
    }
  };

  const renderNotificationBadge = (tab, routeName) => {
    if (!tab.notification) return null;

    return (
      <Animated.View 
        style={[
          styles.notificationBadge,
          {
            transform: [
              { 
                scale: tab.name === "likes" ? heartBeatAnim : notificationPulse 
              }
            ]
          }
        ]}
      >
        <LinearGradient
          colors={tab.name === "likes" ? ["#ec4899", "#db2777"] : ["#ff6b6b", "#ee5a52"]}
          style={styles.badgeGradient}
        >
          <Text style={styles.badgeText}>
            {tab.notificationCount > 99 ? "99+" : tab.notificationCount}
          </Text>
        </LinearGradient>
      </Animated.View>
    );
  };

  const getTabWidth = () => {
    return width / tabs.length;
  };

  const getIndicatorPosition = (index) => {
    const tabWidth = getTabWidth();
    return (tabWidth * index) + (tabWidth / 2) - 30; // 30 is half of indicator width
  };

  return (
    <View style={styles.container}>
      {/* Enhanced Background Blur */}
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.98)", "rgba(255, 255, 255, 0.95)"]}
          style={styles.gradientBackground}
        >
          {/* Animated Indicator */}
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [
                  {
                    translateX: indicatorAnim.interpolate({
                      inputRange: tabs.map((_, i) => i),
                      outputRange: tabs.map((_, i) => getIndicatorPosition(i)),
                    }),
                  },
                  { scale: pulseAnim },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={tabs[state.index]?.gradient || ["#ff6b6b", "#ee5a52"]}
              style={styles.indicatorGradient}
            />
          </Animated.View>

          {/* Tab Items */}
          <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
              const tab = tabs.find((t) => t.name === route.name);
              if (!tab) return null;

              const isFocused = state.index === index;
              const animatedValue = animatedValues[index];
              const scaleValue = scaleValues[index];
              const translateYValue = translateYValues[index];

              return (
                <TouchableOpacity
                  key={route.key}
                  style={styles.tabItem}
                  onPress={() => onTabPress(route, index)}
                  activeOpacity={0.7}
                >
                  <Animated.View
                    style={[
                      styles.tabButton,
                      {
                        transform: [
                          { scale: scaleValue },
                          { translateY: translateYValue },
                        ],
                      },
                    ]}
                  >
                    {/* Tab Icon with enhanced styling */}
                    <View style={styles.iconContainer}>
                      <Animated.View
                        style={[
                          styles.iconWrapper,
                          {
                            opacity: animatedValue.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.6, 1],
                            }),
                          },
                        ]}
                      >
                        {isFocused ? (
                          <LinearGradient
                            colors={tab.gradient}
                            style={styles.activeIconBg}
                          >
                            <View style={styles.activeIconInner}>
                              {getIconComponent(tab.iconType, tab.icon, 24, "white")}
                            </View>
                          </LinearGradient>
                        ) : (
                          <View style={styles.inactiveIconBg}>
                            {getIconComponent(tab.iconType, tab.icon, 22, "#9CA3AF")}
                          </View>
                        )}
                      </Animated.View>

                      {/* Enhanced Notification Badge */}
                      {renderNotificationBadge(tab, route.name)}
                    </View>

                    {/* Tab Label with enhanced styling */}
                    <Animated.Text
                      style={[
                        styles.tabLabel,
                        {
                          opacity: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.6, 1],
                          }),
                          transform: [
                            {
                              scale: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.85, 1],
                              }),
                            },
                          ],
                        },
                        isFocused && styles.activeTabLabel,
                      ]}
                    >
                      {tab.label}
                    </Animated.Text>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Add floating action elements for visual appeal */}
          <View style={styles.floatingElements}>
            {[...Array(3)].map((_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.floatingDot,
                  {
                    left: `${20 + i * 30}%`,
                    transform: [
                      {
                        translateY: pulseAnim.interpolate({
                          inputRange: [1, 1.03],
                          outputRange: [0, -2],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
};

const TabLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{ 
          headerShown: false,
          tabBarHideOnKeyboard: true, // Hide tab bar when keyboard is open
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
        sceneContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 100 : 85, // Add padding to prevent overlap
        }}
      >
        <Tabs.Screen 
          name="home"
          options={{
            title: "Discover",
          }}
        />
        <Tabs.Screen 
          name="likes"
          options={{
            title: "Likes",
          }}
        />
        <Tabs.Screen 
          name="chat-list"
          options={{
            title: "Chats",
          }}
        />
        <Tabs.Screen 
          name="my-profile"
          options={{
            title: "Profile",
          }}
        />
        <Tabs.Screen 
          name="settings"
          options={{
            title: "Settings",
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 999, // Ensure tab bar is always on top
  },
  blurContainer: {
    overflow: "hidden",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  gradientBackground: {
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 36 : 20,
    paddingHorizontal: 16,
    position: "relative",
    minHeight: Platform.OS === "ios" ? 85 : 70, // Ensure minimum height
  },
  indicator: {
    position: "absolute",
    top: 6,
    width: 60,
    height: 4,
    borderRadius: 3,
    overflow: "hidden",
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  indicatorGradient: {
    flex: 1,
    borderRadius: 3,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 12,
    marginTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    minHeight: 60,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 6,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  activeIconInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  inactiveIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
  },
  notificationBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    overflow: "hidden",
    borderRadius: 12,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  badgeGradient: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    textAlign: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: "Poppins-Medium",
    color: "#9CA3AF",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  activeTabLabel: {
    color: "#374151",
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
  },
  floatingElements: {
    position: 'absolute',
    top: 2,
    left: 0,
    right: 0,
    height: 2,
  },
  floatingDot: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 107, 107, 0.3)',
  },
});