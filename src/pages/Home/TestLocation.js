import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import ControlImageBackground from '../../components/Common/ControlImageBackground';
import {
  startServicePosition,
  stopServicePosition,
} from '../../utils/utilsLocation';
import * as colors from '../../constants/colors';

class TestLocation extends React.Component {
  componentDidMount() {}

  onStartService = () => {
    startServicePosition();
  };

  onStopService = () => {
    stopServicePosition();
  };

  render() {
    return (
      <ControlImageBackground
        backgroundUrl={require('../../assets/auth_background.jpg')}>
        <Text>Chào mừng bạn đến với cổng thông tin Enow</Text>

        <TouchableOpacity
          onPress={() => {
            this.onStartService();
          }}>
          <Text
            style={{
              backgroundColor: colors.pink,
              borderRadius: 5,
              padding: 10,
              width: 120,
              marginBottom: 5,
            }}>
            Run location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.onStopService();
          }}>
          <Text
            style={{
              backgroundColor: colors.pink,
              borderRadius: 5,
              padding: 10,
              width: 120,
              marginBottom: 5,
            }}>
            Stop service
          </Text>
        </TouchableOpacity>
      </ControlImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  isReady: state.setting.isReady,
  setting: state.setting,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestLocation);
