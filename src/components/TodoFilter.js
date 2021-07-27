import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {importanceItems} from '../helpers';
import {changeFilterValue} from '../actions';
import stylesComponent from '../styles/TodoFilter.js';

function TodoFilter() {
  const filterValue = useSelector(state => state.todos.filterValue);
  const dispatch = useDispatch();
  return (
    <View style={styles.selectWrapper}>
      <Text style={styles.selectText}>Фильтр по важности задачи: </Text>
      <View style={styles.select}>
        <RNPickerSelect
          onValueChange={value => dispatch(changeFilterValue(value))}
          items={[{label: 'Все', value: 0}].concat(importanceItems)}
          placeholder={{}}
          value={filterValue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create(stylesComponent);

export default TodoFilter;
