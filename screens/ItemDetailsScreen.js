import React, { useMemo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import PrimaryButton from '../components/PrimaryButton';
import EmptyState from '../components/EmptyState';
import { useItems } from '../utils/ItemsContext';
import { formatFriendlyDate } from '../utils/helpers';

export default function ItemDetailsScreen({ navigation, route }) {
  const { reports, toggleSaved, removeReport, updateReport } = useItems();
  const itemId = route.params?.itemId;

  const report = useMemo(() => reports.find((item) => item.id === itemId), [reports, itemId]);

  if (!report) {
    return (
      <ScreenContainer>
        <EmptyState title="Report not found" message="The selected report could not be found. It may have been deleted." />
      </ScreenContainer>
    );
  }

  async function markResolved() {
    await updateReport({ ...report, status: 'Resolved' });
    Alert.alert('Updated', 'This report has been marked as resolved.');
  }

  return (
    <ScreenContainer>
      <SectionTitle title={report.title} subtitle="This screen demonstrates parameterized navigation using an item ID." />

      <View style={styles.summaryCard}>
        <DetailRow label="Type" value={report.category} />
        <DetailRow label="Status" value={report.status} />
        <DetailRow label="Location" value={report.location} />
        <DetailRow label="Date" value={formatFriendlyDate(report.date)} />
        <DetailRow label="Reported by" value={report.contactName} />
        <DetailRow label="Email" value={report.contactEmail} />
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{report.description}</Text>
      </View>

      <PrimaryButton label={report.saved ? 'Remove from Saved' : 'Save Report'} onPress={() => toggleSaved(report.id)} />
      <PrimaryButton label="Edit Report" type="secondary" onPress={() => navigation.navigate('ReportsTab', { screen: 'AddEditItem', params: { itemId: report.id } })} />
      {report.status !== 'Resolved' ? <PrimaryButton label="Mark Resolved" type="secondary" onPress={markResolved} /> : null}
      <PrimaryButton label="Delete Report" type="secondary" onPress={() => removeReport(report.id)} />
    </ScreenContainer>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 18,
    padding: 16,
    gap: 14,
  },
  row: {
    gap: 5,
  },
  rowLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  rowValue: {
    fontSize: 16,
    color: '#111827',
  },
  descriptionCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 18,
    padding: 16,
    gap: 10,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
});
