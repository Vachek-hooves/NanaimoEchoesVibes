import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, {PROVIDER_DEFAULT, Marker, Polyline} from 'react-native-maps';
import MainLayout from '../components/layout/MainLayout';
import {NANAIMO_REGION} from '../data/mainLoacation';
import {useNanaimoContext} from '../store/context';
import AddSpotModal from '../components/actions/AddSpotModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkLacationPermission} from '../Utils/locaiton';
import FindLocation from '../components/actions/FindLocation';
import UserRouteDetails from '../components/actions/UserRouteDetails';

const MAP_TOKEN =
  'pk.eyJ1IjoidmFjaGVrbWFwMSIsImEiOiJjbTVzY21tMHowanRvMmxzZXF6Z3RqdTNvIn0.yqzkqU0FepoNNh_Xqg5Liw';

const Map = ({navigation}) => {
  const mapRef = useRef();
  const {store, setStore} = useNanaimoContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isRouteMode, setIsRouteMode] = useState(false);
  const [routePoints, setRoutePoints] = useState([]);
  const [routePath, setRoutePath] = useState(null);
  const [isLocationPermission, setIsLocationPermission] = useState(false);
  const [isRouteReady, setIsRouteReady] = useState(false);
  const [routeStage, setRouteStage] = useState(''); // 'A', 'B', or ''
  const [routeDetails, setRouteDetails] = useState(null);
  console.log(isRouteMode, 'isRouteMode');
  console.log(isRouteReady);

  useEffect(() => {
    const initMap = async () => {
      const permissionOk = await checkLacationPermission();
      setIsLocationPermission(permissionOk);
    };

    initMap();
  }, []);

  useEffect(() => {
    if (routePath?.length > 0) {
      setIsRouteReady(true);
      setIsLocationPermission(true);
    }
  }, [routePath]);

  const toggleRouteMode = () => {
    setIsRouteMode(!isRouteMode);
    setRoutePoints([]);
    setRoutePath(null);
    setRouteStage(isRouteMode ? '' : 'A'); // Set to 'A' when starting route mode
  };

  const handleMapPress = async event => {
    const coordinates = event.nativeEvent.coordinate;

    if (isRouteMode) {
      if (routeStage === 'A') {
        setRoutePoints([coordinates]);
        setRouteStage('B');
      } else if (routeStage === 'B') {
        const newPoints = [...routePoints, coordinates];
        setRoutePoints(newPoints);
        await fetchRoutePath(newPoints);
        setRouteStage('complete');
      }
    }
  };

  const fetchRoutePath = async points => {
    console.log(points);
    try {
      const coordinates = points
        .map(point => `${point.longitude},${point.latitude}`)
        .join(';');

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${points[0].longitude},${points[0].latitude};${points[1].longitude},${points[1].latitude}?access_token=${MAP_TOKEN}&geometries=geojson`,
        // `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}?geometries=geojson&access_token=${MAP_TOKEN}`,
      );

      const data = await response.json();

      if (data.routes && data.routes[0]) {
        console.log(data.routes[0]);
        setRoutePath(
          data.routes[0].geometry.coordinates.map(coord => ({
            latitude: coord[1],
            longitude: coord[0],
          })),
        );
      }
      setRouteDetails(data.routes[0]);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  // const clearRoute = () => {
  //   setRoutePoints([]);
  //   setRoutePath(null);
  //   setRouteStage('A');
  // };

  const handleLongPress = event => {
    if (!isRouteMode) {
      const coordinates = event.nativeEvent.coordinate;
      setSelectedLocation(coordinates);
      setModalVisible(true);
    }
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

  // const saveRoute = async () => {
  //   if (routePath && routePath.length > 0) {
  //     try {
  //       const newRoute = {
  //         id: Date.now().toString(),
  //         path: routePath,
  //         points: routePoints,
  //       };

  //       const existingRoutes =
  //         JSON.parse(await AsyncStorage.getItem('routes')) || [];
  //       const updatedRoutes = [...existingRoutes, newRoute];

  //       await AsyncStorage.setItem('routes', JSON.stringify(updatedRoutes));
  //       setStore(prev => ({
  //         ...prev,
  //         routes: updatedRoutes,
  //       }));

  //       // clearRoute();
  //       setIsRouteMode(false);
  //     } catch (error) {
  //       console.error('Error saving route:', error);
  //     }
  //   }
  // };

  const goToMyLocation = async () => {
    try {
      const permissionOk = await checkLacationPermission();
      if (permissionOk) {
        mapRef.current.animateToRegion(NANAIMO_REGION, 1000); // 1000ms animation duration
      }
    } catch (error) {
      console.error('Error going to location:', error);
    }
  };

  return (
    <MainLayout>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={NANAIMO_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onPress={handleMapPress}
        followsUserLocation={true}
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

        {routePoints.map((point, index) => (
          <Marker
            key={`point-${index}`}
            coordinate={point}
            pinColor="#DC143C"
            title={index === 0 ? 'Start Point' : 'End Point'}
          />
        ))}

        {/* {routePath && (
          <Polyline
            coordinates={routePath}
            strokeColor="#DC143C"
            strokeWidth={3}
          />
        )} */}
        {isRouteMode && (
          <Polyline
            coordinates={routePath}
            strokeColor="#4158D0"
            // strokeColor="#DC143C"
            strokeWidth={3}
            lineDashPattern={[1, 7, 3]}
            strokeColors={[
              '#4158D0', // Start color (matching header)
              '#C850C0', // Middle color
              '#BCCC70', // End color (matching header)
              '#DC143C',
            ]}
          />
        )}
      </MapView>

      {/* Instructions */}
      {!isRouteMode && (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Long press on the map to add a new spot
          </Text>
        </View>
      )}

      {isRouteMode && (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {routeStage === 'A' && 'Tap to select starting point (A)'}
            {routeStage === 'B' && 'Tap to select destination point (B)'}
          </Text>
          {routeStage === 'complete' && (
            <UserRouteDetails routeDetails={routeDetails} />
          )}
        </View>
      )}

      {/* Route Controls */}
      <View style={styles.routeControls}>
        <TouchableOpacity
          style={[styles.routeButton, isRouteMode && styles.routeButtonActive]}
          onPress={toggleRouteMode}>
          <Text
            style={[
              styles.routeButtonText,
              isRouteMode && styles.routeButtonTextActive,
            ]}>
            {/* {isRouteMode ? 'Cancel Route' : 'Create Route'} */}
            {isRouteMode ? 'Cancel Route' : 'Create Route'}
          </Text>
        </TouchableOpacity>

        {isRouteMode && routeStage === 'complete' && (
          <>
            {/* <TouchableOpacity style={styles.routeButton} onPress={clearRoute}>
              <Text style={styles.routeButtonText}>Clear</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={[styles.routeButton, styles.saveButton]}
              onPress={saveRoute}>
              <Text style={[styles.routeButtonText, styles.saveButtonText]}>
                Save Route
              </Text>
            </TouchableOpacity> */}
          </>
        )}
      </View>

      <FindLocation onPress={goToMyLocation} />

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
  instructionContainer: {
    position: 'absolute',
    top: '0%',
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  routeControls: {
    position: 'absolute',
    bottom: 20,
    // left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    zIndex: 999,
  },
  userLocation: {
    position: 'absolute',
    bottom: 20,
  },
  routeButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 120,
    alignItems: 'center',
  },
  routeButtonActive: {
    backgroundColor: '#DC143C',
  },
  routeButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  routeButtonTextActive: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    color: 'white',
  },
  locationButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
