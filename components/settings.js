import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert, TouchableOpacity
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import * as _ from 'lodash';
import { Icon } from 'react-native-elements'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


export default class Header extends Component {

  componentWillMount() {
    console.log('test', this.props);
  }

  render() {
    return (
      <View>

      </View>

    );
  }

}

const styles = StyleSheet.create({

})
