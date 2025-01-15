import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../ui/Header';

const MainLayout = ({ children }) => {
  return (
    <LinearGradient
      // Canadian-inspired color scheme
      colors={['#F5F4FA', '#E8EEFB', '#EBF0F9']}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <Header />
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default MainLayout;
