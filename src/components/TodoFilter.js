import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { importanceItems } from '../helpers'
import { changeFilterValue } from '../actions'

function TodoFilter(props) {

  return (
    <View style={styles.selectWrapper}>
      <Text style={styles.selectText}>Фильтр по важности задачи: </Text>
      <View style={styles.select}>
        <RNPickerSelect
          onValueChange={(value) => props.changeFilterValue(value)}
          items={[{label: 'Все', value: 0}].concat(importanceItems)}
          placeholder={{}}
          value={props.filterValue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectWrapper: {
    marginTop: 0,
    marginBottom: 20
  },
  selectText: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: 'bold' 
  },
  select: {
    backgroundColor: '#CACACA',
  }
});

const mapStateToProps = state => {
  return {
    filterValue: state.todos.filterValue
  }
}

const mapDispatchToProps = {
  changeFilterValue
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter)