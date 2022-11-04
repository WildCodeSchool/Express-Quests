# Express-02-Read-from-the-database

💪 Challenge
Creating user routes
Your challenge is to:

Create a GET /api/users route, this route must send back a 200 status and a list of users from the database in a json format
Create a GET /api/users/:id route that will only return the user from the database matching with the id set in the url
If there is a user that matches the params, send back a response with a 200 status and the matching user as a json object
Else, return a 404 status with a message "Not Found"
Post an url to a GitHub repository with your full app as a solution.

🧐 Validation criterias
 The server is working
 The url /api/users displays the user list in a json format
 The url /api/users/2 displays one user in a json format
 The url /api/users/0 displays "Not found"