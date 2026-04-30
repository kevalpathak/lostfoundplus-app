import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { loadReports, saveReports } from './storage';
import { makeId, sortNewestFirst } from './helpers';

const ItemsContext = createContext(null);

export function ItemsProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    initialiseReports();
  }, []);

  async function initialiseReports() {
    try {
      setIsLoading(true);
      setLoadError('');
      const initialReports = await loadReports();
      setReports(sortNewestFirst(initialReports));
    } catch (error) {
      setLoadError('Unable to load your saved reports.');
    } finally {
      setIsLoading(false);
    }
  }

  async function persistAndSet(nextReports) {
    const sorted = sortNewestFirst(nextReports);
    setReports(sorted);
    await saveReports(sorted);
  }

  async function addReport(report) {
    const nextReport = { ...report, id: makeId(), saved: false };
    await persistAndSet([nextReport, ...reports]);
  }

  async function updateReport(updatedReport) {
    const nextReports = reports.map((report) =>
      report.id === updatedReport.id ? { ...report, ...updatedReport } : report
    );
    await persistAndSet(nextReports);
  }

  function removeReport(id) {
    Alert.alert('Delete report', 'Are you sure you want to delete this report?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const nextReports = reports.filter((report) => report.id !== id);
          await persistAndSet(nextReports);
        },
      },
    ]);
  }

  async function toggleSaved(id) {
    const nextReports = reports.map((report) =>
      report.id === id ? { ...report, saved: !report.saved } : report
    );
    await persistAndSet(nextReports);
  }

  const value = useMemo(
    () => ({
      reports,
      isLoading,
      loadError,
      addReport,
      updateReport,
      removeReport,
      toggleSaved,
      refreshReports: initialiseReports,
    }),
    [reports, isLoading, loadError]
  );

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used inside ItemsProvider');
  }
  return context;
}
