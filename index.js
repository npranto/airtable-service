const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

// Get all records from Airtable
async function getAllRecords() {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data.records;
  } else {
    throw new Error('Unable to get records from Airtable');
  }
}

// Get a record by ID from Airtable
async function getRecordById(recordId) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else if (response.status === 404) {
    return null;
  } else {
    throw new Error('Unable to get record from Airtable');
  }
}

// Create a new record in Airtable
async function createRecord(data) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
    body: JSON.stringify({ fields: data }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to create record in Airtable');
  }
}

// Update a record in Airtable
async function updateRecord(recordId, data) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
    body: JSON.stringify({ fields: data }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else if (response.status === 404) {
    return null;
  } else {
    throw new Error('Unable to update record in Airtable');
  }
}

// Delete a record from Airtable
async function deleteRecord(recordId) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });
  if (response.ok) {
    return recordId;
  } else if (response.status === 404) {
    return null;
  } else {
    throw new Error('Unable to delete record from Airtable');
  }
}

module.exports.getAllRecords = getAllRecords;
module.exports.getRecordById = getRecordById;
module.exports.createRecord = createRecord;
module.exports.updateRecord = updateRecord;
module.exports.deleteRecord = deleteRecord;