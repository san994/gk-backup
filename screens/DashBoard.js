import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DrawerNavigator from '../navigation/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default class DashBoard extends React.Component{
render() {
  return (
  <NavigationContainer>
    <DrawerNavigator/>
  </NavigationContainer>
  );
}
}