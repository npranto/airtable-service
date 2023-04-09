import r from"axios";function e(r,e){try{var t=r()}catch(r){return e(r)}return t&&t.then?t.then(void 0,e):t}var t=function(r,e){if(!e||"func"!=typeof e)return{isValid:!0,error:null};var t=e(r)||{},o=Object.keys(t);if(!(o&&o.length&&o.includes("isValid")&&o.includes("error")))throw new Error("`validator` function must return an object with `isValid` and `error` properties");return{isValid:t.isValid,error:t.error}};function o(o){var n={AIRTABLE_API_KEY:o.AIRTABLE_API_KEY,AIRTABLE_BASE_ID:o.AIRTABLE_BASE_ID,AIRTABLE_TABLE_NAME:o.AIRTABLE_TABLE_NAME};return{airServiceLog:function(){console.log("Airtable Service - v1.0.16")},getAllRecords:function(){return function(e){try{var t="https://api.airtable.com/v0/"+e.AIRTABLE_BASE_ID+"/"+e.AIRTABLE_TABLE_NAME;return console.log("url: ",t),Promise.resolve(r.get(t,{headers:{Authorization:"Bearer "+e.AIRTABLE_API_KEY}})).then(function(r){if(200===r.status)return r.data.records;throw new Error("Unable to get records from Airtable")})}catch(r){return Promise.reject(r)}}(n)},getRecordById:function(t){return function(t,o){try{var n="https://api.airtable.com/v0/"+o.AIRTABLE_BASE_ID+"/"+o.AIRTABLE_TABLE_NAME+"/"+t;return console.log("url: ",n),Promise.resolve(e(function(){return Promise.resolve(r.get(n,{headers:{Authorization:"Bearer "+o.AIRTABLE_API_KEY}})).then(function(r){return r.data})},function(r){if(404===r.response.status)return null;throw new Error("Unable to get record from Airtable")}))}catch(r){return Promise.reject(r)}}(t,n)},createRecord:function(o,i){return function(o,n,i){try{var a="https://api.airtable.com/v0/"+i.AIRTABLE_BASE_ID+"/"+i.AIRTABLE_TABLE_NAME;console.log("url: ",a);var c=t(o,n);if(!c.isValid)throw new Error(c.error||"Please pass in valid data to create a record");return Promise.resolve(e(function(){return Promise.resolve(r.post(a,{records:Array.isArray(o)?[].concat(o):[o]},{headers:{"Content-Type":"application/json",Authorization:"Bearer "+i.AIRTABLE_API_KEY}})).then(function(r){return r.data})},function(r){throw console.log(r),new Error("Unable to create record in Airtable")}))}catch(r){return Promise.reject(r)}}(o,i,n)},updateRecord:function(o,i,a){return function(o,n,i,a){try{var c="https://api.airtable.com/v0/"+a.AIRTABLE_BASE_ID+"/"+a.AIRTABLE_TABLE_NAME+"/"+o;console.log("url: ",c);var u=t(n,i);if(!u.isValid)throw new Error(u.error||"Please pass in valid data to create a record");return Promise.resolve(e(function(){return Promise.resolve(r.patch(c,n,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+a.AIRTABLE_API_KEY}})).then(function(r){return r.data})},function(r){if(404===r.response.status)return null;throw new Error("Unable to update record in Airtable")}))}catch(r){return Promise.reject(r)}}(o,i,a,n)},deleteRecord:function(t){return function(t,o){try{var n="https://api.airtable.com/v0/"+o.AIRTABLE_BASE_ID+"/"+o.AIRTABLE_TABLE_NAME+"/"+t;return console.log("url: ",n),Promise.resolve(e(function(){return Promise.resolve(r.delete(n,{headers:{Authorization:"Bearer "+o.AIRTABLE_API_KEY}})).then(function(r){return t})},function(r){if(404===r.response.status)return null;throw new Error("Unable to delete record from Airtable")}))}catch(r){return Promise.reject(r)}}(t,n)}}}export{o as AirtableService};
//# sourceMappingURL=air-service.esm.js.map
