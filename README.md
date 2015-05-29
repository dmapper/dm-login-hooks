# Dm-Derby-Login

It is Derby login &amp; register module. Dm-derby-login is modified version 
of [derby-login](https://github.com/dmapper/derby-login)

Additional functionality:

- Scraping profile data such as first name, last name and avatar from social network profile
 when you register via social networks. Scraping works for next social networks:
 facebook, linkedin, google and twitter


## Installation

### Add next string to your packege.json dependencies

    "dm-derby-login": "git://github.com/dmapper/dm-derby-login"
    
### Reinstall your project node modules

## Setting

### Step 1. Require

    var derbyLogin = require('dm-derby-login');

### Step 2. Options (take a look at [default options](https://github.com/derbyparty/derby-login/blob/master/lib/defaultOptions.js))

    var options = {};


### Step 3. Middleware

    .use(express.bodyParser()) //should be upper
    .use(derbyLogin.middleware(store, options))

