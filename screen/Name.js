import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Name = () => {
  const [nickname, setNickname] = useState('');
  const navigation = useNavigation();

  const handleSet = () => {
    if (nickname.trim()) {
      navigation.navigate('NavigationMenu');
    }
  };

  const handleSkip = () => {
    navigation.navigate('NavigationMenu');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.header}>
          Let the echoes of your journey start with a nickname
        </Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your new nickname"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={nickname}
          onChangeText={setNickname}
        />

        <TouchableOpacity 
          style={[styles.setButton, !nickname.trim() && styles.setButtonDisabled]}
          onPress={handleSet}
          disabled={!nickname.trim()}
        >
          <Text style={styles.setButtonText}>Set</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Name;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DC143C',
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
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
});