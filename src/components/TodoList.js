import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Alert } from 'react-native';
import TodoFilter from './TodoFilter.js';
import TodoItem from './TodoItem.js';

function TodoList({todos, filterValue}) {

  const filterTodos = () => {
    return (filterValue > 0)
      ? todos.filter( (item) => item.importance === filterValue )
      : todos
  }

  return (
    <View>
      <TodoFilter />
      <View>
        {filterTodos().length ?
          filterTodos().map( (item) => 
            <TodoItem key={item.id} data={item}/>
          ) :
          <Text style={styles.empty}>Задач нет</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    marginTop: 15,
    marginBottom: 25,
    fontSize: 18,
    fontWeight: 'bold'
  },
});

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    filterValue: state.todos.filterValue
  }
}

export default connect(mapStateToProps, null)(TodoList)