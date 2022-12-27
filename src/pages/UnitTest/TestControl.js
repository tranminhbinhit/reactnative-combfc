import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {TabView, SceneMap} from 'react-native-tab-view';

import * as colors from '../../constants/colors';
import {withAuthen} from '../../components/HOC/WithAuthen';
import ControlInput from '../../components/Common/ControlInput';
import ControlDropdownSelect from '../../components/Common/ControlDropdownSelect';
import ControlDatePicker from '../../components/Common/ControlDatePicker';
import ControlUploadImage from '../../components/Common/ControlUploadImage';
import ControlButton from '../../components/Common/ControlButton';
import FormControlWrapper from '../../components/Common/FormControlWrapper';
import ControlPopupInput from '../../components/Common/ControlPopupInput';
import ViewWrapper from '../../components/Common/ViewWrapper';
import ControlCheckLocation from '../../components/Common/ControlCheckLocation';
import ControlPopupMap from '../../components/Common/ControlPopupMap';
import ControlDateRange from '../../components/Common/ControlDateRange';
import ControlPopupModal from '../../components/Common/ControlPopupModal';
import CountdownCircle from 'react-native-countdown-circle';
import ControlSwipeVerify from '../../components/Common/ControlSwipeVerify';
import ControlInputMask from '../../components/Common/ControlInputMask';

import {getDate} from '../../utils/utils';

class TestControl extends React.Component {
  state = {
    // Map
    regionMap: {
      lat: 10.823099,
      lng: 106.629662,
      address: '244 Cống quỳnh',
    },

    //Date
    fromDate: getDate(-10),
    toDate: getDate(0),

    //Popup
    modalVisible: false,

    //Text
    title: 'test',
    content: '',
    email: '',
    yearOfBird: '',
    price: 0,

    //Dropdown
    ListUser: [
      {label: 'Một', value: '1'},
      {label: 'Hai', value: '2'},
      {label: 'Ba', value: '3'},
    ],
    user: {},

    images: [],
    countDownTime: 10,
    ListTypeCustomer: [
      {label: 'Gặp K.hàng', value: 0},
      {label: 'Gặp N.Thân', value: 1},
      {label: 'K.Gap ai', value: 1},
    ],
    isUnlocked: false,
    //Tab view
    index: 0,
    routes: [{key: 'first', title: 'Tab đầu'}, {key: 'second', title: 'Tab 2'}],
  };

  componentDidMount() {}

  goToTab = tabName => {
    const {navigate} = this.props.navigation;
    navigate(tabName);
  };

  //Control button
  onClickDanger = () => {
    Alert.alert(
      'Thông báo',
      'Bạn vui lòng chọn 1 trong các thông báo',
      [
        {
          text: 'Hỏi lại tôi',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  onClickInfo = () => {
    Alert.alert('Thông báo', 'Bạn vui lòng chọn 1 trong các thông báo');
  };
  //End Control button

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  //Tab
  tabFirstView = () => (
    <View style={{backgroundColor: '#ff4081', flex: 1, padding: 20}}>
      <Text>Tab 1</Text>
    </View>
  );

  tabSecondView = () => (
    <View style={{backgroundColor: '#673ab7', flex: 1, padding: 20}}>
      <Text>Tab 2</Text>
    </View>
  );

  render() {
    let {
      title,
      email,
      price,
      content,
      yearOfBird,
      ListUser,
      user,
      fromDate,
      toDate,
      images,
      modalVisible,
      regionMap,
      countDownTime,
      ListTypeCustomer,
      isUnlocked,

      index,
      routes,
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{padding: 10}}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.danger,
                  fontWeight: 'bold',
                }}>
                Bộ control demo khi vào dự án
              </Text>
            </View>
            <FormControlWrapper
              title="Tab view"
              isRequired={true}
              style={{marginTop: 20}}>
              <TabView
                navigationState={{index, routes}}
                onIndexChange={index => this.setState({index})}
                renderScene={SceneMap({
                  first: this.tabFirstView,
                  second: this.tabSecondView,
                })}
              />
            </FormControlWrapper>
            <FormControlWrapper
              title="Slide Button"
              isRequired={true}
              style={{marginTop: 20}}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <ControlSwipeVerify
                  isUnlocked={isUnlocked}
                  onVerified={() => {
                    this.setState({isUnlocked: true});
                  }}
                />
              </View>
            </FormControlWrapper>
            <FormControlWrapper
              title="Radio button"
              isRequired={true}
              style={{marginTop: 20}}>
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
            </FormControlWrapper>
            <FormControlWrapper
              title="Count down time"
              isRequired={true}
              style={{marginTop: 20}}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() => this.setState({countDownTime: 10})}
                  style={{margin: 5, justifyContent: 'center'}}>
                  <ControlButton type="info" style={{width: 120}}>
                    Reload
                  </ControlButton>
                </TouchableOpacity>
                <CountdownCircle
                  seconds={countDownTime}
                  radius={30}
                  borderWidth={4}
                  color={colors.pink}
                  bgColor={colors.white}
                  textStyle={{fontSize: 18}}
                  shadowColor={colors.ddd}
                  updateText={(elapsedSecs, totalSecs) =>
                    (totalSecs - elapsedSecs).toString()
                  }
                  onTimeElapsed={() => console.log('Elapsed!')}
                />
              </View>
            </FormControlWrapper>
            <FormControlWrapper
              title="Map control"
              isRequired={true}
              style={{marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                <ControlPopupMap
                  title={'Địa chỉ của gì đó'}
                  style={{margin: 10, flex: 1}}
                  region={regionMap}>
                  <ControlButton type="info">Xem vị trí</ControlButton>
                </ControlPopupMap>

                <ControlCheckLocation
                  style={{margin: 10, flex: 1}}
                  region={regionMap}
                  onChange={value => this.setState({regionMap: value})}>
                  <ControlButton type="info">Lấy địa chỉ</ControlButton>
                </ControlCheckLocation>
              </View>
            </FormControlWrapper>
            <FormControlWrapper
              title="Time control"
              isRequired={true}
              style={{marginTop: 20}}>
              <View style={{flexDirection: 'column'}}>
                <ControlDateRange
                  style={{margin: 10}}
                  minDate={getDate(-365)}
                  maxDate={getDate(0)}
                  fromDate={fromDate}
                  toDate={toDate}
                  styleTime={{
                    margin: 0,
                    backgroundColor: colors.darkgrey,
                    color: colors.white,
                  }}
                  onChange={value =>
                    this.setState({
                      fromDate: value.fromDate,
                      toDate: value.toDate,
                    })
                  }
                />

                <ControlDatePicker
                  style={{margin: 10}}
                  date={fromDate}
                  mode="date"
                  format="YYYY-MM-DD"
                  minDate={getDate(-30)}
                  maxDate={getDate(0)}
                  onDateChange={date => {
                    this.setState({fromDate: date});
                  }}
                />

                {/* <ControlRangeDatePicker
                  style={{margin: 10}}
                  formatDate="YYYY-MM-DD"
                  maxDate={getDate(0)}
                  minDate={getDate(-30)}
                  modeDate="date"
                  fromDate={fromDate}
                  onDateChangeFrom={date => {
                    this.setState({fromDate: date});
                  }}
                  toDate={toDate}
                  onDateChangeTo={date => {
                    this.setState({toDate: date});
                  }}
                /> */}
              </View>
            </FormControlWrapper>
            <FormControlWrapper title="Control button" style={{marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{flex: 1, margin: 5}}
                  onPress={() => this.onClickInfo()}>
                  <ControlButton type="success">Lưu</ControlButton>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{flex: 1, margin: 5}}
                  onPress={() => this.onClickDanger()}>
                  <ControlButton type="danger">Xóa</ControlButton>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.onClickInfo()}
                  style={{flex: 1, margin: 5}}>
                  <ControlButton type="info">Thông báo</ControlButton>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    ToastAndroid.show(
                      'A pikachu appeared nearby !',
                      ToastAndroid.SHORT,
                    );
                  }}
                  style={{flex: 1, margin: 5}}>
                  <ControlButton type="info">Toast</ControlButton>
                </TouchableOpacity>
              </View>
            </FormControlWrapper>

            <FormControlWrapper
              title="Control text"
              isRequired={true}
              style={{marginTop: 20}}>
              <View style={{flexDirection: 'column'}}>
                <FormControlWrapper title="CMND" isRequired={true}>
                  <ControlInputMask
                    placeholder="Nhập chứng minh nhân dân"
                    refProp={input => (this.priceInput = input)}
                    keyboardType={'numeric'}
                    onChange={value => {
                      this.setState({price: value});
                    }}
                  />
                  <Text>{price}</Text>
                </FormControlWrapper>
                <FormControlWrapper title="Tiêu đề" isRequired={true}>
                  <ControlInput
                    placeholder="Tiêu đề"
                    defaultValue={title}
                    refProp={input => (this.titleInput = input)}
                    onSubmitEditing={() => this.contentInput.focus()}
                    onChange={event => {
                      this.setState({title: event.nativeEvent.text});
                    }}
                  />
                </FormControlWrapper>
                <FormControlWrapper title="Nội dung" isRequired={false}>
                  <ControlInput
                    placeholder="Nội dung"
                    defaultValue={content}
                    style={{height: 100}}
                    refProp={input => (this.contentInput = input)}
                    onSubmitEditing={() => this.emailInput.focus()}
                    onChange={event => {
                      this.setState({content: event.nativeEvent.text});
                    }}
                  />
                </FormControlWrapper>
                <FormControlWrapper
                  title="Thông tin cá nhân"
                  isRequired={false}>
                  <View style={{flexDirection: 'row'}}>
                    <ControlInput
                      style={{flex: 1, marginRight: 5}}
                      placeholder="Email"
                      defaultValue={email}
                      returnKeyType="go"
                      refProp={input => (this.emailInput = input)}
                      onSubmitEditing={() => this.yearOfBirdInput.focus()}
                      onChange={event => {
                        this.setState({email: event.nativeEvent.text});
                      }}
                      keyboardType={'email-address'}
                    />
                    <ControlInput
                      style={{flex: 1, marginLeft: 5}}
                      placeholder="Năm sinh"
                      defaultValue={yearOfBird}
                      returnKeyType="go"
                      refProp={input => (this.yearOfBirdInput = input)}
                      onChange={event => {
                        this.setState({yearOfBird: event.nativeEvent.text});
                      }}
                      keyboardType={'numeric'}
                    />
                  </View>
                </FormControlWrapper>
              </View>
            </FormControlWrapper>
            <FormControlWrapper
              title="Control Dropdown show"
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
            <FormControlWrapper title="Control modal" style={{marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                {/* Modal Full */}
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                  }}>
                  <View style={{flex: 1}}>
                    <ViewWrapper style={{marginBottom: 100}}>
                      <View
                        style={{
                          padding: 12,
                          borderBottomWidth: 1,
                          borderBottomColor: colors.ddd,
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
                            this.setModalVisible(false);
                          }}>
                          <Image
                            style={{width: 25, height: 25}}
                            source={require('../../assets/close-icon.png')}
                          />
                        </TouchableOpacity>
                        <Text style={{fontSize: 18, textAlign: 'center'}}>
                          Chọn ngày
                        </Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text>Nội dung</Text>
                      </View>
                    </ViewWrapper>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: colors.white,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.setModalVisible(false)}>
                        <ControlButton
                          type="success"
                          style={{
                            margin: 10,
                            padding: 15,
                            borderRadius: 5,
                            marginBottom: 20,
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Chọn ngày
                        </ControlButton>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                <TouchableOpacity
                  onPress={() => this.setModalVisible(true)}
                  style={{flex: 1, margin: 10}}>
                  <ControlButton type="success">Modal</ControlButton>
                </TouchableOpacity>
                {/* Modal Full */}

                <ControlPopupModal
                  style={{margin: 10}}
                  title="Test data"
                  renderButton={
                    <ControlButton type="success">Modal popup</ControlButton>
                  }>
                  <Text>Nội dung</Text>
                </ControlPopupModal>

                <ControlPopupInput
                  style={{flex: 1, margin: 10}}
                  title={'Cập nhật địa điểm'}
                  placeholder="Nhập địa chỉ giao hàng"
                  valueEdit={title}
                  isRequired={true}
                  onChange={value =>
                    this.setState(prevState => ({
                      OrderAddress: value,
                    }))
                  }>
                  <ControlButton type="success">Chỉnh sửa</ControlButton>
                </ControlPopupInput>
              </View>
            </FormControlWrapper>
            <FormControlWrapper title="Control Image" style={{marginTop: 20}}>
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
            <FormControlWrapper title="Entry Task" style={{marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.goToTab('EntryTask');
                  }}>
                  <ControlButton size={5} style={{margin: 5}}>
                    Entry Task
                  </ControlButton>
                </TouchableOpacity>
              </View>
            </FormControlWrapper>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestControl);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInput: {
    marginTop: 5,
    backgroundColor: colors.white,
    padding: 10,
  },
});
