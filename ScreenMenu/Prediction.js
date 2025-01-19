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
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNanaimoContext} from '../store/context';
import {PREDICTIONS} from '../data/predictions';
import MainLayout from '../components/layout/MainLayout';
import UpdateLayout from '../components/layout/UpdateLayout';
import Header from '../components/ui/Header';

const Prediction = () => {
  const {store, updateFavoritePredictions} = useNanaimoContext();
  const [prediction, setPrediction] = useState(null);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [favoritePredictions, setFavoritePredictions] = useState([]);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    loadPredictionData();
  }, []);

  const loadPredictionData = async () => {
    try {
      const [
        storedPrediction,
        storedRecent,
        storedFavorites,
        lastPredictionDate,
      ] = await Promise.all([
        AsyncStorage.getItem('currentPrediction'),
        AsyncStorage.getItem('recentPredictions'),
        AsyncStorage.getItem('favoritePredictions'),
        AsyncStorage.getItem('lastPredictionDate'),
      ]);

      const today = new Date().toDateString();

      if (storedPrediction && lastPredictionDate === today) {
        setPrediction(JSON.parse(storedPrediction));
      }

      if (storedRecent) {
        setRecentPredictions(JSON.parse(storedRecent));
      }

      if (storedFavorites) {
        setFavoritePredictions(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading prediction data:', error);
    }
  };

  const handleCookiePress = async () => {
    const today = new Date().toDateString();
    const lastPredictionDate = await AsyncStorage.getItem('lastPredictionDate');

    if (lastPredictionDate === today) {
      // Already got prediction today
      return;
    }

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
    ]).start(async () => {
      setPrediction(randomPrediction);
      const newRecentPredictions = [
        randomPrediction,
        ...recentPredictions,
      ].slice(0, 5);

      try {
        await Promise.all([
          AsyncStorage.setItem(
            'currentPrediction',
            JSON.stringify(randomPrediction),
          ),
          AsyncStorage.setItem(
            'recentPredictions',
            JSON.stringify(newRecentPredictions),
          ),
          AsyncStorage.setItem('lastPredictionDate', today),
        ]);

        setRecentPredictions(newRecentPredictions);
      } catch (error) {
        console.error('Error saving prediction:', error);
      }

      setIsAnimating(false);
    });
  };

  const handleShare = async () => {
    if (prediction) {
      try {
        await Share.share({
          message: prediction.text,
        });
      } catch (error) {
        console.error('Error sharing prediction:', error);
      }
    }
  };

  return (
    <UpdateLayout>
      {/* <MainLayout> */}
      <Header />
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
          {prediction && (
            <>
              <Text style={styles.cookieText}>{prediction.text}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => updateFavoritePredictions(prediction.id)}>
                  <Text style={styles.actionButtonText}>
                    {(store.favoritePredictions || []).includes(prediction.id)
                      ? '❤️'
                      : '🤍'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleShare}>
                  {/* <Text style={styles.actionButtonText}>➔</Text> */}
                  <Image
                    source={require('../assets/image/icons/share.png')}
                    style={{width: 35, height: 35}}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
          {!prediction && (
            <Text style={styles.cookieText}>Tap the Fortune Cookie</Text>
          )}
        </Animated.View>

        <View style={styles.recentContainer}>
          <Text style={styles.recentTitle}>⭐ Recent Predictions</Text>
          <ScrollView style={styles.recentList}>
            {recentPredictions.map((item, index) => (
              <View key={index} style={styles.predictionCard}>
                <Text style={styles.predictionText}>{item.text}</Text>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => updateFavoritePredictions(item.id)}>
                  <Text>
                    {(store.favoritePredictions || []).includes(item.id)
                      ? '❤️'
                      : '🤍'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      {/* </MainLayout> */}
    </UpdateLayout>
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
    // backgroundColor: '#000',
    backgroundColor: '#fff',
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
    color: '#fff',
  },
  recentList: {
    flex: 1,
  },
  predictionCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  favoriteButton: {
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 20,
  },
});
