import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import * as colors from '../../constants/colors';
import ControlButton from './ControlButton';
import CalendarPicker from 'react-native-calendar-picker';
import {formatDate, getDate, checkRangeDate, renderIf} from '../../utils/utils';
import ViewWrapper from './ViewWrapper';
import {EnumDateType} from '../../constants/enum';

/*
  EX:
    <ControlDateRange
      style={{marginBottom: 10}}
      minDate={getDate(-365)}
      maxDate={getDate(0)}
      fromDate={fromDate}
      toDate={toDate}
      styleTime={{margin: 5}}
      onChange={value =>
        this.setState({fromDate: value.fromDate, toDate: value.toDate})
      }
    />
*/
const initState = {
  isShowPopup: false,
  selectedStartDate: null,
  selectedEndDate: null,
};

const weekDaysFormat = [
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
  'Chủ nhật',
];

const monthsFormat = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

class ControlDateRange extends React.Component {
  state = initState;

  componentDidMount() {
    const {fromDate, toDate} = this.props;
    this.setState({selectedStartDate: fromDate, selectedEndDate: toDate});
  }

  showPopup = isShowPopup => {
    this.setState({
      isShowPopup,
    });
  };

  onSaveData = () => {
    const {onChange} = this.props;
    let {selectedStartDate, selectedEndDate} = this.state;
    if (onChange) {
      if (!selectedEndDate) {
        selectedEndDate = selectedStartDate;
      }
      onChange({
        fromDate: selectedStartDate,
        toDate: selectedEndDate,
      });
    }
    this.showPopup(false);
  };

  onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  };

  onSelectTypeDate = dateType => {
    switch (dateType) {
      case EnumDateType.TODAY: {
        this.setState({
          selectedStartDate: getDate(0),
          selectedEndDate: getDate(0),
        });
        break;
      }
      case EnumDateType.YESTERDAY: {
        this.setState({
          selectedStartDate: getDate(-1),
          selectedEndDate: getDate(-1),
        });
        break;
      }
      case EnumDateType.DATE7: {
        this.setState({
          selectedStartDate: getDate(-6),
          selectedEndDate: getDate(0),
        });
        break;
      }
      case EnumDateType.DATE30: {
        this.setState({
          selectedStartDate: getDate(-30),
          selectedEndDate: getDate(0),
        });
        break;
      }
      case EnumDateType.THISMOUNTH: {
        this.setState({
          selectedStartDate: moment().startOf('month'),
          selectedEndDate: getDate(0),
        });
        break;
      }
      case EnumDateType.PREVMOUNTH: {
        const endDateCurrent = moment()
          .startOf('month')
          .add(-1, 'days');
        const startDateCurrent = moment()
          .startOf('month')
          .add(-1, 'days')
          .startOf('month');
        this.setState({
          selectedStartDate: startDateCurrent,
          selectedEndDate: endDateCurrent,
        });
        break;
      }
    }
  };

  render() {
    const {isShowPopup} = this.state;
    const {
      children,
      style,
      minDate = getDate(-365),
      maxDate = getDate(0),
      fromDate,
      toDate,
      styleTime,
    } = this.props;

    const {selectedStartDate, selectedEndDate} = this.state;
    return (
      <View style={style}>
        <TouchableOpacity
          onPress={() => {
            this.showPopup(true);
          }}>
          {renderIf(children, children)}
          {renderIf(
            !children,
            <Text
              style={[
                styleTime,
                {
                  padding: 5,
                  textAlign: 'center',
                  paddingRight: 15,
                  paddingLeft: 15,
                  borderRadius: 5,
                },
              ]}>
              {checkRangeDate(fromDate, toDate)}
            </Text>,
          )}
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isShowPopup}
          onRequestClose={() => {
            console.log('Modal has been closed.');
            this.showPopup(false);
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
                    this.showPopup(false);
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
                <View style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectTypeDate(EnumDateType.TODAY);
                      }}
                      style={{flex: 1}}>
                      <ControlButton
                        type="success"
                        style={styles.buttonCurrentTime}>
                        Hôm nay
                      </ControlButton>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectTypeDate(EnumDateType.YESTERDAY);
                      }}
                      style={{flex: 1}}>
                      <ControlButton
                        type="info"
                        style={styles.buttonCurrentTime}>
                        Hôm qua
                      </ControlButton>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectTypeDate(EnumDateType.DATE7);
                      }}
                      style={{flex: 1}}>
                      <ControlButton
                        type="info"
                        style={styles.buttonCurrentTime}>
                        7 ngày gần đây
                      </ControlButton>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectTypeDate(EnumDateType.DATE30);
                      }}
                      style={{flex: 1}}>
                      <ControlButton
                        type="info"
                        style={styles.buttonCurrentTime}>
                        30 ngày gần đây
                      </ControlButton>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectTypeDate(EnumDateType.THISMOUNTH);
                      }}
                      style={{flex: 1}}>
                      <ControlButton
                        type="info"
                        style={styles.buttonCurrentTime}>
                        Tháng này
                      </ControlButton>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.onSelectTypeDate(EnumDateType.PREVMOUNTH);
                      }}
                      style={{flex: 1}}>
                      <ControlButton
                        type="info"
                        style={styles.buttonCurrentTime}>
                        Tháng trước
                      </ControlButton>
                    </TouchableOpacity>
                  </View>
                </View>
                <CalendarPicker
                  startFromMonday={false}
                  allowRangeSelection={true}
                  minDate={minDate}
                  maxDate={maxDate}
                  initialDate={selectedStartDate}
                  weekdays={weekDaysFormat}
                  months={monthsFormat}
                  previousTitle="Sau"
                  nextTitle="Trước"
                  dayLabelsWrapper={{
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                  }}
                  dayOfWeekStyles={{
                    5: {
                      color: '#ff38ef',
                    },
                    6: {
                      color: '#fe0000',
                    },
                  }}
                  todayBackgroundColor="#e6ffe6"
                  selectedDayColor="#6c95d7"
                  selectedDayTextColor="#000000"
                  scaleFactor={375}
                  textStyle={{
                    fontFamily: 'Cochin',
                    color: '#000000',
                  }}
                  onDateChange={this.onDateChange}
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.dateViewType}>
                    {formatDate(selectedStartDate)}
                  </Text>
                  <Text>-</Text>
                  <Text style={styles.dateViewType}>
                    {formatDate(selectedEndDate || selectedStartDate)}
                  </Text>
                </View>
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
              <TouchableOpacity onPress={() => this.onSaveData()}>
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
      </View>
    );
  }
}

export default ControlDateRange;

const styles = StyleSheet.create({
  buttonCurrentTime: {
    margin: 5,
    padding: 10,
  },
  dateViewType: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    margin: 10,
    borderColor: colors.pink,
    borderRadius: 20,
    backgroundColor: colors.pink,
    color: colors.white,
  },
});
