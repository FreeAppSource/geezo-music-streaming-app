import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [email, setEmail] = useState('Muffiluma@gmail.com');
  const [step, setStep] = useState(1); // 1: Send reset, 2: Change password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendLink = () => {
    setStep(2);
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Password Changed!',
      'Your password has been successfully reset. You can now sign in.',
      [{ text: 'Sign In', onPress: () => router.replace('/login') }]
    );
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
              onPress={() => (step === 2 ? setStep(1) : router.back())}
            >
              <Ionicons name="arrow-back" size={20} color={theme.text} />
            </TouchableOpacity>
            <Text style={styles.brandTitle}>GEEZ</Text>
            <View style={{ width: 44 }} />
          </View>

          <View style={styles.headingBox}>
            <Text style={[styles.title, { color: theme.text }]}>Forgot Password?</Text>
            <Text style={[styles.subtitle, { color: theme.subText }]}>
              If you need help resetting your password, we can help by sending you a link to reset it.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            {step === 1 ? (
              <>
                <InputField
                  label="E-Mail"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter registered email"
                  keyboardType="email-address"
                  icon="mail-outline"
                />

                <Button
                  title="SENT"
                  onPress={handleSendLink}
                  style={styles.actionBtn}
                />
              </>
            ) : (
              <>
                <InputField
                  label="Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="New password"
                  secureTextEntry
                  icon="lock-closed-outline"
                />

                <InputField
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Repeat new password"
                  secureTextEntry
                  icon="lock-closed-outline"
                />

                <Button
                  title="CHANGE PASSWORD"
                  onPress={handleChangePassword}
                  style={styles.actionBtn}
                />
              </>
            )}
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
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
  },
  card: {
    padding: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  actionBtn: {
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
});
