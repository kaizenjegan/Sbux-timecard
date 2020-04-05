// var express = require('express');

import * as express from 'express'
const router = express.Router();

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
router.get('/', function (req, res, next) {
  // For days that _do_ have timepunch data, we should provide each detail record for that day in an array called `items`
  res.status(200).send('yo its the timecard');
});

export default router;
