# Power Adventures

## Description
Development of this basic idle game was inpired by Adventure Capitalist game. Where the basic idea is to generate energy intead of money, energy plants need to be acquired to generate more power to upgrade the plants and acquire more energy plants.

The way to gain energy in Power Adventures is once you’ve acquired a power plant, you need to click on the power plant that will take some time to harvast energy. Once done, you can click again.
In order to automate this, you can acquire the automation system that can run the power plant for you, so you don’t have to click manually anymore. Then you can upgrade the power plant and generate even more energy.

## Solution
A client and server implementation was developed using TypeScript for this solution.

The server plays the part of collecting generated energy from the different clients and provides the global energy stats on the client side. It was developed using TypeScript to reuse some of the client's code.

The client side was developed to run on the Web using a SPA type solution.
The project setup was created using the Vue CLI that out of the box adds support for TypeScript, ESLint, Unit Testing, Babel and other modules.
Vue.js is used to facilitate the presentation layer and user interaction.

Client communicates with server using http requests. But server is not required to run for client to work, except the functionality of World Stats (where combined energy produced by all users is displayed by clicking on the top right lamp).

### Development
A TDD aproach was used to the development of the core part of the game, mainly the data layer behaviour. Before any visuals were developed, the main features of the game were created as tests were made.
Given the nature of the game, a deterministic solution was created where given a certain state, it is possible to calculate the result for any point in time.
Most of the game behaviour and logic was enclosed within the data layer itself, giving more control and less freedom for the visual layer to interfere with the designed rules.
Although the theme of the game is (clean) energy, the implementation is completly abstracted from that reality and any currency and 'business' types can be used.
The fundamental data is fed into the application using configuration files so it can be easely changed without changing the code.

The design is mostly data-driven, where initial data is loaded to constitute the fundamental properties of the game. LocalStorage is used for game's state persistance. The state itself triggers actions like unlocking an energy plant, an upgrade or an automation system. User interaction basically just feeds data.

NOTE:
The name that is requested in the welcome screen it will be used as key when sending state to server. Two clients using the same name will override each outher.

### TODO (considering production)
- Preloader  - progress animation while the game is loading
- FTUE - give players some tips of the basics of the game
- regression tests - a more complete set of tests that can validate how data is presented and when
- analytics - to colect behaviour of players in the game to find areas of improvement

## Pre-requirements
node version: v14.3.0+

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development (client)
```
yarn serve
```
### Run server
```
ts-node server/main.ts
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Run tests
```
yarn test
```
