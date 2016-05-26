export const splitText = (num, text) => {
    return (text.length > num) ?
        text.substring(0, num) + '...' :
        text
}

export const materialLetter = (char) => {
    return `https://raw.githubusercontent.com/dayatz/material-letter-icons/master/dist/png/${char}.png`
}

export const getBg = (char) => {
    return `https://raw.githubusercontent.com/dayatz/blurred-small-bg/master/${char}.jpg`
}