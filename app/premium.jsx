import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
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

const { width, height } = Dimensions.get("window");

const premiumFeatures = [
  {
    icon: "heart",
    title: "Unlimited Likes",
    description: "Like as many profiles as you want without daily limits",
    gradient: ["#ff6b6b", "#ee5a52"],
  },
  {
    icon: "star",
    title: "See Who Liked You",
    description: "Know exactly who's interested before you swipe",
    gradient: ["#fbbf24", "#f59e0b"],
  },
  {
    icon: "flash",
    title: "5 Super Likes Daily",
    description: "Stand out with premium super likes every day",
    gradient: ["#8b5cf6", "#7c3aed"],
  },
  {
    icon: "eye",
    title: "Boost Profile",
    description: "Get 10x more profile views for 30 minutes",
    gradient: ["#06b6d4", "#0891b2"],
  },
  {
    icon: "location",
    title: "Passport Feature",
    description: "Match with people anywhere in the world",
    gradient: ["#10b981", "#059669"],
  },
  {
    icon: "chatbubbles",
    title: "Priority Messages",
    description: "Your messages appear first in their inbox",
    gradient: ["#f59e0b", "#d97706"],
  },
  {
    icon: "shield-checkmark",
    title: "Enhanced Privacy",
    description: "Control who can see your profile and activity",
    gradient: ["#6366f1", "#4f46e5"],
  },
  {
    icon: "infinite",
    title: "Unlimited Rewinds",
    description: "Go back and reconsider your previous swipes",
    gradient: ["#ec4899", "#db2777"],
  },
];

const plans = [
  {
    id: "monthly",
    title: "Monthly",
    duration: "1 Month",
    price: "$19.99",
    pricePerMonth: "$19.99/month",
    popular: false,
    savings: null,
  },
  {
    id: "quarterly",
    title: "Quarterly",
    duration: "3 Months",
    price: "$39.99",
    pricePerMonth: "$13.33/month",
    popular: true,
    savings: "Save 33%",
  },
  {
    id: "yearly",
    title: "Yearly",
    duration: "12 Months",
    price: "$99.99",
    pricePerMonth: "$8.33/month",
    popular: false,
    savings: "Save 58%",
  },
];

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState("quarterly");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const heartAnim = useRef(new Animated.Value(1)).current;

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

    // Heart animation loop
    const heartAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(heartAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    heartAnimation.start();

    return () => heartAnimation.stop();
  }, []);

  const handleSubscribe = () => {
    const plan = plans.find((p) => p.id === selectedPlan);
    Alert.alert(
      "Subscribe to Premium",
      `You selected ${plan.title} plan for ${plan.price}. Proceed with payment?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Subscribe",
          onPress: () => console.log("Subscribe to", selectedPlan),
        },
      ]
    );
  };

  const renderFeature = (feature, index) => (
    <View key={index} style={styles.featureItem}>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.8)"]}
        style={styles.featureContainer}
      >
        <LinearGradient colors={feature.gradient} style={styles.featureIcon}>
          <Ionicons name={feature.icon} size={24} color="white" />
        </LinearGradient>
        <View style={styles.featureText}>
          <Text className="font-poppins-semibold text-gray-900 text-base mb-1">
            {feature.title}
          </Text>
          <Text className="font-poppins text-gray-600 text-sm leading-5">
            {feature.description}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderPlan = (plan) => (
    <TouchableOpacity
      key={plan.id}
      style={[styles.planItem, selectedPlan === plan.id && styles.selectedPlan]}
      onPress={() => setSelectedPlan(plan.id)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={
          selectedPlan === plan.id
            ? ["rgba(255, 107, 107, 0.15)", "rgba(238, 90, 82, 0.15)"]
            : ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.8)"]
        }
        style={styles.planContainer}
      >
        {plan.popular && (
          <LinearGradient
            colors={["#fbbf24", "#f59e0b"]}
            style={styles.popularBadge}
          >
            <Text className="font-poppins-bold text-white text-xs">
              MOST POPULAR
            </Text>
          </LinearGradient>
        )}

        <View style={styles.planHeader}>
          <Text className="font-poppins-bold text-xl text-gray-900">
            {plan.title}
          </Text>
          <Text className="font-poppins text-gray-600 text-sm">
            {plan.duration}
          </Text>
        </View>

        <View style={styles.planPricing}>
          <Text className="font-poppins-bold text-3xl text-gray-900">
            {plan.price}
          </Text>
          <Text className="font-poppins text-gray-600 text-sm">
            {plan.pricePerMonth}
          </Text>
        </View>

        {plan.savings && (
          <LinearGradient
            colors={["#dcfce7", "#bbf7d0"]}
            style={styles.savingsBadge}
          >
            <Text className="font-poppins-semibold text-green-700 text-sm">
              {plan.savings}
            </Text>
          </LinearGradient>
        )}

        {selectedPlan === plan.id && (
          <View style={styles.selectedIndicator}>
            <LinearGradient
              colors={["#ff6b6b", "#ee5a52"]}
              style={styles.selectedIcon}
            >
              <Ionicons name="checkmark" size={16} color="white" />
            </LinearGradient>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fdf2f8" }}>
      <LinearGradient
        colors={["#fdf2f8", "#fce7f3", "#fbcfe8"]}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.9)"]}
          style={styles.header}
        >
          <View className="flex-row justify-between items-center px-6 py-4">
            <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#6B7280" />
            </TouchableOpacity>

            <View className="items-center">
              <View style={styles.titleContainer}>
                <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
                  <LinearGradient
                    colors={["#fbbf24", "#f59e0b"]}
                    style={styles.crownIcon}
                  >
                    <Ionicons name="diamond" size={20} color="white" />
                  </LinearGradient>
                </Animated.View>
                <Text className="font-poppins-bold text-xl text-gray-900 ml-2">
                  Premium
                </Text>
              </View>
              <Text className="font-poppins text-sm text-gray-500">
                Unlock your potential
              </Text>
            </View>

            <TouchableOpacity style={styles.headerButton}>
              <Feather name="gift" size={24} color="#6B7280" />
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
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.9)",
                  "rgba(255, 255, 255, 0.8)",
                ]}
                style={styles.heroContainer}
              >
                <Text className="font-poppins-bold text-2xl text-gray-900 text-center mb-2">
                  Find Love Faster
                </Text>
                <Text className="font-poppins text-gray-600 text-center text-base leading-6 mb-6">
                  Get premium features to boost your dating success and find
                  meaningful connections
                </Text>

                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text className="font-poppins-bold text-2xl text-rose-600">
                      3x
                    </Text>
                    <Text className="font-poppins text-gray-600 text-sm">
                      More Matches
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text className="font-poppins-bold text-2xl text-rose-600">
                      5x
                    </Text>
                    <Text className="font-poppins text-gray-600 text-sm">
                      Profile Views
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text className="font-poppins-bold text-2xl text-rose-600">
                      10x
                    </Text>
                    <Text className="font-poppins text-gray-600 text-sm">
                      Super Likes
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Features Section */}
            <View style={styles.featuresSection}>
              <Text className="font-poppins-bold text-xl text-gray-900 text-center mb-6">
                Premium Features
              </Text>
              <View style={styles.featuresGrid}>
                {premiumFeatures.map((feature, index) =>
                  renderFeature(feature, index)
                )}
              </View>
            </View>

            {/* Plans Section */}
            <View style={styles.plansSection}>
              <Text className="font-poppins-bold text-xl text-gray-900 text-center mb-6">
                Choose Your Plan
              </Text>
              <View style={styles.plansList}>{plans.map(renderPlan)}</View>
            </View>

            {/* Subscribe Button */}
            <View style={styles.subscribeSection}>
              <TouchableOpacity
                style={styles.subscribeButton}
                onPress={handleSubscribe}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={["#ff6b6b", "#ee5a52"]}
                  style={styles.subscribeGradient}
                >
                  <Ionicons name="diamond" size={20} color="white" />
                  <Text className="font-poppins-bold text-white text-lg ml-2">
                    Start Premium
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <Text className="font-poppins text-gray-500 text-center text-sm mt-4">
                Cancel anytime • Secure payment • No hidden fees
              </Text>
            </View>

            {/* Terms */}
            <View style={styles.termsSection}>
              <Text className="font-poppins text-gray-400 text-center text-xs leading-5">
                By subscribing, you agree to our Terms of Service and Privacy
                Policy.{"\n"}
                Subscription automatically renews unless cancelled 24 hours
                before renewal.
              </Text>

              <View style={styles.termsLinks}>
                <TouchableOpacity
                  onPress={() => router.push("terms")}
                >
                  <Text className="font-poppins-medium text-rose-600 text-sm">
                    Terms of Service
                  </Text>
                </TouchableOpacity>
                <Text className="font-poppins text-gray-400 text-sm mx-2">
                  •
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("privacy")}
                >
                  <Text className="font-poppins-medium text-rose-600 text-sm">
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
                <Text className="font-poppins text-gray-400 text-sm mx-2">
                  •
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert("Restore", "Restore previous purchases")
                  }
                >
                  <Text className="font-poppins-medium text-rose-600 text-sm">
                    Restore
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Premium;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  crownIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  heroSection: {
    padding: 20,
    paddingTop: 32,
  },
  heroContainer: {
    borderRadius: 24,
    padding: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  featuresSection: {
    padding: 20,
  },
  featuresGrid: {
    gap: 16,
  },
  featureItem: {
    borderRadius: 16,
    overflow: "hidden",
  },
  featureContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  plansSection: {
    padding: 20,
  },
  plansList: {
    gap: 16,
  },
  planItem: {
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  selectedPlan: {
    borderWidth: 2,
    borderColor: "#ff6b6b",
  },
  planContainer: {
    padding: 20,
    position: "relative",
  },
  popularBadge: {
    position: "absolute",
    top: -1,
    left: 20,
    right: 20,
    paddingVertical: 8,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  planHeader: {
    marginTop: 12,
    marginBottom: 8,
  },
  planPricing: {
    marginBottom: 8,
  },
  savingsBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedIndicator: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  selectedIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  subscribeSection: {
    padding: 20,
  },
  subscribeButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  subscribeGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  termsSection: {
    padding: 20,
    paddingTop: 0,
  },
  termsLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
});
