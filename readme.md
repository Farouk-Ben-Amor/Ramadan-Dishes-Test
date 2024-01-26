# Overview
Welcome to the Ramadan Cooking App! This project provides two main functionalities:
- Cooking Time Calculation:
It aims to find the estimated cooking time for a dish based on the day of Ramadan and the ingredients you have. The calculation takes into account the prayer times, specifically Asr and Maghrib.
- Random Dish Suggestions:
 suggest a random dish for your iftar. The suggestion considers the day of Ramadan, ensuring surprises for your meal 😏.

## Project Structure
The project is organized into three main controllers:
 - server.js
 - cookingcontroller.js
 - suggestionscontroller.js
Utilities :
  - dishesutils.js
Tests :
  - cooktime.test.js
  - dishes.test.js

## Dependencies

- Express
- Moment.js
- Axios
- Cors

## Assignment

- ✅ Modern utilities
- ✅ clear structure
- ✅ Formatting & Linting
- ✅ Dynamic data inside the project
- ✅ Testing
- ✅ Simplicity : Keeping it simple as much as possible

## Choices

- I fetched the dishes data from the json file , i tried to fetch from the given url but its timestamp is changing each day and that may cause issues 
- I used moment js and moment hijri to deal with islamic hijri months
- i chose to get the date of upcoming ramadan dynamically instead of inserting it statically
- i saw that lot of code repeating so i export it as functions easily to use them from dishesUtils 
- I also have something special on day 14 and 27 of ramadan in /suggest endpoint 🎁 
- I used Vitest instead of Jest because of its simplicity and lightweight nature, making it a perfect fit for testing the specific endpoints in my project.


### Linting and Testing
- ESLint :
  Run the linting script with npm run lint. The --fix option automatically fixes fixable issues.
- Testing with Vitest :
  The project includes tests for the cooking time calculation and dish suggestions using Vitest. 
  Run tests with npm test. Note: Ensure that the API server is running when testing the cooking time endpoint.

### How to Use

> Calculate Cooking Time: 
 Make a GET request to /cooktime with parameters day and ingredient. Example: /cooktime?day=5&ingredient=Chicken
> Get Random Dish Suggestions: 
 Make a GET request to /suggest with the parameter day. Example: /suggest?day=15