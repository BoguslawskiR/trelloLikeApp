import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert, TouchableOpacity
} from 'react-native';
import * as _ from 'lodash';
import Header from './header';
export default class TableList extends Component {

  state = {
    tables: []
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });



  componentWillMount() {
    console.log(this.props.token);
    fetch('http://192.168.8.102:8000/boards/', {
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${this.props.navigation.state.params.token}`
      },
    }).then((res) => {
      return res.json()
    }).then((res) => {
      let tables = res;
      this.setState({ tables });
      console.log(this.state.tables);
    })
  }

  render() {
    return (
      <View>
        {
          this.state.tables ? this.state.tables.map((table) => (
            <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Table', { table: table, token: this.props.navigation.state.params.token })
            }>
              <Text style={styles.itemName}>{table.name}</Text>
            </TouchableOpacity>
          )
          ) : null
        }
      </View>
    );
  }

  chooseTable(id) {
    console.log(this.props, id)
    this.props.navigation.navigate('Table', { tableId: id, token: this.props.navigation.state.params.token })
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
  },
  itemName: {
    fontSize: 22
  }
})