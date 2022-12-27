import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import * as colors from '../../constants/colors';
import {pingLocationUser, getMetaData} from '../../setting/action';
import {withAuthen} from '../../components/HOC/WithAuthen';
import {renderIf} from '../../utils/utils';
import ControlButton from '../../components/Common/ControlButton';
import ViewWrapper from '../../components/Common/ViewWrapper';
import ControlInput from '../../components/Common/ControlInput';
import ControlDropdownSelect from '../../components/Common/ControlDropdownSelect';
import ControlUploadImage from '../../components/Common/ControlUploadImage';
import FormControlWrapper from '../../components/Common/FormControlWrapper';
import ControlDatePicker from '../../components/Common/ControlDatePicker';
import stylesGlobal from '../../constants/styles';
import {getDate} from '../../utils/utils';

const navigationOptions = ({navigation}) => {
  const {params = {}} = navigation.state;
  return {
    title: 'RR79000993',
  };
};

class FCInfo extends React.Component {
  state = {
    isLoading: false,
    images: [],
    //Dropdown
    ListUser: [
      {label: 'Một', value: '1'},
      {label: 'Hai', value: '2'},
      {label: 'Ba', value: '3'},
    ],
    ListTypeCustomer: [
      {label: 'Gặp K.hàng', value: 0},
      {label: 'Gặp N.Thân', value: 1},
      {label: 'K.Gap ai', value: 1},
    ],
    user: {},
    note: '',
    selectedOption: {},
    isShowPhone: false,
    isShowAddress: false,
    fromDate: getDate(-10),
  };

  componentDidMount() {}

  goToTab = tabName => {
    const {navigate} = this.props.navigation;
    navigate(tabName);
  };

  render() {
    const {
      images,
      ListUser,
      user,
      note,
      ListTypeCustomer,
      isShowPhone,
      isShowAddress,
      fromDate,
    } = this.state;
    return (
      <View style={styles.container}>
        <ViewWrapper style={{flexDirection: 'column'}}>
          <View style={{margin: 10}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                margin: 10,
              }}>
              <RadioForm
                radio_props={ListTypeCustomer}
                initial={0}
                style={{flexDirection: 'row'}}
                labelStyle={{
                  fontSize: 16,
                  padding: 5,
                  width: 100,
                  textAlign: 'center',
                }}
                formHorizontal={false}
                labelHorizontal={false}
                buttonColor={'#2196f3'}
                animation={true}
                onPress={value => {
                  this.setState({value: value});
                }}
              />
            </View>
            <FormControlWrapper
              title="Chụp hình"
              isRequired={true}
              style={{marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                <ControlUploadImage
                  images={images}
                  onChangeData={listImage => {
                    this.setState({images: listImage});
                  }}
                  maxImage={3}
                  isShowAddMax={false}
                />
              </View>
            </FormControlWrapper>
            <FormControlWrapper
              title="Kết quả"
              isRequired={true}
              style={{marginTop: 20}}>
              <ControlDropdownSelect
                style={{flex: 1}}
                options={ListUser}
                title="Khách hàng"
                data={user}
                onSelect={data => {
                  this.setState({user: data});
                }}
              />
            </FormControlWrapper>
            <FormControlWrapper
              title="Số tiền đóng cho FC"
              isRequired={true}
              style={{marginTop: 20}}>
              <ControlInput
                style={{flex: 1, marginLeft: 5}}
                placeholder="Số tiền"
                defaultValue={note}
                refProp={input => (this.noteInput = input)}
                onChange={event => {
                  this.setState({note: event.nativeEvent.text});
                }}
                keyboardType={'numeric'}
              />
            </FormControlWrapper>
            <FormControlWrapper
              title="Ngày đóng cho FC"
              isRequired={true}
              style={{marginTop: 20}}>
              <ControlDatePicker
                style={{margin: 0}}
                date={fromDate}
                mode="date"
                format="YYYY-MM-DD"
                minDate={getDate(-30)}
                maxDate={getDate(0)}
                onDateChange={date => {
                  this.setState({fromDate: date});
                }}
              />
            </FormControlWrapper>

            <FormControlWrapper
              title="Ghi chú"
              isRequired={true}
              style={{marginTop: 20}}>
              <ControlInput
                placeholder="Ghi chú"
                defaultValue={note}
                style={{height: 100}}
                refProp={input => (this.contentInput = input)}
                onSubmitEditing={() => this.emailInput.focus()}
                onChange={event => {
                  this.setState({note: event.nativeEvent.text});
                }}
              />
            </FormControlWrapper>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 10,
                borderWidth: 1,
                borderColor: colors.ddd,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() =>
                  this.setState(prevState => ({
                    isShowPhone: !prevState.isShowPhone,
                  }))
                }>
                <ControlButton
                  type="info"
                  size={5}
                  style={{
                    color: isShowPhone ? colors.white : colors.secondary,
                    borderRadius: 10,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}>
                  Thêm mới số điện thoại
                </ControlButton>
              </TouchableOpacity>
              {renderIf(
                isShowPhone,
                <View style={{padding: 10}}>
                  <FormControlWrapper
                    title="Loại"
                    isRequired={true}
                    style={{marginTop: 20}}>
                    <ControlDropdownSelect
                      style={{flex: 1}}
                      options={ListUser}
                      title="Khách hàng"
                      data={user}
                      onSelect={data => {
                        this.setState({user: data});
                      }}
                    />
                  </FormControlWrapper>
                  <FormControlWrapper
                    title="Tên chủ số điện thoại"
                    isRequired={true}>
                    <ControlInput
                      placeholder="Tên chủ số điện thoại"
                      defaultValue={note}
                      refProp={input => (this.titleInput = input)}
                      onSubmitEditing={() => this.contentInput.focus()}
                      onChangeText={text => this.setState({mote: text})}
                    />
                  </FormControlWrapper>
                  <FormControlWrapper title="Số điện thoại" isRequired={true}>
                    <ControlInput
                      placeholder="Tên chủ số điện thoại"
                      defaultValue={note}
                      refProp={input => (this.titleInput = input)}
                      onSubmitEditing={() => this.contentInput.focus()}
                      onChangeText={text => this.setState({mote: text})}
                    />
                  </FormControlWrapper>
                </View>,
              )}
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 10,
                borderWidth: 1,
                borderColor: colors.ddd,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() =>
                  this.setState(prevState => ({
                    isShowAddress: !prevState.isShowAddress,
                  }))
                }>
                <ControlButton
                  type="info"
                  size={5}
                  style={{
                    color: isShowAddress ? colors.white : colors.secondary,
                    borderRadius: 10,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}>
                  Thêm mới địa chỉ
                </ControlButton>
              </TouchableOpacity>
              {renderIf(
                isShowAddress,
                <View style={{padding: 10}}>
                  <FormControlWrapper
                    title="Loại"
                    isRequired={true}
                    style={{marginTop: 20}}>
                    <ControlDropdownSelect
                      style={{flex: 1}}
                      options={ListUser}
                      title="Khách hàng"
                      data={user}
                      onSelect={data => {
                        this.setState({user: data});
                      }}
                    />
                  </FormControlWrapper>
                  <FormControlWrapper title="Địa chỉ" isRequired={true}>
                    <ControlInput
                      placeholder="Tên chủ số điện thoại"
                      defaultValue={note}
                      refProp={input => (this.titleInput = input)}
                      onSubmitEditing={() => this.contentInput.focus()}
                      onChangeText={text => this.setState({mote: text})}
                    />
                  </FormControlWrapper>
                  <FormControlWrapper
                    title="Tỉnh/Thành Phố"
                    isRequired={true}
                    style={{marginTop: 20}}>
                    <ControlDropdownSelect
                      style={{flex: 1}}
                      options={ListUser}
                      title="Khách hàng"
                      data={user}
                      onSelect={data => {
                        this.setState({user: data});
                      }}
                    />
                  </FormControlWrapper>
                  <FormControlWrapper
                    title="Quận/Huyện"
                    isRequired={true}
                    style={{marginTop: 20}}>
                    <ControlDropdownSelect
                      style={{flex: 1}}
                      options={ListUser}
                      title="Khách hàng"
                      data={user}
                      onSelect={data => {
                        this.setState({user: data});
                      }}
                    />
                  </FormControlWrapper>
                  <FormControlWrapper
                    title="Phường/Xã/Thị trấn"
                    isRequired={true}
                    style={{marginTop: 20}}>
                    <ControlDropdownSelect
                      style={{flex: 1}}
                      options={ListUser}
                      title="Khách hàng"
                      data={user}
                      onSelect={data => {
                        this.setState({user: data});
                      }}
                    />
                  </FormControlWrapper>
                </View>,
              )}
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              paddingTop: 10,
              marginBottom: 20,
              borderTopWidth: 1,
              borderTopColor: colors.ddd,
            }}>
            <TouchableOpacity
              style={{flex: 1, margin: 10}}
              onPress={() =>
                this.setState(prevState => ({
                  isShowPhone: !prevState.isShowPhone,
                }))
              }>
              <ControlButton type="success" size={10}>
                Cập nhật
              </ControlButton>
            </TouchableOpacity>
          </View>
        </ViewWrapper>
      </View>
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
  )(FCInfo),
  navigationOptions,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
