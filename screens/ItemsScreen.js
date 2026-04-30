import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import PrimaryButton from '../components/PrimaryButton';
import ReportCard from '../components/ReportCard';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useItems } from '../utils/ItemsContext';

export default function ItemsScreen({ navigation }) {
  const { reports, isLoading, loadError, refreshReports, toggleSaved } = useItems();
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      const matchesText =
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase());
      const matchesFilter = filter === 'All' ? true : item.category === filter;
      return matchesText && matchesFilter;
    });
  }, [reports, searchText, filter]);

  return (
    <ScreenContainer>
      <SectionTitle title="Manage reports" subtitle="Search reports, filter by type, create new reports, and open details." />

      <View style={styles.searchBox}>
        <Text style={styles.inputLabel}>Search by item or location</Text>
        <TextInput
          style={styles.input}
          placeholder="Search lost or found reports"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.filterRow}>
        <PrimaryButton label="All" type={filter === 'All' ? 'primary' : 'secondary'} onPress={() => setFilter('All')} />
        <PrimaryButton label="Lost" type={filter === 'Lost' ? 'primary' : 'secondary'} onPress={() => setFilter('Lost')} />
        <PrimaryButton label="Found" type={filter === 'Found' ? 'primary' : 'secondary'} onPress={() => setFilter('Found')} />
      </View>

      <PrimaryButton label="Add New Report" onPress={() => navigation.navigate('AddEditItem')} />

      {isLoading ? (
        <LoadingState message="Loading reports..." />
      ) : loadError ? (
        <ErrorState message={loadError} onRetry={refreshReports} />
      ) : filteredReports.length === 0 ? (
        <EmptyState title="No matching reports" message="Try another search term or create a new lost/found report." />
      ) : (
        filteredReports.map((item) => (
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

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#f8fafc',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
});
