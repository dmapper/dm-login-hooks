# Dm-Derby-Login

Hooks for [derby-login](https://github.com/dmapper/derby-login)

Functionality:

- Scraping profile data such as first name, last name and avatar from social network profile
 when you register via social networks. Scraping works for next social networks:
 facebook, linkedin, google and twitter


## How to use it

Require dm-login-hooks and set its returned data to derby-login hooks option

```
var options = {
    hooks: require('dm-login-hooks')
};
```