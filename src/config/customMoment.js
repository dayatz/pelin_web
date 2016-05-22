import moment from 'moment'

const customMoment = (isoDate) => {
    const date = new Date(isoDate)
    return moment(date).locale('id')
}

export const formatDateTime = (isoDate) => {
    const date = new Date(isoDate)
    const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']
    const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli',
        'Agustus','September','Oktober','Nopember','Desember']

    const day = days[date.getDay()]
    const month = months[date.getMonth()]

    return `${day}, ${date.getDate()} ${month} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

export default customMoment
