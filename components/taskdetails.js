import React, { Component } from 'react';
import {
    View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { serverURL } from './shares';

import * as _ from 'lodash';


export default class TaskDetails extends Component {

    state = {
        task: {
            id: 1,
            name: 'pranie1',
            description: "Write unittests",
            priority: 4,
            deadline: "2018-01-01T01:00:00Z",
            finished: false,
            performer_id: null,
            list_id: 2,
            comments: [
                {
                    id: 3,
                    content: "Good",
                    created: "2018-01-14T15:14:06.350595Z",
                    author: {
                        username: "Magni"
                    }
                },
                {
                    id: 4,
                    content: "Bad",
                    created: "2018-01-14T15:15:06.350595Z",
                    author: {
                        username: "Radek"
                    }
                }

            ],
        },
        newComments: ''
    };

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    componentWillMount() {
        let tableId = this.props.navigation.state.params.tableId;
        let listsId = this.props.navigation.state.params.listId;
        let taskId = this.props.navigation.state.params.taskId;

        fetch(`${serverURL}/boards/${tableId}/lists/${listsId}/tasks/${taskId}`,
            {
                type: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${this.props.navigation.state.params.token}`
                }
            }).then((res) => res.json())
            .then((jsonTask) => {
                let taskObj = jsonTask;
                this.setState({ task: taskObj })
            })


        console.log('test', this.props);
        console.log('test', this.state);
    }

    render() {

        let { newComment } = this.state.newComments;
        return (
            <View>
                <View style={styles.row}>
                    <Text>Deadline:</Text>
                    <Text> {this.state.task.deadline}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Description:</Text>
                    <Text> {this.state.task.description}</Text>
                </View>
                {this.state.task.performer_id ?
                    <View style={styles.row}>
                        <Text>Members:</Text>
                        <Text> {this.state.task.performer_id}</Text>
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
                <View style={styles.row}>
                    {
                        this.state.task.comments.map(
                            (comment) => (
                                <View key={comment.id} style={styles.comment}>
                                    <Text >
                                        {`${comment.author.username} ${comment.content}`}
                                    </Text>
                                </View>
                            )
                        )
                    }
                </View>
                {/*<Text style={{ color: '#000' }}>Test</Text>*/}
                {/*<Text>Test</Text>*/}
                <Button title={'ADD'} onPress={this.addComment.bind(this)} />

                {/*<Button title={'test'} onPress={*/}
                {/*this.login.bind(this)*/}
                {/*}></Button>*/}
            </View>
        );
    }

    addComment() {
        this.state.task.comments.push(
            {
                content: this.state.newComment,
                author: {
                    username: "Magni"
                }
            }
        );
        this.setState({});
        console.log('add comment');
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
        }
    }
);
