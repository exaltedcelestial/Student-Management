# Student Management Backend

## Setup

### Create Database
We need to create our database first to create tables, so we need to run the command:

```javascript
npm run db:create
```

### Create Tables
For this one, I opted to use the models instead of the migration files. To do this, we run:

```javascript
npm run db:sync
```

## Running the app

### Rest API
This runs our express app:

```javascript
npm run dev
```

### Tests
```javascript
npm run test
```
