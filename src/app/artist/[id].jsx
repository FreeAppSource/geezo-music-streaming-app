import React, { useState } from 'react';
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
import { artists, songs, albums } from '../../data';
import { resolveMusicImage } from '../../assets/images';
import SongRow from '../../components/SongRow';
import MiniPlayer from '../../components/MiniPlayer';

export default function ArtistProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();

  const artist = artists.find((a) => a.id === id) || artists[1];
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Banner with Artist Photo */}
        <View style={styles.bannerContainer}>
          <Image
            source={resolveMusicImage(artist.image)}
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

        {/* Profile Card matching Artboard "Singer" */}
        <View style={styles.infoBox}>
          <View style={styles.nameRow}>
            <Text style={[styles.artistName, { color: theme.text }]}>{artist.name}</Text>
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} style={{ marginLeft: 6 }} />
          </View>
          <Text style={[styles.listeners, { color: theme.subText }]}>
            {artist.monthlyListeners} Monthly Listeners • {artist.genre}
          </Text>

          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[
                styles.followBtn,
                {
                  backgroundColor: isFollowing ? theme.card : colors.primary,
                  borderColor: isFollowing ? theme.border : colors.primary,
                },
              ]}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text style={[styles.followText, { color: isFollowing ? theme.text : '#0E0B1F' }]}>
                {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Songs */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Popular Songs</Text>
        </View>

        <View style={{ paddingHorizontal: 12 }}>
          {songs.slice(0, 4).map((s, idx) => (
            <SongRow
              key={s.id}
              song={s}
              index={idx}
              onPress={() => router.push({ pathname: '/player', params: { id: s.id } })}
              onOptionsPress={() => router.push({ pathname: '/player', params: { id: s.id } })}
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
  infoBox: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 26,
    fontWeight: '900',
  },
  listeners: {
    fontSize: 13,
    marginBottom: 16,
  },
  btnRow: {
    flexDirection: 'row',
  },
  followBtn: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  followText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
});
