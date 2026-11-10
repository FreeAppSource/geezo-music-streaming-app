import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';
import { resolveMusicImage } from '../assets/images';

export default function SongRow({
  song,
  index,
  isPlaying = false,
  onPress,
  onOptionsPress,
}) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isPlaying ? 'rgba(203, 251, 94, 0.08)' : 'transparent' },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Index or Equalizer bars */}
      <View style={styles.indexBox}>
        {isPlaying ? (
          <Ionicons name="volume-high" size={18} color={colors.primary} />
        ) : index !== undefined ? (
          <Text style={[styles.indexText, { color: theme.subText }]}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </Text>
        ) : null}
      </View>

      {/* Song Thumbnail */}
      <Image
        source={resolveMusicImage(song.image)}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      {/* Song Details */}
      <View style={styles.detailsBox}>
        <Text
          style={[
            styles.title,
            { color: isPlaying ? colors.primary : theme.text },
          ]}
          numberOfLines={1}
        >
          {song.title}
        </Text>
        <Text style={[styles.artist, { color: theme.subText }]} numberOfLines={1}>
          {song.artist} {song.album ? `• ${song.album}` : ''}
        </Text>
      </View>

      {/* Duration */}
      <Text style={[styles.duration, { color: theme.subText }]}>{song.duration}</Text>

      {/* More Options Menu */}
      <TouchableOpacity
        style={styles.optionsBtn}
        onPress={onOptionsPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="ellipsis-horizontal" size={18} color={theme.subText} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: radius.md,
    marginBottom: 4,
  },
  indexBox: {
    width: 28,
    alignItems: 'center',
    marginRight: 6,
  },
  indexText: {
    fontSize: 13,
    fontWeight: '700',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    marginRight: 12,
  },
  detailsBox: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  artist: {
    fontSize: 12,
    fontWeight: '500',
  },
  duration: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 12,
  },
  optionsBtn: {
    padding: 4,
  },
});
