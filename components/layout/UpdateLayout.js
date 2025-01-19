import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';

const UpdateLayout = ({children}) => {
  return (
    <ImageBackground
      style={styles.image}
      source={require('../../assets/image/bg/Nabg.png')}>
      {children}
    </ImageBackground>
  );
};

export default UpdateLayout;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
