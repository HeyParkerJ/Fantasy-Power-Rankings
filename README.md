* Setup
- Enter both the app and server directories and run npm install
- Install mongodb locally with `npm install --save mongodb`
- Stuff the mongodb `userlogins` collection with data provided in slack
  - To perform this, I recommend downloading an application called 'Robo 3T' that is basically a graphical mongodb browser.
  - Once downloaded and connected to the 'test' db, create a collection called 'userlogins', right click, insert documents, then paste the JSON provided in Slack
  - The userlogins collection should now be filled with all 10 login informations.
  - Done!

*  Running app locally
- In the app/ directory, simply run npm start
- In the server/ directory, run npm start
  - Note: There's currently an issue ( #7 ) with hot reloading the server. This will need to be repeated until that bug is fixed.
- In a third shell window, run `mongod`
- Browse to `http://localhost:3000/` and you should be able to browse the application!
