import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import stylesComponent from '../styles/Picker.js';

function Picker({deadline, setDeadline}) {
  const [datePicker, setDatePicker] = useState(
    deadline ? deadline : new Date(),
  );
  const [modePicker, setModePicker] = useState('date');
  const [showPicker, setShowPicker] = useState(false);

  /**
   * Изменить дату deadline
   * @param {object} event native event
   * @param {object} selectedDate выбранная дата
   */
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || datePicker;
    setShowPicker(Platform.OS === 'ios');
    setDatePicker(currentDate);
    setDeadline(currentDate);
  };

  /**
   * Отображение пикера в одном из режимов: date - выбор даты, time - выбор времени
   * @param {object} currentMode режим отображения
   */
  const showMode = currentMode => {
    setShowPicker(true);
    setModePicker(currentMode);
  };

  /**
   * Показать выбор даты
   */
  const showDatepicker = () => {
    showMode('date');
  };

  /**
   * Показать выбор времени
   */
  const showTimepicker = () => {
    showMode('time');
  };

  return (
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
  );
}

const styles = StyleSheet.create(stylesComponent);

export default Picker;
