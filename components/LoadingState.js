import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function LoadingState({ message = 'Loading...' }) {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color="#1d4ed8" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  message: {
    color: '#64748b',
    fontSize: 14,
  },
});
