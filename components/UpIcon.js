import React, { Component } from 'react';
import { ScrollView, StyleSheet,Text, View} from 'react-native';
import {rgb } from 'react-native'
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
/**
* This is the up icon for the stock price
*/
export default class Up extends React.Component {
  render() {
    return (
        <View style = {styles.container}>
            <Icon
              type='ionicon'
              color = {this.props.up?'rgba( 107, 244, 169, 0.7)':'red'}
              name={this.props.up?'ios-rocket':'ios-rose'}
              size= {20}
          />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
  },
});
