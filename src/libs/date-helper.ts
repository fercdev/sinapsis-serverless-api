const moment = require('moment');
const momentTz = require('moment-timezone');
import { Between } from 'typeorm';


export const dateBetween = (month: any) => {
    const currentYear = moment().year();
    let newMonth = <number> month;
    newMonth = (newMonth<10 && month[0] != "0") ? `0${month}`: month;
    const buildDate = momentTz(`${currentYear}-${newMonth}-01`, 'America/Lima').toDate();


    const startMonth = buildDate
    const endMonth = moment(startMonth).endOf('month').toDate();

    
    let newFilter = {
        scheduledDatetime:  Between(startMonth, endMonth),
    }

    return newFilter;
};
  