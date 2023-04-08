import axios from "axios";
import pkgJSON from "./package.json";

function airServiceLog() {
  console.log(`Airtable Service - v${pkgJSON.version}`);
}

export async function getAllRecords(config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}`;
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

export async function getRecordById(recordId, config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}/${recordId}`;
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

export async function createRecord(data, config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}`;
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

export async function updateRecord(recordId, data, config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}/${recordId}`;
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

export async function deleteRecord(recordId, config) {
  const url = `https://api.airtable.com/v0/${config.AIRTABLE_BASE_ID}/${config.AIRTABLE_TABLE_NAME}/${recordId}`;
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
