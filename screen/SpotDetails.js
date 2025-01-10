import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {useNanaimoContext} from '../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SpotDetails = ({route}) => {
  const {spot} = route.params;
  const navigation = useNavigation();
  const {store, setStore, updateFavoriteSpots} = useNanaimoContext();

  const handleDelete = () => {
    Alert.alert('Delete Spot', 'Are you sure you want to delete this spot?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const updatedPlaces = store.places.filter(
              place => place.id !== spot.id,
            );
            await AsyncStorage.setItem('places', JSON.stringify(updatedPlaces));
            setStore(prev => ({
              ...prev,
              places: updatedPlaces,
            }));
            navigation.goBack();
          } catch (error) {
            console.error('Error deleting spot:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{}}>
        <Image source={{uri: spot.image}} style={styles.image} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => updateFavoriteSpots(spot.id)}>
          <Text style={styles.favoriteButtonText}>
            {(store.favoriteSpots || []).includes(spot.id) ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.header}>{spot.header}</Text>
          <Text style={styles.description}>{spot.text}</Text>

          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinatesLabel}>Location:</Text>
            <Text style={styles.coordinates}>
              {spot.coordinates.latitude.toFixed(6)}°N, {'\n'}
              {spot.coordinates.longitude.toFixed(6)}°W
            </Text>
          </View>

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              provider={PROVIDER_DEFAULT}
              initialRegion={{
                latitude: spot.coordinates.latitude,
                longitude: spot.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}>
              <Marker coordinate={spot.coordinates}>
                <View style={styles.markerContainer}>
                  <Image
                    source={{uri: spot.image}}
                    style={styles.markerImage}
                  />
                </View>
              </Marker>
            </MapView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SpotDetails;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'red',
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'rgba(251, 4, 49, 0.5)',
  },
  image: {
    width: width,
    height: width * 0.8,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButtonText: {
    fontSize: 24,
    color: '#DC143C',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  coordinatesContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  coordinatesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  coordinates: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  deleteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  mapContainer: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  map: {
    width: '100%',
    height: 200,
  },
  markerContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  markerImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 70,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  favoriteButtonText: {
    fontSize: 20,
  },
});
