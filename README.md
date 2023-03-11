## Run project locally

1. If nvm is not installed then install it using the commands listed on the NVM Readme on GitHub `https://github.com/nvm-sh/nvm#installing-and-updating`, otherwise skip to step 2.

2. Install npm using the command `nvm install v18.14.0`

3. In default.json there are following environment variables. Update them according to your need.
```
{
  "dbConfig": {
    "host": "localhost",
    "port": 5984,
    "dbName": "customers",
    "user": "usernmae",
    "password": "password"
  },
  "port": 3000
}
```

4. RUN `npm install`.

5. Run `npm start` to start the server.
