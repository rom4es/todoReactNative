import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addItem, editItem} from '../actions';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import {importanceItems} from '../helpers';
import stylesComponent from '../styles/Task.js';

function Task(props) {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  let id, todoItem;
  if (props.route.params) {
    id = props.route.params.id;
    todoItem = id ? todos.find(item => item.id === id) : null;
  }

  const [name, setName] = useState(todoItem ? todoItem.name : '');
  const [description, setDescription] = useState(
    todoItem ? todoItem.description : '',
  );
  const [deadline, setDeadline] = useState(
    todoItem ? new Date(todoItem.deadline) : '',
  );
  const [importance, setImportance] = useState(
    todoItem ? todoItem.importance : '',
  );
  const [completed] = useState(todoItem ? todoItem.completed : false);

  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);

  const [clickSubmit, setClickSubmit] = useState(false);

  useEffect(() => {
    setErrorName(!name);
  }, [name]);

  useEffect(() => {
    setErrorDescription(!description);
  }, [description]);

  const onPressSubmit = () => {
    setClickSubmit(true);
    if (errorName || errorDescription) {
      return false;
    }

    if (id) {
      dispatch(
        editItem({
          id: id,
          name: name,
          description: description,
          importance: importance ? importance : 1,
          deadline: deadline,
          completed: completed,
        }),
      );
    } else {
      dispatch(
        addItem({
          name: name,
          description: description,
          importance: importance ? importance : 1,
          deadline: deadline,
          completed: completed,
        }),
      );
    }

    props.navigation.goBack();
  };

  // ===== DateTimePicker =====

  const [datePicker, setDatePicker] = useState(
    deadline ? deadline : new Date(),
  );
  const [modePicker, setModePicker] = useState('date');
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || datePicker;
    setShowPicker(Platform.OS === 'ios');
    setDatePicker(currentDate);
    setDeadline(currentDate);
  };

  const showMode = currentMode => {
    setShowPicker(true);
    setModePicker(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  // ===== =====

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.containerScrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardDismissMode="on-drag">
        <Text style={styles.title}>
          {id ? 'Редактирование задачи' : 'Новая задача'}
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Название"
            defaultValue={name}
            onChangeText={text => setName(text)}
          />
          {errorName && clickSubmit && (
            <Text style={styles.errorText}>Заполните поле</Text>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Описание"
            defaultValue={description}
            multiline={true}
            numberOfLines={2}
            onChangeText={text => setDescription(text)}
          />
          {errorDescription && clickSubmit && (
            <Text style={styles.errorText}>Заполните поле</Text>
          )}
        </View>
        <View style={styles.selectWrapper}>
          <Text style={styles.selectText}>Важность задачи: </Text>
          <View style={styles.select}>
            <RNPickerSelect
              onValueChange={value => setImportance(value)}
              items={importanceItems}
              placeholder={{}}
              value={importance}
            />
          </View>
        </View>
        <View style={styles.containerDate}>
          {deadline ? (
            <Text style={styles.date}>
              Deadline:{' '}
              {deadline ? moment(deadline).format('DD.MM.YYYY HH:mm') : ''}
            </Text>
          ) : null}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              <Image
                style={styles.icon}
                source={require('../assets/img/calendar.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={showTimepicker}>
              <Image
                style={styles.icon}
                source={require('../assets/img/clock.png')}
              />
            </TouchableOpacity>
          </View>
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={datePicker}
              mode={modePicker}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <View>
          <TouchableOpacity style={styles.buttonSubmit} onPress={onPressSubmit}>
            <Text style={styles.buttonSubmitText}>
              {id ? 'Изменить' : 'Сохранить'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ...stylesComponent,
  containerScrollView: {
    width: Dimensions.get('window').width,
  },
});

export default Task;
