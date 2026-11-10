import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function Header({
  title,
  subtitle,
  showBack = false,
  showAction = true,
  actionIcon = 'notifications-outline',
  onActionPress,
  avatarUrl,
}) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color={theme.text} />
          </TouchableOpacity>
        )}
        {avatarUrl && <Image source={{ uri: avatarUrl }} style={styles.avatar} />}
        <View>
          {subtitle && <Text style={[styles.subtitle, { color: colors.primary }]}>{subtitle}</Text>}
          {title && <Text style={[styles.title, { color: theme.text }]}>{title}</Text>}
        </View>
      </View>

      {showAction && (
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={onActionPress}
        >
          <Ionicons name={actionIcon} size={20} color={theme.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  btn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
});
