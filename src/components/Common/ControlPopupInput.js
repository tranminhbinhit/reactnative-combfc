import React from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import ControlPopup from './ControlPopup';
import ControlInput from './ControlInput';
import ControlButton from './ControlButton';
import * as colors from '../../constants/colors';
import stylesGlobal from '../../constants/styles';

class ControlPopupInput extends React.Component {
  state = {
    isShowPopup: false,
    value: '',
  };

  componentDidMount() {
    const {valueEdit} = this.props;
    this.setState({value: valueEdit});
  }

  componentDidUpdate(prevProps) {
    const {valueEdit} = this.props;
    if (valueEdit !== prevProps.valueEdit) {
      this.setState({value: valueEdit});
      console.log('valueEdit', valueEdit);
    }
  }

  showPopup = isShowPopup => {
    this.setState({
      isShowPopup,
    });
  };

  onSaveData = () => {
    const {onChange, isRequired} = this.props;
    const {value} = this.state;
    if (isRequired && value.length === 0) {
      Alert.alert('Thông báo', 'Yêu cầu nhập thông tin');
      return;
    } else {
      onChange(value);
      this.showPopup(false);
    }
  };

  render() {
    const {
      title,
      children,
      style,
      placeholder,
      keyboardType = 'default',
    } = this.props;
    const {isShowPopup, value} = this.state;
    return (
      <View style={style}>
        <TouchableOpacity onPress={() => this.showPopup(true)}>
          {children}
        </TouchableOpacity>
        <ControlPopup
          title={title}
          visible={isShowPopup}
          onTouchOutside={() => this.showPopup(false)}
          height={185}>
          <View style={{flex: 1}}>
            <ControlInput
              style={{marginTop: 10, margin: 0}}
              defaultValue={value}
              placeholder={placeholder}
              refProp={input => (this.valueInput = input)}
              onChangeText={text => {
                this.setState({value: text});
              }}
              keyboardType={keyboardType}
            />
          </View>
          <View style={stylesGlobal.buttonBottomView}>
            <TouchableOpacity onPress={() => this.onSaveData()}>
              <ControlButton type="info" style={stylesGlobal.buttonBottom}>
                Cập nhật
              </ControlButton>
            </TouchableOpacity>
          </View>
        </ControlPopup>
      </View>
    );
  }
}

export default ControlPopupInput;
