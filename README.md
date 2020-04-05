# s4-node-test-backend

Node.js proficiency test written to be relevant to S4 web team projects.

## Team / Project Context

S4, an acroynm for "Simple & Secure Self-Service" is the name of a web platform at Starbucks. It is a suite of self-service web tools that empower starbucks employees (partners) to quickly view and download data. The data that we provide through this tool is largely focused in the partner analytics domain - that is, we provide a wide variety of partner data points to a number of audiences within Starbucks.

One of our S4 web applications, the "Time Punch Lookup," is used every day by risk management and paralegal teams. They use this tool to precisely determine who was working in which store and when. This information proves to be incredibly useful in a court setting, particularly when an incidient occurs in the store.

The objective of this coding exercise is to build an API that transforms tabular timepunch data into a format that is more suitable for visualization in a web interface. We have pulled a sample of timepunch data that represents the tabular data that might be produced from a database query. This data needs to be transformed to the specification outlined in the sections below.

## Data Sample

**src/dal/mockTimePunchData.json**

```json
[
	{
		"STORE_ID": "123",
		"EMP_ID": "5551234",
		"BUS_DT": "2013-05-01T07:00:00.000Z",
		"TIME_PUNCH_DTM": "01-MAY-13 05:00:13",
		"SHIFT_ROLE_NM": "Barista",
		"PUNCH_RSN": "101"
    }

    ...
]
```

Description of fields:

-   _STORE_ID_ - The store the partner worked at
-   _EMP_ID_ - Employee ID, unique amoung starbucks employees
-   _BUS_DT_ - Business date. This is helpful, as sometimes baristas will clock in on one day and end their shift after midnight. The business date allows us to consolidate timepunch records that span across multiple days to a single date.
-   _TIME_PUNCH_DTM_ - The specific date and time of the time punch.
-   _SHIFT_ROLE_NM_ - Shift Role Name
-   _PUNCH_RSN_ - The reason for the timepunch. `101` indicates regular coffee-making, `MEAL` indicates a meal break was started and `OUT` means they've clocked out for the day.

To protect our partners, we have sanitized the data sample from any personally identifiable information (PII). Instead, the data has been masked to just the 3 following employee ids

-   7654321
-   1234567
-   5551234

We have pulled data for these partners from 05/01/2013 to 06/30/2013.

## API Specifications

### Input Paramaters

Data from this API should be accessible via GET request and query string parameters. We would like to be able to search using a date range and an employee id.

**Example Request:**
The following request would provide data from `05/02/2013` - `05/03/2013` for employee id `1234567`

```
https://localhost:3000/timepunch-api/timecards?startDate=05%2F02%2F2013&endDate=05%2F03%2F2013&employeeId=1234567
```

### Output Specification

For this section, the team came up with a view model that will allow for rapid front-end development. We would like the API to provide data in the shape outlined below in the example.

Things to consider:

-   Each day should be listed between the `startDate`, `endDate`, regardless of whether timepunch data exists
    -   note, for Thursday there were no timepunch entries.
    -   This will make visualization in the UI much easier.
-   For days that _do_ have timepunch data, we should provide each detail record for that day in an array called `items`
    -   Each detail item should have a field `DURATION_IN_MIN` which is the difference in time between the current entry and the next entry
    -   Note the `OUT` entries do not have a duration
-   For each day, we should also provide a `dailyTotals` of the time worked grouped by `SHIFT_ROLE_NM` and `PUNCH_RSN`
-   Finally, we should also provide a `grandTotals` of the time worked for the entire provided range, again grouping data by `SHIFT_ROLE_NM` and `PUNCH_RSN`

**Example output**

```json
{
	"items": [
		{
			"date": "05/02/2013",
			"dayOfWeek": "Thursday",
			"items": [],
			"dailyTotals": []
		},
		{
			"date": "05/03/2013",
			"dayOfWeek": "Friday",
			"items": [
				{
					"STORE_ID": "123",
					"TIME_PUNCH_DTM": "03-MAY-13 09:00:03",
					"SHIFT_ROLE_NM": "Barista",
					"PUNCH_RSN": "101",
					"DURATION_IN_MIN": 246.25
				},
				{
					"STORE_ID": "123",
					"TIME_PUNCH_DTM": "03-MAY-13 13:06:18",
					"SHIFT_ROLE_NM": "Barista",
					"PUNCH_RSN": "MEAL",
					"DURATION_IN_MIN": 30.066666666666666
				},
				{
					"STORE_ID": "123",
					"TIME_PUNCH_DTM": "03-MAY-13 13:36:22",
					"SHIFT_ROLE_NM": "Barista",
					"PUNCH_RSN": "101",
					"DURATION_IN_MIN": 233.98333333333332
				},
				{
					"STORE_ID": "123",
					"TIME_PUNCH_DTM": "03-MAY-13 17:30:21",
					"SHIFT_ROLE_NM": "Barista",
					"PUNCH_RSN": "OUT"
				}
			],
			"dailyTotals": [
				{
					"SHIFT_ROLE_NM": "Barista",
					"PUNCH_RSN": "101",
					"DURATION_IN_MIN": 480.23333333333335
				},
				{
					"SHIFT_ROLE_NM": "Barista",
					"PUNCH_RSN": "MEAL",
					"DURATION_IN_MIN": 30.066666666666666
				}
			]
		}
	],
	"grandTotals": [
		{
			"SHIFT_ROLE_NM": "Barista",
			"PUNCH_RSN": "101",
			"DURATION_IN_MIN": 480.23333333333335
		},
		{
			"SHIFT_ROLE_NM": "Barista",
			"PUNCH_RSN": "MEAL",
			"DURATION_IN_MIN": 30.066666666666666
		}
	]
}
```

## Additional Notes

Please feel free to add any npm package to come up with your solution. We have found `moment` and `lodash` to be particularly helpful in constructing APIs of this nature.

Please be sure to delete the `node_modules` directory before sending this project back to us.

Please also construct tests for your solution. We have provided a sample test that can be run with `yarn test` that uses `mocha` and `chai`, but if you would rather use a different testing framework, please feel free to do so.

If you are having trouble creating a complete solution, sending over a partial solution is OK! We would love to see any amount of this API completed with tests established to cover the logic you were able to complete.
