import {StyleSheet, View, Dimensions} from 'react-native';
import MapView, {PROVIDER_DEFAULT} from 'react-native-maps';
import MainLayout from '../components/layout/MainLayout';
import {NANAIMO_REGION} from '../data/mainLoacation';

const Map = () => {
  return (
    <MainLayout>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={NANAIMO_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      />
    </MainLayout>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
