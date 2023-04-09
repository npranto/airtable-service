!function(r,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("axios")):"function"==typeof define&&define.amd?define(["exports","axios"],e):e((r||self).airtableService={},r.axios)}(this,function(r,e){function t(r){return r&&"object"==typeof r&&"default"in r?r:{default:r}}var o=/*#__PURE__*/t(e);function n(r,e){try{var t=r()}catch(r){return e(r)}return t&&t.then?t.then(void 0,e):t}var i=function(r,e){if(!e||"function"!=typeof e)return{isValid:!0,error:null};var t=e(r)||{},o=Object.keys(t);if(!(o&&o.length&&o.includes("isValid")&&o.includes("error")))throw new Error("`validator` function must return an object with `isValid` and `error` properties");return{isValid:t.isValid,error:t.error}};r.AirtableService=function(r){var e={AIRTABLE_API_KEY:r.AIRTABLE_API_KEY,AIRTABLE_BASE_ID:r.AIRTABLE_BASE_ID,AIRTABLE_TABLE_NAME:r.AIRTABLE_TABLE_NAME};return{airServiceLog:function(){console.log("Airtable Service - v1.0.17")},getAllRecords:function(){return function(r){try{var e="https://api.airtable.com/v0/"+r.AIRTABLE_BASE_ID+"/"+r.AIRTABLE_TABLE_NAME;return console.log("url: ",e),Promise.resolve(o.default.get(e,{headers:{Authorization:"Bearer "+r.AIRTABLE_API_KEY}})).then(function(r){if(200===r.status)return r.data.records;throw new Error("Unable to get records from Airtable")})}catch(r){return Promise.reject(r)}}(e)},getRecordById:function(r){return function(r,e){try{var t="https://api.airtable.com/v0/"+e.AIRTABLE_BASE_ID+"/"+e.AIRTABLE_TABLE_NAME+"/"+r;return console.log("url: ",t),Promise.resolve(n(function(){return Promise.resolve(o.default.get(t,{headers:{Authorization:"Bearer "+e.AIRTABLE_API_KEY}})).then(function(r){return r.data})},function(r){if(404===r.response.status)return null;throw new Error("Unable to get record from Airtable")}))}catch(r){return Promise.reject(r)}}(r,e)},createRecord:function(r,t){return function(r,e,t){try{var a="https://api.airtable.com/v0/"+t.AIRTABLE_BASE_ID+"/"+t.AIRTABLE_TABLE_NAME,u=i(r,e);if(!u.isValid)throw new Error(u.error||"Please pass in valid data to create a record");return Promise.resolve(n(function(){return Promise.resolve(o.default.post(a,{records:Array.isArray(r)?[].concat(r):[r]},{headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.AIRTABLE_API_KEY}})).then(function(r){return r.data})},function(r){throw console.log(r),new Error("Unable to create record in Airtable")}))}catch(r){return Promise.reject(r)}}(r,t,e)},updateRecord:function(r,t,a){return function(r,e,t,a){try{var u="https://api.airtable.com/v0/"+a.AIRTABLE_BASE_ID+"/"+a.AIRTABLE_TABLE_NAME+"/"+r;console.log("url: ",u);var c=i(e,t);if(!c.isValid)throw new Error(c.error||"Please pass in valid data to create a record");return Promise.resolve(n(function(){return Promise.resolve(o.default.patch(u,e,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+a.AIRTABLE_API_KEY}})).then(function(r){return r.data})},function(r){if(404===r.response.status)return null;throw new Error("Unable to update record in Airtable")}))}catch(r){return Promise.reject(r)}}(r,t,a,e)},deleteRecord:function(r){return function(r,e){try{var t="https://api.airtable.com/v0/"+e.AIRTABLE_BASE_ID+"/"+e.AIRTABLE_TABLE_NAME+"/"+r;return console.log("url: ",t),Promise.resolve(n(function(){return Promise.resolve(o.default.delete(t,{headers:{Authorization:"Bearer "+e.AIRTABLE_API_KEY}})).then(function(e){return r})},function(r){if(404===r.response.status)return null;throw new Error("Unable to delete record from Airtable")}))}catch(r){return Promise.reject(r)}}(r,e)}}}});
//# sourceMappingURL=air-service.umd.js.map
