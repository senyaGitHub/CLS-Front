import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons'; // Using react-native-vector-icons for icons

const Tab = createBottomTabNavigator();

// Placeholder components for History and Map screens
const HistoryScreen = () => (
  <View style={styles.container}>
    <Text>History Screen</Text>
  </View>
);

const MapScreen = () => (
  <View style={styles.container}>
    <Text>Map Screen</Text>
  </View>
);

const HomeScreen = () => {
  const [shipmentStatus, setShipmentStatus] = useState('');

  const handleScanRFIDTag = () => {
    // Simulate scanning RFID tag and retrieving data
    const scannedRFIDData = 'Scanned RFID data: XXX123YYY';
    setShipmentStatus(scannedRFIDData);
  };

  useEffect(() => {
    // Simulate fetching shipment status from blockchain or API
    setTimeout(() => {
      setShipmentStatus('In Transit');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>RFID Tag Scanner</Text>
        <TouchableOpacity style={styles.scanButton} onPress={handleScanRFIDTag}>
          <Text style={styles.buttonText}>Scan RFID Tag</Text>
        </TouchableOpacity>
        {shipmentStatus ? (
          <View style={styles.scannedDataContainer}>
            <Text style={styles.scannedDataText}>Shipment Status: {shipmentStatus}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

// Define tabBarIcon function outside of Tab.Navigator
const tabBarIcon = ({ focused, color, size, route }) => {
  if (!route) {
    return null; // If route is undefined, return null
  }

  let iconName;

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'History') {
    iconName = focused ? 'time' : 'time-outline';
  } else if (route.name === 'Map') {
    iconName = focused ? 'map' : 'map-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};


const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{ tabBarIcon }}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scannedDataContainer: {
    marginTop: 20,
    backgroundColor: '#EEE',
    padding: 20,
    borderRadius: 10,
  },
  scannedDataText: {
    fontSize: 16,
  },
});

export default App;
