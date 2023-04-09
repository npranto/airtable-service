# Airtable Service

This module is an API container for **Airtable** that provides methods to perform CRUD (Create, Read, Update, Delete) operations on an Airtable database.

## Installation

To use this module, first install it using npm:

```bash
npm install @npranto/airtable-service
```

## Usage

To use this module, import it into your file and invoke it with config object:

```js
const AirTableService = require("@npranto/airtable-service");

const AirService = AirTableService({
  AIRTABLE_BASE_ID: "<YOUR_BASE_ID>",
  AIRTABLE_TABLE_NAME: "<YOUR_TABLE_NAME>",
  AIRTABLE_API_KEY: "<YOUR_API_KEY>",
});
```

## API

> ### airServiceLog()

Logs the current version of the Airtable service.

#### Example

```js
const AirTableService = require("@npranto/airtable-service");

const AirService = AirTableService({
  AIRTABLE_BASE_ID: "<YOUR_BASE_ID>",
  AIRTABLE_TABLE_NAME: "<YOUR_TABLE_NAME>",
  AIRTABLE_API_KEY: "<YOUR_API_KEY>",
});

AirService.airServiceLog();
```

> ### getAllRecords(config)

Retrieves all records from a specific table in Airtable.

Returns a Promise that resolves to an array of records.

Throws an error if unable to retrieve records from Airtable.

#### Example

```js
const AirTableService = require("@npranto/airtable-service");

const AirService = AirTableService({
  AIRTABLE_BASE_ID: "<YOUR_BASE_ID>",
  AIRTABLE_TABLE_NAME: "<YOUR_TABLE_NAME>",
  AIRTABLE_API_KEY: "<YOUR_API_KEY>",
});

AirService.getAllRecords()
  .then((records) => {
    console.log(records);
  })
  .catch((err) => {
    console.error(err);
  });
```

> ### getRecordById(recordId, config)

Retrieves a specific record from an Airtable table by its ID.

recordId: ID of the record to retrieve.

Returns a Promise that resolves to the retrieved record or null if not found.

Throws an error if unable to retrieve the record from Airtable.

#### Example

```js
const AirTableService = require("@npranto/airtable-service");

const AirService = AirTableService({
  AIRTABLE_BASE_ID: "<YOUR_BASE_ID>",
  AIRTABLE_TABLE_NAME: "<YOUR_TABLE_NAME>",
  AIRTABLE_API_KEY: "<YOUR_API_KEY>",
});

AirService.getRecordById("<YOUR_RECORD_ID>")
  .then((record) => {
    console.log(record);
  })
  .catch((err) => {
    console.error(err);
  });
```

> ### createRecord(data, validator, config)

Creates a new record in Airtable.

data: The data to be added to the Airtable. It can be either an object or an array of objects.

validator: The validation function to be applied on the data. It should return an object with 'isValid' and 'error' properties.

Returns the data of the created record(s).

Throws an error if unable to create record(s) in Airtable.

#### Example

```js
const AirTableService = require("@npranto/airtable-service");

const AirService = AirTableService({
  AIRTABLE_BASE_ID: "<YOUR_BASE_ID>",
  AIRTABLE_TABLE_NAME: "<YOUR_TABLE_NAME>",
  AIRTABLE_API_KEY: "<YOUR_API_KEY>",
});

const data = { Name: "John", Age: 35 };
const validator = (data) => {
  if (!data.Name) {
    return { isValid: false, error: "Name is required." };
  }
  return { isValid: true, error: null };
};

AirService.createRecord(data, validator)
  .then((createdRecord) => {
    console.log(createdRecord);
  })
  .catch((err) => {
    console.error(err);
  });
```

> ### updateRecord(recordId, data, validator, config)

Updates a record in an Airtable table with the specified ID and data.

recordId: ID of the record to update.
data: New data for the record to be updated.

data: The data to be updated to the Airtable. It has be an object

validator: The validation function to be applied on the data. It should return an object with 'isValid' and 'error' properties.

Returns a Promise that resolves to the updated record or null if not found.

Throws an error if unable to update the record in Airtable.

#### Example

```js
const AirTableService = require("@npranto/airtable-service");

const AirService = AirTableService({
  AIRTABLE_BASE_ID: "<YOUR_BASE_ID>",
  AIRTABLE_TABLE_NAME: "<YOUR_TABLE_NAME>",
  AIRTABLE_API_KEY: "<YOUR_API_KEY>",
});

const recordId = "<YOUR_RECORD_ID>";
const data = { Name: "John", Age: 36 };
const validator = (data) => {
  if (!data.Name) {
    return { isValid: false, error: "Name is required." };
  }
  return { isValid: true, error: null };
};

AirService.updateRecord(recordId, data, validator)
  .then((updatedRecord) => {
    console.log(updatedRecord);
  })
  .catch((err) => {
    console.error(err);
  });
```

> ### deleteRecord(recordId, config)

Deletes a record from an Airtable table with the specified ID.

recordId: ID of the record to delete.

#### Example

```js
const AirTableService = require("@npranto/airtable-service");

const AirService = AirTableService({
  AIRTABLE_BASE_ID: "<YOUR_BASE_ID>",
  AIRTABLE_TABLE_NAME: "<YOUR_TABLE_NAME>",
  AIRTABLE_API_KEY: "<YOUR_API_KEY>",
});

AirService.deleteRecord("<YOUR_RECORD_ID>")
  .then(() => {
    console.log("Record deleted successfully.");
  })
  .catch((err) => {
    console.error(err);
  });
```
