// import { compareAsc, format,  } from 'date-fns'
  import  isWithinInterval  from 'date-fns/isWithinInterval'
//import  isWithinInterval  from 'date-fns/isWithinInterval'
const PunchCardDate =  require('../dal/mockTimePunchData.json')


export interface TimeCard{
    STORE_ID: String;
    EMP_ID: String;
    BUS_DT: Date;
    TIME_PUNCH_DTM: Date;
    SHIFT_ROLE_NM: String;
    PUNCH_RSN: String;
}

//revisit
export interface Total {
    SHIFT_ROLE_NM: String;
    PUNCH_RSN: String;
    DURATION_IN_MIN: String;
}

export interface TimeCardVM {
    date: Date;
    dayOfWeek: String;
    items: TimeCard[];
    dailyTotals: Total[];
}

export default class TimeCardService {
    constructor(){
        console.log("Time Card Service Start")
    }

    parseTimeCard(timecard :TimeCard) {
        return timecard;
        // return {
        //     items: 
        // }
    }

    async fetchByEmployees(): Promise<TimeCard[]>{
        console.log('LOG INFO: fetch by employee by id');

        const employeePromise = new Promise<TimeCard[]>((resolve, reject)=>{
            setTimeout(() => {
                resolve(PunchCardDate);
            }, 1000 );
        });

        return employeePromise;
    }

    async fetchByEmployeedId(employeeId, startDate, endDate): Promise<TimeCard[]>{
        console.log('LOG INFO: fetch by employee by id');

        const punchStartDate = new Date(startDate)
        const punchEndDate = new Date(endDate)

        // console.log(punchDate);
        console.log( punchStartDate);
        console.log( punchEndDate);

        // return timecard.EMP_ID === employeeId ||

      

        const employeePromise = new Promise<TimeCard[]>((resolve, reject)=>{
            setTimeout(() => {
                const punchCards = PunchCardDate.filter(timecard => {
                    const punchDate = new Date(timecard.TIME_PUNCH_DTM)
                    return timecard.EMP_ID === employeeId
                 })

                resolve(punchCards)
            }, 1000 );

            // console.log( isWithinInterval(new Date("2013-05-19T07:00:00.000Z"), 
            // {start: punchStartDate, end: punchEndDate } )
            //        )
        });

        return employeePromise;
    }
}