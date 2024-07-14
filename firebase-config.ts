import { initializeApp } from "firebase/app";
import { config } from './src/config';

const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
};

export default firebaseConfig;

const app = initializeApp(firebaseConfig);
export { app };