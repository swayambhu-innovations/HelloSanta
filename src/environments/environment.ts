// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDPFxPmUQUsFaBhLUxkrKP_URPOCnJvhZI",
    authDomain: "hellosanta-fc366.firebaseapp.com",
    projectId: "hellosanta-fc366",
    storageBucket: "hellosanta-fc366.appspot.com",
    messagingSenderId: "1063935004201",
    appId: "1:1063935004201:web:9e469579482208a57ed638",
    measurementId: "G-TDXHZX38YT"
  },
  cloudFunctions : {
    createOrder: 'http://localhost:5001/hellosanta-fc366/us-central1/createOrder',
    capturePayment: 'http://localhost:5001/hellosanta-fc366/us-central1/createOrder',
    shipOrder:'http://localhost:5001/hellosanta-fc366/us-central1/shipOrder',
    checkOrderShipment:'http://localhost:5001/hellosanta-fc366/us-central1/checkOrderShipment',
    cancelOrderShipment:'http://localhost:5001/hellosanta-fc366/us-central1/cancelOrderShipment',
    sendMail: 'http://localhost:5001/hellosanta-fc366/us-central1/sendMail',
  },
  RAZORPAY_KEY_ID: 'rzp_test_1GPCwB7UYA1pfl'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
