import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from 'react-native';

import {initializeApp} from '../../setting/action';
import {EnumPermission} from '../../constants/enum';
import {getPermission, renderIf} from '../../utils/utils';
import * as colors from '../../constants/colors';
import {pingLocationUser} from '../../setting/action';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

class Location extends React.Component {
  state = {
    UserMessage: '',
    IsShowRefesh: false,
  };
  animatedValue = new Animated.Value(0);
  fadeAnimation = new Animated.Value(0);

  componentDidMount() {
    this.initAnimated();
    this.initProcesss();
  }

  initProcesss = () => {
    this.initApp().then(() => {
      const {isReady, isLoginSuccess, pingLocationUserConnect} = this.props;
      this.setState({IsShowRefesh: false, UserMessage: ''});

      getPermission(EnumPermission.ACCESS_FINE_LOCATION.id).then(result => {
        if (isReady && result === true) {
          setTimeout(() => {
            if (isLoginSuccess) {
              this.goToTab('Home');
              pingLocationUserConnect();
            } else {
              this.goToTab('Login');
            }
          }, 1000);
        } else {
          this.setState({
            IsShowRefesh: true,
            UserMessage: 'Ứng dụng chưa được cấp quyền',
          });
        }
      });
    });
  };

  initApp = () => {
    const {initializeAppConnect} = this.props;
    return new Promise(resolve => {
      initializeAppConnect();
      resolve(true);
    });
  };

  goToTab = tabName => {
    const {navigate} = this.props.navigation;
    navigate(tabName);
  };

  initAnimated = () => {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 40,
      duration: 400,
      easing: Easing.linear,
    }).start(() => this.initAnimated());

    Animated.timing(this.fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {UserMessage, IsShowRefesh} = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            position: 'relative',
            height: 60,
            width: 40,
            zIndex: 2,
          }}>
          <Animated.View
            style={{
              marginTop: this.animatedValue,
              position: 'absolute',
            }}>
            <Image
              source={require('../../assets/ping_location.png')}
              style={{
                width: 40,
                height: 70,
              }}
            />
          </Animated.View>
        </View>
        <Image
          source={require('../../assets/road-map.png')}
          style={{width: 200, height: 110, zIndex: 1}}
        />
        <View style={{height: 50, padding: 10, flexDirection: 'column'}}>
          <Animated.Text
            style={{textAlign: 'center', opacity: this.fadeAnimation}}>
            {UserMessage}
          </Animated.Text>
          {renderIf(
            IsShowRefesh,
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                this.initProcesss();
              }}>
              <Text
                style={{
                  backgroundColor: colors.green,
                  borderRadius: 5,
                  padding: 5,
                  width: 80,
                  textAlign: 'center',
                  color: colors.white,
                }}>
                Thử lại
              </Text>
            </TouchableOpacity>,
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isReady: state.setting.isReady,
  isLoginSuccess: state.auth.isLoginSuccess,
});

const mapDispatchToProps = dispatch => ({
  initializeAppConnect: () => {
    dispatch(initializeApp());
  },
  pingLocationUserConnect: () => {
    dispatch(pingLocationUser());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Location);
