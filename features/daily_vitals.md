# Daily Vitals Feature

The daily vitals feature allows users to input, edit, delete, view, and see trends related to selected daily vitals.

A set of default daily vitals will be provided by the application and include:
- sleep duration (hr and min)
- resting heart rate (beats per minute or bpm)
- heart rate variability or HRV (ms)
- weight (lbs or kg)
- body composition (% body fat).

Additionally, users should be able to define their own daily vitals that they want to track. 
- Each daily vital will be comprised of a name and a unit of measure.
- The daily vital is intended to be a numeric value.
- There should be a unique constraint on vital name, unit of measure, and user id meaning that users would not be able to create a custom metric that matches a default; however, they could create a sleep metric measured in min for example.
- Disabling a default daily vital does not allow the user to create a custom daily vital using its name and unit of measure.

There should be a daily vitals overview page where users can view vitals trend analysis showing the 30-day, 3-month, and 1-year averages. As well as the last 7 days worth of vitals.
- Missing data should be omitted from any average calculations.
- To stay true to the app ethos, we don't want to provide any vital based insights; however, a future enhance could flag and display an alert to the user if a significant amount of data is missing.
- Additionally, users should be able to enter a new days vitals from this page.
- The date for the vitals should default to the current date but should be a date picker so that the user could select a different day to enter vitals for (for example, if they forget to log data for a given day they may need to enter a past date). The user may only input a single set of daily vitals for a given day but can update or delete a previous day's vitals.
- Averages should be displayed both numerically and via a line chart.
- Longer term averages should be displayed and calculated immediately; however, will provide meaningful data once the user has been logging vitals for that length of time.

There should also be a daily vitals history page where users can view a table of all daily vitals entered.
- The table will be paginated
- The table will be sortable by date
- The table will be searchable/filterable by date range and by which vitals have data
- The table will have edit/delete actions per row
- Disabled daily vitals will not show on the table

The default daily vitals will be enabled by default but users should have the ability to disable any of the default daily vitals in the same settings menu where they can create new daily vitals.
- If the user disables a certain vital, it will not delete any data, but rather remove that vital from the display page, from the input form, and from API responses.
- Re-enabling it would restore it.

Users should have the ability to export their daily vitals data.
- The export should include any hidden data
- The ability to customize the daily vitals export is out of scope for the initial implementation

Validations
- Sleep should be between 0 hr 0 min and 24 hr 0 min
- Resting HR should be a positive integer
- HRV should be a positive integer
- Weight should be a positive number
- Body composition should be a positive number
- Validating custom daily vital ranges will be out of scope for initial implementation but could be added in the future. Users would need to be able to define their own validation rules for custom daily vitals.