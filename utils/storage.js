import AsyncStorage from '@react-native-async-storage/async-storage';
import { SAMPLE_REPORTS, STORAGE_KEY } from './constants';

export async function loadReports() {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (!value) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_REPORTS));
      return SAMPLE_REPORTS;
    }

    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : SAMPLE_REPORTS;
  } catch (error) {
    console.error('Failed to load reports:', error);
    return SAMPLE_REPORTS;
  }
}

export async function saveReports(reports) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error('Failed to save reports:', error);
    throw error;
  }
}
