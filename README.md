# stream-tools

Originally an OBS fundraising bar for twitch.tv, this project is now a platform that I use to distribute my twitch widgets to streamers. The project is currently hosted at stream-goal.herokuapp.com

## How it Works

The bar utilizes the StreamLabs Socket API to update your stream earnings in real time. After a bit, subscription, or donation event triggers, the add-on will calculate your progress and update the bar seamlessly. If you have StreamLabs alerts on your OBS, the bar will update when the alerts go off.

## Widgets

Currently the only widget available is a fundraising goal bar.

## User Registration (In Development)

New users will be registered when they login with their twitch.tv account for the first time.

## Goal Bar

#### Setup

To set up the bar you will first need to log in. Then you can navigate to the /goal page to input your settings. Before the dashboard appears, new users will be required to enter their web socket token from streamlabs in order to update the bar properly. **NOTE: This token is meant to be confidential. Input this at your own risk.** After submitting a web socket token, users can then change settings on the /goal page to customize their fundraising goal bar.

#### Bar Settings and Customization

Users can customize the information on the bar by inputting starting progress, goal target, and goal name values. Font and Font Size are not available at the moment. The bar can also be customized by color. Text color, background color, and each layer's color can be changed. Users can enter a color's hex code via text, or by selecting a color using the color picker.

#### Bar Layout and Animations

The display is very basic. The number on the left side is your progress, the number on the right side is your goal amount, and the text in the middle is the name of the goal (or what you're saving up for). The bar fills up 3 times so if you exceed your goal, the bar will still progress.

-   0% - 100% Progress: The bar is green.
-   100% - 200% Progress: The bar is red.
-   Over 200% Progress: The bar is purple.

## What I Learned

-   Developing an API using Node.js
-   React/Redux
-   Managing cookies
-   3rd party login with OAuth
-   Web sockets
-   How to work with the StreamLabs Socket API
