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
import Icon from 'react-native-vector-icons/FontAwesome';


export default function todo_list({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [load,setLoad] = useState(true)
  const [isLoading, setIsloading] = useState(true)
  React.useEffect(async () => {
    
    let token = await AsyncStorage.getItem("token")
    if (token != null) {
      try {
        var response = await api.get(`api/tasks/`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } catch (error) {
        
        var response = false;
      }
      if (response != false) {
        setTasks(response.data)
        setIsloading(false)
      }
    }else{
      navigation.navigate('login')
    }
    navigation.addListener('focus', ()=>setLoad(!load))
  }, [load, navigation]);

  function add() {
    navigation.navigate('todo-add')
  }
  const renderItem = ({ item, index }) => {
    let colorSquare = ""
    if (item.status == "TOD") {
      colorSquare = "red"
    } else if (item.status == "INP") {
      colorSquare = "#00FFFF"
    } else {
      colorSquare = "#00FF00"
    }
    function update() {
      let id = item.id;
      let name = item.name;
      let status = item.status;
      navigation.navigate('todo-update', { id: id, name: name, status: status })
    }
    return (
      <View style={styles.viewTask}>
        <View style={[styles.square, { backgroundColor: colorSquare }]}></View>
        <Text style={styles.textTask}>{item.name}</Text>
        <TouchableOpacity style={{ marginHorizontal: 10, }}
          onPress={update}>
          <Icon name="edit" size={30} color="black" />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}> Tasks </Text>
        <Text style={{ color: '#fff', marginLeft: 10 }}>
          <Text>
            <View style={[styles.squareColor, { backgroundColor: 'red' }]}></View>:Todo  </Text>
          <Text><View style={[styles.squareColor, { backgroundColor: '#00FFFF' }]}></View>:In progress  </Text>
          <View style={[styles.squareColor, { backgroundColor: '#00FF00' }]}></View>:Complete
        </Text>
        {isLoading ? <></> : <FlatList
          style={{}}
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => `key ${item.id}`}
        />}
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
    backgroundColor: '#191919'
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: '#fff'
  },

  viewTask: {
    marginTop: 10,
    borderRadius: 30,
    minHeight: 50,
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    /* shadowColor: 'rgb(0, 0, 0)', */
    shadowColor: '#fff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    margin: 5,

  },
  squareColor: {
    marginHorizontal: 10,
    width: 10,
    height: 10,
    opacity: 0.5
  },
  square: {
    marginHorizontal: 10,
    width: 24,
    height: 24,
    opacity: 0.5
  },
  textTask: {
    marginLeft: 5,
    fontSize: 17,
    fontWeight: '700',
    flex: 1, flexWrap: 'wrap'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    backgroundColor: '#FF0000',
    borderRadius: 65,
  },
  textButton: {
    fontSize: 35,
    fontWeight: "bold",
    color: 'white'

  }
});

