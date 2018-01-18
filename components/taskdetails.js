import React, { Component } from 'react';
import {
    ScrollView, View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { serverURL } from './shares';
import { Dropdown } from 'react-native-material-dropdown';

import * as _ from 'lodash';


export default class TaskDetails extends Component {
    lists = [];
    users = [];
    state = {
        team: [],
        task: {
            performer_id: {
                username: ''
            },
            comments: [
                {
                    id: 3,
                    content: "",
                    created: "",
                    author: {
                        username: ""
                    }
                }
            ],
        },
        newComments: ''
    };

    tableId = this.props.navigation.state.params.tableId;
    listsId = this.props.navigation.state.params.listId;
    taskId = this.props.navigation.state.params.taskId;

    static navigationOptions = ({ navigation }) => ({
        header: null
    });


    componentWillMount() {

        fetch(`${serverURL}/boards/${this.tableId}/lists/${this.listsId}/tasks/${this.taskId}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${this.props.navigation.state.params.token}`
                }
            }).then((res) => res.json())
            .then((jsonTask) => {
                let taskObj = jsonTask;
                this.setState({ task: taskObj })
            });

        fetch(`${serverURL}/boards/${this.tableId}/team`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${this.props.navigation.state.params.token}`
                }
            }).then((res) => res.json())
            .then((team) => {
                this.state.team.push(team[0].user);
                _.forEach(_.first(this.state.team), user => {
                    this.users.push({ value: user.username });
                });

            });
        _.forEach(this.props.navigation.state.params.lists, list => {
            this.lists.push({
                value: list.name,
                id: list.id
            });
        });

    }

    render() {

        let { newComment } = this.state.newComments;
        return (
            <ScrollView>
                <Dropdown
                    label="Lists"
                    data={this.lists}
                    onChangeText={(value, ind, data) => {
                        const found = _.find(data, (ref) => ref.value === value);
                        fetch(`${serverURL}/boards/${this.tableId}/lists/${this.listsId}/tasks/${this.taskId}/move/${found.id}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': `JWT ${this.props.navigation.state.params.token}`
                                }
                            }).then((res) => res.json())
                            .then((jsonTask) => {
                                console.log(jsonTask);
                                this.props.navigation.state.params.listId = found.id;
                            });
                    }}

                />
                <View style={styles.row}>
                    <Text>Deadline:</Text>
                    <Text> {this.state.task.deadline}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Description:</Text>
                    <Text> {this.state.task.description}</Text>
                </View>
                {this.state.task.performer_id.username ?
                    <View style={styles.row}>
                        <Dropdown
                            label=""
                            data={this.users}
                            onChangeText={(value, ind, data) => {
                                const found = _.find(data, (ref) => ref.value === value);
                                console.log(found);
                                fetch(`${serverURL}/boards/${this.tableId}/lists/${this.listsId}/tasks/${this.taskId}/add_user/${value}`,
                                    {
                                        method: 'GET',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': `JWT ${this.props.navigation.state.params.token}`
                                        }
                                    }).then((res) => res.json())
                                    .then((jsonTask) => {
                                        console.log(jsonTask);
                                        this.props.navigation.state.params.listId = found.id;
                                    });
                            }}
                        />
                    </View> : null
                }

                <View>
                    <Text>Comments:</Text>
                    <TextField
                        label='Create new comment'
                        value={newComment}
                        onChangeText={(newComment) => this.setState({ newComment })}
                    />
                </View>
                <View style={[styles.row, styles.column]}>
                    {
                        this.state.task.comments ? this.state.task.comments.map(
                            (comment) => (
                                <View key={comment.id} style={styles.comment}>
                                    <Text >
                                        {`${comment.author.username} ${comment.content}`}
                                    </Text>
                                </View>
                            )
                        ) : null
                    }
                </View>
                <Button title={'ADD'} onPress={this.addComment.bind(this)} />


            </ScrollView>
        );
    }

    addComment() {

        fetch(`${serverURL}/boards/${this.tableId}/lists/${this.listsId}/tasks/${this.taskId}/comments`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${this.props.navigation.state.params.token}`
                },
                body: JSON.stringify({
                    content: this.state.newComment
                })
            }).then((response) => response.json())
            .then((res) => {
                this.state.task.comments.push(
                    res
                );
                this.setState({})
            });
        // this.props.navigation.navigation('Login')
    }
}

const styles = StyleSheet.create(
    {
        row: {
            flexDirection: 'row',
            borderBottomColor: 'rgba(0,0,0,0.1)',
            borderBottomWidth: 1,
            padding: 16
        },
        comment: {
            flexDirection: 'row',
            padding: 6
        },
        column: {
            flexDirection: 'column'
        }
    }
);
