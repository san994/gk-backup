import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BottomTab from './BottomTabNavigation';
import FeedBack from '../screens/feedBack';
import Profile from '../screens/Profile';
import FavoriteScreen from '../screens/favoriteScreen' ;

import {createDrawerNavigator} from "@react-navigation/drawer"

import CustomSidebarMenu from './CustomSidebarMenu';

const Drawer  = createDrawerNavigator()

export default class DrawerNavigator extends React.Component{
render() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={"Home"} component={BottomTab} options={{unmountOnBlur:true}}/>
      <Drawer.Screen name={"feedback"} component={FeedBack}/>
      <Drawer.Screen name={"profile"} component={Profile}/>
      <Drawer.Screen name={"favorite"} component={FavoriteScreen}/>
    </Drawer.Navigator>
  );
}
}