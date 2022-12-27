import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';

import * as colors from '../../constants/colors';
import {pingLocationUser, getMetaData} from '../../setting/action';
import {withAuthen} from '../../components/HOC/WithAuthen';
import {renderIf} from '../../utils/utils';
import ControlButton from '../../components/Common/ControlButton';
import ViewWrapper from '../../components/Common/ViewWrapper';

const navigationOptions = ({navigation}) => {
  const {params = {}} = navigation.state;
  return {
    title: 'Quản lý FC',
  };
};

class Home extends React.Component {
  // static navigationOptions = ({navigation}) => {
  //   const {params = {}} = navigation.state;
  //   return {
  //     title: 'Đơn giản tốc độ',
  //   };
  // };
  state = {
    isLoading: false,
    type: 1,
  };

  componentDidMount() {}

  goToTab = tabName => {
    const {navigate} = this.props.navigation;
    navigate(tabName);
  };

  changeTab = type => {
    this.setState({
      type: type,
    });
  };

  genStyleTab = currentType => {
    const {type} = this.state;
    const returnStyle = [
      {borderBottomColor: type === currentType ? colors.green : colors.gray},
      styles.tabItem,
    ];
    return returnStyle;
  };

  genViewTab = currentType => {
    const {type} = this.state;
    return type === currentType;
  };

  viewTabSumary = () => {
    const {isLoading} = this.state;
    return (
      <ViewWrapper isVisible={isLoading}>
        <View style={{flexDirection: 'column', margin: 10}}>
          <View style={styles.sumaryRow}>
            <Text style={styles.sumaryRowCol1}>1.</Text>
            <Text style={styles.sumaryRowCol2}>Giao trong tháng</Text>
            <Text style={styles.sumaryRowCol3}>2</Text>
          </View>
          <View style={styles.sumaryRow}>
            <Text style={styles.sumaryRowCol1}>2.</Text>
            <Text style={styles.sumaryRowCol2}>Đã tác động</Text>
            <Text style={styles.sumaryRowCol3}>0/7</Text>
          </View>
          <View style={styles.sumaryRow}>
            <Text style={styles.sumaryRowCol1}>3.</Text>
            <Text style={styles.sumaryRowCol2}>Km đã đi (ngày/tháng)</Text>
            <Text style={styles.sumaryRowCol3}>0/0km</Text>
          </View>
          <View style={styles.sumaryRow}>
            <TouchableOpacity onPress={this.onSubmit} style={{flex: 1}}>
              <ControlButton size={5} type="info">
                Nhật ký
              </ControlButton>
            </TouchableOpacity>
          </View>
          <View style={styles.sumaryRow}>
            <TouchableOpacity
              onPress={this.onSubmit}
              style={{flex: 1, marginRight: 10}}>
              <ControlButton size={5} type="success">
                Bắt đầu
              </ControlButton>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onSubmit}
              style={{flex: 1, marginLeft: 10}}>
              <ControlButton size={5} type="danger">
                Kết thúc
              </ControlButton>
            </TouchableOpacity>
          </View>
        </View>
      </ViewWrapper>
    );
  };

  viewTabRoute = () => {
    return (
      <ViewWrapper>
        <View style={{flexDirection: 'column'}}>
          <View style={styles.routerRow}>
            <TouchableOpacity
              style={styles.routerButton}
              onPress={() => this.goToTab('Search')}>
              <Image
                source={require('../../assets/search.png')}
                style={{width: 30, height: 30}}
              />
              <Text>Tìm kiếm</Text>
            </TouchableOpacity>
            <View style={styles.routerButton}>
              <Image
                source={require('../../assets/search.png')}
                style={{width: 30, height: 30}}
              />
              <Text>Cần xác minh</Text>
            </View>
            <View style={styles.routerButton}>
              <Image
                source={require('../../assets/search.png')}
                style={{width: 30, height: 30}}
              />
              <Text>Đã xác minh</Text>
            </View>
          </View>
          <View style={styles.routerRow}>
            <View style={styles.routerButton}>
              <Image
                source={require('../../assets/search.png')}
                style={{width: 30, height: 30}}
              />
              <Text>KXMD</Text>
            </View>
            <View style={styles.routerButton}>
              <Image
                source={require('../../assets/search.png')}
                style={{width: 30, height: 30}}
              />
              <Text>Gần tới</Text>
            </View>
          </View>
        </View>
      </ViewWrapper>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={this.genStyleTab(1)}
            onPress={() => {
              this.changeTab(1);
            }}>
            <Text style={styles.tabText}>Tổng kết</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.genStyleTab(2)}
            onPress={() => {
              this.changeTab(2);
            }}>
            <Text style={styles.tabText}>Tuyến đường</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 150}}>
          {renderIf(this.genViewTab(1), this.viewTabSumary())}
          {renderIf(this.genViewTab(2), this.viewTabRoute())}
        </View>
        <View
          style={{
            backgroundColor: colors.green,
            padding: 10,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 110,
          }}>
          <Text style={{color: colors.white, textAlign: 'center', padding: 5}}>
            RR0239293
          </Text>
          <Text style={{color: colors.white, textAlign: 'center', padding: 5}}>
            Hotline: 0938299399
          </Text>
          <Text style={{color: colors.white, textAlign: 'center', padding: 5}}>
            12/21/2019 12:00:12
          </Text>
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
  )(Home),
  navigationOptions,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 3,
  },
  tabText: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  //Summary
  sumaryRow: {
    flexDirection: 'row',
    margin: 10,
  },
  sumaryRowCol1: {
    width: 40,
    textAlign: 'left',
  },
  sumaryRowCol2: {
    flex: 5,
    fontWeight: 'bold',
  },
  sumaryRowCol3: {
    flex: 2,
    textAlign: 'right',
    fontWeight: 'bold',
  },

  //Router
  routerRow: {
    flexDirection: 'row',
  },
  routerButton: {
    flexDirection: 'column',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.dark,
    backgroundColor: colors.ddd,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20,
    paddingTop: 20,
    flex: 1,
    margin: 10,
  },
});
