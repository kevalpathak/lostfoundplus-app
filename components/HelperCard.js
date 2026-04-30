import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function HelperCard({ helper }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: helper.image }} style={styles.avatar} />
      <View style={styles.textContent}>
        <Text style={styles.name}>{helper.name}</Text>
        <Text style={styles.email}>{helper.email}</Text>
        <Text style={styles.city}>Community area: {helper.city}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  textContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  email: {
    fontSize: 13,
    color: '#475569',
    marginTop: 3,
  },
  city: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
});
