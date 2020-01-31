import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Main from './src/components/Main';
import Header from './src/components/Header';
import reducers from './src/reducers';

class App extends Component {
  render() {
    const store = createStore(reducers, {});
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <Header />
          <Main />
        </View>
      </Provider>
    );
  }
}

export default App;
