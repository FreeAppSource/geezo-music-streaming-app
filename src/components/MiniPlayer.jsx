import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { resolveMusicImage } from '../assets/images';
import { songs } from '../data';

export default function MiniPlayer({ currentSong = songs[0], isPlaying = true, onTogglePlay }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={() => router.push({ pathname: '/player', params: { id: currentSong.id } })}
      activeOpacity={0.9}
    >
      {/* Mini Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: '60%' }]} />
      </View>

      <View style={styles.contentRow}>
        <Image
          source={resolveMusicImage(currentSong.image)}
          style={styles.artwork}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text style={[styles.artist, { color: theme.subText }]} numberOfLines={1}>
            {currentSong.artist}
          </Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.iconBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="heart" size={20} color={colors.accentPink} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playBtn}
            onPress={onTogglePlay}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={18}
              color="#0E0B1F"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
    marginHorizontal: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
  },
  artwork: {
    width: 42,
    height: 42,
    borderRadius: radius.xs,
    marginRight: 10,
  },
  info: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
  },
  artist: {
    fontSize: 12,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 6,
    marginRight: 8,
  },
  playBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
