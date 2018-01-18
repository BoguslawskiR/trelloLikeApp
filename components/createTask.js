import React, { Component } from 'react';
import {
  View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert, TouchableOpacity
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import * as _ from 'lodash';
import { Icon } from 'react-native-elements'
import Header from './header';
import { serverURL } from './shares';

import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';


export default class CreateTask extends Component {

  state = {
    name: '',
    description: '',
    listId: '',
    deadline: new Date(),
    data: []
  };

  static navigationOptions = ({ navigation }) => ({
    header: <Header name={navigation.state.params.table.name} table={navigation.state.params.table} token={navigation.state.params.token} navigation={navigation}></Header>
  });

  componentWillMount() {
    console.log('test', this.props);
    let data = [];
    _.forEach(this.props.navigation.state.params.lists, (ref) => {
      data.push({ value: ref.name, id: ref.id });
      console.log(ref)
    });
    this.setState({ data });
    console.log(data, this.state)
  }

  render() {
    let { name, description, deadline, listId } = this.state;

    console.log(this.params);
    return (
      <View style={styles.container}>
        <Dropdown
          label="List"
          data={this.state.data}
          onChangeText={(value, ind, data) => {
            const found = _.find(data, (ref) => ref.value === value);
            const listId = found.id
            this.setState({ listId });
          }}
        />
        <TextField
          label='Name'
          value={name}
          onChangeText={(name) => this.setState({ name })}
        />
        <TextField
          label='Description'
          value={description}
          onChangeText={(description) => this.setState({ description })}
        />
        <DatePicker
          style={{ width: 200 }}
          date={deadline}
          mode="date"
          placeholder="Deadline"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(deadline) => { this.setState({ deadline }) }}
        />
        <Button title="Add task" onPress={() => this.add()} />
      </View>

    );
  }

  add() {
    console.log(this.state.listId, this.state.deadline, this.props);
    fetch(`${serverURL}/boards/${this.props.navigation.state.params.table.id}/lists/${this.state.listId}/tasks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${this.props.navigation.state.params.token}`
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        deadline: this.state.deadline,
        priority: 3
      }),
    }).then((res) => {
      DeviveEventEmitter.emit('backListener', {});
      this.props.navigation.navigate('Table');
    }).catch((err) => console.log(err));
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
  },
  container: {
    padding: 16
  }
})
