import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const {name} = JSON.parse(userData);
        setNickname(name);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* <SafeAreaView style={styles.container}> */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back, {nickname}!</Text>
          <Text style={styles.subtitleText}>
            Your journey through{'\n'}Nanaimo continues...
          </Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Image
            source={require('../assets/image/icons/settings.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📍</Text>
            <Text style={styles.sectionTitle}>Your Favorite Places</Text>
          </View>
          <Text style={styles.sectionSubtext}>Tap to revisit collection</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⭐</Text>
            <Text style={styles.sectionTitle}>Favorite Predictions</Text>
          </View>
          <Text style={styles.sectionSubtext}>
            Tap to view all saved predictions
          </Text>
        </TouchableOpacity>
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#DC143C',
    padding: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 80,
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 8,
  },
  subtitleText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingsButton: {
    // width: 44,
    // height: 44,
    borderRadius: 22,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: '50%',
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionSubtext: {
    fontSize: 16,
    color: '#666',
    marginLeft: 32,
  },
});
