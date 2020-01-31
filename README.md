WARNING: Documentation is out of date! I will be updating this in the coming weeks.

# Stream Goal
An OBS browser add-on to display a combination of bits, subscription earnings, and donations in one bar. StreamLabs has separate goal bars available as widgets, but there is no way to combine them through the StreamLabs dashboard.


## How it Works
The bar utilizes the StreamLabs Socket API to update your stream earnings in real time. After a bit, subscription, or donation event triggers, the add-on will calculate your progress and update the bar seamlessly. If you have StreamLabs alerts on your OBS, the bar will update when the alerts go off.


## ConnectionVars.js
This contains your socket token found in your StreamLabs settings. It is located in Settings > API Settings > Your Socket Api Token. Once you have your Socket API Token, you can set up ConnectionVars.js. Here is how the file should look:

```javascript
const socketToken = 'YOUR SOCKET TOKEN HERE';
```

## settings.js
This file contains all of the settings that the program will need to calculate your profits accurately and display the right information on screen.
* sub_value: This is the amount of money you net for each subscription. Default value is 2.50. This only needs to be changed if you receive more than $2.50 per subscription.
* goal_name: The displayed name of your fundraiser.
* goal: The target amount of money to complete your goal. Default value is 100.0


## Bar Layout and Animations
The display is very basic. The number on the left side is your progress, the number on the right side is your goal amount, and the text in the middle is the name of the goal (or what you're saving up for). The bar fills up 3 times so if you exceed your goal, the bar will still progress.
* 0% - 100% Progress: The bar is green.
* 100% - 200% Progress: The bar is red.
* Over 200% Progress: The bar is purple.


## Storage
The add-on does not run on a web server, so there needs to be a way to save progress using only the front-end. Using local browser storage will accomplish this. The bar will save progress when OBS is closed and even if it is updated.


## Resetting the Bar
If you want to reset your goal, set the reset progress variable in settings.js to true and also set your starting_value. After that, reset the add-on in OBS and change the reset_progress variable back to false. The bar will reset each time it is loaded if the reset_progress variable is set to true. If you want to start at 0 dollars set the starting_value to 0.00. NOTE: The goal and goal_name variables can be changed at any time.


## What I Learned
* How to run jQuery animations one after the other (not simultaneously).
* How to use local browser storage to store data on the front-end.
* How to design a progress bar.
* How to work with the StreamLabs Socket API.
