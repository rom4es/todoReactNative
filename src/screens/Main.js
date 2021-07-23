import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Button, Text, View } from 'react-native';
import TodoList from '../components/TodoList.js';

function Main({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.button}>
        <Button
          title='Создать задачу'
          color='#14a28f'
          onPress={() => navigation.navigate('Task')}
        />
      </View>
      <TodoList />
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  button: {
    marginTop: 10,
    marginBottom: 20
  },
});

export default Main