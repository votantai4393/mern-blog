// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'mern-blog-95806.firebaseapp.com',
	projectId: 'mern-blog-95806',
	storageBucket: 'mern-blog-95806.appspot.com',
	messagingSenderId: '149728636514',
	appId: '1:149728636514:web:5a358ed6c24f95c536ab3b',
	measurementId: 'G-NP36PYQBDY'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
