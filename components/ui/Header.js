import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
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
    <View style={styles.header}>
      <View>
        <Text style={styles.welcomeText}>Welcome back, {nickname}!</Text>
        <Text style={styles.subtitleText}>
          Your journey through{'\n'}Nanaimo continues...
        </Text>
      </View>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Name')}>
        <Image
          source={require('../../assets/image/icons/settings.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DC143C',
    padding: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 60,
    zIndex: 1,
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
});
