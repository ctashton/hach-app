import React, { Component } from 'react';
import 'rc-calendar/assets/index.css';
import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
// import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';
// import 'moment/locale/zh-cn';
// import 'moment/locale/en-gb';
import Axios from 'axios';
import salmon from "../../../utilities/images/salmon.jpg"

const format = 'YYYY-MM-DD HH:mm:ss';
// const cn = location.search.indexOf('cn') !== -1;

const now = moment();
// if (cn) {
//   now.locale('zh-cn').utcOffset(8);
// } else {
  now.locale('en').utcOffset(0); //gb vs us?
// }

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}


const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />;

function disabledTime(date) {
  console.log('disabledTime', date);
  if (date && (date.date() === 15)) {
    return {
      disabledHours() {
        return [3, 4];
      },
    };
  }
  return {
    disabledHours() {
      return [1, 2];
    },
  };
}


function disabledDate(current) {
  if (!current) {
    // allow empty select
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf();  // can not select days before today
}


class BookNew extends Component {
    static propTypes = {
        defaultValue: PropTypes.object,
        defaultCalendarValue: PropTypes.object,
      }
    
      constructor(props) {
        super(props);
    
        this.calendarContainerRef = React.createRef();
    
        this.state = {
          showTime: true,
          showDateInput: true,
          disabled: false,
          open: false,
          value: props.defaultValue,
        };
      }
    
      onChange = (value) => {
        console.log('DatePicker change: ', (value && value.format(format)));
        this.setState({
          value,
        });
      }
    
      onShowTimeChange = (e) => {
        this.setState({
          showTime: e.target.checked,
        });
      }
    
      onShowDateInputChange = (e) => {
        this.setState({
          showDateInput: e.target.checked,
        });
      }
    
      onOpenChange = (open) => {
        this.setState({
          open,
        });
      }
    
      onFocus = () => {
        if (!this.state.open && this.state.isMouseDown) {
          // focus from a "click" event, let the picker trigger automatically open the calendar
          this.setState({
            isMouseDown: false,
          });
        } else {
          // focus not caused by "click" (such as programmatic or via keyboard)
          this.setState({
            open: true,
          });
        }
      }
    
      onMouseDown = () => {
        this.setState({
          isMouseDown: true,
        });
      }
    
      getCalendarContainer = () => this.calendarContainerRef.current;
    
      toggleDisabled = () => {
        this.setState({
          disabled: !this.state.disabled,
        });
      }

      handleLoginSubmit(event) {
        event.preventDefault()
        Axios.post()
      }


    // componentDidMount() {
        // this.searchThisMeal();
        // console.log(this.state)
        //this.searchThisChef()
    // }

    // searchThisMeal = () =>{
    //     axios.get('..')
    // }

    //searchThisChef(){
        // axios.get('...)
    // }

    // submitBookingRequestHandle() {

    // }
    render() {
        const state = this.state;
        const calendar = (<Calendar
          locale={enUS}
          style={{ zIndex: 1001 }}
          dateInputPlaceholder="please input"
          format={getFormat(state.showTime)}
          disabledTime={state.showTime ? disabledTime : null}
          timePicker={state.showTime ? timePickerElement : null}
          defaultValue={this.props.defaultCalendarValue}
          showDateInput={state.showDateInput}
          disabledDate={disabledDate}
          focusablePanel={false}
        />);

        return (
            <div className="container">
                <div className="hero bg-gray">
                    <div className="hero-body">
                        <h1>Pecan Crusted Salmon</h1>
                    </div>
                    <div>
                      <img src={salmon} ></img>
                    </div>
                </div>
                <div className="columns">
                    <div className="col-8">
                    <p>Pecan crusted salmon is a delicious meal with a description that goes here.</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="input-example-1">Name</label>
                    <input className="form-input" type="text" id="input-example-1" placeholder="Name"></input>
                </div>
                <button type="submit">Submit</button>
                <div style={{
        boxSizing: 'border-box',
        position: 'relative',
        display: 'block',
        lineHeight: 1.5,
        marginBottom: 22,
      }}
      >
        <DatePicker
          animation="slide-up"
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}
          getCalendarContainer={this.getCalendarContainer}
          onOpenChange={this.onOpenChange}
          open={state.open}
          style={{ zIndex: 1001 }}
        >
          {
            ({ value }) => {
              return (
                <span tabIndex="0" onMouseDown={this.onMouseDown} onFocus={this.onFocus}>
                  <input
                    placeholder="Select Date and Time"
                    style={{ width: 250 }}
                    disabled={state.disabled}
                    readOnly
                    tabIndex="-1"
                    className="ant-calendar-picker-input ant-input"
                    value={value && value.format(getFormat(state.showTime)) || ''}
                  />
                  <div ref={this.calendarContainerRef} />
                </span>
              );
            }
          }
        </DatePicker>
      </div>
      <button type="submit">Submit</button>
            </div>
        )
    }
}

export default BookNew;