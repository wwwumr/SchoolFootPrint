const TimeUtils = {
  getDate: (time: Date) => {
    return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDay()}`
  }
}

export default TimeUtils