import { View, Text, AppRegistry, Image, Icon  } from 'react-native';
import { LocalAuthentication } from 'expo';
import React, { Component } from 'react';
/**
* This is the face recognization page that is used to make sure the safety of the user data. Only funcional
* for the standalone app
*/
class FaceRec extends React.Component {
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }
  /**
  * After the component is displayed, we should fetch data from the API
  */
  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate('Main');
    }
  }
  render() {
    var l =  LocalAuthentication.authenticateAsync()
    console.log(l)
    console.log("Face recognization")
    return (
      <View style={styles.viewStyles}>

      </View>
    );
  }
}
const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
}

export default FaceRec;

