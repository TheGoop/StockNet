import dayjs from "dayjs"

export const PORT = "http://127.0.0.1:5000"

//Eventually need to hide apiKey?
export const apiKey = "bv0ve6n48v6u4eacgpmg"

export const NORMALIZE_TIME = (time) => {
    let date = new Date(time * 1000)
    // console.log(date)
    // let curTimezone = new Date()

    // date = new Date(date.getTime() + curTimezone.getTimezoneOffset() * 60000)
    // let date = new Date(time)

    return dayjs(date).format('h:mm A, MMM D, YYYY')
}
