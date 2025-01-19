import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import UpdateLayout from '../components/layout/UpdateLayout';

const Name = () => {
  const [nickname, setNickname] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const {name, image} = JSON.parse(userData);
        setNickname(name);
        setUserImage(image);
        setIsExistingUser(true);
      }
    } catch (error) {
      console.error('Error checking user data:', error);
    }
  };

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setUserImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const saveUserData = async () => {
    if (nickname.trim()) {
      try {
        const userData = {
          name: nickname.trim(),
          image: userImage,
        };
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        navigation.navigate('NavigationMenu');
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  };

  const handleSkip = () => {
    navigation.navigate('NavigationMenu');
  };

  return (
    <UpdateLayout>
      {/* <LinearGradient
        colors={['#F7F9FC', '#DC143C']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.container}> */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.header}>
          {isExistingUser
            ? 'Welcome back! Update your profile?'
            : 'Let the echoes of your journey start with a nickname'}
        </Text>

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleImagePick}>
          {userImage ? (
            <Image source={{uri: userImage}} style={styles.userImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter your new nickname"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={nickname}
          onChangeText={setNickname}
        />

        <TouchableOpacity
          style={[
            styles.setButton,
            !nickname.trim() && styles.setButtonDisabled,
          ]}
          onPress={saveUserData}
          disabled={!nickname.trim()}>
          <Text style={styles.setButtonText}>
            {isExistingUser ? 'Update' : 'Set'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* </LinearGradient> */}
    </UpdateLayout>
  );
};

export default Name;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 16,
    paddingTop: '20%',
  },
  skipText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  setButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: width - 40,
  },
  setButtonDisabled: {
    opacity: 0.7,
  },
  setButtonText: {
    color: '#DC143C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    color: 'white',
    fontSize: 16,
  },
});
