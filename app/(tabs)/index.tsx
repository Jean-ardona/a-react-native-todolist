import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(useTheme().colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>

      <StatusBar style={!isDarkMode ? 'dark' : 'light'} />

      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle Theme</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}