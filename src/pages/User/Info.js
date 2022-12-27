import React from 'react';
import {connect} from 'react-redux';
import {Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {LoginManager} from 'react-native-fbsdk';
// import {GoogleSignin} from 'react-native-google-signin';

import styles from './styles';
import {resetAuthentication} from '../../authentication/action';
import {withAuthen} from '../../components/HOC/WithAuthen';

const navigationOptions = ({navigation}) => {
  const {params = {}} = navigation.state;
  return {
    title: 'Tài khoản',
    headerRight: (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Text>Test right</Text>
        </TouchableOpacity>
      </View>
    ),
  };
};

class Info extends React.Component {
  componentDidMount() {
    const {isLoginSuccess} = this.props;
    this.props.navigation.setParams({
      isLoginSuccess: isLoginSuccess,
    });
  }

  logout = () => {
    const {onLogout} = this.props;
    // if (this.props.loginType == 1) {
    //   LoginManager.logOut();
    // } else if (this.props.loginType == 2) {
    //   GoogleSignin.signOut();
    // }
    onLogout();
  };

  componentDidUpdate(prevProps) {
    const {isLoginSuccess} = this.props;
    if (prevProps.isLoginSuccess !== isLoginSuccess) {
      this.props.navigation.setParams({
        isLoginSuccess: isLoginSuccess,
      });
      if (!isLoginSuccess) {
        this.props.navigation.goBack();
      }
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const {isLoginSuccess, user} = this.props;
    return (
      <View style={styles.container}>
        {!isLoginSuccess ? (
          <TouchableOpacity
            style={styles.accountContainer}
            onPress={() => {
              navigate('Login');
            }}>
            <View>
              <Image
                style={{width: 26, height: 26, marginRight: 10}}
                source={require('../../assets/user.png')}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text style={styles.userName}>Đăng nhập</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.accountContainer}
            onPress={() => {
              navigate('Account');
            }}>
            <View>
              <Image
                style={{
                  width: 26,
                  height: 26,
                  marginRight: 10,
                  borderRadius: 13,
                }}
                source={{uri: user.Avatar}}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text style={styles.userName}>{user.UserFullName}</Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.infoContainer}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              navigate('SheisInfo');
            }}>
            <Image
              style={styles.infoIcon}
              source={require('../../assets/about.png')}
            />
            <Text style={styles.infoText}>Thông tin Enow</Text>
            <Icon
              theme={{iconFamily: 'FontAwesome'}}
              name="angle-right"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              Linking.openURL('http://www.enow.vn/');
            }}>
            <Image
              style={styles.infoIcon}
              source={require('../../assets/policy.png')}
            />
            <Text style={styles.infoText}>Sắp tết rồi</Text>
            <Icon
              theme={{iconFamily: 'FontAwesome'}}
              name="angle-right"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.itemContainer, styles.itemNoBorder]}
            onPress={() => {
              navigate('Feedback');
            }}>
            <Image
              style={styles.infoIcon}
              source={require('../../assets/feedback.png')}
            />
            <Text style={styles.infoText}>Góp ý</Text>
            <Icon
              theme={{iconFamily: 'FontAwesome'}}
              name="angle-right"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.versionContainer}>
          {this.props.isLoginSuccess ? (
            <TouchableOpacity
              style={[styles.itemContainer, {marginLeft: 0, paddingLeft: 10}]}
              onPress={() => {
                this.logout();
              }}>
              <Image
                style={styles.infoIcon}
                source={require('../../assets/icon_logout.png')}
              />
              <Text style={styles.infoText}>Đăng xuất</Text>
              <Icon
                theme={{iconFamily: 'FontAwesome'}}
                name="angle-right"
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : null}
          <Text style={styles.versionText}>
            Phiên bản : {DeviceInfo.getVersion()}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoginSuccess: state.auth.isLoginSuccess,
    user: state.auth.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(resetAuthentication());
    },
  };
};

export default withAuthen(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Info),
  navigationOptions,
);
