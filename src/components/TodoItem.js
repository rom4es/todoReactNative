import React from 'react';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {deleteItem, setCompleted} from '../actions';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import moment from 'moment';
import {importanceItems} from '../helpers';

function TodoItem(props) {
  const navigation = useNavigation();
  const expired =
    props.data.deadline &&
    props.data.deadline instanceof Date &&
    !props.data.completed &&
    props.data.deadline.getTime() < new Date().getTime();

  const CheckCompleted = () => {
    return props.data.completed ? (
      <Text style={styles.colorGreen}>
        Выполнено! {moment(props.data.completed).format('DD.MM.YYYY HH:mm:ss')}
      </Text>
    ) : (
      <Text style={styles.colorOrange}>Ожидает выполнения</Text>
    );
  };

  const getImportance = () => {
    const importance = importanceItems.find(
      item => item.value === props.data.importance,
    );
    return importance ? importance.label : '';
  };

  return (
    <View
      style={[styles.container, expired ? {backgroundColor: '#d44646'} : {}]}>
      <Text style={styles.title}>{props.data.name}</Text>
      <Text style={styles.description}>{props.data.description}</Text>
      <Text style={styles.importance}>{getImportance()}</Text>
      {props.data.deadline ? (
        <Text style={styles.deadline}>
          Deadline: {moment(props.data.deadline).format('DD.MM.YYYY HH:mm:ss')}
        </Text>
      ) : null}
      <Text style={styles.completedCont}>{CheckCompleted()}</Text>
      <View style={styles.actions}>
        {!props.data.completed ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.setCompleted(props.data.id, new Date())}>
            <Image
              style={styles.icon}
              source={require('../assets/img/completed.png')}
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Task', {id: props.data.id})}>
          <Image
            style={styles.icon}
            source={require('../assets/img/edit.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.deleteItem(props.data.id)}>
          <Image
            style={styles.icon}
            source={require('../assets/img/delete.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#cacac8',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 10,
  },
  importance: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  deadline: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedCont: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorGreen: {
    color: '#14a28f',
  },
  colorOrange: {
    color: '#ff8c00',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#b6846b',
    marginRight: 15,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

const mapDispatchToProps = {
  deleteItem,
  setCompleted,
};

export default connect(null, mapDispatchToProps)(TodoItem);
