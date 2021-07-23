/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import 'react-native-gesture-handler';
 import React from 'react';
 import { createStore } from 'redux'
 import { Provider } from 'react-redux'
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { persistStore, persistReducer } from 'redux-persist'
 import rootReducer from './src/reducers'
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import Main from './src/screens/Main.js';
 import Task from './src/screens/Task.js';

const Stack = createStackNavigator();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Main} options={{title: 'Главная'}}/>
          <Stack.Screen name="Task" component={Task} options={{title: 'Задача'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App

