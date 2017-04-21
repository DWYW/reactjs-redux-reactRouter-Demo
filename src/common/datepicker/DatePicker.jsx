import React from 'react'
import './DatePicker.less'


export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.mountMonthDays = this.mountMonthDays.bind(this);
    this.mountNowDate = this.mountNowDate.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.stopDispatch = this.stopDispatch.bind(this);
    this.daySelected = this.daySelected.bind(this);
    this.format = this.format.bind(this);
    this.mountDefaultValue = this.mountDefaultValue.bind(this);
    this.tdClassName = this.tdClassName.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.nowDate = {};
    this.datePickerTitle = {
      en: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
      zh: ['日', '一', '二', '三', '四', '五', '六']
    };
    this.datePickerMonth = {
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    };
    this.today = {};
    this.selected = null;
    this.state = {
      format: null,
      datePickerShow: false,
      lang: null,
      currentMonthDays: null,
      date: {},
      selectedDate: null,
      style: {},
      pickerPanelStyle: {},
      placeholder: null
    }

  }

  componentDidMount() {
    const lang = this.props.lang ? this.props.lang === 'en' || this.props.lang === 'zh' ? this.props.lang : "zh" : "zh";
    // const fmt=["YYYY-MM-DD","MM-DD-YYYY,'']
    let format = this.props.format;
    if (format) {
      if (format.toUpperCase().match(/^Y/)) {
        if (format.toUpperCase().match(/((Y{4}|Y{2})-M{1,2}-D{1,2})|((Y{4}|Y{2})\/M{1,2}\/D{1,2})/g)) {
          format = format.toUpperCase();
        } else {
          format = 'YYYY-MM-DD'
        }
      } else if (format.toUpperCase().match(/^M/)) {
        if (format.toUpperCase().match(/(M{1,2}-D{1,2}-(Y{4}|Y{2}))|(M{1,2}\/D{1,2}\/(Y{4}|Y{2}))/g)) {
          format = format.toUpperCase();
        } else {
          format = 'YYYY-MM-DD'
        }
      } else {
        format = 'YYYY-MM-DD'
      }
    } else {
      format = 'YYYY-MM-DD'
    }
    const selectedDate = this.props.value ? this.props.value : null;
    let style = this.props.style ? this.props.style : {};
    const placeholder = this.props.placeholder ? this.props.placeholder : null;
    this.setState({
      lang: lang,
      format: format,
      selectedDate: selectedDate,
      style: style,
      placeholder: placeholder
    });
    if (this.props.value) {
      this.selected = this.mountDefaultValue(this.props.value, format);
    }

    document.addEventListener('click', this.hideDatePicker, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDatePicker, true)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        selectedDate: nextProps.value
      });
      if (nextProps.value) {
        this.selected = this.mountDefaultValue(this.props.value, format);
      }
    }
  }

  showDatePicker(e) {

    const top = this.refs.DatePickerInput.parentNode.offsetTop;
    const scrollTop = document.body.scrollTop >= document.documentElement.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;

    if (!this.state.datePickerShow) {
      if ((window.innerHeight - (top - scrollTop) - this.refs.DatePickerInput.parentNode.clientHeight) <= 280) {
        const pickerPanelStyle = {
          bottom: this.refs.DatePickerInput.parentNode.clientHeight + 4 + "px"
        };
        this.setState({
          pickerPanelStyle: pickerPanelStyle
        })
      } else {
        const pickerPanelStyle = {
          top: this.refs.DatePickerInput.parentNode.clientHeight + "px"
        };
        this.setState({
          pickerPanelStyle: pickerPanelStyle
        })
      }
      this.mountNowDate();
      this.mountMonthDays(new Date());
      e.nativeEvent.stopImmediatePropagation();
    }

  }

  hideDatePicker() {
    if (this.state.datePickerShow) {
      this.setState({
        datePickerShow: false
      })
    }

  }

  mountDefaultValue(value, format) {
    let date = {};
    let val = value.toString().match(/\//g) ? value.split('/') : value.split('-');
    if (val.length !== 3) {
      return null;
    } else {
      if (format.toUpperCase().match(/^Y/)) {
        date.year = parseInt(val[0]);
        date.month = parseInt(val[1]);
        date.day = parseInt(val[2]);

      } else {
        date.year = parseInt(val[2]);
        date.month = parseInt(val[0]);
        date.day = parseInt(val[1]);
      }
    }
    if (date.year) {
      return date;
    }
  }

  stopDispatch(e) {
    e.nativeEvent.stopImmediatePropagation();
  }

  mountNowDate() {
    const now = new Date();
    const date = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      week: now.getDay()
    };
    this.setState({
      date: date,
      datePickerShow: true
    });
    this.today = Object.assign({}, date);
  }

  mountMonthDays(now) {
    const countDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const startWeek = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const showDays = [];
    let key = 0;
    showDays[key] = [];
    for (let i = 0; i < startWeek; i++) {
      showDays[key].push({year: null, month: null, day: null});
    }
    for (let i = 0; i < countDays; i++) {
      if (showDays[key].length >= 7) {
        ++key;
        showDays[key] = [];
      }
      showDays[key].push({year: now.getFullYear(), month: now.getMonth() + 1, day: i + 1});
    }
    this.setState({
      currentMonthDays: showDays
    })
  }

  changeMonth(e, type) {
    e.preventDefault();
    const {date} = this.state;
    if (type == 'prev') {
      if (date.month - 1 <= 0) {
        date.month = 12;
        date.year -= 1;
      } else {
        date.month -= 1;
      }
    } else {
      if (date.month + 1 > 12) {
        date.month = 1;
        date.year += 1;
      } else {
        date.month += 1;
      }
    }
    this.setState({
      date: date
    });
    this.mountMonthDays(new Date(date.year, date.month - 1))

  }

  format(date) {
    let format = this.state.format.toUpperCase();
    if (format.match(/YYYY{1}/g)) {
      format = format.replace(/YYYY{1}/g, date.year.toString());
    } else {
      format = format.replace(/YY{1}/g, date.year.toString().substring(2));
    }
    if (format.match(/MM{1}/g)) {
      format = format.replace(/MM{1}/g, date.month < 10 ? `0${date.month}` : date.month.toString())
    } else {
      format = format.replace(/M{1}/g, date.month.toString())
    }
    if (format.match(/DD{1}/g)) {
      format = format.replace(/DD{1}/g, date.day < 10 ? `0${date.day}` : date.day.toString())
    } else {
      format = format.replace(/D{1}/g, date.day.toString())
    }
    return format;
  }

  daySelected(e, date) {
    e.preventDefault();
    if (date.day) {
      this.selected = date;
      const selectedDate = this.format(date);
      this.setState({
        selectedDate: selectedDate
      });
      this.hideDatePicker();
      if (this.props.callback) {
        this.props.callback(selectedDate)
      }
    }

  }
  deleteSelected(e){
    e.preventDefault();
    if(this.state.selectedDate){
      this.selected = null;
      this.setState({
        selectedDate: null
      });
      if (this.props.callback) {
        this.props.callback(null)
      }
    }
  }

  tdClassName(day, today) {
    let className = "";
    if (day.day) {
      className += "picker-day";
      if (day.day === today.day && day.month === today.month && day.year === today.year) {
        className += " current-day"
      }
      if (this.selected) {
        if (day.day === this.selected.day && day.month === this.selected.month && day.year === this.selected.year) {
          className += " picker-selected-day"
        }
      }
    }
    return className
  }

  render() {
    const {datePickerShow, lang, currentMonthDays, date, selectedDate, style, pickerPanelStyle, placeholder} = this.state;
    const weekTitle = this.datePickerTitle[lang];
    const today = this.today;
    const datePickerMonth = this.datePickerMonth;
    return (
    <div className="date-picker-ui">
      <input className="date-picker-input" value={selectedDate ? selectedDate : ''} type="text"
             onClick={this.showDatePicker} style={style} ref="DatePickerInput" placeholder={placeholder} readOnly={true}/>
      <span className="date-picker-clean" onClick={this.deleteSelected}>×</span>
      {datePickerShow &&
      <div className="date-picker-panel" onClickCapture={this.stopDispatch} style={pickerPanelStyle}>
        <div className="date-picker-header">
          <div className="date-picker-header-month">{datePickerMonth[lang][date.month - 1]}</div>
          <div className="date-picker-header-year">{date.year}</div>
          <div className="date-picker-header-Btn">
            <div className="date-picker-header-prevMonth-btn" onClick={(e) => this.changeMonth(e, 'prev')}></div>
            <div className="date-picker-header-nextMonth-btn" onClick={(e) => this.changeMonth(e, 'next')}></div>
          </div>

        </div>
        <div className="date-picker-body">
          <table frameBorder="0" cellSpacing="2px">
            <thead>
            <tr>
              {weekTitle &&
              weekTitle.map((title, key) => <th width="30px" key={`thead-${key}`}>{title}</th>)
              }
            </tr>
            </thead>
            <tbody>
            {currentMonthDays &&
            currentMonthDays.map((currentWeek, weekKey) => {
              return (
              <tr key={`week-${weekKey}`}>
                {
                  currentWeek.map((day, dayKey) => {
                    return (
                    <td
                    className={this.tdClassName(day, today)}
                    key={`day-${dayKey}`}
                    onClick={(e) => {
                      this.daySelected(e, day)
                    }}
                    >
                      {day.day}
                    </td>
                    )
                  })
                }
              </tr>
              )
            })
            }
            </tbody>
          </table>
        </div>
      </div>
      }
    </div>
    )
  }
}
