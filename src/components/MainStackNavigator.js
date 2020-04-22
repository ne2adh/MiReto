import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Settings from '../screens/Settings';

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#002c3e'
          },
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTintColor: '#f7f8f3',
          headerBackTitleVisible: false
        }}
        headerMode='float'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'CUESTIONARIO' }}
        />
        <Stack.Screen
          name='Detail'
          component={Detail}
          options={{ title: 'RESULTADOS' }}
        />
        <Stack.Screen
          name='Settings'
          component={Settings}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator