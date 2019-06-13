import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import firebase from 'react-native-firebase';

export default class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',//
            todoTasks: [1, 2],// khoi tao mang rong cho data
            loading: false
        };
        this.ref = firebase.firestore().collection('todoTasks');// tao 1 table voi ten la todoTasks trong firebase
        this.unsubscribe = null;
    }
    componentDidMount() {
        console.log(`compnent did mount `);
        //this.unsubscribe = null;// ham cap nhat khi du lieu thay doi tren firebase
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    onCollectionUpdate = (querySnapshot) => {
        console.log(`onCollectionUpdate `);
        const todos = [];
        querySnapshot.forEach((doc) => {
            todos.push({
                tashName: doc.data().tashName
            });
        });

        this.setState({
            todoTasks : todos.sort((a, b) => {
                return (a.tashName < b.tashName)
            }),
            loading: false
        });
        console.log(` this is todo data ${this.state.todoTasks}`)
    }
    onPressAdd = () => {
        if(this.state.taskName.trim() == ''){
            alert('task name is black');
            return ;
        }
        this.ref.add({
            tashName: this.state.taskName,
        })
            .then((data) => {
                console.log(`added data = ${data}`);
                this.setState({
                    tashName: '',
                    loading: true
                })
            })
            .catch((err) => {
                conosle.log(`error adding firebase document = ${err}`);
                this.setState({
                    tashName: '',
                    loading: true
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.box}>
                    <TextInput
                        style={styles.txtInput}
                        placeholder='enter task name'
                        placeholderTextColor='white'
                        keyboardType='default'
                        autoCapitalize='none'
                        onChangeText={
                            (text => {
                                this.setState({ taskName: text })
                            })
                        }
                    />
                    <TouchableOpacity
                        onPress={this.onPressAdd}
                        style={styles.bntAdd}
                    >
                        <Text style={{ color: 'white' }}>ADD</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.todoTasks}
                    renderItem={({ item, index }) => {
                        return (
                            <Text >{item.tashName}</Text>
                        )
                    }}
                    keyExtractor={(item, index) => item.tashName}
                >

                </FlatList>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box: {
        backgroundColor: 'tomato',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtInput: {
        height: 40,
        width: 200,
        borderColor: 'white',
        color: 'white',
        borderWidth: 1
    },
    bntAdd: {
        borderColor: 'white',
        borderWidth: 1,
        marginLeft: 30,
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
