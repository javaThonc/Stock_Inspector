import React, { Component } from 'react';
import { ScrollView, StyleSheet,Text, View, Image, Button, TouchableHighlight} from 'react-native';
import {ImageBackground, rgb } from 'react-native'
import { AppRegistry, SectionList , FlatList, Linking,AsyncStorage} from 'react-native';
import * as Animatable from 'react-native-animatable';
AnimatImg = Animatable.createAnimatableComponent(Image);
AnimatView = Animatable.createAnimatableComponent(View);
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const axios = require('axios');
/**
* This is the list that include the ip and down iconfor the stock price
*/
export default class List extends React.Component {
  render() {
    return (
        <View style = {styles.container}>
            <Icon
              type='ionicon'
              color = {this.props.up?'rgba( 107, 244, 169, 0.7)':'red'}
              name={this.props.up?'ios-jet':'ios-arrow-down'}
              size= {26}
          />
        </View>
    );
  }
}
/**
*The style sheet that include all kinds of style that is needed
*/
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgb( 107, 244, 169)'
  },
});
