import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import InfoCard from '../components/InfoCard';
import PrimaryButton from '../components/PrimaryButton';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import HelperCard from '../components/HelperCard';
import ReportCard from '../components/ReportCard';
import { useItems } from '../utils/ItemsContext';
import { fetchCommunityHelpers } from '../utils/api';

export default function HomeScreen({ navigation }) {
  const { reports, isLoading, loadError, refreshReports, toggleSaved } = useItems();
  const [helpers, setHelpers] = useState([]);
  const [helpersLoading, setHelpersLoading] = useState(true);
  const [helpersError, setHelpersError] = useState('');

  const lostCount = useMemo(() => reports.filter((item) => item.category === 'Lost').length, [reports]);
  const foundCount = useMemo(() => reports.filter((item) => item.category === 'Found').length, [reports]);
  const openCount = useMemo(() => reports.filter((item) => item.status === 'Open').length, [reports]);
  const latestReports = useMemo(() => reports.slice(0, 3), [reports]);

  useEffect(() => {
    loadHelpers();
  }, []);

  async function loadHelpers() {
    try {
      setHelpersLoading(true);
      setHelpersError('');
      const data = await fetchCommunityHelpers();
      setHelpers(data);
    } catch (error) {
      setHelpersError(error.message || 'Unable to load helper data.');
    } finally {
      setHelpersLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Find lost items faster and report found items clearly.</Text>
        <Text style={styles.heroSubtitle}>
          LostFound+ helps students create reports, save important cases, and keep campus lost-and-found information organized.
        </Text>
        <PrimaryButton label="Create New Report" onPress={() => navigation.navigate('ReportsTab', { screen: 'AddEditItem' })} />
      </View>

      <SectionTitle title="Quick overview" subtitle="These stats update automatically from AsyncStorage reports." />
      {isLoading ? (
        <LoadingState message="Loading saved reports..." />
      ) : loadError ? (
        <ErrorState message={loadError} onRetry={refreshReports} />
      ) : (
        <View style={styles.statsGrid}>
          <InfoCard title="Total open reports" value={String(openCount)} accent="#1d4ed8" />
          <InfoCard title="Lost items" value={String(lostCount)} accent="#b91c1c" />
          <InfoCard title="Found items" value={String(foundCount)} accent="#15803d" />
        </View>
      )}

      <SectionTitle title="Recent campus reports" subtitle="Tap any report to open the detail screen with full information." />
      {isLoading ? (
        <LoadingState message="Preparing recent reports..." />
      ) : latestReports.length === 0 ? (
        <ErrorState title="No reports yet" message="Create your first lost or found report from the Reports tab." />
      ) : (
        latestReports.map((item) => (
          <ReportCard
            key={item.id}
            item={item}
            compact
            onToggleSaved={() => toggleSaved(item.id)}
            onPress={() => navigation.navigate('ItemDetails', { itemId: item.id })}
          />
        ))
      )}

      <SectionTitle title="Community helpers" subtitle="This section uses a remote REST API to load sample contact profiles." />
      {helpersLoading ? (
        <LoadingState message="Loading community helper profiles..." />
      ) : helpersError ? (
        <ErrorState message={helpersError} onRetry={loadHelpers} />
      ) : (
        helpers.map((helper) => <HelperCard key={helper.id} helper={helper} />)
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: '#dbeafe',
    borderRadius: 22,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
});
