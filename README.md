# LifePlus challenge

## Intro / known limits

The repository contains one folder for api, one other for the app

The stack is composed of:

- node / mongodb / koa for the backend
- react and material-ui for the frontend

You can use the frontend app to manage all endpoints available in the api for each ressources, which is a bit more than expected.

I chose to stop the work one week after received the challenge which is i think acceptable for a home work. Here is a list of limit or things i wanted to implement before submitting but not done due to lack of time:

- there is no test on API, and we definitely should implement it, i usually use mocha / chai for this purpose
- you'll find some basics end-to-end tests in the frontent repository while i usually implement a lot in my projects
- did not implement environments, it means e2 tests uses the same database, which is obviously not recommended!
- no frontend build, app runs in dev mode
- no loading states as we run locally but should be implemented to be production ready
- deep frontend routing to directly edit stuff in admin area (ie: /admin/products/{id}/edit)

## Notes

You will find more information and documentation for the API in each folder

## Installation

Clone repository and use docker to run all the things

```sh
    git clone git@github.com:baptistelemoine/life-plus.git life-plus
    cd life-plus
    docker-compose up

    #api runs on http://localhost:9000/api/{ressource}
    #frontend runs on http://localhost:3000
```
