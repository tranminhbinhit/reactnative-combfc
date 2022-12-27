import React from 'react';
import {View, TouchableOpacity, Alert, Modal, Image, Text} from 'react-native';
import * as colors from '../../constants/colors';
import ViewWrapper from '../../components/Common/ViewWrapper';

class ControlPopupModal extends React.Component {
  state = {
    isShowPopup: false,
    value: '',
  };

  componentDidMount() {}

  showPopup = isShowPopup => {
    this.setState({
      isShowPopup,
    });
  };

  render() {
    const {title, children, style, renderButton} = this.props;
    const {isShowPopup, value} = this.state;
    return (
      <View style={[style, {flex: 1}]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isShowPopup}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={() => {
                this.showPopup(false);
              }}>
              <View
                style={{height: 100, backgroundColor: colors.white}}
                opacity={0.8}
              />
            </TouchableOpacity>

            <View style={{flex: 1, backgroundColor: colors.white}}>
              <ViewWrapper style={{marginBottom: 100}}>
                <View
                  style={{
                    padding: 12,
                    borderColor: colors.ddd,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: 5,
                      marginLeft: 10,
                      margin: 10,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 35,
                      height: 35,
                      zIndex: 2,
                    }}
                    onPress={() => {
                      this.showPopup(false);
                    }}>
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../../assets/close-icon.png')}
                    />
                  </TouchableOpacity>
                  <Text style={{fontSize: 18, textAlign: 'center'}}>
                    {title}
                  </Text>
                </View>
                <View style={{flex: 1}}>{children}</View>
              </ViewWrapper>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => this.showPopup(true)}>
          {renderButton}
        </TouchableOpacity>
      </View>
    );
  }
}

export default ControlPopupModal;
