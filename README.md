
# **Airblue's Aircraft Hours & Cycles Desktop Application**
----------
### **Story behind this App**
This application was created as a self initiative by me for my workplace. In order for you to understand why I had to take this initiative I will first need to explain what Hours & Cycles actually mean in an Airline. 

**Hours** = Total Duration of time aircraft has flown in a day or after manufacturing date, 
i.e for a day 02:00 hrs , and from birthdate 300:00 hours.

**Cycles** = Total number of how many times aircraft has gone airborne in a day or after manufacturing date,
 i.e for a day 02 cyc , and from birthdate 120 cyc.

**What purpose do these figures serve?**

Well an Aircraft has many components that need to go through certain checks for a given duration of time or number of cycles, And for that to happen we need to maintain database for all the components of an aircraft along with the current number of hours and cycles aircraft has flown.

**What is the benefit of this Application?**

This application has removed one of the excel sheet from my workplace, That excel sheet needed to be updated on daily bases to be sent in an E-mail to concerned departments. So this app eliminates the need for each individual cell editing of an excel sheet, Instead it only asks for certain required entries and calculates rest of this things on it's own using a time addition script I wrote myself. Users can simply click a button to copy the generated table and can send it in an E-mail.

In short this app helps speed up the process of daily status update.


----------
### **Features list**

This is the list of features this application possesses.

 1. New Aircraft can be added to database along with all the necessary details this status needed to include. This form also prevents user from making duplicate entries.
 2. Aircraft can be removed when ever needed using a simple drop down list.
 3. Aircraft data can be updated using the update form that utilities the calculation required to parse the data.
 4. In case if hours our cycles don't match our other records because of a typing error, Entries can be simply adjusted by re-entering the correct data once again.
 5. Correction of data happens using conditional programming of the Update form, So whenever the user enters a value greater the the one in the database the difference between the two entries is added to database and Vice versa.
 6. In case if a user has missed to reset Maintenance Checks A & C on required time, There is an Adjust Checks Form that takes in the Hours when the Check was last performed and updates the database after doing necessary calculations.
 7. Estimator Table, This feature helps the user to estimate Air-frame hours by allowing the user to type in their desired values and displays the results in real-time. This table also can be printed by the user.
 8. Copy to clipboard is a single click away. so user can easily use this table in Emails.
 9. Table can be printed using the print button.
 10. Each Form that has access to directly update data asks for a confirmation before updating database.
 11. Forms that require user to type some data have reset buttons with them, So users can reset forms whenever required.
 12. Aircraft Status can also be displayed by selected the desired condition of aircraft from drop down.
 12. Application stores all it's data inside a folder named DB, So moving or copying this app to other computers can simply be done by copying the folder to other PC's. Alternatively this folder can be shared in local network so all PC's can access updated data directly.


----------
### **Installation & Usage**

Steps to Install are as follows.

 1. Download this repository as [zip](https://github.com/nawazishali/Airblue-Hrs-Cyc-Application/archive/master.zip).
 2. Extract to where ever you desire.
 3. Open folder where extracted.
 4. Run Airblue TLP Status.exe by double clicking on it.
 5. This app comes with some demo Aircraft Data. So feel free to play around with it before utilizing it.


----------
### **Changelog**

Jan 4, 2017

 - Update form used to take current days total flying details, Users were having trouble updating the data whenever they had to update two or three days of data at once, i.e They needed to update each days data one after another, Also there was no way users could revert entries or undo changes if they did something wrong. So to resolve these issue following changes were made.
 - Update form now takes Total Air-frame Hours & Cycles, Users no longer have to update a single entry multiple times. Form takes care of all that hassale and updates the data by calculating difference between current and last entry.
 - Users can know Re-enter correct data in case of an accidental key-press and form adjusts all the entries where ever needed. 

Dec 30, 2016

 - TLP Range column set to have a fixed width necessary to tackle some table issues when entry is too long.

Dec 23, 2016

 - Added new fields in Add New Aircraft Form to include APU Hours, Airframe MSN, Engine ESN & APU SN.
 - Necessary changes made to table generator function so that  these new details can be displayed.


----------
### **Features For Future**

 1. Add an option that calculates & displays remaining days & an estimated date as per user entered values for all Aircraft Checks.
 2. Add an Hours Calculator for users so that they can calculate hours easily without the need of paper. (This feature is not required for this app itself but will be pretty useful for my colleagues).


----------
### **Libraries & Links used** 
Will be added later as soon as I get some extra time.


> Written using [StackEdit](https://stackedit.io/) by [Nawazish Ali](https://nawazishali.github.io).
