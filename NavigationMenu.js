import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, HiScreen } from './screen';
import { Collection, Map, Prediction } from './ScreenMenu';

const Tab = createBottomTabNavigator();

const NavigationMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#DC143C',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/image/icons/Home.png')}
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#DC143C' : '#999' }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/image/icons/Map.png')}
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#DC143C' : '#999' }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Collection"
        component={Collection}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/image/icons/Collection.png')}
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#DC143C' : '#999' }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Prediction"
        component={Prediction}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/image/icons/Prediction.png')}
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#DC143C' : '#999' }
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    backgroundColor: '#F6F7FB',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: 5,
    paddingBottom: 25,
  },
  tabIcon: {
    width: 34,
    height: 34,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default NavigationMenu;
