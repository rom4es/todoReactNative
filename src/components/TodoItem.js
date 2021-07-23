import React from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { deleteItem, setCompleted } from '../actions'
import { StyleSheet, Button, View, Text, Alert } from 'react-native';
import moment from 'moment';
import { importanceItems } from '../helpers'

function TodoItem(props) {

  const navigation = useNavigation();
  const expired = props.data.deadline && props.data.deadline instanceof Date && !props.data.completed && props.data.deadline.getTime() < (new Date).getTime();

  const checkCompleted = () => {
    return props.data.completed ? (
      <Text style={styles.colorGreen}>Выполнено! {moment(props.data.completed).format('DD.MM.YYYY HH:mm:ss')}</Text>
    ) : <Text style={styles.colorOrange}>Ожидает выполнения</Text>;
  }

  const getImportance = () => {
    const item = importanceItems.find((item) => item.value === props.data.importance);
    return item ? item.label : '';
  }

  return (
    <View style={[styles.container, expired ? {backgroundColor: '#d44646'} : {}]}>
      <Text style={styles.title}>{props.data.name}</Text>
      <Text style={styles.description}>{props.data.description}</Text>
      <Text style={styles.importance}>{getImportance()}</Text>
      <Text style={styles.deadline}>Дэдлайн: {props.data.deadline ? moment(props.data.deadline).format('DD.MM.YYYY HH:mm:ss') : ''}</Text>
      <Text style={styles.completedCont}>{checkCompleted()}</Text>
      {!props.data.completed &&
        <View style={styles.button}>
          <Button
            title='Выполнено'
            onPress={() => props.setCompleted(props.data.id, new Date())} 
          />
        </View>
      }
      <View style={styles.button}>
        <Button
          title='Редактировать'
          style={styles.button}
          onPress={() => navigation.navigate('Task', {id: props.data.id})}
        />
      </View>
      <View style={styles.button}>
        <Button
          title='Удалить'
          style={styles.button}
          onPress={() => props.deleteItem(props.data.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#DADADA',
  },
  title:{
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  description: {
    marginBottom: 10
  },
  importance:{
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold' 
  },
  deadline:{
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  completedCont:{
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  colorGreen: {
    color: '#14a28f',
  },
  colorOrange: {
    color: '#ff8c00',
  },
  button: {
    marginBottom: 8
  }
});

const mapDispatchToProps = {
  deleteItem,
  setCompleted
}

export default connect(null, mapDispatchToProps)(TodoItem)