import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
// import {AsyncStorage} from 'react-native';

import firebase from 'react-native-firebase';

import * as colors from '../../constants/colors';
import {withAuthen} from '../../components/HOC/WithAuthen';
import ControlButton from '../../components/Common/ControlButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContentTop: {
    padding: 10,
    backgroundColor: colors.white,
  },
  viewInput: {
    marginTop: 5,
    backgroundColor: colors.white,
    padding: 10,
  },
});

class TestPushNotification extends React.Component {
  // https://viblo.asia/p/push-notification-voi-firebase-cloud-messaging-trong-react-native-4dbZNppq5YM
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  //Custom Functions

  //For basic config before listenning Noti

  //Step 1: check permission for Service
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log('enabled', enabled);
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  //Step 2: if not has permission -> process request
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('quyền bị từ chối');
    }
  }
  //Step 3: if has permission -> process get Token
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('token = 1', fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('token = ', fcmToken);
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //For Listenning Notification
  async createNotificationListeners() {
    //Tạo channel. quản lý và push theo chanel
    const channel = new firebase.notifications.Android.Channel(
      'merchant-restaurant',
      'Thông báo đơn hàng',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('Thông báo đơng hàng mới, thay đổi thông tin đơn hàng');
    console.log('my chanel id = ', channel);
    firebase.notifications().android.createChannel(channel);

    //Vietnamese explain: khi đang ở foreground => show alert khi có noti
    this.notificationListener = firebase
      .notifications()
      .onNotification(noti => {
        const {title, body} = noti;
        console.log(noti, 'All notification');
        Alert.alert(title, body);
        ToastAndroid.show(body, ToastAndroid.SHORT);
      });
  }

  goToTab = tabName => {
    const {navigate} = this.props.navigation;
    navigate(tabName);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.viewContentTop}>
            <Text>Bộ control demo khi vào dự án</Text>
          </View>
          <View style={styles.viewInput}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{flex: 1, margin: 5}}
                onPress={() => this.onClickInfo()}>
                <ControlButton type="success">Lưu</ControlButton>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  setting: state.setting,
});

const mapDispatchToProps = dispatch => ({});

export default withAuthen(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TestPushNotification),
);
