import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import PrimaryButton from '../components/PrimaryButton';
import { useItems } from '../utils/ItemsContext';

const emptyForm = {
  title: '',
  category: 'Lost',
  location: '',
  description: '',
  contactName: '',
  contactEmail: '',
  date: new Date().toISOString().split('T')[0],
  status: 'Open',
};

export default function AddEditItemScreen({ navigation, route }) {
  const { reports, addReport, updateReport } = useItems();
  const itemId = route.params?.itemId;
  const editingItem = useMemo(() => reports.find((item) => item.id === itemId), [reports, itemId]);

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.title.trim()) nextErrors.title = 'Item title is required.';
    if (!formData.location.trim()) nextErrors.location = 'Location is required.';
    if (!formData.description.trim()) nextErrors.description = 'Description is required.';
    if (!formData.contactName.trim()) nextErrors.contactName = 'Contact name is required.';
    if (!formData.contactEmail.trim()) {
      nextErrors.contactEmail = 'Contact email is required.';
    } else if (!formData.contactEmail.includes('@')) {
      nextErrors.contactEmail = 'Enter a valid email address.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) {
      Alert.alert('Validation', 'Please fix the highlighted fields before saving.');
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingItem) {
        await updateReport(formData);
        Alert.alert('Success', 'Report updated successfully.');
      } else {
        await addReport(formData);
        Alert.alert('Success', 'New report added successfully.');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while saving the report.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenContainer>
      <SectionTitle
        title={editingItem ? 'Edit report' : 'Create report'}
        subtitle="Users can create, update, and save reports locally with AsyncStorage."
      />

      <View style={styles.choiceRow}>
        <PrimaryButton
          label="Lost"
          type={formData.category === 'Lost' ? 'primary' : 'secondary'}
          onPress={() => updateField('category', 'Lost')}
        />
        <PrimaryButton
          label="Found"
          type={formData.category === 'Found' ? 'primary' : 'secondary'}
          onPress={() => updateField('category', 'Found')}
        />
      </View>

      <FormField label="Item title" value={formData.title} onChangeText={(text) => updateField('title', text)} error={errors.title} />
      <FormField label="Location" value={formData.location} onChangeText={(text) => updateField('location', text)} error={errors.location} />
      <FormField
        label="Description"
        value={formData.description}
        onChangeText={(text) => updateField('description', text)}
        error={errors.description}
        multiline
      />
      <FormField label="Contact name" value={formData.contactName} onChangeText={(text) => updateField('contactName', text)} error={errors.contactName} />
      <FormField label="Contact email" value={formData.contactEmail} onChangeText={(text) => updateField('contactEmail', text)} error={errors.contactEmail} />
      <FormField label="Report date (YYYY-MM-DD)" value={formData.date} onChangeText={(text) => updateField('date', text)} />

      <PrimaryButton label={isSubmitting ? 'Saving...' : editingItem ? 'Update Report' : 'Save Report'} onPress={handleSubmit} disabled={isSubmitting} />
      <PrimaryButton label="Cancel" type="secondary" onPress={() => navigation.goBack()} />
    </ScreenContainer>
  );
}

function FormField({ label, value, onChangeText, error, multiline = false }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline ? styles.multilineInput : null, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  choiceRow: {
    flexDirection: 'row',
    gap: 10,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  multilineInput: {
    minHeight: 110,
  },
  inputError: {
    borderColor: '#dc2626',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 13,
  },
});
