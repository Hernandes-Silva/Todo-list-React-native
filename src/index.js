import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import login from './login';
import todo_list from './todo';

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={login} />
                <Stack.Screen name="todo-list" component={todo_list} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}