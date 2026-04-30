import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatFriendlyDate } from '../utils/helpers';

export default function ReportCard({ item, onPress, onToggleSaved, compact = false }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.rowBetween}>
        <View style={[styles.badge, item.category === 'Lost' ? styles.lostBadge : styles.foundBadge]}>
          <Text style={styles.badgeText}>{item.category}</Text>
        </View>
        <Pressable hitSlop={10} onPress={onToggleSaved}>
          <Ionicons
            name={item.saved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={item.saved ? '#1d4ed8' : '#64748b'}
          />
        </Pressable>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>
      {!compact ? <Text style={styles.description}>{item.description}</Text> : null}

      <View style={styles.footer}>
        <Text style={styles.meta}>Reported by {item.contactName}</Text>
        <Text style={styles.meta}>{formatFriendlyDate(item.date)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    gap: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  lostBadge: {
    backgroundColor: '#fee2e2',
  },
  foundBadge: {
    backgroundColor: '#dcfce7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  location: {
    fontSize: 14,
    color: '#1d4ed8',
  },
  description: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  meta: {
    fontSize: 12,
    color: '#64748b',
  },
});
