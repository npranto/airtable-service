/**
 * @module AirtableService
 * @description Provides functions to interact with Airtable API.
 */

import axios from "axios";
import pkgJSON from "./package.json";

/**
 * Validates data using a provided validator function.
 *
 * @param {Object} data - The data to validate.
 * @param {Function} validator - The validator function to use.
 * @returns {Object} An object with `isValid` and `error` properties.
 * @throws {Error} If `validator` function does not return an object with `isValid` and `error` properties.
 */
const validateData = (data, validator) => {
  if (!validator || typeof validator !== "function") {
    return {
      isValid: true,
      error: null,
    };
  }

  const validatorOutput = validator(data) || {};
  const validatorOutputKeys = Object.keys(validatorOutput);
  if (
    !validatorOutputKeys ||
    !validatorOutputKeys.length ||
    !validatorOutputKeys.includes("isValid") ||
    !validatorOutputKeys.includes("error")
  ) {
    throw new Error(
      "`validator` function must return an object with `isValid` and `error` properties"
    );
  }

  return {
    isValid: validatorOutput.isValid,
    error: validatorOutput.error,
  };
};

/**
 * Logs the current version of the Airtable service.
 * @function
 */
function airServiceLog() {
  console.log(`Airtable Service - v${pkgJSON.version}`);
}

/**
 * Retrieves all records from a specific table in Airtable
 * @async
 * @param {Object} config - Configuration object with Airtable credentials
 * @param {string} config.AIRTABLE_BASE_ID - Airtable Base ID
 * @param {string} config.AIRTABLE_TABLE_NAME - Name of the Airtable table to retrieve records from
 * @param {string} config.AIRTABLE_API_KEY - Airtable API Key
 * @returns {Promise<Array>} - Promise that resolves to an array of records
 * @throws {Error} - Throws an error if unable to retrieve records from Airtable
 */
async function getAllRecords(config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}`;
  console.log("url: ", url);
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${config.AIRTABLE_API_KEY}`,
    },
  });
  if (response.status === 200) {
    return response.data.records;
  } else {
    throw new Error("Unable to get records from Airtable");
  }
}

/**
 * Retrieves a specific record from an Airtable table by its ID
 * @async
 * @param {string} recordId - ID of the record to retrieve
 * @param {Object} config - Configuration object with Airtable credentials
 * @param {string} config.AIRTABLE_BASE_ID - Airtable Base ID
 * @param {string} config.AIRTABLE_TABLE_NAME - Name of the Airtable table to retrieve the record from
 * @param {string} config.AIRTABLE_API_KEY - Airtable API Key
 * @returns {Promise<Object|null>} - Promise that resolves to the retrieved record or null if not found
 * @throws {Error} - Throws an error if unable to retrieve the record from Airtable
 */
async function getRecordById(recordId, config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}/${recordId}`;
  console.log("url: ", url);
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${config.AIRTABLE_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      return null;
    } else {
      throw new Error("Unable to get record from Airtable");
    }
  }
}

/**
 * Creates a new record in Airtable.
 * @async
 * @param {Object|Array} data - The data to be added to the Airtable. It can be either an object or an array of objects.
 * @param {Function} validator - The validation function to be applied on the data. It should return an object with 'isValid' and 'error' properties.
 * @param {Object} config - Configuration object with Airtable credentials.
 * @param {string} config.AIRTABLE_BASE_ID - Airtable Base ID.
 * @param {string} config.AIRTABLE_TABLE_NAME - Name of the Airtable table to create record(s) in.
 * @param {string} config.AIRTABLE_API_KEY - Airtable API Key.
 * @throws {Error} Will throw an error if unable to create record(s) in Airtable.
 * @returns {Object} Returns the data of the created record(s).
 */
async function createRecord(data, validator, config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}`;

  const { isValid, error } = validateData(data, validator);

  if (!isValid) {
    throw new Error(error || "Please pass in valid data to create a record");
  }

  try {
    const response = await axios.post(
      url,
      {
        records: Array.isArray(data) ? [...data] : [data],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.AIRTABLE_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to create record in Airtable");
  }
}

/**
 * Updates a record in an Airtable table with the specified ID and data
 * @async
 * @param {string} recordId - ID of the record to update
 * @param {Object} data - New data for the record to be updated
 * @param {Function} validator - The validation function to be applied on the data. It should return an object with 'isValid' and 'error' properties.
 * @param {Object} config - Configuration object with Airtable credentials
 * @param {string} config.AIRTABLE_BASE_ID - Airtable Base ID
 * @param {string} config.AIRTABLE_TABLE_NAME - Name of the Airtable table to update the record in
 * @param {string} config.AIRTABLE_API_KEY - Airtable API Key
 * @returns {Promise<Object|null>} - Promise that resolves to the updated record or null if not found
 * @throws {Error} - Throws an error if unable to update the record in Airtable
 */
async function updateRecord(recordId, data, validator, config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}/${recordId}`;
  console.log("url: ", url);

  const { isValid, error } = validateData(data, validator);

  if (!isValid) {
    throw new Error(error || "Please pass in valid data to create a record");
  }

  try {
    const response = await axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.AIRTABLE_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      return null;
    } else {
      throw new Error("Unable to update record in Airtable");
    }
  }
}

/**
 * Deletes a record from an Airtable table with the specified ID
 * @async
 * @param {string} recordId - ID of the record to delete
 * @param {Object} config - Configuration object with Airtable credentials
 * @param {string} config.AIRTABLE_BASE_ID - Airtable Base ID
 * @param {string} config.AIRTABLE_TABLE_NAME - Name of the Airtable table to delete the record from
 * @param {string} config.AIRTABLE_API_KEY - Airtable API Key
 * @returns {Promise<string|null>} - Promise that resolves to the deleted record ID or null if not found
 * @throws {Error} - Throws an error if unable to delete the record from Airtable
 */
async function deleteRecord(recordId, config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}/${recordId}`;
  console.log("url: ", url);
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${config.AIRTABLE_API_KEY}`,
      },
    });
    return recordId;
  } catch (error) {
    if (error.response.status === 404) {
      return null;
    } else {
      throw new Error("Unable to delete record from Airtable");
    }
  }
}

/**
 * Creates an instance of the AirtableService.
 * @param {Object} options - An object that contains the configuration for the AirtableService.
 * @param {string} options.AIRTABLE_API_KEY - The API key for the Airtable account.
 * @param {string} options.AIRTABLE_BASE_ID - The ID of the Airtable base.
 * @param {string} options.AIRTABLE_TABLE_NAME - The name of the table in the Airtable base.
 * @returns {AirtableService} An instance of the AirtableService.
 */
export function AirtableService({
  AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME,
}) {
  const config = {
    AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID,
    AIRTABLE_TABLE_NAME,
  };
  return {
    airServiceLog: () => airServiceLog(),
    getAllRecords: () => getAllRecords(config),
    getRecordById: (recordId) => getRecordById(recordId, config),
    createRecord: (data, validator) => createRecord(data, validator, config),
    updateRecord: (recordId, data, validator) =>
      updateRecord(recordId, data, validator, config),
    deleteRecord: (recordId) => deleteRecord(recordId, config),
  };
}

// test 1
