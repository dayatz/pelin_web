import React from 'react'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import areIntlLocalesSupported from 'intl-locales-supported'

let DateTimeFormat;
if (areIntlLocalesSupported('id')) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    require('intl/locale-data/jsonp/id');

    DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

const CustomDatePicker = (props) => {
    var setMinDate = function() {
        return new Date()
        // const today = new Date()
        // today.setFullYear(today.getFullYear())
        // return today
    }
    var formatDate = function(date) {
        const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']
        const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli',
            'Agustus','September','Oktober','Nopember','Desember']

        const day = days[date.getDay()]
        const month = months[date.getMonth()]

        return `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`
    }
    var handleChange = function(event, date) {
        props.onChange(event, date);
    }
    return (
        <DatePicker
            DateTimeFormat={DateTimeFormat}
            hintText='Tanggal'
            mode='landscape'
            minDate={setMinDate()}
            onChange={handleChange}
            cancelLabel='Batal'
            okLabel='OK'
            firstDayOfWeek={1}
            locale='id'
            value={props.value}
            formatDate={formatDate} />
    )
}

export default CustomDatePicker
