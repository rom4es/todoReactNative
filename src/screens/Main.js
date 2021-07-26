import 'react-native-gesture-handler';
import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import TodoList from '../components/TodoList.js';

function Main({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.containerTodo}>
        <TodoList />
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Task')}>
        <Image style={styles.icon} source={require('../assets/img/add.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTodo: {
    padding: 15,
  },
  button: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#f73149',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 10,
  },
  icon: {
    width: 35,
    height: 35,
  },
});

export default Main;
