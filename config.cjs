// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkRqT3hvMGpiUW5DT3plb1JUU054K0NSb1FoS3JSSTNCZ1Y5R3NIaVVYdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0dzcENjd1dobFZKQW9VNk5saUUzazBpdUdtMFRXSEJ1dEFTcG5jYkNtYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TkZ5Zk91RnNDK3hkRkNxZW10anRyTEZPQlJtL05nT2p0MmpMa05rUFZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVNDlscmNHbDRHZC9aQVNLVS9xckdkQ0ZTaitRQ0hQck5sT1c1TzZ0WkhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklMb2hqbVhRU1E3Q1J1SXBIOTd1elVzc05TWCtIR3N0VE8xLyt3YTlxMm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZ2UHIydzkvQThuZ3RzWUl0REZDYlFEVFNVNkYyNUcxRm00Zit2eDcwVWM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1BrZHc0SWxObWdWZVBWbGxnOFVhZjBLVVNudExjaloyQTdjODhsMHVVND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ1BnR0hVaVp5a2JKWjlBM0NMUjZRWnhtZllmcG9Cb2FjdTR6alJqTXZ5QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkIweDFpaWFiUmFiV0dzUWw2K1RndHF2MXRDRXBWRGZBTUpTeElMRzBHOUxsVWRab1NHM3phaE5NZWd1N21tb0hJWlUyNWI1cURtS1hJVzdLbW9yREFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzMsImFkdlNlY3JldEtleSI6ImlSaE1vbXdQaFVUaWFrNERnTVdtSW5KRWRpaU1yTmJuQU54MjBQOE5SY0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlVoNDFscHhtUzZlNXI2aF9HSTNDWGciLCJwaG9uZUlkIjoiNGZmNGZjMTAtMzE2OC00ZGQ3LWE3YzEtYzNiZWYwZjFlMGZjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNvakVlVng0dWZwZzNwL3hULzZFK3BzTEVHMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSEQ5MGd2aEF0TlpXdEV0VzhTeVU0U1c1Nk09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTVgxM1E1OUQiLCJtZSI6eyJpZCI6IjI1NDc5MDA0MDgwMjoyNkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmZEdXNrSEVOU1p4cmdHR0FnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidE9WZE9MSjNRUUhNOGRsSk1ObWhFTDFjV3JwMzVyQTFIYjB3cm1UcFNDST0iLCJhY2NvdW50U2lnbmF0dXJlIjoidlE5MEpjS1lwTnVEMStQMVF5TC9VMlg0b0R3c3pqeldiRGo1SXpNKzA0OFFoaWI1cGdZZTJkVFU2akZ1OGNQNk5aRVMwa2F5VU9uMlJib21CS0hDQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6Ijh1bVN3Ymh4NGcrUCs2eU5GYkQzRWlDeHZJR3JoSjljSkRuR3JrRHoxTGF2M1FFNTNEOC9kcnFRTjl3dVlKSnJWd3VMK0hvLzZYampZbEV1YkVXU0NBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzkwMDQwODAyOjI2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJUbFhUaXlkMEVCelBIWlNURFpvUkM5WEZxNmQrYXdOUjI5TUs1azZVZ2kifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjkyMDM0MjUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT2x4In0=",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' :true,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : true,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'false' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'false' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "Zestyspenc",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254790040802",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
