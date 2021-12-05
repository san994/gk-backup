import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import{createStackNavigator} from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import BottomTab from './BottomTabNavigation';
import FactCard from '../screens/FactCard';
import FavoriteScreen from '../screens/favoriteScreen';

const Stack = createStackNavigator()

export default class StackNavigator extends React.Component{
render() {
  return (
  <NavigationContainer>
   <Stack.Navigator>
     <Stack.Screen name={"Home"} component={BottomTab}/>
     <Stack.Screen name={"storycard"} component={FactCard}/>
     <Stack.Screen name={"favorite"} component={FavoriteScreen}/>
   </Stack.Navigator>
   </NavigationContainer>
  );
}
}