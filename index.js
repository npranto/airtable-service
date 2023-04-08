/**
 * @module AirtableService
 * @description Provides functions to interact with Airtable API.
 */

import axios from "axios";
import pkgJSON from "./package.json";

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
 * Creates a new record in an Airtable table with the specified data
 * @async
 * @param {Object} data - Data for the new record to be created
 * @param {Object} config - Configuration object with Airtable credentials
 * @param {string} config.AIRTABLE_BASE_ID - Airtable Base ID
 * @param {string} config.AIRTABLE_TABLE_NAME - Name of the Airtable table to create the record in
 * @param {string} config.AIRTABLE_API_KEY - Airtable API Key
 * @returns {Promise<Object>} - Promise that resolves to the newly created record
 * @throws {Error} - Throws an error if unable to create the record in Airtable
 */
async function createRecord(data, config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}`;
  console.log("url: ", url);
  try {
    const response = await axios.post(
      url,
      { fields: data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.AIRTABLE_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to create record in Airtable");
  }
}

/**
 * Updates a record in an Airtable table with the specified ID and data
 * @async
 * @param {string} recordId - ID of the record to update
 * @param {Object} data - New data for the record to be updated
 * @param {Object} config - Configuration object with Airtable credentials
 * @param {string} config.AIRTABLE_BASE_ID - Airtable Base ID
 * @param {string} config.AIRTABLE_TABLE_NAME - Name of the Airtable table to update the record in
 * @param {string} config.AIRTABLE_API_KEY - Airtable API Key
 * @returns {Promise<Object|null>} - Promise that resolves to the updated record or null if not found
 * @throws {Error} - Throws an error if unable to update the record in Airtable
 */
async function updateRecord(recordId, data, config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}/${recordId}`;
  console.log("url: ", url);
  try {
    const response = await axios.patch(
      url,
      { fields: data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.AIRTABLE_API_KEY}`,
        },
      }
    );
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
    createRecord: (data) => createRecord(data, config),
    updateRecord: (recordId) => updateRecord(recordId, config),
    deleteRecord: (recordId) => deleteRecord(recordId, config),
  };
}
