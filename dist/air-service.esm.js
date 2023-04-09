import r from"axios";function e(r,e){try{var t=r()}catch(r){return e(r)}return t&&t.then?t.then(void 0,e):t}var t=function(t,n,a){try{var i="https://api.airtable.com/v0/"+a.AIRTABLE_BASE_ID+"/"+a.AIRTABLE_TABLE_NAME+"/"+t;console.log("url: ",i);var c=o(n,validator);if(!c.isValid)throw new Error(c.error||"Please pass in valid data to create a record");return Promise.resolve(e(function(){return Promise.resolve(r.patch(i,{records:Array.isArray(n)?[].concat(n):[n]},{headers:{"Content-Type":"application/json",Authorization:"Bearer "+a.AIRTABLE_API_KEY}})).then(function(r){return r.data})},function(r){if(404===r.response.status)return null;throw new Error("Unable to update record in Airtable")}))}catch(r){return Promise.reject(r)}},o=function(r,e){if(!e||"func"!=typeof e)return{isValid:!0,error:null};var t=e(r)||{},o=Object.keys(t);if(!(o&&o.length&&o.includes("isValid")&&o.includes("error")))throw new Error("`validator` function must return an object with `isValid` and `error` properties");return{isValid:t.isValid,error:t.error}};function n(n){var a={AIRTABLE_API_KEY:n.AIRTABLE_API_KEY,AIRTABLE_BASE_ID:n.AIRTABLE_BASE_ID,AIRTABLE_TABLE_NAME:n.AIRTABLE_TABLE_NAME};return{airServiceLog:function(){console.log("Airtable Service - v1.0.13")},getAllRecords:function(){return function(e){try{var t="https://api.airtable.com/v0/"+e.AIRTABLE_BASE_ID+"/"+e.AIRTABLE_TABLE_NAME;return console.log("url: ",t),Promise.resolve(r.get(t,{headers:{Authorization:"Bearer "+e.AIRTABLE_API_KEY}})).then(function(r){if(200===r.status)return r.data.records;throw new Error("Unable to get records from Airtable")})}catch(r){return Promise.reject(r)}}(a)},getRecordById:function(t){return function(t,o){try{var n="https://api.airtable.com/v0/"+o.AIRTABLE_BASE_ID+"/"+o.AIRTABLE_TABLE_NAME+"/"+t;return console.log("url: ",n),Promise.resolve(e(function(){return Promise.resolve(r.get(n,{headers:{Authorization:"Bearer "+o.AIRTABLE_API_KEY}})).then(function(r){return r.data})},function(r){if(404===r.response.status)return null;throw new Error("Unable to get record from Airtable")}))}catch(r){return Promise.reject(r)}}(t,a)},createRecord:function(t,n){return function(t,n,a){try{var i="https://api.airtable.com/v0/"+a.AIRTABLE_BASE_ID+"/"+a.AIRTABLE_TABLE_NAME;console.log("url: ",i);var c=o(t,n);if(!c.isValid)throw new Error(c.error||"Please pass in valid data to create a record");return Promise.resolve(e(function(){return Promise.resolve(r.post(i,{records:Array.isArray(t)?[].concat(t):[t]},{headers:{"Content-Type":"application/json",Authorization:"Bearer "+a.AIRTABLE_API_KEY}})).then(function(r){return r.data})},function(r){throw console.log(r),new Error("Unable to create record in Airtable")}))}catch(r){return Promise.reject(r)}}(t,n,a)},updateRecord:function(r,e,o){return t(r,e,o)},deleteRecord:function(t){return function(t,o){try{var n="https://api.airtable.com/v0/"+o.AIRTABLE_BASE_ID+"/"+o.AIRTABLE_TABLE_NAME+"/"+t;return console.log("url: ",n),Promise.resolve(e(function(){return Promise.resolve(r.delete(n,{headers:{Authorization:"Bearer "+o.AIRTABLE_API_KEY}})).then(function(r){return t})},function(r){if(404===r.response.status)return null;throw new Error("Unable to delete record from Airtable")}))}catch(r){return Promise.reject(r)}}(t,a)}}}export{n as AirtableService};
//# sourceMappingURL=air-service.esm.js.map
