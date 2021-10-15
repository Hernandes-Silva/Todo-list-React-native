
import React, { useState } from 'react';
import {
    StyleSheet, View, Text, FlatList, KeyboardAvoidingView,
    Alert, Image, TouchableOpacity, Animated, Keyboard
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../services/api"

import { constStyles } from '../styles';
import { useAnimatedGestureHandler } from 'react-native-reanimated';



export default function login({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoadingToken, setIsLoadingToken] = useState(true)
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }))
    const [opacity] = useState(new Animated.Value(0.3))
    const [logo] = useState(new Animated.ValueXY({ x: 160, y: 200 }))
    React.useEffect(async () => {
        loginComToken()
        keybardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            })

        ]).start();

    }, []);
    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.y, {
                toValue: 110,
                duration: 70,
                useNativeDriver: false
            }),
            Animated.timing(logo.x, {
                toValue: 85,
                duration: 70,
                useNativeDriver: false
            })
        ]).start();
    }
    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.y, {
                toValue: 200,
                duration: 100,
                useNativeDriver: false

            }),
            Animated.timing(logo.x, {
                toValue: 160,
                duration: 100,
                useNativeDriver: false

            })
        ]).start();
    }
    
    const verificarToken = async (token) => {
        
        const formData = new FormData();
        formData.append("token", token);
        await api.post('api/token/verify/', formData, {
            header: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            navigation.navigate('todo-list')
        }).catch((error) => {
            setIsLoadingToken(false)
        })
    }
    const loginComToken = async () => {
        let token = await AsyncStorage.getItem('token')
        if (token == 'null' || token == null) {
            
            setIsLoadingToken(false)
        } else {
            
            verificarToken(token)
        }
    }
    const login = async () => {
       
        if (username == "" || password == "") {
            Alert.alert('Preencha os campos!!');
        } else {
            try {
                const formData = new FormData();
                formData.append('username', username);
                formData.append('password', password);
                var response = await api.post('api/token/', formData, {
                    header: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
            } catch (error) {
               
                var response = false
            }
            if (response != false) {
                
                const { access } = response.data

                await AsyncStorage.setItem('token', access);
                navigation.navigate('todo-list')
            } else {
                Alert.alert('Dados incorretos!!');
            }
        }
    }
    return (
        <KeyboardAvoidingView style={Styles.container}>
            {isLoadingToken ? <><Text style={Styles.text}>Carregando</Text></> :
            <>
            <View style={Styles.viewLogo}>
                <Animated.Image style={{ height: logo.y, width: logo.x }} source={require("../../assets/logo2.png")} />
            </View>
            <Animated.View style={[Styles.viewInputs,
                { opacity:opacity, transform: [{ translateY: offset.y }]}
            ]} >
                <TextInput
                    style={Styles.input}
                    placeholder="User"
                    placeholderTextColor="#000"
                    value={username}
                    onChangeText={(text) => { setUsername(text) }}
                    autoCapitalize="none"
                    importantForAutofill="auto"
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Password"
                    placeholderTextColor="#000"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => { setPassword(text) }}
                    autoCapitalize="none"
                    importantForAutofill="auto"
                />
                <TouchableOpacity style={Styles.button} onPress={login}>
                    <Text style={Styles.textButton}>Login</Text>
                </TouchableOpacity>

            </Animated.View>
            </>
            }
        </KeyboardAvoidingView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        /* backgroundColor: '#f5f5f5' */
        backgroundColor: '#191919',
        justifyContent: 'center',
        alignItems: 'center',

        /* padding:30, */
    },
    viewLogo: {
        paddingRight: 30,
        flex: 1,
        justifyContent: 'center'
    },
    viewInputs: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        paddingBottom: 30

    },
    input: {
        backgroundColor: "#fff",
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 7,
    },
    log: {
        padding: 30,
        width: 300,
        borderWidth: 0.5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logHeader: {
        borderRadius: 8,
        marginBottom: 20
    },
    text: {
        fontSize: 22,
        color: '#fff'
    },
    textButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        
        height: 45,
        width: '90%',
        borderRadius: 7,
        backgroundColor: '#D2691E',
        justifyContent: 'center',
        alignItems: 'center',
        

    }
})
