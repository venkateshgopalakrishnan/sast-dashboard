### Welcome

This is a simple dashboard that helps users to store and retrieve scan results

The app resides in Github repo https://github.com/venkateshgopalakrishnan/sast-dashboard 
and is deployed in Heroku accessible from the url https://sast-dashboard.herokuapp.com/

The web app backend has been written in Python using Django connected to a PostgreSQL database, and the UI has been 
written in ReactJS. I have taken the liberty to serve the frontend app using Django itself instead of separately 
serving it using Node to avoid the complexity of serverside rendering. 
The application has been containerized using Docker.

The steps required to setup the application on the local machine after cloning the repository are,
 - Its required to have Docker installed and setup prior to running the app in a docker container
 - After clone, change the base urls in the files Dashboard.js, ResultPage.js, ResultForm.js to localhost urls as per the comments provided in code
 - Its required to build the react app after this change using `npm run build`. The build version is referenced as static 
 in Django so that Django would serve the UI in the same server
 
##### To be implemented/extended/enhanced in the future (Couldn't be done due to the time crunch)
 - Unit Tests for both Django and React app
 - Removing findings in the Add result form page in the UI. Currently its only possible to add findings boxes.
 - Disable clicking on Findings Labels on the dashboard if there are no findings for that result
 - Render findings labels on Dashboard based on type of severity


