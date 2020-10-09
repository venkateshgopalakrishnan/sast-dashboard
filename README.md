#### Welcome

This is a simple dashboard that helps users to store and retrieve scan results

The web app backend has been written in Python using Django connected to a PostgreSQL database, and the UI has been 
written in ReactJS. I have taken the liberty to serve the frontend app using Django instead of separately serving it 
using Node. The application has been containerized using Docker.

Let's go through the steps required to setup the application on the local machine after cloning the repository.
Its required to have Docker installed and setup prior to running the app in a docker container.

The first step is to install all the python dependencies required by the app by doing a `pip install -r requirements.txt` 
and then `npm install` for all node related dependencies/packages inside the client directory where the 'package.json' is present

