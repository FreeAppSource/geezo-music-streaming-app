import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';
import { resolveMusicImage } from '../assets/images';

export default function AlbumCard({ item, onPress, width = 140 }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { width }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrap}>
        <Image
          source={resolveMusicImage(item.image)}
          style={[styles.image, { height: width }]}
          resizeMode="cover"
        />
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={16} color="#0E0B1F" />
        </View>
      </View>

      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={[styles.subtitle, { color: theme.subText }]} numberOfLines={1}>
        {item.artist || item.subtitle || `${item.tracksCount || ''}`}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: 14,
    marginBottom: 8,
  },
  imageWrap: {
    position: 'relative',
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
  },
  playOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
  },
});
