import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

// Placeholder components for History and Map screens
const HistoryScreen = ({ history, clearHistory }) => (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.screenTitle}>History Screen</Text>
      {history.map((item, index) => (
        <View key={index} style={styles.historyItem}>
          <Text style={styles.historyItemText}>Item: {item.tag}</Text>
          <Text style={styles.historyItemText}>Shipped To: {item.shippedTo}</Text>
          <Text style={styles.historyItemText}>Status: {item.successful ? 'Successful' : 'Unsuccessful'}</Text>
        </View>
      ))}
    </ScrollView>
    <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
      <Text style={styles.buttonText}>Clear History</Text>
    </TouchableOpacity>
  </View>
);

const MapScreen = () => (
  <View style={styles.container}>
    <Text>Map Screen</Text>
  </View>
);

const HomeScreen = ({ setHistory }) => {
  const [shipmentStatus, setShipmentStatus] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const navigation = useNavigation();
  const [tagCounter, setTagCounter] = useState(1);

  const handleScanRFIDTag = () => {
    // Simulate scanning RFID tag and retrieving data
    const scannedRFIDData = {
      tag: `Tag${tagCounter}`,
      shippedTo: `Destination ${tagCounter}`,
      successful: tagCounter % 2 === 0, // Alternate between successful and unsuccessful scans
    };

    setProductInfo(scannedRFIDData);
    setShipmentStatus('In Transit');
    setTagCounter(prevCounter => prevCounter + 1);

    // Add scanned item to history
    setHistory(prevHistory => [...prevHistory, scannedRFIDData]);
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
          <Text style={styles.buttonText}>Scan RFID Tag and Add to History</Text>
        </TouchableOpacity>
        {shipmentStatus ? (
          <View style={styles.scannedDataContainer}>
            <Text style={styles.scannedDataText}>Shipment Status: {shipmentStatus}</Text>
            {productInfo && (
              <View>
                <Text>Product Information:</Text>
                <Text>Tag: {productInfo.tag}</Text>
                <Text>Shipped To: {productInfo.shippedTo}</Text>
                <Text>Status: {productInfo.successful ? 'Successful' : 'Unsuccessful'}</Text>
              </View>
            )}
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
  const [history, setHistory] = useState([]);

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{
          tabBarIcon: tabBarIcon, // Use the defined function for icons
          tabBarActiveTintColor: 'blue', // Migrate options to screenOptions
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white', // Background color of the tab bar
            borderTopWidth: 1, // Border at the top of the tab bar
            borderTopColor: 'lightgray', // Border color
          },
        }}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen setHistory={setHistory} />}
        </Tab.Screen>
        <Tab.Screen name="History">
          {() => <HistoryScreen history={history} clearHistory={clearHistory} />}
        </Tab.Screen>
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
    alignSelf: 'center',
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#EEE',
    borderRadius: 10,
  },
  historyItemText: {
    fontSize: 16,
  },
});

export default App;
