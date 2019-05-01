import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import FaceRec from "../screens/SplashScreen.js"
import Stocks from '../screens/Stocks.js';
import Visual from '../screens/Visual.js';
import Page from '../screens/Page.js';


import MainTabNavigator from './MainTabNavigator';
import StockNavigation from './StockNavigation';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Splash: FaceRec,
  Main: MainTabNavigator,
  Page:Page,

}));