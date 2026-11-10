import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { songs, equalizerPresets } from '../data';
import { resolveMusicImage } from '../assets/images';

const { width } = Dimensions.get('window');

export default function PlayerScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();

  const song = songs.find((s) => s.id === id) || songs[0];

  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(song.isLiked || false);
  const [activeTab, setActiveTab] = useState('player'); // 'player' | 'lyrics' | 'equalizer'
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [activePreset, setActivePreset] = useState('TECHNO');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-down" size={22} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.headerTitleBox}>
          <Text style={[styles.nowPlayingText, { color: colors.primary }]}>NOW PLAYING</Text>
          <Text style={[styles.headerSongTitle, { color: theme.text }]} numberOfLines={1}>
            {song.title}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => setShowShareModal(true)}
        >
          <Ionicons name="share-social-outline" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Mode Tabs: Player | Lyrics | Equalizer */}
      <View style={styles.modeTabsRow}>
        <TouchableOpacity
          style={[styles.modeTab, activeTab === 'player' && styles.modeTabActive]}
          onPress={() => setActiveTab('player')}
        >
          <Text style={[styles.modeTabText, { color: activeTab === 'player' ? colors.primary : colors.gray }]}>
            TRACK
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeTab, activeTab === 'lyrics' && styles.modeTabActive]}
          onPress={() => setActiveTab('lyrics')}
        >
          <Text style={[styles.modeTabText, { color: activeTab === 'lyrics' ? colors.primary : colors.gray }]}>
            LYRICS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeTab, activeTab === 'equalizer' && styles.modeTabActive]}
          onPress={() => setActiveTab('equalizer')}
        >
          <Text style={[styles.modeTabText, { color: activeTab === 'equalizer' ? colors.primary : colors.gray }]}>
            EQUALIZER
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {activeTab === 'player' && (
          <>
            {/* Vinyl Record / Album Artwork matching Artboard "Song 02" */}
            <View style={styles.vinylContainer}>
              <View style={[styles.vinylOuter, { borderColor: theme.border }]}>
                <Image
                  source={resolveMusicImage(song.image)}
                  style={styles.vinylCover}
                  resizeMode="cover"
                />
                <View style={styles.centerSpindle} />
              </View>
            </View>

            {/* Song Meta & Actions */}
            <View style={styles.songMetaRow}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={[styles.songTitle, { color: theme.text }]}>{song.title}</Text>
                <Text style={[styles.artistName, { color: theme.subText }]}>{song.artist}</Text>
              </View>

              <View style={styles.metaActions}>
                <TouchableOpacity
                  style={styles.actionIconBtn}
                  onPress={() => setShowDownloadModal(true)}
                >
                  <Ionicons name="arrow-down-circle-outline" size={24} color={theme.text} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionIconBtn}
                  onPress={() => setIsLiked(!isLiked)}
                >
                  <Ionicons
                    name={isLiked ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isLiked ? colors.accentPink : theme.text}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Scrubber Progress Bar matching Sketch: 2:46 / 3:05 */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressTrack, { backgroundColor: theme.card }]}>
                <View style={[styles.progressFill, { width: '85%' }]} />
                <View style={styles.scrubberThumb} />
              </View>
              <View style={styles.timeRow}>
                <Text style={[styles.timeText, { color: colors.primary }]}>{song.progress}</Text>
                <Text style={[styles.timeText, { color: theme.subText }]}>{song.duration}</Text>
              </View>
            </View>

            {/* Media Controls matching Artboard "Song 02" */}
            <View style={styles.controlsRow}>
              <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
                <Ionicons
                  name="shuffle"
                  size={22}
                  color={isShuffle ? colors.primary : colors.gray}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.skipBtn}>
                <Ionicons name="play-skip-back" size={26} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playPauseBtn}
                onPress={() => setIsPlaying(!isPlaying)}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={32}
                  color="#0E0B1F"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.skipBtn}>
                <Ionicons name="play-skip-forward" size={26} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsRepeat(!isRepeat)}>
                <Ionicons
                  name="repeat"
                  size={22}
                  color={isRepeat ? colors.primary : colors.gray}
                />
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeTab === 'lyrics' && (
          /* Lyrics View matching Artboard "Song 03" */
          <View style={[styles.lyricsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.lyricsTitle, { color: colors.primary }]}>Lyrics</Text>
            <Text style={[styles.lyricsContent, { color: theme.text }]}>
              {song.lyrics}
            </Text>
          </View>
        )}

        {activeTab === 'equalizer' && (
          /* Equalizer Presets matching Artboard "Setting " */
          <View style={[styles.equalizerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.equalizerTitle, { color: theme.text }]}>Equalizer Presets</Text>
            <View style={styles.presetWrap}>
              {equalizerPresets.map((preset) => {
                const isSelected = preset === activePreset;
                return (
                  <TouchableOpacity
                    key={preset}
                    style={[
                      styles.presetPill,
                      {
                        backgroundColor: isSelected ? colors.primary : theme.elevated,
                        borderColor: isSelected ? colors.primary : theme.border,
                      },
                    ]}
                    onPress={() => setActivePreset(preset)}
                  >
                    <Text
                      style={[
                        styles.presetText,
                        { color: isSelected ? '#0E0B1F' : theme.text },
                      ]}
                    >
                      {preset}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Share Modal matching Artboard "Song / Share" */}
      <Modal
        visible={showShareModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalHeading, { color: theme.text }]}>SHARE TO</Text>
            <View style={styles.shareRow}>
              <TouchableOpacity
                style={styles.shareOption}
                onPress={() => {
                  setShowShareModal(false);
                  Alert.alert('Shared', 'Shared link via Facebook!');
                }}
              >
                <View style={[styles.shareIconBox, { backgroundColor: '#1877F2' }]}>
                  <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
                </View>
                <Text style={[styles.shareLabel, { color: theme.text }]}>FaceBook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareOption}
                onPress={() => {
                  setShowShareModal(false);
                  Alert.alert('Shared', 'Copied track link to clipboard!');
                }}
              >
                <View style={[styles.shareIconBox, { backgroundColor: '#EA4335' }]}>
                  <Ionicons name="link-outline" size={24} color="#FFFFFF" />
                </View>
                <Text style={[styles.shareLabel, { color: theme.text }]}>Copy Link</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareOption}
                onPress={() => {
                  setShowShareModal(false);
                  Alert.alert('Shared', 'Shared to Instagram stories!');
                }}
              >
                <View style={[styles.shareIconBox, { backgroundColor: '#E4405F' }]}>
                  <Ionicons name="logo-instagram" size={24} color="#FFFFFF" />
                </View>
                <Text style={[styles.shareLabel, { color: theme.text }]}>Instagram</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.modalCloseBtn, { borderColor: theme.border }]}
              onPress={() => setShowShareModal(false)}
            >
              <Text style={{ color: theme.text, fontWeight: '800' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Download Modal matching Artboards "Song / Download 01 & 02" */}
      <Modal
        visible={showDownloadModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDownloadModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalHeading, { color: theme.text }]}>Download Quality</Text>

            <TouchableOpacity
              style={[styles.downloadOption, { borderColor: theme.border }]}
              onPress={() => {
                setShowDownloadModal(false);
                Alert.alert('Downloading', 'Standard 128 Kbps download started!');
              }}
            >
              <View>
                <Text style={[styles.dlTitle, { color: theme.text }]}>128 Kbps</Text>
                <Text style={{ color: colors.secondary, fontSize: 12, fontWeight: '700' }}>Free Quality</Text>
              </View>
              <Ionicons name="download-outline" size={20} color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.downloadOption, { borderColor: theme.border, marginTop: 10 }]}
              onPress={() => {
                setShowDownloadModal(false);
                Alert.alert('Downloading', 'Lossless 320 Kbps studio download started!');
              }}
            >
              <View>
                <Text style={[styles.dlTitle, { color: theme.text }]}>320 Kbps Studio Master</Text>
                <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>High Fidelity HD</Text>
              </View>
              <Ionicons name="download-outline" size={20} color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalCloseBtn, { borderColor: theme.border, marginTop: 16 }]}
              onPress={() => setShowDownloadModal(false)}
            >
              <Text style={{ color: theme.text, fontWeight: '800' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 10,
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleBox: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  nowPlayingText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  headerSongTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  modeTabsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  modeTab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  modeTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  modeTabText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  vinylContainer: {
    alignItems: 'center',
    marginVertical: 18,
  },
  vinylOuter: {
    width: width - 80,
    height: width - 80,
    borderRadius: (width - 80) / 2,
    borderWidth: 3,
    backgroundColor: '#17142A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  vinylCover: {
    width: (width - 80) * 0.75,
    height: (width - 80) * 0.75,
    borderRadius: ((width - 80) * 0.75) / 2,
  },
  centerSpindle: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: '#0E0B1F',
  },
  songMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 15,
    fontWeight: '600',
  },
  metaActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconBtn: {
    padding: 8,
    marginLeft: 6,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    width: '100%',
    position: 'relative',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  scrubberThumb: {
    position: 'absolute',
    left: '84%',
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  skipBtn: {
    padding: 10,
  },
  playPauseBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  lyricsCard: {
    padding: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: 10,
  },
  lyricsTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  lyricsContent: {
    fontSize: 15,
    lineHeight: 28,
    fontWeight: '600',
  },
  equalizerCard: {
    padding: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: 10,
  },
  equalizerTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 16,
  },
  presetWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  presetPill: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
  },
  presetText: {
    fontSize: 13,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 18,
    textAlign: 'center',
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  shareOption: {
    alignItems: 'center',
  },
  shareIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shareLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  modalCloseBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
  },
  downloadOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  dlTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
});
