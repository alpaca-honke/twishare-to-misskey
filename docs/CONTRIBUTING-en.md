**[日本語版](CONTRIBUTING.md)もあります。**

# Contribution Guide

This is a guideline for contributing to this browser extension. It is not very formal, but please read it before contributing. (I wonder if anyone will read it.)  

## Issues

Issues are always welcome. Please keep the following in mind when creating an Issue.  

- Before creating an Issue, please check for similar content to avoid duplicates.
- The title of the Issue should be a brief summary of the content.
- If you are creating an Issue about a defect, please provide a detailed description of the defect and the conditions under which it occurred.
- If you are creating an Issue regarding a request, please describe the details of the request, etc.
- Please label your Issue appropriately.
    - At a minimum, please include one beginning with `Type:` and `Status: Open: pending` (or `Status: Open: in progress` if you are working on it immediately).
- Please do not put your question in an Issue. If you have a question, please feel free to contact us. (Depending on the content, we may put it in the FAQ.)

Other Issues are also welcome!

Please note that we generally do not assign Issues.

## Modifying or adding code

Please follow the instructions below.

### Before work

Please make a "I'll do it" comment on the new or existing Issue before working on it (to prevent duplicating the same work as me or others).  
Please follow the above Issue guidelines.

### Work in progress

- Do not modify the extension to store sensitive information such as authentication information including access tokens, as security cannot be guaranteed.
- Please change the strings displayed in pop-ups, etc. from each messages.json in the _locales directory, instead of writing them directly in the HTML.
We would also appreciate it if you could write dummy strings in the HTML to make the HTML easier to read.
- Keep in mind that the same code runs for both Chrome and WebExtensions (e.g. Firefox).  
- A shell script called switch_browser.sh and a batch file called switch_browser.bat are included in the repository root.
Please use it for testing in your browser.
    - If you grant execute permission and specify `chrome` as an argument, manifest.json for Chrome will be installed in the root.
    - If you specify `firefox`, manifest.json for Firefox will be installed.
    - If nothing is specified, manifest.json will be removed from the root.
- Follow the notation below as much as possible. (It's not that rigid, so I won't be offended unless it's written in a crazy way, but it would be nice if you could follow it)
    - Naming variables and functions is camelCase.
    - HTML id and class are snake_case
    - For quotes, use basic single quotes. Double quotes are also acceptable if there is a possibility of poor readability.

Please note that the docs directory and the switch_browser script will not be included in the package or release package to be submitted to the web store.
Also, the manifest.json files under the `chrome` or `webext` directories will be moved to the root when submitted to the webstore.

### Pull Request

Please submit a PR on the `develop` branch. I would appreciate a detailed description.

## Directory structure.

````
├── .gitignore
├── _locales Translations per locale
│   ├── en
│   │   └── messages.json English translated strings
│   └── ja
│       └── messages.json Japanese translated strings
├── assets Stores files used inside the extension
│   ├── icon.png Image of the floating share button in the lower right corner
│   └── share.png High-quality Twishare to Misskey icon
├── chrome File used only in Chrome
│   └─ manifest.json Manifest file
├── docs Documents
│   ├── CONTRIBUTING.md This document
│   ├── README.md Description
│   ├── images Images used in README
│   │   ├── floating.png
│   │   ├── option_ui.png
│   │   ├── popup.png
│   │   └── share.png
│   ├── installed.md Page displayed after installation
│   ├── notebutton.webp MisskeyShare's note button image
│   └── privacy.md Privacy policy
├── File used only in the Firefox version
│   └── manifest.json Manifest file
├── icons Icons for the extension
│   ├── 128.png
│   ├── 16.png
│   └── 48.png
├── js_and_css content_scripts and background(worker) files
│   ├── allpages.css CSS to be applied to all pages
│   ├── allpages.js JavaScript to be applied to all pages
│   ├── background.js JavaScript that runs in the background as a worker
│   └── on_twitter_intent.js JavaScript that runs on https://twitter.com/intent/tweet
├── options Files related to option_ui and popup
│   ├── options.css
│   ├── options.html
│   └── options.js
├── switch_browser.bat Shell script for installing manifest file (for Windows)
└── switch_browser.sh Shell script to set up the manifest file (for Linux)
````