import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? 'white' : 'black',
          },
        ]}
        accessibilityRole="header"
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? '#ddd' : '#333',
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [shipmentStatus, setShipmentStatus] = useState('');

  useEffect(() => {
    // Simulate fetching shipment status from blockchain or API
    setTimeout(() => {
      setShipmentStatus('In Transit');
    }, 2000);
  }, []);

  const handleScanQRCode = () => {
    // Navigate to the Camera screen
    navigation.navigate('Camera');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#222' : '#fff'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: isDarkMode ? '#111' : '#eee' }}
      >
        <View style={styles.content}>
          <Section title="Transport Logistics Management System">
            Shipment Status: {shipmentStatus}
          </Section>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleScanQRCode}
            accessibilityLabel="Scan QR Code"
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CameraScreen = () => {
  // Camera screen implementation goes here
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Camera Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
