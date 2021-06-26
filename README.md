# Student Management Backend

## Setup

### Add .env new variable
**FRONTEND_URL** is the new addition to the .env file, all could be found in .env.sample aside from frontend url.
It's the url of the frontend that would be whitelisted in cors. By default, frontend runs on port 9001.

```
  APP_PORT=4000
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=password
  DB_NAME=development-student-management
  DB_DIALECT=mysql
  DB_PORT=3306
  APP_HOST=localhost
  NODE_ENV=development
  FRONTEND_URL=http://localhost:9001
```

### Install dependencies
```javascript
  npm i
```

### Drop and create new db
This drops the existing db and creates a new one from the Models instead of migrations.
```
  npm run reset
```

### Seed
Insert initial data to db.

**script**:
```javascript
  npm run seed
```

**data inserted**:
```
  Students
    s1@gmail.com
    s2@gmail.com
    s3@gmail.com
    s4@gmail.com
    s5@gmail.com
    s6@gmail.com
  
  Tutors
    t1@gmail.com
    t2@gmail.com
    t3@gmail.com
```


## Running the app


### Rest API
This runs our express app:

```javascript
  npm run dev
```

### Tests
Before running the script, add your .env.test
```
  APP_PORT=4000
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=password
  DB_NAME=development-student-management
  DB_DIALECT=mysql
  DB_PORT=3306
  APP_HOST=localhost
  NODE_ENV=development
  FRONTEND_URL=http://localhost:9001
```

**Running the test cases**
```javascript
  npm run test
```
