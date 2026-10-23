# Clock Widget for Echo Show

An Alexa skill that adds a clean date and time widget to the Echo Show widget panel.

The widget is a single APL document. It reads the device's live `localTime`, so it updates on its own with no server calls. Tap it to switch between 12-hour and 24-hour time. The Lambda backend only answers "how do I…" questions and acknowledges Data Store package events.

```
skill-package/
  skill.json                                   skill manifest (interfaces, locales, privacy)
  interactionModels/custom/en-GB.json, en-US.json
  dataStorePackages/ClockWidget/
    manifest.json                              widget package manifest (WIDGET_M, HUB only)
    presentations/default.tpl                  ties the document to its data source
    documents/document.json                    the APL widget
    datasources/default.json                   all user-facing settings
lambda/
  index.js, package.json                       ask-sdk-core handlers
assets/                                        preview and icon PNGs for the console
```

## Settings (`datasources/default.json`)

Everything under the `clock` object can be changed without touching the APL document.

| Setting | Values | Default | What it does |
|---|---|---|---|
| `timeFormat` | `"24h"`, `"12h"` | `"24h"` | Starting time format. Tapping the widget flips it until the widget reloads. |
| `showSeconds` | `true`, `false` | `false` | Adds `:ss` to the time. |
| `showAmPm` | `true`, `false` | `true` | Shows AM/PM next to the time in 12-hour mode. Ignored in 24-hour mode. |
| `dateStyle` | `"long"`, `"short"`, `"numeric"`, `"us"`, `"iso"`, `"none"` | `"long"` | `long` is "Friday, 23 October 2026". `short` is "Fri 23 Oct". `numeric` is 23/10/2026. `us` is 10/23/2026. `iso` is 2026-10-23. `none` hides the date. |
| `size` | `"small"`, `"medium"`, `"large"` | `"medium"` | Scales the text to 60%, 80% or 100% of the largest size that fits. |
| `tapToToggle` | `true`, `false` | `true` | Whether a tap switches between 12-hour and 24-hour time. |
| `textColor` | hex colour | `#FFFFFF` | Time colour. |
| `dateColor` | hex colour | `#9FB3C8` | Date colour. |
| `backgroundColor` | hex colour | `#0F1A24` | Widget background. |
| `dayNames` | 7 strings, Sunday first | English | Day names. Translate these to localise the date. |
| `monthNames` | 12 strings, January first | English | Month names. |

Text size is worked out from the viewport, so the time and date always fit on one line.

## Setting it up in the Alexa developer console

For a step-by-step checklist with links to each file, see [docs/console-setup.md](docs/console-setup.md).

### 1. Create the skill

1. Go to <https://developer.amazon.com/alexa/console/ask> and click **Create Skill**.
2. Name it **Clock Widget** and set the primary locale to **English (UK)**.
3. Choose **Other**, then **Custom** model, then **Alexa-hosted (Node.js)** as the backend. Pick the hosting region nearest to you.
4. Choose **Start from Scratch** and create the skill.

### 2. Interaction model

1. Go to **Build → Invocations → Skill Invocation Name** and set it to `clock widget`.
2. Open **Interaction Model → JSON Editor**, paste in `skill-package/interactionModels/custom/en-GB.json`, and click **Save**.
3. To support English (US) as well, add the locale from the language drop-down and paste `en-US.json` into its JSON Editor.

### 3. Interfaces

Go to **Build → Interfaces** and turn on:

- **Data Store Packages**
- **Data Store**
- **Alexa Extensions**, then add the Data Store extension `alexaext:datastore:10`

Click **Save Interfaces**. Together these add the three entries under `apis.custom.interfaces` in `skill.json`.

### 4. Widget

1. Go to **Build → Multimodal Responses → Widget** and create a new widget. Name it exactly **ClockWidget**.
2. In the authoring tool, paste `documents/document.json` into the APL editor and `datasources/default.json` into the Data tab.
3. Set the widget metadata (name "Clock", description, keywords) from `dataStorePackages/ClockWidget/manifest.json`. Upload `assets/widget-icon-450.png` as the icon and `assets/widget-preview-328x552.png` as the preview.
4. Save the widget.

### 5. Code

1. Open the **Code** tab.
2. Replace `lambda/index.js` and `lambda/package.json` with the files from this repo.
3. Click **Save**, then **Deploy**.

### 6. Rebuild

Go back to **Build** and click **Build skill**. Wait until the build succeeds.

### 7. Install on your Echo Show

1. Go to **Build → Multimodal Responses → Widget**, open **ClockWidget**, and click **Install → Send to Device**. Pick an Echo Show registered to your developer account.
2. On an **Echo Show 15**, swipe open the widget panel. The clock should be there; if not, add it from the widget gallery.
3. On **smaller Echo Shows** (5, 8, 10), open widgets from the widget shortcuts on the home screen, then add Clock from the gallery.
4. Tap the clock to check that 12/24-hour switching works.

To test the voice side, open the **Test** tab, set testing to **Development**, and say "open clock widget" or "ask clock widget how do I add the widget".

## Sharing it

### Beta Test (friends and family, no certification)

1. In **Distribution**, fill in the store listing. Use `assets/skill-icon-108.png` and `assets/skill-icon-512.png` for the small and large icons. Fill in the privacy and compliance answers too.
2. Go to **Availability → Beta Test**, add up to 500 testers by email, and start the test.
3. Each tester gets an email invite. They accept it with the Amazon account their Echo Show uses, then add Clock from the widget gallery.
4. A beta lasts 90 days. You can end it or start a new one at any time.

### Certification (public in the Alexa Skills Store)

1. Complete **Distribution**: store listing, icons, privacy and compliance, and the countries/regions to publish in.
2. Run **Certification → Validation** and fix anything it flags. **Functional test** checks the endpoint and interaction model.
3. Click **Submit for review**. Amazon tests the skill and the widget, and emails you the result, usually within a few business days.
4. Once approved, the skill goes live. Anyone can enable it and add Clock from their Echo Show widget gallery.

Once the skill is live, edits are made in a new development version, which has to be certified again before it replaces the live one.

## License

MIT. See [LICENSE](LICENSE).
