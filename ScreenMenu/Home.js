import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PREDICTIONS} from '../data/predictions';
import MainLayout from '../components/layout/MainLayout';
import {useNanaimoContext} from '../store/context';
import UpdateLayout from '../components/layout/UpdateLayout';
import Header from '../components/ui/Header';

const Home = () => {
  const navigation = useNavigation();
  const {store} = useNanaimoContext();

  // Get favorite predictions
  const favoritePredictions = PREDICTIONS.filter(
    pred => store.favoritePredictions?.includes(pred.id) || false,
  );

  // Get favorite spots
  const favoriteSpots = store.places.filter(
    place => store.favoriteSpots?.includes(place.id) || false,
  );

  const handleSpotPress = spot => {
    navigation.navigate('SpotDetails', {spot});
  };

  return (
    <UpdateLayout>
      {/* <MainLayout> */}
      <Header />
      <ScrollView style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📍</Text>
          <Text style={styles.sectionTitle}>Your Favorite Places</Text>
        </View>
        <Text style={styles.sectionSubtext}>Tap to revisit collection</Text>
        <TouchableOpacity style={styles.section}>
          {favoriteSpots.length > 0 ? (
            <View style={styles.spotsContainer}>
              {favoriteSpots.map(spot => (
                <TouchableOpacity
                  key={spot.id}
                  style={styles.spotCard}
                  onPress={() => handleSpotPress(spot)}>
                  <Image source={{uri: spot.image}} style={styles.spotImage} />
                  <View style={styles.spotContent}>
                    <Text style={styles.spotTitle}>{spot.header}</Text>
                    <Text style={styles.spotDescription} numberOfLines={2}>
                      {spot.text}
                    </Text>
                  </View>
                  <Text style={styles.favoriteIcon}>❤️</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No favorite places yet</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⭐</Text>
            <Text style={styles.sectionTitle}>Favorite Predictions</Text>
          </View>
          <Text style={styles.sectionSubtext}>
            Tap to view all saved predictions
          </Text>

          {(favoritePredictions?.length || 0) > 0 ? (
            <View style={styles.predictionsContainer}>
              {favoritePredictions.map(prediction => (
                <View key={prediction.id} style={styles.predictionCard}>
                  <Text style={styles.predictionText}>{prediction.text}</Text>
                  <Text style={styles.favoriteIcon}>❤️</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No favorite predictions yet</Text>
            </View>
          )}
        </View>
      </ScrollView>
      {/* </MainLayout> */}
    </UpdateLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
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
    marginBottom: 16,
  },
  predictionsContainer: {
    marginLeft: 32,
    gap: 12,
  },
  predictionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  favoriteIcon: {
    fontSize: 16,
    marginLeft: 12,
  },
  emptyContainer: {
    marginLeft: 32,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
  spotsContainer: {
    marginLeft: 32,
    gap: 12,
  },
  spotCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  spotImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  spotContent: {
    flex: 1,
  },
  spotTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  spotDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
