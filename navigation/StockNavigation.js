import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Stocks from '../screens/Stocks';
import Following from '../screens/News.js';
import Visual from '../screens/Visual.js';
import Page from '../screens/Page.js';
import Main from './MainTabNavigator';

// Creaet the Following stack to hold the following page
const PageStack = createStackNavigator({
  Page: Page,
});

// Specify where the page come form
PageStack.navigationOptions = {
  tabBarLabel: ' ',
  // Add a Icon
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-analytics${focused ? '' : ''}`}/>
  ),
};

// Create the Repositories stack to hold the data page
const stockStack = createStackNavigator({
  Stocks: Stocks,
});
// Specify where the page come from
stockStack.navigationOptions = {
  tabBarLabel: ' ',
  // Add a Icon
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-folder-open${focused ? '' : ''}`}
    />
  ),
};


const bottomBar = createBottomTabNavigator({
  Main:PageStack,
  Stock:stockStack
},{
  tabBarOptions: {
      style: {
        backgroundColor: 'black',
      },
      tabStyle: {
        backgroundColor: 'black',
      },
    },
});

class MainTabNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:null
    };
  }
}


//Export the setting
export default bottomBar;
