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
  };

  componentDidMount() {}

  goToTab = tabName => {
    const {navigate} = this.props.navigation;
    navigate(tabName);
  };

  render() {
    const {ListUser, user, note} = this.state;
    return (
      <View style={styles.container}>
        <ViewWrapper
          style={{marginBottom: 0, margin: 10, flexDirection: 'column'}}>
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
          <FormControlWrapper title="Ghi chú" isRequired={true}>
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
