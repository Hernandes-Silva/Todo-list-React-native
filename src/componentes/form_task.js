import React, { useEffect, useState } from 'react';

import {
    StyleSheet, View, Text, FlatList, TouchableOpacity, Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { constStyles } from '../pages/styles';
import { Picker } from '@react-native-picker/picker';

export default function FormTodo({task,status,setTask, setStatus, func, title, buttontext}) {

    return (
        <View style={constStyles.container}>
            <View style={Styles.body}>
                <View style={Styles.log}>
                    <Text style={Styles.textTitle}>{title}</Text>
                    <TextInput
                        style={constStyles.input}
                        placeholder="task name"
                        placeholderTextColor="#000"
                        value={task}
                        onChangeText={(text) => { setTask(text) }}
                        autoCapitalize="none"
                        importantForAutofill="auto"
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <View style={Styles.select}>
                            <Picker
                                style={{ width: '100%' }}
                                selectedValue={status}
                                onValueChange={(itemValue, itemIndex) =>
                                    setStatus(itemValue)
                                }
                            >
                                <Picker.Item label='Todo' value="TOD" />
                                <Picker.Item label='In progress' value="INP" />
                                <Picker.Item label='Complete' value="COM" />

                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity style={Styles.button} onPress={func}>
                        <Text style={Styles.textButton}>{buttontext}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    text: {
        fontSize: 17,
        fontWeight: 'bold'

    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    select: { backgroundColor: 'white', borderColor: "black", borderWidth: 1, width: '100%' },
    log: {
        padding: 30,
        width: 300,
        borderWidth: 0.5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    button: {
        marginTop: 15,
        height: 45,
        borderRadius: 8,
        backgroundColor: '#32cd32',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,

    },
    textButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

})