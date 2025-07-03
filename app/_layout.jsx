import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-BoldItalic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-SemiBoldItalic": require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "Poppins-MediumItalic": require("../assets/fonts/Poppins-MediumItalic.ttf"),
    "Poppins-LightItalic": require("../assets/fonts/Poppins-LightItalic.ttf"),
    "Poppins-ThinItalic": require("../assets/fonts/Poppins-ThinItalic.ttf"),
    "Poppins-ExtraLightItalic": require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    "Poppins-ExtraBoldItalic": require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "Poppins-BlackItalic": require("../assets/fonts/Poppins-BlackItalic.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="premium" />
        <Stack.Screen name="verification" />
        <Stack.Screen name="privacy-settings" />
        <Stack.Screen name="filters" />
        <Stack.Screen name="terms" />
        <Stack.Screen name="privacy" />
        <Stack.Screen name="contact-support" />
        <Stack.Screen name="discovery-preferences" />
        <Stack.Screen name="edit-profile" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GestureHandlerRootView>
  );
}