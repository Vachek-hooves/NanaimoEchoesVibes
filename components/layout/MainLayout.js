import {StyleSheet, Text, View} from 'react-native';
import Header from '../ui/Header';

const MainLayout = ({children}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      {children}
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});
