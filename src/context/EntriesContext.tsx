import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { db } from "../firebase";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";

export type EntriesContextType = {
    data: any,
    fetchData: () => void,
    setData: (data: any) => void,
    entries: any,
    setEntries: (data: any) => void,
    isLoading: boolean,
    deleteEntrie: (id: string) => void
    editEntrie: (entrie: any) => void
    datetime: any,
    setDatetime: any,
    type: any, 
    setType: any,
    clientName: any,
    setClientName: any,
    phone: any, 
    setPhone: any,
    isEditing: {currentEntrie: any, status: boolean},
    setIsEditing: (isEditing:any) => void
}


export const EntriesContext = createContext<EntriesContextType | null>(null);

const EntriesProvider = ({children}: PropsWithChildren) => {
    const [data, setData] = useState([]);
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [datetime, setDatetime] = useState("");
    const [isEditing, setIsEditing] = useState({
        currentEntrie: {},
        status: false
    });
    const [type, setType] = useState("");
    const [clientName, setClientName] = useState("");
    const [phone, setPhone] = useState("");
    const {currentUser} = useContext(AuthContext);

    const deleteEntrie = async (id: string) => {
        console.log(id)
        await deleteDoc(doc(db, "entries", id));
        fetchData();
    }

    const editEntrie = (entrie: any) => {
        const date = new Date(entrie.entrieDatetime.seconds * 1000);
        date.setHours(date.getHours() + 6);
        const formattedDate = date.toISOString().slice(0, 16);
        // .toLocaleString('en-US', {
        //     year: 'numeric',
        //     month: '2-digit',
        //     day: '2-digit',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     hour12: false,
        // }).replace(", ", "T").replace(/\//g, "-");
        
        setDatetime(formattedDate);
        setType(entrie.entrieType);
        setClientName(entrie.entrieClientName);
        setPhone(entrie.entriePhone);
        setIsEditing({ currentEntrie: entrie, status: true });
    }

    const fetchData = async () => {
        let list: any = []

        if(!currentUser) return;

        try {
            const q = query(collection(db, "entries"), where("userId", "==", currentUser?.uid));
            const data = await getDocs(q);
            data.forEach((doc) => {
                list.push({...doc.data(), entrieId: doc.id});
            }); 
            
            list.sort((a:any, b:any) => new Date(b.entrieDatetime.seconds * 1000).getTime() - new Date(a.entrieDatetime.seconds * 1000).getTime())
            
            setData(list);
            setEntries(list)
            setIsLoading(false);
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
            setEntries,
            isLoading,
            deleteEntrie,
            editEntrie,
            datetime,
            setDatetime,
            type, 
            setType,
            clientName,
            setClientName,
            phone, 
            setPhone,
            isEditing,
            setIsEditing
        }}>
            {children}
        </EntriesContext.Provider>
    )
}

export default EntriesProvider;