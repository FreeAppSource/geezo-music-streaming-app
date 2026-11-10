import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { userProfile } from '../../data';
import Header from '../../components/Header';

export default function ProfileTab() {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Header title="My Profile" showAction={false} />

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          <Text style={[styles.name, { color: theme.text }]}>{userProfile.name}</Text>
          <Text style={[styles.email, { color: theme.subText }]}>{userProfile.email}</Text>
          <View style={[styles.badge, { backgroundColor: colors.primarySoft }]}>
            <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>{userProfile.status}</Text>
          </View>
        </View>

        <Text style={[styles.sectionHeading, { color: theme.text }]}>Settings & System</Text>

        <View style={[styles.menuList, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
            <View style={styles.itemLeft}>
              <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={20} color={colors.primary} style={{ marginRight: 12 }} />
              <Text style={[styles.itemText, { color: theme.text }]}>Dark Mode</Text>
            </View>
            <Text style={{ color: colors.gray }}>{isDark ? 'On' : 'Off'}</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.itemLeft}>
              <Ionicons name="notifications-outline" size={20} color={colors.secondary} style={{ marginRight: 12 }} />
              <Text style={[styles.itemText, { color: theme.text }]}>Push Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gray} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.itemLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.success} style={{ marginRight: 12 }} />
              <Text style={[styles.itemText, { color: theme.text }]}>Privacy & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gray} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/login')}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 32 },
  card: { alignItems: 'center', padding: 22, borderRadius: radius.lg, borderWidth: 1, marginVertical: 14 },
  avatar: { width: 76, height: 76, borderRadius: 38, marginBottom: 10 },
  name: { fontSize: 19, fontWeight: '800', marginBottom: 2 },
  email: { fontSize: 13, marginBottom: 10 },
  badge: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: radius.full },
  sectionHeading: { fontSize: 16, fontWeight: '800', marginVertical: 12 },
  menuList: { borderRadius: radius.lg, borderWidth: 1, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemText: { fontSize: 15, fontWeight: '600' },
  divider: { height: 1 },
  logoutBtn: { marginTop: 24, height: 48, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.danger, justifyContent: 'center', alignItems: 'center' },
  logoutText: { color: colors.danger, fontSize: 15, fontWeight: '700' },
});
