import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const AddSpotModal = ({visible, onClose, onSave, coordinates}) => {
  const [header, setHeader] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleSave = () => {
    if (!header.trim() || !text.trim() || !image) {
      Alert.alert('Error', 'Please fill all fields and add an image');
      return;
    }

    const newSpot = {
      id: Date.now().toString(),
      header: header.trim(),
      text: text.trim(),
      image,
      coordinates,
    };

    onSave(newSpot);
    resetForm();
  };

  const resetForm = () => {
    setHeader('');
    setText('');
    setImage(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Spot</Text>

          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleImagePick}>
            {image ? (
              <Image source={{uri: image}} style={styles.imagePreview} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Spot Title"
            value={header}
            onChangeText={setHeader}
            placeholderTextColor="#666"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={4}
            placeholderTextColor="#666"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '90%',
    backgroundColor: 'rgba(220, 20, 60, 1)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#fff'
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#DC143C',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DC143C',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    color: '#666',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    
    backgroundColor:'#fff'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  saveButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#DC143C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddSpotModal;
