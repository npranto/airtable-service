import r from"axios";const e=(r,e)=>{if(!e||"function"!=typeof e)return{isValid:!0,error:null};const t=e(r)||{},o=Object.keys(t);if(!(o&&o.length&&o.includes("isValid")&&o.includes("error")))throw new Error("`validator` function must return an object with `isValid` and `error` properties");return{isValid:t.isValid,error:t.error}};function t({AIRTABLE_API_KEY:t,AIRTABLE_BASE_ID:o,AIRTABLE_TABLE_NAME:a}){const n={AIRTABLE_API_KEY:t,AIRTABLE_BASE_ID:o,AIRTABLE_TABLE_NAME:a};return{airServiceLog:()=>{console.log("Airtable Service - v1.0.17")},getAllRecords:()=>async function(e){const t=`https://api.airtable.com/v0/${e.AIRTABLE_BASE_ID}/${e.AIRTABLE_TABLE_NAME}`;console.log("url: ",t);const o=await r.get(t,{headers:{Authorization:`Bearer ${e.AIRTABLE_API_KEY}`}});if(200===o.status)return o.data.records;throw new Error("Unable to get records from Airtable")}(n),getRecordById:e=>async function(e,t){const o=`https://api.airtable.com/v0/${t.AIRTABLE_BASE_ID}/${t.AIRTABLE_TABLE_NAME}/${e}`;console.log("url: ",o);try{return(await r.get(o,{headers:{Authorization:`Bearer ${t.AIRTABLE_API_KEY}`}})).data}catch(r){if(404===r.response.status)return null;throw new Error("Unable to get record from Airtable")}}(e,n),createRecord:(t,o)=>async function(t,o,a){const n=`https://api.airtable.com/v0/${a.AIRTABLE_BASE_ID}/${a.AIRTABLE_TABLE_NAME}`,{isValid:A,error:i}=e(t,o);if(!A)throw new Error(i||"Please pass in valid data to create a record");try{return(await r.post(n,{records:Array.isArray(t)?[...t]:[t]},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.AIRTABLE_API_KEY}`}})).data}catch(i){throw console.log(i),new Error("Unable to create record in Airtable")}}(t,o,n),updateRecord:(t,o,a)=>async function(t,o,a,n){const A=`https://api.airtable.com/v0/${n.AIRTABLE_BASE_ID}/${n.AIRTABLE_TABLE_NAME}/${t}`;console.log("url: ",A);const{isValid:i,error:s}=e(o,a);if(!i)throw new Error(s||"Please pass in valid data to create a record");try{return(await r.patch(A,o,{headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.AIRTABLE_API_KEY}`}})).data}catch(s){if(404===s.response.status)return null;throw new Error("Unable to update record in Airtable")}}(t,o,a,n),deleteRecord:e=>async function(e,t){const o=`https://api.airtable.com/v0/${t.AIRTABLE_BASE_ID}/${t.AIRTABLE_TABLE_NAME}/${e}`;console.log("url: ",o);try{return await r.delete(o,{headers:{Authorization:`Bearer ${t.AIRTABLE_API_KEY}`}}),e}catch(r){if(404===r.response.status)return null;throw new Error("Unable to delete record from Airtable")}}(e,n)}}export{t as AirtableService};
//# sourceMappingURL=air-service.modern.js.map
