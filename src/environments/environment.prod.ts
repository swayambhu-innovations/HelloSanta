export const environment = {
  production: true,
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
  },
  RAZORPAY_KEY_ID: 'rzp_test_1GPCwB7UYA1pfl'
};
