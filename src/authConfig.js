export const msalConfig = {
   auth: {
     clientId: "6cebbf4e-4092-418a-abc7-6d483c3f8f04",
     authority: "https://login.microsoftonline.com/e6eb211f-4f1d-4d85-a663-7ede2efbf39b", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
     redirectUri: "https://gray-wave-0abf87e10.1.azurestaticapps.net",
   },
   cache: {
     cacheLocation: "sessionStorage", // This configures where your cache will be stored
     storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
   }
 };
 
 // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
 export const loginRequest = {
  //scopes: ["User.Read"]
  scopes: ["api://6cebbf4e-4092-418a-abc7-6d483c3f8f04/Fidelizacion_WEB"]
 };
 
 // Add the endpoints here for Microsoft Graph API services you'd like to use.
 export const graphConfig = {
     graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
 };