import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Image,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

const CollectionItemModal = ({ visible, onClose, item }) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${item.header}\n\n${item.text}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!item) return null;

  const isPlace = !!item.coordinates;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {item.image && (
              <Image 
                source={{ uri: item.image }} 
                style={styles.image}
                resizeMode="cover"
              />
            )}

            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.header}</Text>
              <Text style={styles.description}>{item.text}</Text>
              {isPlace && (
                <>
                  <View style={styles.coordinatesContainer}>
                    <Text style={styles.coordinatesLabel}>Location:</Text>
                    <Text style={styles.coordinates}>
                      {item.coordinates.latitude.toFixed(6)}°N, {'\n'}
                      {item.coordinates.longitude.toFixed(6)}°W
                    </Text>
                  </View>

                  <View style={styles.mapContainer}>
                    <MapView
                      style={styles.map}
                      provider={PROVIDER_DEFAULT}
                      initialRegion={{
                        latitude: item.coordinates.latitude,
                        longitude: item.coordinates.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                      }}
                      scrollEnabled={false}
                      zoomEnabled={false}
                      rotateEnabled={false}
                    >
                      <Marker coordinate={item.coordinates}>
                        <View style={styles.markerContainer}>
                          <Image 
                            source={{ uri: item.image }} 
                            style={styles.markerImage}
                          />
                        </View>
                      </Marker>
                    </MapView>
                  </View>
                </>
              )}


              <TouchableOpacity 
                style={styles.shareButton}
                onPress={handleShare}
              >
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
              <View style={{height: 60}}></View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: width,
    height: width * 0.7,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
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
    marginBottom: 20,
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
  shareButton: {
    backgroundColor: '#DC143C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    marginBottom: 20,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  markerImage: {
    width: '100%',
    height: '100%',
  },
});

export default CollectionItemModal;