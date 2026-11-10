import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { playlists, songs } from '../../data';
import { resolveMusicImage } from '../../assets/images';
import SongRow from '../../components/SongRow';
import MiniPlayer from '../../components/MiniPlayer';

export default function ExploreScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [activeGenre, setActiveGenre] = useState('Hip - Hop');
  const genres = ['Hip - Hop', 'POP', 'R&B', 'Rock', 'Electronic'];

  const topics = [
    { title: 'Rap Gangz', tracks: '42 tracks', image: 'niceForWhat' },
    { title: 'Rap Party', tracks: '38 tracks', image: 'doIt' },
    { title: 'Top Hits', tracks: '50 tracks', image: 'prayForYou' },
    { title: 'Rap Soul', tracks: '45 tracks', image: 'whereCanIGet' },
    { title: 'Beats & Rhymes', tracks: '30 tracks', image: 'runRunRun' },
    { title: 'Hip-Hop Smash Hits', tracks: '60 tracks', image: 'fallOutBoy' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Explore</Text>
      </View>

      {/* Genre Pills matching Artboard "Explore" */}
      <View style={styles.genreBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.genreScroll}>
          {genres.map((g) => {
            const isSelected = g === activeGenre;
            return (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genrePill,
                  {
                    backgroundColor: isSelected ? colors.primary : theme.card,
                    borderColor: isSelected ? colors.primary : theme.border,
                  },
                ]}
                onPress={() => setActiveGenre(g)}
              >
                <Text
                  style={[
                    styles.genreText,
                    { color: isSelected ? '#0E0B1F' : theme.text },
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Geez Chart Banner */}
        <TouchableOpacity
          style={[styles.chartBanner, { backgroundColor: colors.accentPink }]}
          onPress={() => router.push({ pathname: '/playlist/[id]', params: { id: 'p3' } })}
          activeOpacity={0.85}
        >
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.chartTag}>OFFICIAL TOP 50</Text>
            <Text style={styles.chartTitle}>Geez Chart</Text>
            <Text style={styles.chartSub}>Weekly most played songs around the globe</Text>
          </View>
          <Ionicons name="trending-up" size={54} color="rgba(255,255,255,0.9)" />
        </TouchableOpacity>

        {/* Topic Grid matching Artboard "Explore / Topic" */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Topic</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.topicGrid}>
          {topics.map((t, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.topicCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => router.push({ pathname: '/playlist/[id]', params: { id: 'p1' } })}
              activeOpacity={0.8}
            >
              <Image
                source={resolveMusicImage(t.image)}
                style={styles.topicImage}
                resizeMode="cover"
              />
              <Text style={[styles.topicTitle, { color: theme.text }]} numberOfLines={1}>
                {t.title}
              </Text>
              <Text style={[styles.topicTracks, { color: theme.subText }]}>{t.tracks}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Top Trending Section */}
        <View style={[styles.sectionHeader, { marginTop: 16 }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Top Trending</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.trendingList}>
          {songs.slice(0, 4).map((song, idx) => (
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  genreBar: {
    marginBottom: 8,
  },
  genreScroll: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  genrePill: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 8,
  },
  genreText: {
    fontSize: 12,
    fontWeight: '800',
  },
  scroll: {
    paddingBottom: 16,
  },
  chartBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 20,
    borderRadius: radius.lg,
    shadowColor: colors.accentPink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  chartTag: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  chartTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  chartSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
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
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
  },
  topicCard: {
    width: '46%',
    marginHorizontal: '2%',
    marginBottom: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: 10,
  },
  topicImage: {
    width: '100%',
    height: 100,
    borderRadius: radius.sm,
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  topicTracks: {
    fontSize: 11,
    marginTop: 2,
  },
  trendingList: {
    paddingHorizontal: 12,
  },
});
