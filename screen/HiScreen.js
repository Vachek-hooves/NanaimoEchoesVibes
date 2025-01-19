import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const HiScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < WelcomeText.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Name');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/image/bg/Nabg.png')} // Make sure to add your image
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{WelcomeText[currentIndex].header}</Text>
          <Text style={styles.description}>
            {WelcomeText[currentIndex].description}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === WelcomeText.length - 1 ? 'Start' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HiScreen;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 100,
  },
  header: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    color: '#DC143C',
  },
  description: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    backgroundColor: '#DC143C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const WelcomeText = [
  {
    header: 'Welcome to Nanaimo Echoes Vibes',
    description: 'Let the echoes of the city guide your journey',
    id: 1,
  },
  {
    header: 'Daily Echoes',
    description: 'Tap into the vibe of the day with a new prediction',
    id: 2,
  },
  {
    header: 'Build Your Collection',
    description:
      'Create your own collection of memories, facts, and hidden gems',
    id: 3,
  },
];
