import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const FindLocation = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.locationButton} onPress={onPress}>
      <Image
        source={require('../../assets/image/icons/compass.png')}
        style={{tintColor: 'red', width: 40, height: 40}}
      />
    </TouchableOpacity>
  );
};

export default FindLocation;

const styles = StyleSheet.create({
  locationButton: {
    position: 'absolute',
    left: 20,
    bottom: 20, // Positioned above route controls
    backgroundColor: 'white',
    // width: 44,
    // height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 999,
  },
});
