import React , {useState} from "react";
import FormTodo from "../../../componentes/form_task";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../../services/api";
export default function todo_update({route,  navigation}) {
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
            let url =  'api/tasks/'+route.params.id+'/detail/';
            var response = await api.put(url, formData, {
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
        <FormTodo task={task} status={status} func={updateTask} setTask={setTask} setStatus={setStatus}title={title} buttontext={'Update'} />
    )
}