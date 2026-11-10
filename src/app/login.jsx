import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [email, setEmail] = useState('Muffiluma@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 600);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.navRow}>
            <TouchableOpacity
              style={[styles.backBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color={theme.text} />
            </TouchableOpacity>
            <Text style={styles.brandTitle}>GEEZ</Text>
            <View style={{ width: 44 }} />
          </View>

          <View style={styles.headingBox}>
            <Text style={[styles.title, { color: theme.text }]}>SIGN IN</Text>
            <Text style={[styles.subtitle, { color: theme.subText }]}>
              Sign in to stream your music, playlists, and live radio stations.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <InputField
              label="E-Mail"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              icon="mail-outline"
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              icon="lock-closed-outline"
            />

            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() => router.push('/forgot-password')}
            >
              <Text style={styles.forgotText}>Forgot Password ?</Text>
            </TouchableOpacity>

            <Button
              title="SIGN IN"
              onPress={handleSignIn}
              loading={loading}
              style={styles.submitBtn}
            />
          </View>

          {/* Social connect matching Artboard "Sign in" */}
          <View style={styles.socialSection}>
            <Text style={[styles.socialText, { color: theme.subText }]}>Or connect with</Text>
            <View style={styles.socialButtonsRow}>
              <TouchableOpacity style={[styles.socialBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Ionicons name="logo-google" size={20} color={colors.accentPink} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Ionicons name="logo-apple" size={20} color={theme.text} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerRow}>
            <Text style={{ color: theme.subText, fontSize: 14 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '800' }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    flexGrow: 1,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 2,
  },
  headingBox: {
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    padding: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: -4,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  submitBtn: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  socialSection: {
    alignItems: 'center',
    marginTop: 24,
  },
  socialText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
});
