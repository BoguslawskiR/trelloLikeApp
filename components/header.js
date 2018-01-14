import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert, TouchableOpacity
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import * as _ from 'lodash';
import { Icon } from 'react-native-elements'


export default class Header extends Component {

  componentWillMount() {
    console.log('test', this.props);
  }

  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => this.props.navigation.navigation.goBack()}>
          <Icon
            name='rowing' />
        </TouchableOpacity>
        <Text>{this.props.name}</Text>
        <TouchableOpacity>
          <Icon
            name='menu' />
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    height: 64,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
