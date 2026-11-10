import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { songs, albums, artists, musicVideos, searchTags } from '../../data';
import SongRow from '../../components/SongRow';
import AlbumCard from '../../components/AlbumCard';
import MiniPlayer from '../../components/MiniPlayer';

export default function SearchScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Song', 'Album', 'Artist', 'MV'];

  const filteredSongs = songs.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.artist.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAlbums = albums.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.artist.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtists = artists.filter((art) =>
    art.name.toLowerCase().includes(query.toLowerCase()) ||
    art.genre.toLowerCase().includes(query.toLowerCase())
  );

  const filteredMVs = musicVideos.filter((mv) =>
    mv.title.toLowerCase().includes(query.toLowerCase()) ||
    mv.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Search Input matching Artboard "Search/ Default" */}
      <View style={styles.header}>
        <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Ionicons name="search" size={20} color={colors.primary} style={{ marginRight: 10 }} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            value={query}
            onChangeText={setQuery}
            placeholder="Search songs, artists, albums, MVs..."
            placeholderTextColor={colors.gray}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs matching Artboard "Search / active" */}
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {tabs.map((tab) => {
            const isSelected = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabPill,
                  {
                    backgroundColor: isSelected ? colors.primary : theme.card,
                    borderColor: isSelected ? colors.primary : theme.border,
                  },
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: isSelected ? '#0E0B1F' : theme.text },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {query.length === 0 ? (
          <>
            {/* Top searching tags matching Artboard "Search/ Default" */}
            <View style={styles.tagsSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Top searching</Text>
              <View style={styles.tagWrap}>
                {searchTags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.tagPill, { backgroundColor: theme.card, borderColor: theme.border }]}
                    onPress={() => setQuery(tag)}
                  >
                    <Ionicons name="trending-up-outline" size={13} color={colors.primary} style={{ marginRight: 6 }} />
                    <Text style={[styles.tagText, { color: theme.text }]}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Popular Songs */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Trending Songs</Text>
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
          </>
        ) : (
          <>
            {/* Search Results */}
            {(activeTab === 'All' || activeTab === 'Song') && filteredSongs.length > 0 && (
              <View style={styles.resultsGroup}>
                <Text style={[styles.groupTitle, { color: theme.text }]}>Songs ({filteredSongs.length})</Text>
                <View style={{ paddingHorizontal: 12 }}>
                  {filteredSongs.map((s, idx) => (
                    <SongRow
                      key={s.id}
                      song={s}
                      index={idx}
                      onPress={() => router.push({ pathname: '/player', params: { id: s.id } })}
                      onOptionsPress={() => router.push({ pathname: '/player', params: { id: s.id } })}
                    />
                  ))}
                </View>
              </View>
            )}

            {(activeTab === 'All' || activeTab === 'Album') && filteredAlbums.length > 0 && (
              <View style={styles.resultsGroup}>
                <Text style={[styles.groupTitle, { color: theme.text }]}>Albums ({filteredAlbums.length})</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                  {filteredAlbums.map((a) => (
                    <AlbumCard
                      key={a.id}
                      item={a}
                      onPress={() => router.push({ pathname: '/playlist/[id]', params: { id: a.id } })}
                      width={120}
                    />
                  ))}
                </ScrollView>
              </View>
            )}

            {(activeTab === 'All' || activeTab === 'Artist') && filteredArtists.length > 0 && (
              <View style={styles.resultsGroup}>
                <Text style={[styles.groupTitle, { color: theme.text }]}>Artists ({filteredArtists.length})</Text>
                {filteredArtists.map((art) => (
                  <TouchableOpacity
                    key={art.id}
                    style={[styles.artistRow, { backgroundColor: theme.card, borderColor: theme.border }]}
                    onPress={() => router.push({ pathname: '/artist/[id]', params: { id: art.id } })}
                  >
                    <View style={styles.artistAvatar}>
                      <Ionicons name="person" size={20} color={colors.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.artistName, { color: theme.text }]}>{art.name}</Text>
                      <Text style={{ color: theme.subText, fontSize: 12 }}>{art.monthlyListeners} monthly listeners • {art.genre}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.gray} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}
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
    paddingBottom: 6,
  },
  searchBar: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  tabBar: {
    marginBottom: 8,
  },
  tabScroll: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  tabPill: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 8,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '800',
  },
  scroll: {
    paddingBottom: 16,
  },
  tagsSection: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 10,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 6,
  },
  resultsGroup: {
    marginTop: 14,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '900',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  artistAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(203, 251, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  artistName: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
});
