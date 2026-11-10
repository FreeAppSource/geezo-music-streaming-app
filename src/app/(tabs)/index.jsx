import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { songs, albums, playlists } from '../../data';
import { resolveMusicImage } from '../../assets/images';
import AlbumCard from '../../components/AlbumCard';
import SongRow from '../../components/SongRow';
import MiniPlayer from '../../components/MiniPlayer';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [currentPlayingId, setCurrentPlayingId] = useState('s1');
  const [isPlaying, setIsPlaying] = useState(true);

  const currentSong = songs.find((s) => s.id === currentPlayingId) || songs[0];

  const handlePlaySong = (songId) => {
    setCurrentPlayingId(songId);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Top Bar matching Artboard "Home 1" */}
      <View style={styles.topBar}>
        <View style={styles.brandGroup}>
          <Text style={styles.brandTitle}>Geez</Text>
          <View style={styles.activeDot} />
        </View>

        <View style={styles.topRightBtns}>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* New Albums Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>New Albums</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/library')}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={albums}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AlbumCard
              item={item}
              onPress={() => router.push({ pathname: '/playlist/[id]', params: { id: item.id } })}
              width={130}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.albumList}
        />

        {/* Featured Weekly Banner: Geez Weekly matching Artboard "Home 1" */}
        <TouchableOpacity
          style={[styles.weeklyBanner, { backgroundColor: '#17142A', borderColor: theme.border }]}
          onPress={() => router.push({ pathname: '/playlist/[id]', params: { id: 'p3' } })}
          activeOpacity={0.85}
        >
          <Image
            source={resolveMusicImage('prayForYou')}
            style={styles.bannerArt}
            resizeMode="cover"
          />
          <View style={styles.bannerInfo}>
            <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>FEATURED PLAYLIST</Text>
            </View>
            <Text style={[styles.bannerTitle, { color: '#FFFFFF' }]}>Geez Weekly</Text>
            <Text style={[styles.bannerSub, { color: colors.gray }]}>Top 50 trending chart songs worldwide</Text>
          </View>
          <View style={styles.bannerPlayCircle}>
            <Ionicons name="play" size={18} color="#0E0B1F" />
          </View>
        </TouchableOpacity>

        {/* Recently Music Section matching Artboard "Home 1" */}
        <View style={[styles.sectionHeader, { marginTop: 8 }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recently Music</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.songList}>
          {songs.slice(0, 5).map((song, idx) => (
            <SongRow
              key={song.id}
              song={song}
              index={idx}
              isPlaying={song.id === currentPlayingId && isPlaying}
              onPress={() => handlePlaySong(song.id)}
              onOptionsPress={() => router.push({ pathname: '/player', params: { id: song.id } })}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating MiniPlayer */}
      <MiniPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={togglePlayPause}
      />
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
    paddingVertical: 12,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1.5,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentPink,
    marginLeft: 4,
  },
  topRightBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  albumList: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  weeklyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: 14,
    marginVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerArt: {
    width: 68,
    height: 68,
    borderRadius: radius.md,
    marginRight: 14,
  },
  bannerInfo: {
    flex: 1,
  },
  bannerBadge: {
    backgroundColor: 'rgba(203, 251, 94, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  bannerBadgeText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 2,
  },
  bannerSub: {
    fontSize: 11,
  },
  bannerPlayCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  songList: {
    paddingHorizontal: 12,
  },
});
