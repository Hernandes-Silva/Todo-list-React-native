import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native';
import login from './pages/login';
import todo_list from './pages/todo';
import todo_add from './pages/todo/add';
import todo_update from './pages/todo/update';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
const textcolor = "#fff"
const navigationRef = React.createRef();
export default function App({navigation}) {
    async function logout() {
        try {
          await AsyncStorage.removeItem("token");
          navigationRef.current?.navigate('login')
        }
        catch(exception) {
          alert(exception)
        }
    }
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{
                headerRight: () => (

                    <TouchableOpacity
                        onPress={logout}
                    >
                        <Icon size={30} color={textcolor} name="logout" />
                    </TouchableOpacity>
                )
            }}>
                <Stack.Screen name="login" options={{ headerShown: false }} component={login} />
                <Stack.Screen
                    name="todo-list"
                    options={{
                        title: 'Home',
                        headerTintColor: textcolor,
                        headerTitleStyle: { color: '#fff', alignItems: 'center', justifyContent: 'center' },
                        headerStyle: { backgroundColor: '#FF0000' }
                    }}
                    component={todo_list}
                />
                <Stack.Screen name="todo-add"
                options={{
                        title: 'Create task',
                        headerTintColor: textcolor,
                        headerTitleStyle: { color: '#fff', alignItems: 'center', justifyContent: 'center' },
                        headerStyle: { backgroundColor: '#FF0000' }
                    }} component={todo_add} />
                <Stack.Screen name="todo-update"
                options={{
                    title: 'Update task',
                    headerTintColor: textcolor,
                    headerTitleStyle: { color: '#fff', alignItems: 'center', justifyContent: 'center' },
                    headerStyle: { backgroundColor: '#FF0000' }
                }}
                component={todo_update} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}