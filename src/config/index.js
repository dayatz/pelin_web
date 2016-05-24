export const splitText = (num, text) => {
    return (text.length > num) ?
        text.substring(0, num) + '...' :
        text
}