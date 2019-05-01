import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

/**
* Generate the TabBarIcon for the usage for the tab
*/
export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={32}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
