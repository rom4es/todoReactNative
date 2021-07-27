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
import stylesComponent from '../styles/Main.js';

function Main({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.containerTodo}>
        <TodoList />
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Task')}>
        <Image
          style={styles.buttonIcon}
          source={require('../assets/img/add.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(stylesComponent);

export default Main;
