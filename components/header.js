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
    console.log(this.params);
    return (
      <View style={styles.header}>
        {this.props.back == false ? null : <TouchableOpacity onPress={() => {
          DeviveEventEmitter.emit('backListener', {})
          this.props.navigation.goBack()
        }}>
          <Icon
            name='keyboard-arrow-left' />
        </TouchableOpacity>}
        <Text style={styles.headerTitle}>{this.props.name}</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings', { table: this.props.table, token: this.props.navigation.state.params.token })}>
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
    flexDirection: 'row',
    elevation: 3,
    padding: 16
  },
  headerTitle: {
    fontSize: 18
  }
})
