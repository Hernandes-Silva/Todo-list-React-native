import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet, View, Text, FlatList, TouchableOpacity, Alert
} from 'react-native';
import api from '../../../services/api';
import FormTodo from '../../../componentes/form_task';


export default function todo_add({ navigation }) {
    const [task, setTask] = useState('')
    const [status, setStatus] = useState('TOD')
    const title = 'Create Task'
    const newTask = async () => {
        if (task != '') {
            const formData = new FormData();
            formData.append('name', task);
            formData.append('status', status);
            const token = await AsyncStorage.getItem("token")
            var response = await api.post('api/tasks/', formData, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(function () {
                navigation.navigate('todo-list')
            }).catch(function (error) {
                console.log(error)
            })

        }else{
            Alert.alert('Preencha o nome da tarefa')
        }
    }
    return (
        <FormTodo task={task} status={status} func={newTask} setTask={setTask} setStatus={setStatus}title={title} buttontext='Create' />
    );
};
