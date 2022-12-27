import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';

import * as colors from '../../constants/colors';
import {pingLocationUser, getMetaData} from '../../setting/action';
import {withAuthen} from '../../components/HOC/WithAuthen';
import {renderIf} from '../../utils/utils';
import ControlButton from '../../components/Common/ControlButton';
import ViewWrapper from '../../components/Common/ViewWrapper';
import ControlInput from '../../components/Common/ControlInput';
import ControlDropdownSelect from '../../components/Common/ControlDropdownSelect';

const navigationOptions = ({navigation}) => {
  const {params = {}} = navigation.state;
  return {
    title: 'Tìm kiếm - RR79000993',
  };
};

class Search extends React.Component {
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
    const {keySearch, type, ListType} = this.state;
    return (
      <View style={styles.container}>
        <View>
          <ControlInput
            placeholder="Tìm khách hàng hợp đồng"
            defaultValue={keySearch}
            returnKeyType="search"
            refProp={input => (this.keySearch = input)}
            onChange={event => {
              this.setState({keySearch: event.nativeEvent.text});
            }}
          />
          <ControlDropdownSelect
            style={{flex: 1}}
            options={ListType}
            title="Khách hàng"
            data={type}
            onSelect={data => {
              this.setState({type: data});
            }}
            height={230}
          />
        </View>
        <View>
          <ViewWrapper>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
              <View
                style={{
                  flexDirection: 'column',
                  borderBottomWidth: 1,
                  borderBottomColor: colors.ddd,
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.goToTab('FCDetail');
                  }}>
                  <View style={{flexDirection: 'row', height: 30}}>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={{marginRight: 10, fontWeight: 'bold'}}>
                        {item}.
                      </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text>SLL3001939323</Text>
                    </View>
                    <ControlButton
                      style={{flex: 1, marginRight: 5, borderRadius: 0}}
                      type="warning">
                      DCR
                    </ControlButton>
                    <ControlButton
                      style={{flex: 1, borderRadius: 0}}
                      type="info">
                      Cấm XM
                    </ControlButton>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
                      {`Lê chí phèo - ${item}`.toUpperCase()}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold'}}>Khách hàng</Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      <Text>VISIT-20001</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text
                      style={{
                        color: colors.danger,
                        fontWeight: 'bold',
                        marginRight: 5,
                      }}>
                      50m
                    </Text>
                    <Text>28 - 30 huỳnh phúc kháng Q1, P Bến nghé, TP HCM</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
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
  )(Search),
  navigationOptions,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
