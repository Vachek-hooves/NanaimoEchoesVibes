import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    <LinearGradient
      // colors={['#4158D0', '#C850C0', '#FFCC70']}
      colors={['#F7F9FC',   '#DC143C']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.header}>
      <View style={{padding: 10}}>
        <Text style={styles.welcomeText}>Welcome back, {nickname}!</Text>
        <Text style={styles.subtitleText}>
          Your journey through{'\n'}Nanaimo continues...
        </Text>
      </View>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Name')}>
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(255,255,255,0.6)']}
          style={styles.settingsGradient}>
          <Image
            source={require('../../assets/image/icons/settings.png')}
            style={styles.settingsIcon}
          />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    // padding: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // paddingTop: 60,
    zIndex: 1,
    height: '25%',
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  subtitleText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  settingsButton: {
    borderRadius: 22,
    overflow: 'hidden',
    margin: 20,
  },
  settingsGradient: {
    borderRadius: 22,
  },
  settingsIcon: {
    width: 55,
    // padding: 15,
    height: 55,
    tintColor: 'white',
    padding:8
  },
});

export default Header;
