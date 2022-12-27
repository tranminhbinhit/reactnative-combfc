import React from 'react';
import {View, StyleSheet} from 'react-native';

import ControlDatePicker from './ControlDatePicker';

/*
  EX:
  date, datetime, time
  <ControlRangeDatePicker
    formatDate="YYYY-MM-DD"
    // maxDate={getDate(0)}
    // minDate={getDate(-30)}
    modeDate="date"
    fromDate={fromDate}
    onDateChangeFrom={date => {
      this.setState({fromDate: date});
    }}
    toDate={toDate}
    onDateChangeTo={date => {
      this.setState({toDate: date});
    }}
  />
*/
const styles = StyleSheet.create({
  dateRangePicker: {display: 'flex', flexDirection: 'row'},
});

class ControlRangeDatePicker extends React.Component {
  render() {
    const {
      formatDate,
      maxDate,
      minDate,
      modeDate,

      fromDate,
      onDateChangeFrom,

      toDate,
      onDateChangeTo,
    } = this.props;
    return (
      <View style={styles.dateRangePicker}>
        <View style={{flex: 1, marginRight: 5}}>
          <ControlDatePicker
            date={fromDate}
            mode={modeDate}
            format={formatDate}
            {...(maxDate ? {...maxDate} : {})}
            {...(minDate ? {...minDate} : {})}
            onDateChange={onDateChangeFrom}
          />
        </View>
        <View style={{flex: 1, marginLeft: 5}}>
          <ControlDatePicker
            date={toDate}
            mode={modeDate}
            format={formatDate}
            {...(maxDate ? {...maxDate} : {})}
            minDate={fromDate}
            onDateChange={onDateChangeTo}
          />
        </View>
      </View>
    );
  }
}

export default ControlRangeDatePicker;
