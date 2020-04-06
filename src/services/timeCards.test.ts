import 'mocha'
import { expect } from 'chai'
import TimeCardService, {TimeCardVM} from './timeCards';

const timeCardService = new TimeCardService();


describe('Time Cards Service', () => {
	it('should fetch three days worth of punch card data ', async () => {
		const timeCardResponse = await new TimeCardService().fetchByEmployeedId("9999999", "04/30/2019", "05/02/2019");
		expect(timeCardResponse.items.length).to.be.equal(3);
	})

	it("should only fetch the right employee", async () => {
		const timeCardResponse = await new TimeCardService().fetchByEmployeedId("1234567", "05/02/2013", "05/08/2013");
		expect(timeCardResponse.items[3].items[0].EMP_ID).to.be.equal("1234567");
	})

	//todo negative tests

	it('should generate grand total ', ()=>{
		//got snap shot
		let mockData : TimeCardVM[] = JSON.parse(`[{"date": "2013-05-02T07:00:00.000Z","dayOfWeek": "Thursday","items": [],"dailyTotals": []},{"date": "2013-05-03T07:00:00.000Z","dayOfWeek": "Friday","items": [],"dailyTotals": []},{"date": "2013-05-04T07:00:00.000Z","dayOfWeek": "Saturday","items": [],"dailyTotals": []},{"date": "2013-05-05T07:00:00.000Z","dayOfWeek": "Sunday","items": [{"STORE_ID": "123","EMP_ID": "1234567","BUS_DT": "2013-05-05T07:00:00.000Z","TIME_PUNCH_DTM": "05-MAY-13 14:30:15","SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "101"},{"STORE_ID": "123","EMP_ID": "1234567","BUS_DT": "2013-05-05T07:00:00.000Z","TIME_PUNCH_DTM": "05-MAY-13 16:08:16","SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "MEAL"},{"STORE_ID": "123","EMP_ID": "1234567","BUS_DT": "2013-05-05T07:00:00.000Z","TIME_PUNCH_DTM": "05-MAY-13 16:40:21","SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "101"},{"STORE_ID": "123","EMP_ID": "1234567","BUS_DT": "2013-05-05T07:00:00.000Z","TIME_PUNCH_DTM": "05-MAY-13 22:03:14","SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "OUT"}],"dailyTotals": [{"SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "101","DURATION_IN_MIN": 447},{"SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "101","DURATION_IN_MIN": "135"},{"SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "MEAL","DURATION_IN_MIN": 1143},{"SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "OUT","DURATION_IN_MIN": 670}]},{"date": "2013-05-06T07:00:00.000Z","dayOfWeek": "Monday","items": [],"dailyTotals": []},{"date": "2013-05-07T07:00:00.000Z","dayOfWeek": "Tuesday","items": [{"STORE_ID": "123","EMP_ID": "1234567","BUS_DT": "2013-05-07T07:00:00.000Z","TIME_PUNCH_DTM": "07-MAY-13 14:00:26","SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "101"},{"STORE_ID": "123","EMP_ID": "1234567","BUS_DT": "2013-05-07T07:00:00.000Z","TIME_PUNCH_DTM": "07-MAY-13 15:51:20","SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "MEAL"},{"STORE_ID": "123","EMP_ID": "1234567","BUS_DT": "2013-05-07T07:00:00.000Z","TIME_PUNCH_DTM": "07-MAY-13 16:21:07","SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "101"},{"STORE_ID": "123","EMP_ID": "1234567","BUS_DT": "2013-05-07T07:00:00.000Z","TIME_PUNCH_DTM": "07-MAY-13 22:01:18","SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "OUT"}],"dailyTotals": [{"SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "101","DURATION_IN_MIN": "158"},{"SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "101","DURATION_IN_MIN": "74"},{"SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "MEAL","DURATION_IN_MIN": "557"},{"SHIFT_ROLE_NM": "Barista","PUNCH_RSN": "OUT","DURATION_IN_MIN": "508"}]},{"date": "2013-05-08T07:00:00.000Z","dayOfWeek": "Wednesday","items": [],"dailyTotals": []}]`)
		const grandTotal = new TimeCardService().extractGrandTotal(mockData)
		
		console.log(grandTotal);
		expect( grandTotal[0].DURATION_IN_MIN).to.be.equal(814);
	})
})
