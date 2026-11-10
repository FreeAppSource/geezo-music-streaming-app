import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { musicVideos } from '../../data';
import { resolveMusicImage } from '../../assets/images';

const { width } = Dimensions.get('window');

export default function MVDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();

  const mv = musicVideos.find((m) => m.id === id) || musicVideos[0];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Video Viewport matching Artboard "MV / Detail" */}
      <View style={styles.videoPlayer}>
        <Image
          source={resolveMusicImage(mv.image)}
          style={styles.videoThumbnail}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playCenterBtn}>
          <Ionicons name="play" size={32} color="#0E0B1F" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* MV Meta */}
        <View style={styles.metaBox}>
          <Text style={[styles.title, { color: theme.text }]}>{mv.title}</Text>
          <Text style={[styles.artist, { color: theme.subText }]}>{mv.artist} • {mv.views} views</Text>

          {/* Social Row */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="thumbs-up-outline" size={20} color={theme.text} />
              <Text style={[styles.actionLabel, { color: theme.text }]}>Like</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="share-social-outline" size={20} color={theme.text} />
              <Text style={[styles.actionLabel, { color: theme.text }]}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="add-circle-outline" size={20} color={theme.text} />
              <Text style={[styles.actionLabel, { color: theme.text }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggestion list matching Artboard "MV / Detail" */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Suggestion</Text>
        </View>

        {musicVideos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.suggestRow, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => router.push({ pathname: '/mv/[id]', params: { id: item.id } })}
          >
            <Image
              source={resolveMusicImage(item.image)}
              style={styles.suggestThumb}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.suggestTitle, { color: theme.text }]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={{ color: theme.subText, fontSize: 12 }}>{item.artist}</Text>
              <Text style={{ color: colors.primary, fontSize: 11, fontWeight: '700', marginTop: 2 }}>
                {item.views} views
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoPlayer: {
    position: 'relative',
    height: 220,
    width: '100%',
    backgroundColor: '#000000',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
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
  playCenterBtn: {
    position: 'absolute',
    top: '40%',
    left: '42%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    paddingBottom: 24,
  },
  metaBox: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2A2E3D',
    paddingVertical: 12,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  suggestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 10,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  suggestThumb: {
    width: 80,
    height: 60,
    borderRadius: radius.sm,
    marginRight: 12,
  },
  suggestTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
});
