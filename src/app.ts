import * as express from 'express'

const app = express()
const port = 3000
// const timecardsRouter = require('./routes/timecards')
import router from './routes/timeCards';

app.get('/', (req: express.Request, res: express.Response) => {
	res.json({
		message: 'Hello world',
	})
})


// cons
//https://localhost:3000/timepunch-api/timecards?startDate=05%2F02%2F2013&endDate=05%2F03%2F2013&employeeId=1234567
app.use('/timepunch-api/timecards', router)

app.listen(port, () => console.log(`Timepunch server listening on port ${port}!`))
