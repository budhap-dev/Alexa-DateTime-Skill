# Clock Widget console setup

Set up the Clock Widget skill in the Alexa developer console and get it onto your Echo Show in about 20–30 minutes. Tick each box as you go. Amazon updates the console often, so a button may have a slightly different name, but the order of steps stays the same.

## Before you start

- **Amazon account:** sign in to the console with the same account your Echo Show uses. Testing on the device only works that way.
- **Files:** everything you paste comes from this repo. On GitHub, open a file and use its copy button to grab the contents.
- **Cost:** free. The Alexa developer account, Alexa-hosted backend, beta testing and certification are all free.

| What you paste | Repo file |
| --- | --- |
| Interaction model | [en-GB.json](../skill-package/interactionModels/custom/en-GB.json) |
| Backend code | [lambda/index.js](../lambda/index.js) and [lambda/package.json](../lambda/package.json) |
| Widget layout | [document.json](../skill-package/dataStorePackages/ClockWidget/documents/document.json) |
| Widget settings | [default.json](../skill-package/dataStorePackages/ClockWidget/datasources/default.json) |
| Widget name, description, keywords | [manifest.json](../skill-package/dataStorePackages/ClockWidget/manifest.json) |
| Widget icon and preview | [assets/](../assets) |

## Step 1: Create the skill

- [ ] Open [the Alexa developer console](https://developer.amazon.com/alexa/console/ask) and click **Create Skill**.
- [ ] Name it **Clock Widget** and set the primary locale to **English (UK)**.
- [ ] Choose **Other** as the experience and **Custom** as the model.
- [ ] Choose **Alexa-hosted (Node.js)** for hosting, in the region nearest you (EU for the UK).
- [ ] Choose **Start from Scratch** and click **Create Skill**. Setup takes a minute or two.

## Step 2: Interaction model

- [ ] Go to **Build → Interaction Model → JSON Editor**.
- [ ] Delete everything there, paste in **en-GB.json**, and click **Save**.
- [ ] Check **Invocations → Skill Invocation Name** reads `clock widget`.
- [ ] Click **Build skill** and wait for "Build successful".

To support English (US) as well, add the locale from the language drop-down and paste [en-US.json](../skill-package/interactionModels/custom/en-US.json) into its JSON Editor.

## Step 3: Interfaces

- [ ] Go to **Build → Interfaces**.
- [ ] Turn on **Data Store Packages** and **Data Store**.
- [ ] Under **Alexa Extensions**, add `alexaext:datastore:10`.
- [ ] Click **Save**.

If the console says widgets also need **Alexa Presentation Language**, turn that on too.

## Step 4: Code

- [ ] Open the **Code** tab. You'll see `index.js`, `package.json` and `util.js` under `lambda`.
- [ ] Replace the contents of **index.js** with the repo's `lambda/index.js`.
- [ ] Replace the contents of **package.json** with the repo's `lambda/package.json`.
- [ ] Leave `util.js` and the other files as they are.
- [ ] Click **Save**, then **Deploy**, and wait for "Deployment successful".

## Step 5: Widget

This is the first real test of the widget, so take your time with the preview.

- [ ] Go to **Build → Multimodal Responses → Widget → Create Widget**. Choose **Blank** if it asks.
- [ ] Name it exactly **`ClockWidget`**.
- [ ] In the authoring tool's **APL / Code** panel, replace everything with **document.json**.
- [ ] In the **Data** panel, replace everything with **default.json**.

Check the preview:

- [ ] The time and date both show, and nothing is blank.
- [ ] Clicking the clock switches between 12-hour and 24-hour time.
- [ ] In the data, `"timeFormat": "12h"`, `"showSeconds": true` and `"dateStyle": "short"` each change the clock as expected.

If there are errors or blank text, screenshot the preview and any error panel and send them to Claude. The likeliest cause is the `size` lookup in `document.json`, which can be rewritten as a plain condition.

Then fill in the widget details, using the values in **manifest.json**:

- [ ] **Name:** Clock.
- [ ] **Description** and **keywords:** copy them from `manifest.json`.
- [ ] **Icon:** upload `assets/widget-icon-450.png`.
- [ ] **Preview:** upload `assets/widget-preview-328x552.png`.
- [ ] Click **Save**.

## Step 6: Rebuild and test the voice side

- [ ] Go back to **Build** and click **Build skill** again, now that the interfaces and widget are in place.
- [ ] Open the **Test** tab and set testing to **Development**.
- [ ] Type `open clock widget`. It should read out the how-to instructions and end.
- [ ] Type `ask clock widget how do I change the format`. It should give the same instructions.

## Step 7: Put it on your Echo Show

- [ ] On the Echo Show, check the language is **English (UK)**: Settings → Device Options → Language.
- [ ] In the widget editor, click **Install → Send to Device** and pick your Echo Show.
- [ ] **Echo Show 15:** swipe in the widget panel, tap **+** or edit to open the gallery, find **Clock**, and add it.
- [ ] **Smaller Echo Show:** open widgets from the home-screen shortcut, then add **Clock** from the gallery.
- [ ] Tap the clock and check it switches between 12-hour and 24-hour time.

## If it doesn't show up

- **Language and account:** the device language must match English (UK), and the device must be on the same Amazon account as the console.
- **Testing:** Development testing must be on (step 6).
- **Logs:** in **Code → CloudWatch Logs**, look for `DataStore event:` lines. If they're there, the widget reached the device and the problem is on the display side.
- **Still stuck:** send Claude a screenshot of what you see, and the fix goes in as a PR.

The **Distribution** section (store listing, privacy, icons) can wait until you want to share the skill. The [README](../README.md#sharing-it) covers Beta Test and certification.
