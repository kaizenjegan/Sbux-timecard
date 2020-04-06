import  isWithinInterval  from 'date-fns/isWithinInterval'
const PunchCardDate =  require('../dal/mockTimePunchData.json')
import * as moment from 'moment'
import * as _ from 'lodash'

export interface PunchCardEntry{
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
    items: PunchCardEntry[];
    dailyTotals: Total[];
}

interface TimeResponseObject {
    items: TimeCardVM[];
    grandTotals: Total[];
}

export default class TimeCardService {
    constructor(){
        console.log("Time Card Service Start")
    }

    parseTimeCard(timecard :PunchCardEntry) {
        return timecard;
    }

    //would typically put this in a util
    dayOfWeekAsString(dayIndex) {
        return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex];
      }
    //rename
    //For each day, we should also provide a `dailyTotals` of the time worked grouped by `SHIFT_ROLE_NM` and `PUNCH_RSN`
    transformPunchCards(punchCards: PunchCardEntry[], startDate, endDate): TimeResponseObject {
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

            let todaysPunchCards = punchCards.filter( punchCard => {     
                return (punchCardDate.diff(punchCard.BUS_DT ) === 0)
            })

            let dailyTotal = this.extractDailyTotal(todaysPunchCards );

            report.push({
                date: punchCardDate,
                dayOfWeek: this.dayOfWeekAsString(punchCardDate.weekday()), //revisit
                items: todaysPunchCards || [],
                dailyTotals: dailyTotal,
            });
        }
        
        let totalTimeCard: TimeResponseObject = {
            items: report,
            grandTotals: this.extractGrandTotal(report)
        }

        return totalTimeCard;
    }

    //I dont fully get the way to calculate duration
    extractDailyTotal(punchCards : PunchCardEntry[]) : Total[] {
        let rawTotal = _.groupBy(punchCards, 'PUNCH_RSN')

        let total: Total[] = [];
         
        Object.keys(rawTotal).map(shiftRoleNm => {

            rawTotal[shiftRoleNm].map(cards => {

                total.push({
                    SHIFT_ROLE_NM: cards.SHIFT_ROLE_NM,
                    PUNCH_RSN: cards.PUNCH_RSN,
                    DURATION_IN_MIN: this.calculateDuration()
                })
            })            
        });

        return total;
    }
    //mocking time duration
    calculateDuration() {  
        const min = 25;
        const max = 600;
        return Math.floor(Math.random() * (max - min) + min).toString(); 
    }  

    extractGrandTotal(punchCards:TimeCardVM[]) : Total[] {
        
        let total: Total[] = [];

        punchCards.map( card => {
            total = [...total, ...card.dailyTotals]
        });

        if(!total) return [];

        let rawTotal = _.groupBy(total, 'PUNCH_RSN') || [];
        
        const consolidatedTotal = Object.keys(rawTotal).map( t => {
            return rawTotal[t].map((punchCard:Total) => {
                return punchCard;
            }).reduce((result, current) =>{
                
                result.DURATION_IN_MIN = parseInt(result.DURATION_IN_MIN)  + parseInt(current.DURATION_IN_MIN);
    
                return result;
            }) 
        } )

        return consolidatedTotal;
    }

    async fetchByEmployeedId(employeeId, startDate, endDate): Promise<TimeResponseObject>{
        console.log('Time Card Service: Fetch by employee by ID');

        const employeePromise = new Promise<TimeResponseObject>((resolve, reject) => {
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