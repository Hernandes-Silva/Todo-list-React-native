import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import login from './pages/login';
import todo_list from './pages/todo';
import todo_add from './pages/todo/add';
import todo_update from './pages/todo/update';
const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={login} />
                <Stack.Screen name="todo-list" component={todo_list} />
                <Stack.Screen name="todo-add" component={todo_add} />
                <Stack.Screen name="todo-update" component={todo_update} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}