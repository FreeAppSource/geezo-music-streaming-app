import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { playlists, songs, albums, artists, currentUser } from '../../data';
import { resolveMusicImage } from '../../assets/images';
import SongRow from '../../components/SongRow';
import MiniPlayer from '../../components/MiniPlayer';
import Button from '../../components/Button';

export default function LibraryScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState('My Playlist');
  const [collectionPlaylists, setCollectionPlaylists] = useState(playlists);
  const [showNewPlaylistModal, setShowNewPlaylistModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const tabs = ['My Playlist', 'Song', 'Artist', 'Album'];

  const handleCreatePlaylist = () => {
    if (!newTitle.trim()) return;
    const newEntry = {
      id: `p${Date.now()}`,
      title: newTitle,
      subtitle: `Created by ${currentUser.name}`,
      tracksCount: '0 tracks',
      duration: '0 min',
      image: 'whereCanIGet',
      description: 'Custom user playlist',
    };
    setCollectionPlaylists([newEntry, ...collectionPlaylists]);
    setNewTitle('');
    setShowNewPlaylistModal(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Collection</Text>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
          onPress={() => setShowNewPlaylistModal(true)}
        >
          <Ionicons name="add" size={20} color="#0E0B1F" />
        </TouchableOpacity>
      </View>

      {/* Tabs matching Artboards "My collection / My Playlist, song, Artist, Album" */}
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
        {activeTab === 'My Playlist' && (
          <View style={styles.playlistList}>
            {/* Add New Playlist button matching Artboard "Song / New Playlist 01" */}
            <TouchableOpacity
              style={[styles.createPillBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => setShowNewPlaylistModal(true)}
            >
              <View style={[styles.addCircle, { backgroundColor: colors.primary }]}>
                <Ionicons name="add" size={20} color="#0E0B1F" />
              </View>
              <Text style={[styles.createPillText, { color: theme.text }]}>Add New Playlist</Text>
            </TouchableOpacity>

            {collectionPlaylists.map((pl) => (
              <TouchableOpacity
                key={pl.id}
                style={[styles.playlistCard, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => router.push({ pathname: '/playlist/[id]', params: { id: pl.id } })}
              >
                <Image
                  source={resolveMusicImage(pl.image)}
                  style={styles.playlistThumb}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.playlistTitle, { color: theme.text }]}>{pl.title}</Text>
                  <Text style={[styles.playlistSub, { color: theme.subText }]}>
                    {pl.subtitle} • {pl.tracksCount}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.gray} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'Song' && (
          <View style={{ paddingHorizontal: 12 }}>
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
        )}

        {activeTab === 'Artist' && (
          <View style={styles.artistList}>
            {artists.map((art, idx) => (
              <TouchableOpacity
                key={art.id}
                style={[styles.artistItem, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => router.push({ pathname: '/artist/[id]', params: { id: art.id } })}
              >
                <Text style={[styles.artIndex, { color: colors.gray }]}>0{idx + 1}</Text>
                <Image
                  source={resolveMusicImage(art.image)}
                  style={styles.artAvatar}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.artName, { color: theme.text }]}>{art.name}</Text>
                  <Text style={{ color: theme.subText, fontSize: 12 }}>{art.genre} • {art.monthlyListeners}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.gray} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'Album' && (
          <View style={styles.albumGrid}>
            {albums.map((album) => (
              <TouchableOpacity
                key={album.id}
                style={[styles.albumItem, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => router.push({ pathname: '/playlist/[id]', params: { id: album.id } })}
              >
                <Image
                  source={resolveMusicImage(album.image)}
                  style={styles.albumImg}
                  resizeMode="cover"
                />
                <Text style={[styles.albumTitle, { color: theme.text }]} numberOfLines={1}>
                  {album.title}
                </Text>
                <Text style={[styles.albumSub, { color: theme.subText }]}>{album.artist} • {album.year}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* New Playlist Modal matching Artboard "Song / New Playlist 02" */}
      <Modal
        visible={showNewPlaylistModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNewPlaylistModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Add New Playlist</Text>
            <Text style={[styles.modalSub, { color: theme.subText }]}>
              Give your new collection a standout title
            </Text>

            <TextInput
              style={[styles.modalInput, { backgroundColor: theme.bg, color: theme.text, borderColor: theme.border }]}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="e.g. Midnight Beats"
              placeholderTextColor={colors.gray}
              autoFocus
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={[styles.cancelBtn, { borderColor: theme.border }]}
                onPress={() => setShowNewPlaylistModal(false)}
              >
                <Text style={{ color: theme.subText, fontWeight: '700' }}>Cancel</Text>
              </TouchableOpacity>
              <Button
                title="Create"
                onPress={handleCreatePlaylist}
                style={{ flex: 1, marginLeft: 12 }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <MiniPlayer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
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
  playlistList: {
    paddingHorizontal: 20,
  },
  createPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: 12,
  },
  addCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  createPillText: {
    fontSize: 14,
    fontWeight: '800',
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: 10,
  },
  playlistThumb: {
    width: 50,
    height: 50,
    borderRadius: radius.sm,
    marginRight: 12,
  },
  playlistTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  playlistSub: {
    fontSize: 12,
  },
  artistList: {
    paddingHorizontal: 20,
  },
  artistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: 10,
  },
  artIndex: {
    fontSize: 13,
    fontWeight: '700',
    marginRight: 10,
  },
  artAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  artName: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
  },
  albumItem: {
    width: '46%',
    marginHorizontal: '2%',
    marginBottom: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: 10,
  },
  albumImg: {
    width: '100%',
    height: 120,
    borderRadius: radius.sm,
    marginBottom: 8,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  albumSub: {
    fontSize: 11,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    borderRadius: radius.lg,
    padding: 22,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 13,
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    marginBottom: 20,
  },
  modalBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: 1,
  },
});
