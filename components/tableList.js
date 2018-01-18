import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, ScrollView, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert, TouchableOpacity
} from 'react-native';
import * as _ from 'lodash';
import Header from './header';
import { serverURL } from './shares';
export default class TableList extends Component {

  state = {
    tables: []
  }

  static navigationOptions = ({ navigation }) => ({
    header: <Header back="false" name="Choose board" token={navigation.state.params.token} navigation={navigation}></Header>
  });



  componentWillMount() {
    console.log(this.props.token);
    fetch(`${serverURL}/boards/`, {
      type: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${this.props.navigation.state.params.token}`
      },
    }).then((res) => {
      return res.json()
    }).then((res) => {
      console.log(this.res);
      let tables = res;
      this.setState({ tables });
      console.log(this.state.tables);
    })
  }

  render() {
    return (
      <ScrollView>
        {
          this.state.tables.length > 0 ? this.state.tables.map((table) => (
            <TouchableOpacity key={table.id} style={styles.item} onPress={() => this.props.navigation.navigate('Table', { table: table, token: this.props.navigation.state.params.token })
            }>
              <Text style={styles.itemName}>{table.name}</Text>
            </TouchableOpacity>
          )
          ) : null
        }
      </ScrollView>
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
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  itemName: {
    fontSize: 22
  }
})