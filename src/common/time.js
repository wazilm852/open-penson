import moment from 'moment/moment'
const convertStringtoDate = function (value) {
  var formatString = 'YYYY-MM-DD HH:mm'
  return moment(value).format(formatString)
}
export default convertStringtoDate
