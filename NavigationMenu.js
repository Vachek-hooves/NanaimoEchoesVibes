import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, HiScreen} from './screen';
import {Collection, Map, Prediction} from './ScreenMenu';

const Tab = createBottomTabNavigator();

const NavigationMenu = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Collection" component={Collection} />
      <Tab.Screen name="Prediction" component={Prediction} />
    </Tab.Navigator>
  );
};

export default NavigationMenu;

const styles = StyleSheet.create({});
