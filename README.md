[![Build Status](https://travis-ci.org/andela-mabdussalam/restaurant-app.svg?branch=chore%2Fadd-hound-travis-coveralls)](https://travis-ci.org/andela-mabdussalam/restaurant-app)
[![Coverage Status](https://coveralls.io/repos/github/andela-mabdussalam/restaurant-app/badge.svg?branch=chore%2Fadd-hound-travis-coveralls)](https://coveralls.io/github/andela-mabdussalam/restaurant-app?branch=chore%2Fadd-hound-travis-coveralls)

# Restaurant App
A full stack System that a user order for food from a restaurant.


## Technologies Used
- React Native
- React/Redux
- GraphQL
- Apollo
- Graphcool


## Development
This application was developed using [Expo](https://expo.io/) using [Genymotion](https://www.genymotion.com/fun-zone/) as the emulator to test the app. [Graphcool](https://www.graph.cool/) was used to develop and deploy the GraphQL backends.

The frontend was built with the [React-Native](https://facebook.github.io/react/) and [redux](reduxjs.org) framework.



## Installation
- Install [Expo](https://expo.io/) and [Genymotion](https://www.genymotion.com/fun-zone/) on your machine
- Clone the repository `$ git clone https://github.com/andela-mabdussalam/restaurant-app`
- CD into the directory you cloned into
- Install all required dependencies with `$ yarn install`


## Testing (Server Side)
- Run Test `npm test`

## Usage
- Launch Expo, open the app within expo
- Launch Genymotion and open a phone of your choice
- On Expo, click device -> Open on android

#### Key Application Features
A user can:
    - Create an account
    - Login
    - Search for a meal
    - Order a meal
    - Logout.

**Authentication**:
Users are authenticated and validated using JSON web token (JWT) stored in the AsynStorage.

## Usage on phone
- Download expo from the play store
- Search for restaurant-app


## Limitations
- Pagination is not integrated yet, and so as the documents grow in numbers, locating them becomes a difficult process
- A non-admin user cannot request to be upgraded to an admin
