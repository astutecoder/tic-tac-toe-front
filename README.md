Tic Tac Toe Frontend
===================
Simple and traditional Tic-Tac-Toe game made with `React.js`. 2 players can play on the same web browser. Maintains browser page session to give users a consistent gameplay experience.
This project is meant to work along with **[Tic Tac Toe Backend](https://github.com/astutecoder/tic-tac-toe-back "Backend Project")**. Backend project is aiming to store gameplay activity log by consuming api calls from frontend application.

## Prerequisites

> if **Docker Client** is not installed in your system, you must need dedicated environment setup.
- Nodejs

**Note:** Backend project should be running. If backend project is running on different port rather than default port, you should update api endpoint's base url in `/src/store/activity/actions.js` file of this project.

## Set-up

[Download](https://github.com/astutecoder/tic-tac-toe-front/archive/master.zip "download zip file") or [Clone](https://github.com/astutecoder/tic-tac-toe-front.git "copy project https link") this project in your desired location.  
If you have docker client installed in your system, open your favourite terminal / command line and change location to your project directory. Now run the following command:

```javascript
docker-compose up --build
```

You can run docker containers in demon mode:
```javascript
docker-compose up -d --build
```

***Incase you don't have docker client***  
Run the following commands:
```javascript
npm install
```
after the installation is completed, run:
```javascript
npm start
```
project will run on port ***4568***.

## State and Props
Redux is being used to maintain game state. You can find redux store under `/src/store` folder.

## Features
[x] Page refresh won't hamper gameplay  
[x] Pause and Resume  
[x] Game Restart  
[x] Activity Log (session-wise)  

___
Visit **[Tic Tac Toe Backend Project](https://github.com/astutecoder/tic-tac-toe-back)**
___