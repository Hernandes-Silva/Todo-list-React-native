import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import login from './pages/login';
import todo_list from './pages/todo';
import todo_add from './pages/todo/add';

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={login} />
                <Stack.Screen name="todo-list" component={todo_list} />
                <Stack.Screen name="todo-add" component={todo_add} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}