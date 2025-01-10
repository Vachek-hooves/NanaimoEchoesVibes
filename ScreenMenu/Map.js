import {StyleSheet, View, Dimensions, Image} from 'react-native';
import MapView, {PROVIDER_DEFAULT, Marker} from 'react-native-maps';
import MainLayout from '../components/layout/MainLayout';
import {NANAIMO_REGION} from '../data/mainLoacation';
import { useNanaimoContext } from '../store/context';


const Map = () => {
  const { store } = useNanaimoContext();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={NANAIMO_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        {store.places.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinates}
            title={place.header}
            description={place.text}
          >
            <View style={styles.markerContainer}>
              <Image 
                source={{ uri: place.image }} 
                style={styles.markerImage}
                resizeMode="cover"
              />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
