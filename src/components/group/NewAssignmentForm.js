import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import DatePicker from 'material-ui/lib/date-picker/date-picker'


class NewAssignmentForm extends React.Component {
    setMinDate() {
        const today = new Date()
        today.setFullYear(today.getFullYear())
        return today
    }
    formatDate(date) {
        const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
        const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','Nopember','Desember'];

        const day = days[date.getDay()]
        const month = months[date.getMonth()]

        return `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`
    }
    render() {
        return (
            <form>
                <div>
                <TextField placeholder='Judul tugas' id='title' />
                </div>

                <div>
                <TextField id='description' placeholder='Deskripsi tugas' multiLine={true} rows={3} />
                </div>

                <div>
                    <p>Batas pengumpulan</p>
                    <DatePicker
                        hintText='Tanggal'
                        mode='landscape'
                        minDate={this.setMinDate()}
                        onChange={(event, date) => {
                            console.log(date)
                        }}
                        formatDate={this.formatDate} />
                </div>

                <RaisedButton label='Batal' />
                <RaisedButton type='submit' primary={true} label='Buat' />
            </form>
        )
    }
}

export default NewAssignmentForm
