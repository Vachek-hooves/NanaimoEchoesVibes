import Geolocation from 'react-native-geolocation-service';

export const checkLacationPermission = async () => {
  try {
    const granded = await Geolocation.requestAuthorization('whenInUse');
    if (granded == 'granted') {
      console.log('request granded');
      return true;
    } else {
      console.log('request denied');
      return false;
    }
  } catch (error) {
    console.warn(err);
    return false;
  }
};
