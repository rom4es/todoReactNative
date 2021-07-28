import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {deleteItem, setCompleted} from '../actions';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import {importanceItems} from '../helpers';
import stylesComponent from '../styles/TodoItem.js';

function TodoItem(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const expired =
    props.data.deadline &&
    !props.data.completed &&
    new Date(props.data.deadline).getTime() < new Date().getTime();

  /**
   * Проверить выполнена ли задача
   * @returns {jsx | null}
   */
  const CheckCompleted = () => {
    return props.data.completed ? (
      <Text style={styles.completedCont}>
        Выполнено! {moment(props.data.completed).format('DD.MM.YYYY HH:mm')}
      </Text>
    ) : null;
  };

  /**
   * Получить важность задачи
   * @returns {string}
   */
  const getImportance = () => {
    const importance = importanceItems.find(
      item => item.value === props.data.importance,
    );
    return importance ? importance.label : '';
  };

  /**
   * Удалить задачу после подтверждения
   */
  const deleteItemСonfirmed = () => {
    setModalVisible(false);
    dispatch(deleteItem(props.data.id));
  };

  return (
    <View>
      <View style={[styles.container, expired ? styles.expired : {}]}>
        <Text style={styles.title}>{props.data.name}</Text>
        <Text style={styles.description}>{props.data.description}</Text>
        <Text style={styles.importance}>{getImportance()}</Text>
        {props.data.deadline ? (
          <Text style={styles.deadline}>
            Deadline: {moment(props.data.deadline).format('DD.MM.YYYY HH:mm')}
          </Text>
        ) : null}
        {CheckCompleted()}
        <View style={styles.actions}>
          {!props.data.completed ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => dispatch(setCompleted(props.data.id, new Date()))}>
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
            onPress={() => setModalVisible(true)}>
            <Image
              style={styles.icon}
              source={require('../assets/img/delete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.containerModal}>
          <Text style={styles.modalHeader}>Удалить задачу?</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => deleteItemСonfirmed()}>
              <Text style={styles.buttonText}>Да</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Нет</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create(stylesComponent);

export default TodoItem;
