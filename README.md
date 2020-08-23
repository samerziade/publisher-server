# Publisher Server

## Node Version

This program was developed and tested using Node 14, but should be able to run using Node 10.

---

## Setting Up

Bring up the containers to start the MySQL server:

```bash
npm run db:up
```

Wait for the server to start by watching the logs:

```bash
npm run db:logs
```

Once the server is up and running stop the logs with `ctrl+c`

Create the database schema by loading [mysql/schema.sql](msyql/schema.sql):

```bash
npm run db:schema
```

You can connect to MySQL client using:

```bash
npm run db:client
```

---

## Unit Tests

All unit tests are in place with 100% coverage. To execute them run:

```bash
npm test
```

---

## Running

To run the server:

```bash
npm start
```

### Subscribing

To subscribe to `topic1` and have the messages viewable on `/event1`:

```bash
curl -X POST \
     --data '{"url": "http://localhost:8000/event1"}' \
     -H "Content-Type: application/json" \
     http://localhost:8000/subscribe/topic1
```

### Publishing

To publish an event to `topic1`:

```bash
curl -X POST \
     --data '{"messages": "message 1"}' \
     -H "Content-Type: application/json" \
     http://localhost:8000/publish/topic3
```

### Viewing

```bash
curl -X GET http://localhost:8000/event3
```
