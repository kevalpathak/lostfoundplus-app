import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import ItemsScreen from './screens/ItemsScreen';
import AddEditItemScreen from './screens/AddEditItemScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import SavedScreen from './screens/SavedScreen';
import ProfileScreen from './screens/ProfileScreen';
import { ItemsProvider } from './utils/ItemsContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={HomeScreen} options={{ title: 'LostFound+' }} />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Item Details' }} />
    </Stack.Navigator>
  );
}

function ReportsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ItemsList" component={ItemsScreen} options={{ title: 'Lost & Found Reports' }} />
      <Stack.Screen name="AddEditItem" component={AddEditItemScreen} options={{ title: 'Create or Edit Report' }} />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Item Details' }} />
    </Stack.Navigator>
  );
}

function SavedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SavedItems" component={SavedScreen} options={{ title: 'Saved Reports' }} />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Item Details' }} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} options={{ title: 'Project Profile' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [theme] = useState({
    primary: '#1e40af',
    accent: '#0f766e',
    danger: '#b91c1c',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#111827',
    muted: '#6b7280',
    border: '#e5e7eb',
  });

  const screenOptions = useMemo(
    () => ({
      headerStyle: { backgroundColor: '#ffffff' },
      headerTintColor: theme.text,
      tabBarActiveTintColor: theme.primary,
      tabBarInactiveTintColor: '#64748b',
      tabBarStyle: { height: 64, paddingBottom: 8, paddingTop: 6 },
    }),
    [theme]
  );

  return (
    <ItemsProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator screenOptions={({ route }) => ({
          ...screenOptions,
          tabBarIcon: ({ color, size }) => {
            const icons = {
              HomeTab: 'home-outline',
              ReportsTab: 'list-outline',
              SavedTab: 'bookmark-outline',
              ProfileTab: 'person-outline',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
        })}>
          <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false, title: 'Home' }} />
          <Tab.Screen name="ReportsTab" component={ReportsStack} options={{ headerShown: false, title: 'Reports' }} />
          <Tab.Screen name="SavedTab" component={SavedStack} options={{ headerShown: false, title: 'Saved' }} />
          <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ headerShown: false, title: 'Profile' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </ItemsProvider>
  );
}
