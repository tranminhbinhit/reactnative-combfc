import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {loginUser} from './action';
import {setGeneralError} from '../../setting/action';
import * as colors from '../../constants/colors';

import ControlImageBackground from '../../components/Common/ControlImageBackground';
import LoadingOverlay from '../../components/Loading/LoadingOverLay';
import ControlInput from '../../components/Common/ControlInput';
import ControlButton from '../../components/Common/ControlButton';

class Login extends React.Component {
  state = {
    username: 'demo',
    password: '123456',
  };

  componentDidUpdate(prevProps) {
    const {auth} = this.props;
    const {isLoginSuccess} = auth;
    const {navigate} = this.props.navigation;
    if (isLoginSuccess) {
      navigate('Home');
    }
  }
  onSubmit = () => {
    const {username, password} = this.state;
    if (username === '') {
      setGeneralError('Vui lòng nhập tài khoản');
      this.usernameInput.focus();
    } else if (password === '') {
      setGeneralError('Vui lòng nhập mật khẩu');
      this.passwordInput.focus();
    } else {
      this.userLogin(username, password);
    }
  };

  userLogin = (username, password) => {
    const {loginUserConnect} = this.props;
    const reqData = {
      UserName: username,
      Password: password,
    };
    loginUserConnect(reqData);
  };

  render() {
    const {auth} = this.props;
    const {isLoginPending} = auth;
    return (
      <ControlImageBackground
        backgroundUrl={require('../../assets/auth_background.jpg')}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
            <LoadingOverlay isVisible={isLoginPending} />
            <View style={styles.tileContainer}>
              <Text style={styles.title}>ĐĂNG NHẬP COM-B</Text>
              <Image
                style={styles.divider}
                source={require('../../assets/logo.png')}
              />
            </View>
            <View style={styles.formContainer}>
              <ControlInput
                placeholder="Tài khoản"
                value={this.state.username}
                returnKeyType="next"
                onChangeText={text => this.setState({username: text})}
                refProp={input => (this.usernameInput = input)}
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType={'default'}
              />
              <ControlInput
                placeholder="Mật khẩu"
                secureTextEntry
                value={this.state.password}
                returnKeyType="go"
                onChangeText={text => this.setState({password: text})}
                refProp={input => (this.passwordInput = input)}
                onSubmitEditing={this.onSubmit}
                keyboardType={'default'}
              />
              <TouchableOpacity onPress={this.onSubmit}>
                <ControlButton size={3} style={styles.buttonLogin}>
                  Đăng nhập
                </ControlButton>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ControlImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    loginUserConnect: reqModel => dispatch(loginUser(reqModel)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  tileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    margin: 10,
    width: 150,
    height: 50,
  },
  title: {
    color: colors.black,
    width: 160,
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.8,
  },
  formContainer: {
    padding: 20,
  },
  buttonLogin: {
    backgroundColor: colors.green,
    borderRadius: 20,
    fontWeight: 'bold',
    margin: 0,
  },
});
