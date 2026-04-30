import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';

export default function ProfileScreen() {
  return (
    <ScreenContainer>
      <SectionTitle title="Project profile" subtitle="This screen can be used in your demonstration to explain the project concept and team roles." />

      <View style={styles.card}>
        <Text style={styles.heading}>App idea</Text>
        <Text style={styles.body}>
          LostFound+ is a campus-focused mobile app that helps students report lost items, post found items, save important cases, and keep contact information organized.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Team members</Text>
        <Text style={styles.body}>Keval Pathak — frontend, layout, and navigation</Text>
        <Text style={styles.body}>Vihan Yadav — remote API integration and state handling</Text>
        <Text style={styles.body}>Aryan Patel — AsyncStorage, CRUD logic, testing, and screenshots</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Project requirements covered</Text>
        <Text style={styles.body}>• Minimum four distinct screens</Text>
        <Text style={styles.body}>• Nested stack + bottom-tab navigation</Text>
        <Text style={styles.body}>• Remote REST API integration</Text>
        <Text style={styles.body}>• AsyncStorage persistence</Text>
        <Text style={styles.body}>• Create, update, display, save, and delete reports</Text>
        <Text style={styles.body}>• Loading, error, and empty states</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  body: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});
