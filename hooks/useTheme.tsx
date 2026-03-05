import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

export interface ColorScheme{
    bg : string,
    surface : string,
    text : string,
    textMudted : string,
    border :  string,
    primary :  string,
    success :  string,
    danger :  string,
    warning : string,
    shadow : string,
    gradients : {
        background : [string, string],
        surface : [string, string],
        primary :  [string, string],
        success :  [string, string],
        danger :  [string, string],
        warning : [string, string],
        muted : [string, string],
        empty : [string, string]
    },
    backgrounds : {
        input : string,
        editInput : string,
    },
    statusBarStyle : "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
    bg : "#f8fafc",
    surface : "#ffffff",
    text : "#1e293b",
    textMudted : "#64748b",
    border :  "#e2e8f9",
    primary :  "#3b82f6",
    success :  "#10b981",
    warning :  "#f59e0b",
    danger : "#ef4444",
    shadow : "#000000",
    gradients : {
        background : ["#f8fafc", "#e2e8f0"],
        surface : ["#ffffff", "#f8fafc"],
        primary :  ["#3b82f6", "#1d4ed8"],
        success :  ["#10b981", "#059669"],
        danger :  ["#ef4444", "#cc3636"],
        warning : ["#f59e0b", "#d18a0e"],
        muted : ["#9ca3af", "#64748b"],
        empty : ["#f3f4f6", "#e5e7eb"]
    },
    backgrounds : {
        input : "#ffffff",
        editInput : "#ffffff",
    },
    statusBarStyle : "dark-content" as const,
}

const darkColors: ColorScheme = {
    bg : "#0f172a",
    surface : "#1e293b",
    text : "#f1f5f9",
    textMudted : "#94a3b8",
    border :  "#334155",
    primary :  "#60a5fa",
    success :  "#34d399",
    warning :  "#fbbf24",
    danger : "#f87171",
    shadow : "#000000",
    gradients : {
        background : ["#0f172a", "#1e293b"],
        surface : ["#1e293b", "#334155"],
        primary :  ["#3b82f6", "#1d4ed8"],
        success :  ["#10b981", "#059669"],
        danger :  ["#ef4444", "#cc3636"],
        warning : ["#f59e0b", "#d18a0e"],
        muted : ["#374151", "#4b5563"],
        empty : ["#374151", "#4b5563"]
    },
    backgrounds : {
        input : "#1e293b",
        editInput : "#0f172a",
    },
    statusBarStyle : "light-content" as const,
}

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    colors: ColorScheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export default useTheme;
