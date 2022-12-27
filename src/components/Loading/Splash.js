import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import * as colors from '../../constants/colors';

import ControlImageBackground from '../Common/ControlImageBackground';

import DeviceInfo from 'react-native-device-info';

export default class Splash extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadingText: 'Đang tải...',
    };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.loadingProgress();
    }, 500);
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  loadingProgress = () => {
    if (this.mySplash) {
      switch (this.state.loadingText) {
        case 'Đang tải.':
          this.setState({loadingText: 'Đang tải..'});
          break;
        case 'Đang tải..':
          this.setState({loadingText: 'Đang tải...'});
          break;
        case 'Đang tải...':
          this.setState({loadingText: 'Đang tải.'});
          break;
      }
    } else {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  };
  render() {
    return (
      <ControlImageBackground
        backgroundUrl={require('../../assets/splash.png')}>
        <StatusBar backgroundColor={colors.pink} />
        <View style={styles.container} ref={splash => (this.mySplash = splash)}>
          <View style={styles.leftContainer}>
            <Text
              style={
                styles.text
              }>{`Version : ${DeviceInfo.getVersion()}`}</Text>
          </View>
          <View style={styles.centerContainer}>
            <View style={styles.indicatorContainer}>
              <ActivityIndicator size="small" color={colors.white} />
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.text}>{this.state.loadingText}</Text>
          </View>
        </View>
      </ControlImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    //justifyContent: 'flex-start',
    justifyContent: 'flex-end',
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    paddingTop: 200,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10,
  },
  text: {
    color: '#fff',
  },
});
