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
import { radioStations } from '../../data';
import { resolveMusicImage } from '../../assets/images';
import MiniPlayer from '../../components/MiniPlayer';

export default function RadioScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [activeStationId, setActiveStationId] = useState('r1');
  const [isPlayingRadio, setIsPlayingRadio] = useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Radio</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Featured Live Radio: Boney Radio matching Artboard "Radio 02" & "Radio 03.1" */}
        <View style={[styles.featuredRadioCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Image
            source={resolveMusicImage('radioStation')}
            style={styles.featuredRadioImage}
            resizeMode="cover"
          />
          <View style={styles.liveIndicator}>
            <View style={styles.redDot} />
            <Text style={styles.liveText}>LIVE BROADCAST</Text>
          </View>

          <View style={styles.radioBody}>
            <Text style={[styles.radioName, { color: theme.text }]}>Boney Radio</Text>
            <Text style={[styles.frequency, { color: colors.primary }]}>GeezFM 98Hz</Text>
            <Text style={[styles.radioDesc, { color: theme.subText }]}>
              Host: Howard Lawence • 9 AM - 11 AM • R&B / Soul
            </Text>

            <View style={styles.radioActionsRow}>
              <TouchableOpacity
                style={[styles.tuneInBtn, { backgroundColor: colors.primary }]}
                onPress={() => setIsPlayingRadio(!isPlayingRadio)}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={isPlayingRadio ? 'pause' : 'play'}
                  size={18}
                  color="#0E0B1F"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.tuneInText}>
                  {isPlayingRadio ? 'PLAYING NOW' : 'TUNE IN'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.shareBtn, { backgroundColor: theme.elevated, borderColor: theme.border }]}
                onPress={() => router.push('/player')}
              >
                <Ionicons name="radio" size={18} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stations Collection matching Artboard "Radio" & "Radio 0" */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Popular Stations</Text>
        </View>

        {radioStations.map((station) => {
          const isCurrent = station.id === activeStationId;
          return (
            <TouchableOpacity
              key={station.id}
              style={[
                styles.stationItem,
                { backgroundColor: theme.card, borderColor: isCurrent ? colors.primary : theme.border },
              ]}
              onPress={() => setActiveStationId(station.id)}
              activeOpacity={0.8}
            >
              <Image
                source={resolveMusicImage(station.image)}
                style={styles.stationThumb}
                resizeMode="cover"
              />
              <View style={styles.stationInfo}>
                <Text style={[styles.stName, { color: theme.text }]}>{station.name}</Text>
                <Text style={[styles.stFreq, { color: colors.primary }]}>{station.frequency}</Text>
                <Text style={[styles.stDesc, { color: theme.subText }]} numberOfLines={1}>
                  {station.description}
                </Text>
              </View>

              <View style={styles.listenersBadge}>
                <Ionicons name="headset-outline" size={12} color={colors.secondary} style={{ marginRight: 4 }} />
                <Text style={styles.listenersText}>{station.listeners}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
  scroll: {
    paddingBottom: 16,
  },
  featuredRadioCard: {
    marginHorizontal: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  featuredRadioImage: {
    width: '100%',
    height: 160,
  },
  liveIndicator: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 11, 31, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  radioBody: {
    padding: 16,
  },
  radioName: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 2,
  },
  frequency: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  radioDesc: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  radioActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tuneInBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: radius.md,
    marginRight: 10,
  },
  tuneInText: {
    color: '#0E0B1F',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  shareBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  stationThumb: {
    width: 54,
    height: 54,
    borderRadius: radius.sm,
    marginRight: 12,
  },
  stationInfo: {
    flex: 1,
    paddingRight: 6,
  },
  stName: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  stFreq: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  stDesc: {
    fontSize: 11,
  },
  listenersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(8, 217, 214, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  listenersText: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: '700',
  },
});
