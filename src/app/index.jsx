import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { resolveMusicImage } from '../assets/images';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    tag: 'APP UI KIT',
    title: 'WELCOME TO GEEZ APP',
    description: 'Make your design workflow easier and save your time with high fidelity streaming.',
    image: 'walkthrough',
  },
  {
    id: '2',
    tag: 'MILLIONS OF TRACKS',
    title: 'DISCOVER TRENDING SOUNDS',
    description: 'Listen to chart-topping hits, curated DJ mixes, and exclusive underground radio.',
    image: 'comeToMe',
  },
  {
    id: '3',
    tag: 'HIGH FIDELITY AUDIO',
    title: 'STUDIO MASTER QUALITY',
    description: 'Experience crystal clear lossless streaming with customizable equalizer presets.',
    image: 'prayForYou',
  },
];

export default function WalkthroughScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      router.push('/signup');
    }
  };

  const curr = slides[activeSlide];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <Text style={styles.brandTitle}>GEEZ</Text>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={[styles.skipText, { color: theme.subText }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Artwork */}
      <View style={styles.heroWrap}>
        <View style={[styles.imageContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Image
            source={resolveMusicImage(curr.image)}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.badgeOverlay}>
            <Text style={styles.badgeText}>{curr.tag}</Text>
          </View>
        </View>
      </View>

      {/* Slide Typography */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]}>{curr.title}</Text>
        <Text style={[styles.desc, { color: theme.subText }]}>{curr.description}</Text>

        {/* Indicators */}
        <View style={styles.indicatorRow}>
          {slides.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setActiveSlide(i)}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === activeSlide ? colors.primary : '#2A2E3D',
                    width: i === activeSlide ? 28 : 8,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Action Footer */}
      <View style={styles.footer}>
        <Button
          title={activeSlide === slides.length - 1 ? 'GET STARTED' : 'CONTINUE'}
          onPress={handleNext}
          style={styles.mainBtn}
        />

        <View style={styles.loginRow}>
          <Text style={{ color: theme.subText, fontSize: 14 }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '800' }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 2,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  heroWrap: {
    alignItems: 'center',
    marginVertical: 14,
  },
  imageContainer: {
    width: width - 48,
    height: 280,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  badgeOverlay: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(14, 11, 31, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(203, 251, 94, 0.4)',
  },
  badgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  footer: {
    marginBottom: 8,
  },
  mainBtn: {
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
  },
});
