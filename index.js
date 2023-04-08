import axios from "axios";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

export function airServiceLog() {
  console.log("Airtable Service - Logs");
}

// Get all records from Airtable
export async function getAllRecords() {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });
  if (response.status === 200) {
    return response.data.records;
  } else {
    throw new Error("Unable to get records from Airtable");
  }
}

// Get a record by ID from Airtable
export async function getRecordById(recordId) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
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

// Create a new record in Airtable
export async function createRecord(data) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
  try {
    const response = await axios.post(
      url,
      { fields: data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to create record in Airtable");
  }
}

// Update a record in Airtable
export async function updateRecord(recordId, data) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`;
  try {
    const response = await axios.patch(
      url,
      { fields: data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
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

// Delete a record from Airtable
export async function deleteRecord(recordId) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
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
