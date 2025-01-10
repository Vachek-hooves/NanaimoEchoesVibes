import {StyleSheet, View, Dimensions} from 'react-native';
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
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
