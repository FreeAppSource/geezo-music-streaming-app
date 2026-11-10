import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { currentUser } from '../data';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Setting</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* User Card matching Artboard "Account" & "Edit" */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/profile')}
          style={[styles.userCard, { backgroundColor: theme.card, borderColor: theme.border }]}
        >
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={28} color={colors.primary} />
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={[styles.userName, { color: theme.text }]}>{currentUser.name}</Text>
            <Text style={[styles.userEmail, { color: theme.subText }]}>{currentUser.email}</Text>
            <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 2 }}>
              {currentUser.playlistsCount} Playlists • {currentUser.followersCount} Followers
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.subText} />
        </TouchableOpacity>

        {/* Settings List matching Artboard "Setting" */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Preferences</Text>

        <View style={[styles.menuList, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={toggleTheme}
          >
            <View style={styles.itemLeft}>
              <Ionicons
                name={isDark ? 'sunny-outline' : 'moon-outline'}
                size={20}
                color={colors.primary}
                style={{ marginRight: 12 }}
              />
              <Text style={[styles.itemText, { color: theme.text }]}>Dark Mode</Text>
            </View>
            <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '800' }}>
              {isDark ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Display Language', 'Current language: English')}
          >
            <View style={styles.itemLeft}>
              <Ionicons name="globe-outline" size={20} color={colors.accentPink} style={{ marginRight: 12 }} />
              <Text style={[styles.itemText, { color: theme.text }]}>Display Language</Text>
            </View>
            <Text style={{ color: theme.subText, fontSize: 13, fontWeight: '700' }}>English</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/player')}
          >
            <View style={styles.itemLeft}>
              <Ionicons name="options-outline" size={20} color={colors.secondary} style={{ marginRight: 12 }} />
              <Text style={[styles.itemText, { color: theme.text }]}>Audio Equalizer</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gray} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Notification', 'Push notifications enabled')}
          >
            <View style={styles.itemLeft}>
              <Ionicons name="notifications-outline" size={20} color={colors.warning} style={{ marginRight: 12 }} />
              <Text style={[styles.itemText, { color: theme.text }]}>Notification</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Legal & Version matching Artboard "Setting" */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>About</Text>
        <View style={[styles.menuList, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert('Terms of Service', 'Geezo Music Streaming App v3.2')}
          >
            <Text style={[styles.itemText, { color: theme.text }]}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.gray} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.menuItem}>
            <Text style={[styles.itemText, { color: theme.text }]}>App Version</Text>
            <Text style={{ color: theme.subText, fontSize: 13, fontWeight: '700' }}>Version 3.2</Text>
          </View>
        </View>

        {/* SIGN OUT matching Artboard "Setting" */}
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.signOutText}>SIGN OUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginVertical: 14,
  },
  userAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(203, 251, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: '900',
  },
  userEmail: {
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  menuList: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
  },
  signOutBtn: {
    marginTop: 28,
    height: 50,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
