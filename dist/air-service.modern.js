import r from"axios";function e({AIRTABLE_API_KEY:e,AIRTABLE_BASE_ID:t,AIRTABLE_TABLE_NAME:o}){const a={AIRTABLE_API_KEY:e,AIRTABLE_BASE_ID:t,AIRTABLE_TABLE_NAME:o};return{airServiceLog:()=>{console.log("Airtable Service - v1.0.12")},getAllRecords:()=>async function(e){const t=`https://api.airtable.com/v0/${e.AIRTABLE_BASE_ID}/${e.AIRTABLE_TABLE_NAME}`;console.log("url: ",t);const o=await r.get(t,{headers:{Authorization:`Bearer ${e.AIRTABLE_API_KEY}`}});if(200===o.status)return o.data.records;throw new Error("Unable to get records from Airtable")}(a),getRecordById:e=>async function(e,t){const o=`https://api.airtable.com/v0/${t.AIRTABLE_BASE_ID}/${t.AIRTABLE_TABLE_NAME}/${e}`;console.log("url: ",o);try{return(await r.get(o,{headers:{Authorization:`Bearer ${t.AIRTABLE_API_KEY}`}})).data}catch(r){if(404===r.response.status)return null;throw new Error("Unable to get record from Airtable")}}(e,a),createRecord:(e,t)=>async function(e,t,o){const a=`https://api.airtable.com/v0/${o.AIRTABLE_BASE_ID}/${o.AIRTABLE_TABLE_NAME}`;console.log("url: ",a);const{isValid:n,error:A}=((r,o)=>{if(!t||"func"!=typeof t)return{isValid:!0,error:null};const a=t(e)||{},n=Object.keys(a);if(!(n&&n.length&&n.includes("isValid")&&n.includes("error")))throw new Error("`validator` function must return an object with `isValid` and `error` properties");return{isValid:a.isValid,error:a.error}})();if(!n)throw new Error(A||"Please pass in valid data to create a record");try{return(await r.post(a,{records:Array.isArray(e)?[...e]:[e]},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${o.AIRTABLE_API_KEY}`}})).data}catch(A){throw console.log(A),new Error("Unable to create record in Airtable")}}(e,t,a),updateRecord:e=>async function(e,t,o){const a=`https://api.airtable.com/v0/${o.AIRTABLE_BASE_ID}/${o.AIRTABLE_TABLE_NAME}/${e}`;console.log("url: ",a);try{return(await r.patch(a,{records:Array.isArray(t)?[...t]:[t]},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${o.AIRTABLE_API_KEY}`}})).data}catch(r){if(404===r.response.status)return null;throw new Error("Unable to update record in Airtable")}}(e,a),deleteRecord:e=>async function(e,t){const o=`https://api.airtable.com/v0/${t.AIRTABLE_BASE_ID}/${t.AIRTABLE_TABLE_NAME}/${e}`;console.log("url: ",o);try{return await r.delete(o,{headers:{Authorization:`Bearer ${t.AIRTABLE_API_KEY}`}}),e}catch(r){if(404===r.response.status)return null;throw new Error("Unable to delete record from Airtable")}}(e,a)}}export{e as AirtableService};
//# sourceMappingURL=air-service.modern.js.map
