import React, { Component } from 'react';
import {
    ScrollView, View, Text, Button, StyleSheet, Image, DeviceEventEmitter, Platform, NativeModules, NativeEventEmitter, Alert
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { serverURL } from './shares';
import { Dropdown } from 'react-native-material-dropdown';
import Moment from 'moment';
import Header from './header';
import * as _ from 'lodash';


export default class TaskDetails extends Component {
    lists = [];
    users = [];
    state = {
        team: [],
        task: {
            name: '',
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
        newComments: '',
    };

    tableId = this.props.navigation.state.params.tableId;
    listsId = this.props.navigation.state.params.listId;
    taskId = this.props.navigation.state.params.taskId;
    list;

    static navigationOptions = ({ navigation }) => {
        console.log(navigation);
        return ({
            header: <Header name={navigation.state.params.table.name} table={navigation.state.params.table} token={navigation.state.params.token} navigation={navigation}></Header>
        })
    }


    componentWillMount() {
        console.log(this.props.navigation.state.params.lists, this.listsId);
        this.list = _.find(this.props.navigation.state.params.lists, (ref) => ref.id == this.listsId);
        console.log(this.list.name)
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
                console.log(taskObj)
                // this.props.navigation.setParams({ task: taskObj });
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
                this.setState({});
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
            <ScrollView style={styles.container}>
                <Dropdown
                    value={this.list ? this.list.name : ''}
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
                    <Text style={styles.header}>Name:</Text>
                    <Text> {this.state.task.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.header}>Deadline:</Text>
                    <Text> {Moment(this.state.task.deadline).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.header}>Description:</Text>
                    <Text> {this.state.task.description}</Text>
                </View>
                {
                    <View style={[styles.user, styles.commentsInput]}>
                        <Dropdown
                            label="Performer"
                            value={this.state.task.performer_id ? this.state.task.performer_id.username : ''}
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
                    </View>
                }

                <View style={styles.commentsInput}>

                    <TextField
                        label='Create new comment'
                        value={newComment}
                        onChangeText={(newComment) => this.setState({ newComment })}
                    />
                    <Button title={'ADD COMMENT'} onPress={this.addComment.bind(this)} />
                </View>
                <View style={styles.column}>
                    <Text style={styles.header}>Comments:</Text>
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
                console.log(res);
                this.state.task.comments.push(
                    res
                );
                this.setState({ newComment: '' })
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
            padding: 16,
            marginBottom: 16
        },
        user: {
            width: '100%',
            flex: 1
        },
        comment: {
            flexDirection: 'row',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.1)',
        },
        column: {
            flexDirection: 'column'
        },
        container: {
            padding: 16
        },
        commentsInput: {
            marginTop: -16,
            marginBottom: 16
        },
        header: {
            color: '#2196F3',
        }

    }
);
