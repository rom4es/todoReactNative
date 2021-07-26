import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {addItem, editItem} from '../actions';
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Platform,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import {importanceItems} from '../helpers';

function Task(props) {
  let id, todoItem;
  if (props.route.params) {
    id = props.route.params.id;
    todoItem = id ? props.todos.find(item => item.id === id) : null;
  }

  const [name, setName] = useState(todoItem ? todoItem.name : '');
  const [description, setDescription] = useState(
    todoItem ? todoItem.description : '',
  );
  const [deadline, setDeadline] = useState(todoItem ? todoItem.deadline : '');
  const [importance, setImportance] = useState(
    todoItem ? todoItem.importance : '',
  );
  const [completed] = useState(todoItem ? todoItem.completed : '');

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
      props.editItem({
        id: id,
        name: name,
        description: description,
        importance: importance ? importance : 1,
        deadline: deadline,
        completed: completed,
      });
    } else {
      props.addItem({
        name: name,
        description: description,
        importance: importance ? importance : 1,
        deadline: deadline,
        completed: completed,
      });
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
      <View style={styles.importance}>
        <Text style={styles.selectText}>Важность: </Text>
        <View style={styles.selectWrapper}>
          <RNPickerSelect
            style={styles.select}
            onValueChange={value => setImportance(value)}
            items={importanceItems}
            placeholder={{}}
            value={importance}
          />
        </View>
      </View>
      <View style={styles.containerDate}>
        <Text style={styles.date}>
          Дэдлайн:{' '}
          {deadline ? moment(deadline).format('DD.MM.YYYY HH:mm:ss') : ''}
        </Text>
        <View>
          <Button onPress={showDatepicker} title="Установить дату" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Установить время" />
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
      <View style={styles.buttonSubmit}>
        <Button
          title={id ? 'Изменить' : 'Сохранить'}
          color="#14a28f"
          onPress={onPressSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputWrapper: {
    minWidth: 200,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 5,
  },
  importance: {
    width: 200,
    marginBottom: 20,
  },
  selectWrapper: {
    backgroundColor: '#CACACA',
  },
  selectText: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerDate: {
    marginBottom: 30,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonSubmit: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#F00',
  },
});

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
  };
};

const mapDispatchToProps = {
  addItem,
  editItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
