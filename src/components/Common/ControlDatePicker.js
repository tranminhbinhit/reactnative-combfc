import React from 'react';
import DatePicker from 'react-native-datepicker';
import {StyleSheet} from 'react-native';
import * as colors from '../../constants/colors';

/*
  EX:
  date, datetime, time
  <DataDatePicker
    date={birthDate}
    mode="date"
    format="YYYY-MM-DD"
    minDate={getDate(-30)}
    maxDate={getDate(0)}
    onDateChange={date => {
      this.setState({birthDate: date});
    }}
  />
*/
const styles = StyleSheet.create({
  datePicker: {width: '100%', marginBottom: 10},
});

class ControlDatePicker extends React.Component {
  render() {
    const {...rest} = this.props;
    return (
      <DatePicker
        style={styles.datePicker}
        customStyles={{
          btnTextConfirm: {
            height: 20,
          },
          btnTextCancel: {
            height: 20,
          },
          dateInput: {
            borderRadius: 5,
            borderColor: colors.gray,
          },
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
        }}
        placeholder="select date"
        confirmBtnText={'Ok'}
        cancelBtnText={'Cancel'}
        {...rest}
      />
    );
  }
}

export default ControlDatePicker;
