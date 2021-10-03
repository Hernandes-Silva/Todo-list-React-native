
import React, { useState } from 'react';
import {
    StyleSheet, View, Text, FlatList, KeyboardAvoidingView, Alert
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../services/api"

export default function login({navigation}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoadingToken, setIsLoadingToken]= useState(true)
    React.useEffect(async () => {
        loginComToken()
        AsyncStorage.getItem('token').then((token) =>{
            console.log("entrando no async")
            loginComToken(token)
        }).catch((error) =>{
            setIsLoadingToken(false)
        })
    }, []);
    function test(){
        console.log("bbb")
    }
    const verificarToken = async (token) =>{
        console.log("verificandoToken")
        const formData = new FormData();
        formData.append("token", token);
        await api.post('api/token/verify/',formData,{
            header: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }}).then((response) => {
                navigation.navigate('todo-list')
            }).catch((error) =>{
                setIsLoadingToken(false)
            })
    }
    const loginComToken = async (token) =>{
        token = await AsyncStorage.getItem('token')
        if(token == 'null' || token == null){
            
            setIsLoadingToken(false)
        }else{

            verificarToken(token)
        }

    }

    const login = async () => {
        console.log("prestou")
        if( username  == "" || password==""){
            Alert.alert('Preencha os campos!!');
        }else{
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
                console.log(error)
                var response = false
            }
            if (response != false) {
                console.log(response.data)
                const { access } = response.data
                
                await AsyncStorage.setItem('token', access);
                navigation.navigate('todo-list')
            }else{
                Alert.alert('Dados incorretos!!');
            }
        }
    } 
    return (
        <KeyboardAvoidingView style={Styles.container}>
            { isLoadingToken ?<><Text style={Styles.text}>Carregando</Text></> :
            <View style={Styles.log}>
                <View style={Styles.logHeader}>
                    <Text style={Styles.text}>Tela de Login</Text>
                </View>
                <TextInput 
                style= {Styles.input}
                placeholder = "Usuário" 
                placeholderTextColor = "#000"
                value={username}
                onChangeText = {(text) => {setUsername(text)}}
                autoCapitalize ="none"
                importantForAutofill = "auto"
                />
                <TextInput
                    style= {Styles.input}
                    placeholder = "Password"
                    placeholderTextColor = "#000"
                    secureTextEntry = {true}
                    value={password}
                    onChangeText = {(text) => {setPassword(text)}}
                    autoCapitalize ="none"
                    importantForAutofill = "auto"
                />
                <TouchableOpacity style={Styles.button} onPress={login}>
                    <Text style={Styles.textButton}>Entrar</Text>
                </TouchableOpacity>
            </View>
            }
        </KeyboardAvoidingView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f5f5f5',
        justifyContent:'center',
        alignItems: 'center',
        padding:30,
    },
    log:{
        padding:30,
        width: 300,
        borderWidth:0.5,
        borderRadius: 8,
        justifyContent:'center',
        alignItems: 'center',
    },
    logHeader:{
        borderRadius: 8,
        marginBottom: 20
    },
    
    input :{
        height : 46,
        alignSelf :'stretch',
        color: '#000',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom : 20,
        borderRadius:10,
        padding:15

    },
    text:{
        fontSize:22,
    },
    textButton :{
        color: '#fff',
        fontSize:20,
        fontWeight : 'bold',
    },
    button: {
        height:42,
        borderRadius:8,
        backgroundColor : '#32cd32',
        width: 150,
        justifyContent:'center',
        alignItems:'center', 

    }
})
