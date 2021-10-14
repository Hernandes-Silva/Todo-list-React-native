import React, { useState } from "react";
import FormTodo from "../../../componentes/form_task";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../../services/api";
import { Alert } from "react-native";
export default function todo_update({ route, navigation }) {
    const [task, setTask] = useState(route.params.name)
    const [status, setStatus] = useState(route.params.status)
    const title = 'Update Task'
    const updateTask = async () => {
        console.log("update task")
        if (task != '') {
            const formData = new FormData();
            formData.append('name', task);
            formData.append('status', status);
            const token = await AsyncStorage.getItem("token")
            let url = 'api/tasks/' + route.params.id + '/detail/';
            var response = await api.put(url, formData, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(function () {
                navigation.navigate('todo-list')
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            Alert.alert('Preencha o nome da tarefa')
        }
    }
    const showDialog = () => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to remove this task?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: deleteTask,
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                    onPress: () => {
                        return false;
                    }
                },
            ]
        );
    };
    const deleteTask = async () => {
        
            const token = await AsyncStorage.getItem("token")
            let url = 'api/tasks/' + route.params.id + '/detail/';
            var response = await api.delete(url, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(function () {
                navigation.navigate('todo-list')
            }).catch(function (error) {
                console.log(error)
            })
        
    }

    return (
        <FormTodo
            task={task} status={status} func={updateTask}
            setTask={setTask} setStatus={setStatus} title={title} buttontext='Update'
            deleted={true} funcDelet={showDialog} />
    )
}