import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { playlists, songs, albums } from '../../data';
import { resolveMusicImage } from '../../assets/images';
import SongRow from '../../components/SongRow';
import MiniPlayer from '../../components/MiniPlayer';

export default function PlaylistDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();

  const playlist =
    playlists.find((p) => p.id === id) ||
    albums.find((a) => a.id === id) ||
    playlists[0];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header Art & Navigation */}
        <View style={styles.bannerContainer}>
          <Image
            source={resolveMusicImage(playlist.image)}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Playlist Metadata */}
        <View style={styles.metaBox}>
          <Text style={[styles.title, { color: theme.text }]}>{playlist.title}</Text>
          <Text style={[styles.subtitle, { color: theme.subText }]}>
            {playlist.subtitle || playlist.artist} • {playlist.tracksCount || '24 tracks'}
          </Text>

          {playlist.description && (
            <Text style={[styles.description, { color: theme.subText }]}>
              {playlist.description}
            </Text>
          )}

          {/* Action Row: Play All, Shuffle */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.playAllBtn, { backgroundColor: colors.primary }]}
              onPress={() => router.push({ pathname: '/player', params: { id: 's1' } })}
              activeOpacity={0.85}
            >
              <Ionicons name="play" size={20} color="#0E0B1F" style={{ marginRight: 8 }} />
              <Text style={styles.playAllText}>PLAY ALL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.shuffleBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => router.push({ pathname: '/player', params: { id: 's2' } })}
            >
              <Ionicons name="shuffle" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tracklist */}
        <View style={styles.tracklist}>
          {songs.map((song, idx) => (
            <SongRow
              key={song.id}
              song={song}
              index={idx}
              onPress={() => router.push({ pathname: '/player', params: { id: song.id } })}
              onOptionsPress={() => router.push({ pathname: '/player', params: { id: song.id } })}
            />
          ))}
        </View>
      </ScrollView>

      <MiniPlayer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 24,
  },
  bannerContainer: {
    position: 'relative',
    height: 240,
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(14, 11, 31, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaBox: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playAllBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: radius.md,
    marginRight: 12,
  },
  playAllText: {
    color: '#0E0B1F',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  shuffleBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tracklist: {
    paddingHorizontal: 12,
  },
});
