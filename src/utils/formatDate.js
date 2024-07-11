import moment from "moment/moment"
import "moment/locale/tr"


const formatTime = uniq_time => moment(new Date(uniq_time * 1000)).calendar()


export default formatTime