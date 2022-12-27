import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
  Alert,
  ToastAndroid,
  Modal,
} from 'react-native';

import * as colors from '../../constants/colors';
import {readImageUrl} from '../../utils/utils';
import ControlButton from '../../components/Common/ControlButton';
import ViewWrapper from '../../components/Common/ViewWrapper';
import FormControlWrapper from '../../components/Common/FormControlWrapper';
import ControlInput from '../../components/Common/ControlInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class EntryTask extends React.Component {
  state = {
    listData: [],
    dataDetail: {},
    modalVisible: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({
      listData: [
        {
          RestaurantId: 1,
          RestaurantName: 'Nhà hàng vườn cau',
          ImageUrl: 'sadf.jpg',
          RestaurantAddress: '192 hàm tử, nguyễn du',
          IsActive: true,
        },
        {
          RestaurantId: 2,
          RestaurantName: 'Nha hang huong viet',
          ImageUrl: 'sadf.jpg',
          RestaurantAddress: '244 co61ng quynh',
          IsActive: true,
        },
        {
          RestaurantId: 3,
          RestaurantName: 'Nha hang huong viet',
          ImageUrl: 'sadf.jpg',
          RestaurantAddress: '244 co61ng quynh',
          IsActive: true,
        },
        {
          RestaurantId: 4,
          RestaurantName: 'Nha hang huong viet',
          ImageUrl: 'sadf.jpg',
          RestaurantAddress: '244 co61ng quynh',
          IsActive: true,
        },
      ],
    });
  };

  onChangeActive = restaurantId => {
    let {listData} = this.state;
    listData = listData.map(m => {
      return restaurantId === m.RestaurantId
        ? {...m, IsActive: !m.IsActive}
        : m;
    });
    this.setState({listData});
  };

  onRemoveRestaurant = restaurantId => {
    Alert.alert(
      'Thông báo',
      'Bạn vui có chắc chắn muốn xóa nhà hàng này',
      [
        {
          text: 'Tôi nhầm',
          onPress: () => {
            ToastAndroid.show('Ok chúng tôi hiểu', ToastAndroid.SHORT);
          },
        },
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            let {listData} = this.state;
            listData = listData.filter(m => m.RestaurantId !== restaurantId);
            this.setState({listData});
          },
        },
      ],
      {cancelable: false},
    );
  };

  setModalVisible(visible, data = {}) {
    this.setState({modalVisible: visible, dataDetail: data});
  }

  onSaveDetail = () => {
    const {dataDetail} = this.state;
    let {listData} = this.state;
    if (dataDetail.RestaurantId > 0) {
      listData = listData.map(m => {
        return dataDetail.RestaurantId === m.RestaurantId ? dataDetail : m;
      });
    } else {
      listData = [...listData, dataDetail];
    }
    this.setState({listData});
    this.setModalVisible(false);
  };

  render() {
    const {listData, modalVisible, dataDetail} = this.state;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.getData()}>
            <ControlButton
              type="danger"
              style={{
                margin: 10,
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Reload data
            </ControlButton>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <ControlButton
              type="info"
              style={{
                margin: 10,
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Thêm nhà hàng
            </ControlButton>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{padding: 10, flexDirection: 'column'}}>
            {listData.map((item, index) => {
              const {
                RestaurantId,
                RestaurantName,
                RestaurantAddress,
                IsActive,
              } = item;
              return (
                <View
                  key={`restaurant-${index}`}
                  style={{marginBottom: 20, marginTop: 10}}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => this.setModalVisible(true, item)}
                      style={{flex: 1, margin: 10}}>
                      <Image
                        style={{width: 120, height: 120}}
                        source={{uri: readImageUrl(item.ImageUrl)}}
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        marginLeft: 10,
                        flex: 1,
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          padding: 2,
                          fontWeight: 'bold',
                          color: colors.dark,
                        }}>
                        {RestaurantName}
                      </Text>
                      <Text style={{padding: 2, color: colors.darkgrey}}>
                        {RestaurantAddress}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Switch
                          value={IsActive}
                          thumbColor={colors.info}
                          onChange={res => {
                            this.onChangeActive(RestaurantId);
                          }}
                        />
                        <Text style={{padding: 4}}>Mở cửa</Text>
                      </View>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{flex: 1, width: 50, margin: 5}}
                        onPress={() => this.onRemoveRestaurant(RestaurantId)}>
                        <ControlButton type="danger">Xóa</ControlButton>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
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
                  {dataDetail.RestaurantId > 0
                    ? 'Sửa nhà hàng'
                    : 'Thêm nhà hàng'}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                <FormControlWrapper title="Tên nhà hàng" isRequired={true}>
                  <ControlInput
                    placeholder="Tên nhà hàng"
                    defaultValue={dataDetail.RestaurantName}
                    refProp={input => (this.titleInput = input)}
                    onSubmitEditing={() => this.contentInput.focus()}
                    onChangeText={text => {
                      this.setState(prevState => ({
                        dataDetail: {
                          ...prevState.dataDetail,
                          RestaurantName: text,
                        },
                      }));
                    }}
                  />
                </FormControlWrapper>

                <FormControlWrapper title="Địa chỉ" isRequired={true}>
                  <ControlInput
                    placeholder="Địa chỉ"
                    defaultValue={dataDetail.RestaurantAddress}
                    refProp={input => (this.titleInput = input)}
                    onSubmitEditing={() => this.contentInput.focus()}
                    onChangeText={text => {
                      this.setState(prevState => ({
                        dataDetail: {
                          ...prevState.dataDetail,
                          RestaurantAddress: text,
                        },
                      }));
                    }}
                  />
                </FormControlWrapper>
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
              <TouchableOpacity onPress={() => this.onSaveDetail()}>
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
                  Lưu
                </ControlButton>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(EntryTask);
