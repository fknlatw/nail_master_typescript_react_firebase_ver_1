import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export type EntriesContextType = {
    data: any,
    fetchData: () => void,
    setData: (data: any) => void,
    entries: any,
    setEntries: (data: any) => void
}


export const EntriesContext = createContext<EntriesContextType | null>(null);

const EntriesProvider = ({children}: PropsWithChildren) => {
    const [data, setData] = useState([]);
    const [entries, setEntries] = useState([]);

    const {currentUser} = useContext(AuthContext);

    const fetchData = async () => {
        let list: any = []

        if(!currentUser) return;

        try {
            const q = query(collection(db, "entries"), where("userId", "==", currentUser?.uid));
            const data = await getDocs(q);
            data.forEach((doc) => {
                list.push(doc.data());
            }); 
            list.sort((a:any, b:any) => new Date(b.entrieDatetime.seconds * 1000).getTime() - new Date(a.entrieDatetime.seconds * 1000).getTime())
            setData(list);
            setEntries(list)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchData();
    }, []);

    useEffect(()=>{fetchData()}, [currentUser]);

    
    

    return (
        <EntriesContext.Provider value={{
            data,
            fetchData,
            setData,
            entries,
            setEntries
        }}>
            {children}
        </EntriesContext.Provider>
    )
}

export default EntriesProvider;