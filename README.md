## Joberino

![dk](https://i.imgur.com/hMfFHoj.gif)

### What it do

Joberino pulls listings in the last 24hrs and adds them to a Postgresql database and avoids duplicates based on company and job title. So no 2 'IBM - Software Engineer' roles. The idea is that it makes it easier to keep track of the 'new' job postings without having to see all the senior jobs and stuff you have viewed already.

Currently you can save a listing, mark it as applied, or ignore the job posting. As of right now there's no filtering based on saved or applied jobs, but that should be implemented soon~ish.

Feel free to make PR's

#### Some notes on sources:

- Built in NYC is the quickest to scrape
- LinkedIn takes about 5mins to scrape to avoid being logged out or marked as a bot. Especially since you're using your own login information.
- Indeed is largely useless as it rarely has jobs that aren't already on LinkedIn or other sites.
  - They also have agressive popups and there's a 3rd popup I never got to see the HTML for. Scraping could fail and you'll need to refresh the page and que Indeed again.

### Installation

This is the React frontend repo. There's not much to install here so make sure you follow the [API install directions](https://github.com/denvermullets/joberino-portal-api).



```
npm install
npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.