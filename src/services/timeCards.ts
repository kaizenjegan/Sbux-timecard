import  isWithinInterval  from 'date-fns/isWithinInterval'
const PunchCardDate =  require('../dal/mockTimePunchData.json')
import * as moment from 'moment'

export interface TimeCard{
    STORE_ID: String;
    EMP_ID: String;
    BUS_DT: Date;
    TIME_PUNCH_DTM: Date;
    SHIFT_ROLE_NM: String;
    PUNCH_RSN: String;
    DURATION_IN_MIN: String;
}

interface Total {
    SHIFT_ROLE_NM: String;
    PUNCH_RSN: String;
    DURATION_IN_MIN: String;
}

export interface TimeCardVM {
    date: moment.Moment;
    dayOfWeek: String;
    items: TimeCard[];
    dailyTotals: Total[];
    grandTotals: Total[];
}

export default class TimeCardService {
    constructor(){
        console.log("Time Card Service Start")
    }

    parseTimeCard(timecard :TimeCard) {
        return timecard;
    }
    dayOfWeekAsString(dayIndex) {
        return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex];
      }
    //rename
    transformPunchCards(punchCards: TimeCard[], startDate, endDate): TimeCardVM[] {
        console.log('Time Card Service: Generating Dash Board');

        const queryStartDate = new Date(startDate)
        const queryEndDate = new Date(endDate)
        const start = moment(queryStartDate)
        const end = moment(queryEndDate)
        const numberOfDays = end.diff(start, 'days')

        console.log(`days: ${numberOfDays}`)
        let report: TimeCardVM[] = [];

        //loop through date
        for(let i = 0; i <= numberOfDays; i++){       
            let punchCardDate = (i > 0) ? moment(startDate, "MM/DD/YYYY").add( 'days', i) : moment(startDate, "MM/DD/YYYY");

            //-   For each day, we should also provide a `dailyTotals` of the time worked grouped by `SHIFT_ROLE_NM` and `PUNCH_RSN`
            
            const todaysPunchCards = punchCards.filter( punchCard => {
                console.log(`Today: ${punchCardDate.toDate()}, punchCard: ${punchCard.BUS_DT}` );                
                console.log(`date: ${punchCardDate.diff(punchCard.BUS_DT )}`);

                return (punchCardDate.diff(punchCard.BUS_DT ) === 0)
            })

            report.push({
                date: punchCardDate,
                dayOfWeek: this.dayOfWeekAsString(punchCardDate.weekday() - 1),
                items: todaysPunchCards || []  ,
                dailyTotals: [],
                grandTotals: []
            });
        }
        return report;
    }

    extractTotals(punchCards){

    }

    async fetchByEmployeedId(employeeId, startDate, endDate): Promise<TimeCardVM[]>{
        console.log('Time Card Service: Fetch by employee by ID');

        const employeePromise = new Promise<TimeCardVM[]>((resolve, reject) => {
            setTimeout(() => {
                const punchCards = PunchCardDate.filter(timecard => 
                    timecard.EMP_ID === employeeId && moment(timecard.TIME_PUNCH_DTM).isBetween(startDate, endDate))

                console.log(`Punch Cards: ${punchCards.length}`)

                const timeReport = this.transformPunchCards(punchCards, startDate, endDate);
                
                resolve(timeReport)
            }, 1000 );
        });

        return employeePromise;
    }
}