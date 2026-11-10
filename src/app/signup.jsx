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

export default function SignUpScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [name, setName] = useState('John Huston');
  const [email, setEmail] = useState('Muffiluma@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
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
            <Text style={[styles.title, { color: theme.text }]}>SIGN UP</Text>
            <Text style={[styles.subtitle, { color: theme.subText }]}>
              Create your account to unlock unlimited streaming and personalized radios.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <InputField
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Your full name"
              icon="person-outline"
            />

            <InputField
              label="E-Mail"
              value={email}
              onChangeText={setEmail}
              placeholder="Your email address"
              keyboardType="email-address"
              icon="mail-outline"
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create password"
              secureTextEntry
              icon="lock-closed-outline"
            />

            <Button
              title="SIGN UP"
              onPress={handleSignUp}
              loading={loading}
              style={styles.submitBtn}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={{ color: theme.subText, fontSize: 14 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '800' }}>
                Sign In
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
  submitBtn: {
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
});
