import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import MapView, {PROVIDER_DEFAULT, Marker} from 'react-native-maps';
import MainLayout from '../components/layout/MainLayout';
import {NANAIMO_REGION} from '../data/mainLoacation';
import {useNanaimoContext} from '../store/context';
import AddSpotModal from '../components/actions/AddSpotModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Map = () => {
  const {store, setStore} = useNanaimoContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();

  const handleLongPress = event => {
    const coordinates = event.nativeEvent.coordinate;
    setSelectedLocation(coordinates);
    setModalVisible(true);
  };

  const handleSaveSpot = async newSpot => {
    console.log('newSpot', newSpot);
    try {
      const updatedPlaces = [...store.places, newSpot];
      await AsyncStorage.setItem('places', JSON.stringify(updatedPlaces));
      setStore(prev => ({
        ...prev,
        places: updatedPlaces,
      }));
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving new spot:', error);
    }
  };

  const handleMarkerPress = place => {
    navigation.navigate('SpotDetails', {spot: place});
  };

  return (
    <MainLayout>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={NANAIMO_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onLongPress={handleLongPress}>
        {store.places.map(place => (
          <Marker
            key={place.id}
            coordinate={place.coordinates}
            title={place.header}
            description={place.text}
            onPress={() => handleMarkerPress(place)}>
            <View style={styles.markerContainer}>
              <Image
                source={{uri: place.image}}
                style={styles.markerImage}
                resizeMode="cover"
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <AddSpotModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveSpot}
        coordinates={selectedLocation}
      />
    </MainLayout>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height,
    top: -40,
  },
  markerContainer: {
    width: 70,
    height: 70,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerImage: {
    width: '100%',
    height: '100%',
  },
});
