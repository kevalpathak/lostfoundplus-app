import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function InfoCard({ title, value, accent = '#1d4ed8' }) {
  return (
    <View style={styles.card}>
      <View style={[styles.dot, { backgroundColor: accent }]} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 108,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
});
