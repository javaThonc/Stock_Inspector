import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Stocks from '../screens/Stocks';
import Following from '../screens/News.js';
import Visual from '../screens/Visual.js';
import Page from '../screens/Page.js';
// Create the profileStack stack to hold the data page
const HomeStack = createStackNavigator({
  Home: Home,
});

// Specify where the page come from
HomeStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    // Add a Icon
    <TabBarIcon
      focused={focused}
      name={`md-analytics${focused ? '' : ''}`}
    />
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
// Creaet the Following stack to hold the following page
const followingStack = createStackNavigator({
  Following: Following,
});

// Specify where the page come form
followingStack.navigationOptions = {
  tabBarLabel: ' ',
  // Add a Icon
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-globe${focused ? '' : ''}`}/>
  ),
};

// Creaet the Following stack to hold the following page
const VisualStack = createStackNavigator({
  Visual: Visual,
});

// Specify where the page come form
VisualStack.navigationOptions = {
  tabBarLabel: ' ',
  // Add a Icon
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-analytics${focused ? '' : ''}`}/>
  ),
};

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


const bottomBar = createBottomTabNavigator({
  HomeStack,
  stockStack,
  followingStack,
  VisualStack,
  // PageStack
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
