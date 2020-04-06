import 'mocha'
import { expect } from 'chai'
import TimeCardService from './timeCards';

const timeCardService = new TimeCardService();


describe('Time Cards Service', () => {
	it('should fetch two ', async () => {
		//The following request would provide data from `05/02/2013` - `05/03/2013` for employee id `1234567`
		// expect(true).to.be.equal(true)
	// 	const newProduct = new ProductService().add(...);
	//   expect(newProduct.status).to.equal('pendingApproval');
	
		const timeCards = await new TimeCardService().fetchByEmployeedId("9999999", "04/30/2019", "05/02/2019");

		console.log(`test length: ${timeCards.length}`);
		expect(timeCards).not.to.be.null;
	})
})
