import { initializeApp } from "@firebase/app"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC-PtIozF6gPawEWxkfHIfIFrtZZFp2ktA",
    authDomain: "lucasetlila.firebaseapp.com",
    projectId: "lucasetlila",
    storageBucket: "lucasetlila.appspot.com",
    messagingSenderId: "1080985309580",
    appId: "1:1080985309580:web:2282b400aa4433e945c6a9"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}

export default function caca() {
    return 'caca'
}