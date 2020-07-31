import moment from 'utils/moment';
import _groupBy from 'lodash/groupBy';

function appointmentsMapper(appointments) {
  let result = new Map();
  let groupByDate = _groupBy(appointments, (a) => moment(a.start_date).format('HH:mm'));
  
  for (let date in groupByDate){
    result.set(date, groupByDate[date]);
  }

  return result;
}

export default appointmentsMapper;