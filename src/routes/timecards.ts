// var express = require('express');

import * as express from 'express'
const router = express.Router();
import TimeCardService from '../services/timeCards';

const timeCardService = new TimeCardService();
/* GET home page. */
/*
Things to consider:

-   Each day should be listed between the `startDate`, `endDate`, regardless of whether timepunch data exists
    -   note, for Thursday there were no timepunch entries.
    -   This will make visualization in the UI much easier.
-   For days that _do_ have timepunch data, we should provide each detail record for that day in an array called `items`
    -   Each detail item should have a field `DURATION_IN_MIN` which is the difference in time between the current entry and the next entry
    -   Note the `OUT` entries do not have a duration
-   For each day, we should also provide a `dailyTotals` of the time worked grouped by `SHIFT_ROLE_NM` and `PUNCH_RSN`
-   Finally, we should also provide a `grandTotals` of the time worked for the entire provided range, again grouping data by `SHIFT_ROLE_NM` and `PUNCH_RSN`
*/
//https://localhost:3000/timepunch-api/timecards?startDate=05%2F02%2F2013&endDate=05%2F03%2F2013&employeeId=1234567
router.get('/', async (req, res, next) => {
  // For days that _do_ have timepunch data, we should provide each detail record for that day in an array called `items`
  console.log("Time cards api: Get Request")

  const employeeId = req.query.employeeId
  const startDate = req.query.startDate
  const endDate = req.query.endDate

  console.log(`Employee ID: ${employeeId}, Start Date: ${startDate}, End Date: ${endDate}`);

  //is there a date range limit?
  if(!employeeId || !startDate || !endDate){
    res.status(500).send("invalid parameters");
  }

  const timecards = await timeCardService.fetchByEmployeedId(employeeId, startDate, endDate);

  res.status(200).send(timecards);
  
});

export default router;
