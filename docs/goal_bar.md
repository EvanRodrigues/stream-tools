# Goal Bar

I developed this fundraising goal bar because there were limited options on [StreamLabs](https://streamlabs.com/). There is no way to have one bar to display your earnings through every revenue stream on Twitch. You would need three separate bars to show everything. This bar solves that problem by combining the profits from all your revenue streams on twitch.

#### How it Works

The bar utilizes the StreamLabs Socket API to update your stream earnings in real time. After a bit, subscription, or donation event triggers, the add-on will calculate your progress and update the bar seamlessly. If you have StreamLabs alerts on your OBS, the bar will update at the same time your alerts will go off.

#### How progress is calculated

Progress is calculated differently based on the revenue stream.

-   Bits: For each bit, one penny will be added to the progress.
-   PayPal Donations: The exact dollar amount (before any fees) of the donation is added to the progress.
-   Twitch Subscriptions:
    -   Tier 1 subscriptions will add \$5 to the progress.
    -   Tier 2 subscriptions will add \$10 to the progress.
    -   Tier 3 subscriptions will add \$25 to the progress.

**NOTE: The bar does not calculate fees for PayPal donations or Twitch subscriptions. Specifying how much you make for each subscription could get you in trouble with Twitch, so there's no option to customize your subscription value.**

#### Setup

1. You will first need to login with your Twitch account.
1. Navigate to the /goal page to input your settings.
1. Before the dashboard appears, new users will be required to enter their web socket token from streamlabs in order to update the bar properly. **NOTE: This token is meant to be confidential. Input this at your own risk.**
1. After submitting a web socket token, users can then change settings on the /goal page to customize their fundraising goal bar.

#### Bar Settings and Customization

Users can customize the information on the bar by inputting starting progress, goal target, and goal name values. Font and Font Size are not available at the moment. The bar can also be customized by color. Text color, background color, and each layer's color can be changed. Users can enter a color's hex code via text, or by selecting a color using the color picker.

#### Bar Layout and Animations

The display is very basic. The number on the left side is your progress, the number on the right side is your goal amount, and the text in the middle is the name of the goal (or what you're saving up for). The bar fills up 3 times so if you exceed your goal, the bar will still progress. The default colors for each layer of the bar are:

-   0% Progress: The bar is grey (empty).
-   1% - 100% Progress: The bar is green.
-   101% - 200% Progress: The bar is red.
-   Over 200% Progress: The bar is purple.
