import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import {useNanaimoContext} from '../store/context';
import {PREDICTIONS} from '../data/predictions';

const Prediction = () => {
  const {store} = useNanaimoContext();
  const [prediction, setPrediction] = useState(null);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handleCookiePress = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const randomPrediction =
      PREDICTIONS[Math.floor(Math.random() * PREDICTIONS.length)];

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPrediction(randomPrediction);
      setRecentPredictions(prev => [randomPrediction, ...prev].slice(0, 5));
      setIsAnimating(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            Welcome back, {store.userData?.name}!
          </Text>
          <Text style={styles.subtitleText}>
            Your journey through{'\n'}Nanaimo continues...
          </Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[styles.cookieContainer, {transform: [{scale: scaleAnim}]}]}>
          <TouchableOpacity onPress={handleCookiePress}>
            <Image
              source={
                prediction
                  ? require('../assets/image/cookies/closed.png')
                  : require('../assets/image/cookies/open.png')
              }
              style={styles.cookieImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.cookieText}>
            {prediction ? prediction.text : 'Tap the Fortune Cookie'}
          </Text>
        </Animated.View>

        <View style={styles.recentContainer}>
          <Text style={styles.recentTitle}>⭐ Recent Predictions</Text>
          <ScrollView style={styles.recentList}>
            {recentPredictions.map((item, index) => (
              <View key={index} style={styles.predictionCard}>
                <Text style={styles.predictionText}>{item.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Prediction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  subtitleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  cookieContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  cookieImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  cookieText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    maxWidth: '80%',
  },
  recentContainer: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recentList: {
    flex: 1,
  },
  predictionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  predictionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
