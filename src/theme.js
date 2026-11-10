import React, { createContext, useContext, useState } from 'react';

// Exact color tokens extracted from Geezo Music Streaming App Sketch design
export const colors = {
  primary: '#CBFB5E',        // Signature Electric Lime / Chartreuse accent
  primaryDark: '#B4E84B',    // Deep Lime
  primarySoft: 'rgba(203, 251, 94, 0.15)',
  accentPink: '#FF2E63',     // Vivid Pink / Favorite & Trending
  accentCyan: '#08D9D6',     // Cyan Blue
  dark: '#0E0B1F',           // Signature Deep Midnight Canvas
  darkCard: '#20232E',       // Primary Surface
  darkElevated: '#17142A',   // Secondary elevated container
  gray: '#70727B',           // Muted captions & secondary text
  lightGray: '#EEEEEE',      // Borders & dividers
  white: '#FFFFFF',
  danger: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const palettes = {
  dark: {
    bg: '#0E0B1F',
    card: '#20232E',
    elevated: '#17142A',
    text: '#FFFFFF',
    subText: '#70727B',
    border: '#2A2E3D',
    navBg: '#0E0B1F',
    accent: '#CBFB5E',
  },
  light: {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    elevated: '#F1F5F9',
    text: '#0E0B1F',
    subText: '#70727B',
    border: '#EEEEEE',
    navBg: '#FFFFFF',
    accent: '#CBFB5E',
  },
};

const ThemeContext = createContext({
  theme: palettes.dark,
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to Dark mode matching the signature Geezo music style
  const theme = isDark ? palettes.dark : palettes.light;
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
