import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useNanaimoContext} from './store/context';
import {Home, HiScreen} from './screen';
import {ContextProvider} from './store/context';
import NavigationMenu from './NavigationMenu';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HiScreen" component={HiScreen} />
          <Stack.Screen name="NavigationMenu" component={NavigationMenu} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
