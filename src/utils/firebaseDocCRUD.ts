import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";



export const firebaseDeleteDoc = async (id: string) => {
    try {
        await deleteDoc(doc(db, "entries", id));
    } catch (error) {
        console.log(error);
    }
    
}

export const  firebaseUpdateDoc = async (id: string, item: any) => {
    try {
        await updateDoc(doc(db, "entries", id), item); 
    } catch (error) {
        console.log(error);
    }
}

export const firebaseAddDoc = async (item: any) => {
    try {
        await addDoc(collection(db, "entries"), item);
    } catch (error) {
        console.log(error);
    }
}
