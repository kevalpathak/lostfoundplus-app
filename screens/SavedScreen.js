import React, { useMemo } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import ReportCard from '../components/ReportCard';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useItems } from '../utils/ItemsContext';

export default function SavedScreen({ navigation }) {
  const { reports, isLoading, loadError, refreshReports, toggleSaved } = useItems();

  const savedReports = useMemo(() => reports.filter((item) => item.saved), [reports]);

  return (
    <ScreenContainer>
      <SectionTitle title="Saved reports" subtitle="This screen shows persisted saved reports from AsyncStorage." />

      {isLoading ? (
        <LoadingState message="Loading saved reports..." />
      ) : loadError ? (
        <ErrorState message={loadError} onRetry={refreshReports} />
      ) : savedReports.length === 0 ? (
        <EmptyState title="No saved reports yet" message="Bookmark important lost or found reports to review them later." />
      ) : (
        savedReports.map((item) => (
          <ReportCard
            key={item.id}
            item={item}
            onToggleSaved={() => toggleSaved(item.id)}
            onPress={() => navigation.navigate('ItemDetails', { itemId: item.id })}
          />
        ))
      )}
    </ScreenContainer>
  );
}
