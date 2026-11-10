import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';

export default function ItemCard({ item, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.category, { color: colors.primary }]}>{item.category}</Text>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={13} color="#FFFFFF" style={{ marginRight: 3 }} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]} numberOfLines={2}>{item.subtitle}</Text>

        <View style={styles.bottomRow}>
          <Text style={[styles.price, { color: theme.text }]}>{item.price}</Text>
          <Text style={[styles.time, { color: theme.subText }]}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  category: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.full,
  },
  ratingText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
  },
  time: {
    fontSize: 12,
  },
});
