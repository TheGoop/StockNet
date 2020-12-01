import dayjs from "dayjs"

export const PORT = "http://127.0.0.1:5000"

export const apiKey = "bv0ve6n48v6u4eacgpmg"

export const NORMALIZE_TIME = (time) => {
    let date = new Date(time)
    let curTimezone = new Date()

    date = new Date(date.getTime() + curTimezone.getTimezoneOffset() * 60000)

    return dayjs(date).format('h:mm A MMM D, YYYY')
}