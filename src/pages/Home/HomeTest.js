import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import * as colors from '../../constants/colors';
import {pingLocationUser, getMetaData} from '../../setting/action';
import {withAuthen} from '../../components/HOC/WithAuthen';
import ControlImageBackground from '../../components/Common/ControlImageBackground';
import ControlButton from '../../components/Common/ControlButton';

class Home extends React.Component {
  componentDidMount() {}

  onGetPosition = () => {
    const {pingLocationUserConnect} = this.props;
    pingLocationUserConnect();
  };

  goToTab = tabName => {
    const {navigate} = this.props.navigation;
    navigate(tabName);
  };

  render() {
    const {setting} = this.props;
    const {metadata, lastLocation} = setting;
    const {MqttHost} = metadata;
    return (
      <ControlImageBackground
        backgroundUrl={require('../../assets/auth_background.jpg')}>
        <Text>Chào mừng bạn đến với cổng thông tin Enow</Text>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <ControlButton size={5} style={{width: 100}}>Test data</ControlButton>

          <TouchableOpacity
            onPress={() => {
              this.goToTab('InputData');
            }}>
            <Text
              style={{
                backgroundColor: colors.facebook,
                borderRadius: 5,
                padding: 10,
                width: 150,
                marginBottom: 5,
                marginTop: 15,
                textAlign: 'center',
                color: colors.white,
              }}>
              Test Input
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              this.goToTab('CameraDevice');
            }}>
            <Text
              style={{
                backgroundColor: colors.pink,
                borderRadius: 5,
                padding: 10,
                width: 150,
                marginBottom: 5,
                marginTop: 15,
                textAlign: 'center',
                color: colors.white,
              }}>
              Chụp từ máy ảnh
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.goToTab('TestLocation');
          }}>
          <Text
            style={{
              backgroundColor: colors.pink,
              borderRadius: 5,
              padding: 10,
              width: 200,
              marginBottom: 5,
              marginTop: 15,
              textAlign: 'center',
              color: colors.white,
            }}>
            Kiểm tra nền location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: colors.facebook,
            borderRadius: 5,
            padding: 10,
            width: 200,
            marginTop: 15,
          }}
          onPress={() => {
            this.onGetPosition();
          }}>
          <Text style={{color: colors.white}}>Chạy ghi nhận location</Text>
        </TouchableOpacity>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              this.goToTab('TestControl');
            }}>
            <Text
              style={{
                backgroundColor: colors.danger,
                borderRadius: 5,
                padding: 10,
                width: 150,
                marginBottom: 5,
                marginTop: 15,
                textAlign: 'center',
                color: colors.white,
              }}>
              Unit Test
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: colors.black}}>{MqttHost}</Text>
        <Text style={{color: colors.black}}>
          Ghi nhận location lúc: {lastLocation.CreatedDateTime}
        </Text>
        <Text style={{color: colors.black}}>
          Khoảng cách cuối cùng: {lastLocation.Distance}
        </Text>
        <Text style={{color: colors.black}}>
          Cập nhật dữ liệu lên server lúc: {lastLocation.CreatedDateTimeDone}
        </Text>
        <Text style={{color: colors.black}}>Tốc độ: {lastLocation.Speed}</Text>
      </ControlImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  setting: state.setting,
});

const mapDispatchToProps = dispatch => ({
  pingLocationUserConnect: () => {
    dispatch(pingLocationUser());
  },
  getMetaDataConnect: () => {
    dispatch(getMetaData());
  },
});

export default withAuthen(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home),
);
