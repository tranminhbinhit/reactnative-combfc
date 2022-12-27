import React from 'react';
import {Provider} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import {StatusBar, Platform, YellowBox} from 'react-native';

import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import Splash from './src/components/Loading/Splash';
import MyTabNavigator from './src/components/TabNavigator/MyTabNavigator';
import CONFIG from './src/config/config';

class App extends React.Component {
  componentDidMount() {
    this.ignoreWarnings();
    Geocoder.init(CONFIG.GOOGLE_KEY);
  }

  ignoreWarnings = () => {
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  };

  initApp = () => {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(false);
      //StatusBar.setBackgroundColor(colors.statusBackground, true);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Splash />}
          onBeforeLift={this.initApp}
          persistor={persistor}>
          <MyTabNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
