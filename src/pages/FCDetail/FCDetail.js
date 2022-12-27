import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import * as colors from '../../constants/colors';
import {pingLocationUser, getMetaData} from '../../setting/action';
import {withAuthen} from '../../components/HOC/WithAuthen';
import {renderIf} from '../../utils/utils';
import ControlButton from '../../components/Common/ControlButton';
import ViewWrapper from '../../components/Common/ViewWrapper';
import ControlInput from '../../components/Common/ControlInput';
import ControlPopupImage from '../../components/Common/ControlPopupImage';
import ControlPopupMap from '../../components/Common/ControlPopupMap';

const navigationOptions = ({navigation}) => {
  const {params = {}} = navigation.state;
  return {
    title: 'RR79000993',
  };
};

class FCDetail extends React.Component {
  state = {
    isLoading: false,
    keySearch: '',
    type: {},
    ListType: [
      {label: 'Tất cả', value: '0'},
      {label: 'Một', value: '1'},
      {label: 'Hai', value: '2'},
      {label: 'Ba', value: '3'},
    ],
    regionFC: {
      lat: 10.823099,
      lng: 106.629662,
      address: '244 Cống quỳnh',
    },
  };

  componentDidMount() {
    this.initState();
  }

  initState = () => {
    this.setState({
      type: this.state.ListType[0],
    });
  };

  goToTab = tabName => {
    const {navigate} = this.props.navigation;
    navigate(tabName);
  };

  render() {
    const {keySearch, type, ListType, regionFC} = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.green,
            padding: 5,
          }}>
          <Text style={{fontSize: 16, color: colors.white}}>
            Lịch sử hoạt động
          </Text>
        </View>
        <View>
          <ViewWrapper style={{margin: 10}}>
            <View style={{flexDirection: 'row', height: 30}}>
              <ControlButton
                style={{flex: 1, marginRight: 5, borderRadius: 0}}
                type="warning">
                CastColection
              </ControlButton>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>VISIT - 0923923923</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.goToTab('FCInfo');
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Cập nhật</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text style={{flex: 1, fontSize: 16}}>
                {`FC79000993 - NGUYỄN VĂN FC`.toUpperCase()}
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontWeight: 'bold'}}>Kế tiếp</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontWeight: 'bold'}}>Người đóng tiền</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text>{`NGUYỄN VĂN FC`.toUpperCase()}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <Text style={{fontWeight: 'bold'}}>Môi quan hệ</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text>Khách hàng</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <Text style={{fontWeight: 'bold'}}>Số điện thoại</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text>0937200355</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <Text style={{fontWeight: 'bold'}}>Số tiền thu</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text>4.000.000</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <Text style={{fontWeight: 'bold'}}>Ngày thu</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text>2019/11/02</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <Text style={{fontWeight: 'bold'}}>FC Ghi chú</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginLeft: 20,
                }}>
                <Text ellipsizeMode={'tail'} numberOfLines={1} tail>
                  Thu tiền chả thấy ai hết nèThu t ai hết nè
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <ControlPopupMap title={'Vị trí FC thu tiền'} region={regionFC}>
                <Text style={{fontWeight: 'bold', color: colors.green}}>
                  Xem vị trí FC thu tiền
                </Text>
              </ControlPopupMap>
            </View>
            <View style={{flexDirection: 'column', marginTop: 10}}>
              <Text style={{fontWeight: 'bold'}}>Địa chỉ FC thu khách</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginLeft: 20,
                }}>
                <Text ellipsizeMode={'tail'} numberOfLines={1} tail>
                  Thu tiền chả thấy ai hết nèThu t ai hết nè
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', marginTop: 10}}>
              <Text style={{fontWeight: 'bold'}}>
                Hình Visit FC (Click vào hình để xem lớn)
              </Text>
              <ScrollView
                horizontal={true}
                decelerationRate={0}
                showsHorizontalScrollIndicator={false}>
                {[1, 2, 3].map(item => (
                  <ControlPopupImage
                    title={'Ảnh'}
                    source={require('../../assets/fc-people.jpg')}>
                    <Image
                      style={{width: 120, height: 120, margin: 5}}
                      source={require('../../assets/fc-people.jpg')}
                    />
                  </ControlPopupImage>
                ))}
              </ScrollView>
            </View>
            <View style={{flexDirection: 'column', marginTop: 10}}>
              <Text style={{fontWeight: 'bold'}}>
                Địa chỉ hợp đồng khách hàng
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginLeft: 20,
                }}>
                <Text ellipsizeMode={'tail'} numberOfLines={1} tail>
                  Thu tiền chả thấy ai hết nèThu t ai hết nè
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontWeight: 'bold'}}>Hợp đồng</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text>ML092399923</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <Text style={{fontWeight: 'bold'}}>Tên khách hàng</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text>Lê Chí Phèo</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <Text style={{fontWeight: 'bold'}}>Giới tính</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text>Nam</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <Text style={{fontWeight: 'bold'}}>Ngày sinh</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text>12/02/1911</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <Text style={{fontWeight: 'bold'}}>Tổng tiền vay</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                <Text>12.000.000</Text>
              </View>
            </View>
          </ViewWrapper>
        </View>
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
  )(FCDetail),
  navigationOptions,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
