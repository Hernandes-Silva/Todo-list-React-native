/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet, View, Text, FlatList, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../services/api"
export default function todo_list({navigation}) {
  const [tasks, setTasks] = useState([]);
  React.useEffect(async () => {
    const token = await AsyncStorage.getItem("token")
    try {
      var response = await api.get(`api/tasks/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (error) {
      console.log(error);
      var response = false;
    }
    if (response != false) {
      setTasks(response.data)
    }
  }, []);
  function add() {
    navigation.navigate('todo-add')
  }
  renderItem = ({ item, index }) => {

    return (
      <View style={styles.viewTask}>
        <View style={styles.squareRed}></View>
        <Text style={styles.textTask}>{item.name}</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}> To-do list</Text>
        <FlatList
          style={{}}
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => `key ${item.id}`}
        />
      </View>

      <View style={{ position: 'absolute', bottom: 20, right: 10, alignSelf: 'flex-end' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={add}
        >
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAED'
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 35,
    fontWeight: "bold"
  },

  viewTask: {
    marginTop: 10,
    borderRadius: 30,
    minHeight: 50,
    backgroundColor: 'white',
    color: 'black',
    flex: 1, flexDirection: 'row', alignItems: 'center',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    margin: 5,

  },
  squareRed: {
    marginLeft: 20,
    width: 24,
    height: 24,
    backgroundColor: 'red',
    opacity: 0.5
  },
  textTask: {
    marginLeft: 5,
    fontSize: 17,
    fontWeight: '700'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    backgroundColor: '#0183ff',
    borderRadius: 65,
  },
  textButton: {
    fontSize: 35,
    fontWeight: "bold"
  }
});

