import * as React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import TodoFilter from './TodoFilter.js';
import TodoItem from './TodoItem.js';
import stylesComponent from '../styles/TodoList.js';

function TodoList() {
  const todos = useSelector(state => state.todos.todos);
  const filterValue = useSelector(state => state.todos.filterValue);

  /**
   * Получить список задач с учётом фильтра
   * @returns {jsx}
   */
  const GetTodos = () => {
    const resultItems = (
      filterValue > 0
        ? todos.filter(item => item.importance === filterValue)
        : todos
    ).map(item => <TodoItem key={item.id} data={item} />);
    return resultItems.length ? (
      resultItems
    ) : (
      <Text style={styles.empty}>Задач нет</Text>
    );
  };

  return (
    <View>
      <TodoFilter />
      <View>{GetTodos()}</View>
    </View>
  );
}

const styles = StyleSheet.create(stylesComponent);

export default TodoList;
