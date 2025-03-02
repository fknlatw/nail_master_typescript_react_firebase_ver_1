import { 
  createContext, PropsWithChildren, useContext, 
  useEffect, useState 
} from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "../types/types";
import { db } from "../firebase";
import { 
  collection, getDocs, query, 
  where, doc, deleteDoc, 
  updateDoc, Timestamp, 
  addDoc 
} from "firebase/firestore";
import { EntriesContextType } from "../types/types";


export const EntriesContext = createContext<EntriesContextType | null>(null);

const EntriesProvider = ({children}: PropsWithChildren) => {
  const [data, setData] = useState([]);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [datetime, setDatetime] = useState("");
  const [isEditing, setIsEditing] = useState({
    currentEntrie: {
      userId: "",
      entrieId: "",
      entrieDatetime: "",
      entrieType: "",
      entrieClientName: "",
      entriePhone: "",
    },
    status: false
  });
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");

  const {currentUser} = useContext(AuthContext) as AuthContextType;
    
    
  const deleteEntrie = async (id: string) => {
    await deleteDoc(doc(db, "entries", id));
    fetchData();
  }

  const editEntrie = (entrie: any) => {
    const date = new Date(entrie.entrieDatetime.seconds * 1000);
    date.setHours(date.getHours() + 6);
    const formattedDate = date.toISOString().slice(0, 16);
        
    setDatetime(formattedDate);
    setType(entrie.entrieType);
    setClientName(entrie.entrieClientName);
    setPhone(entrie.entriePhone);
    setIsEditing({ currentEntrie: entrie, status: true });
  }

  const handleAddEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(isEditing.status === true){
        const { userId, entrieId } = isEditing.currentEntrie;
        await updateDoc(doc(db, "entries", entrieId), {
          userId: userId,
          entrieId: entrieId,
          entrieDatetime: Timestamp.fromDate(new Date(datetime)),
          entrieType: type,
          entrieClientName: clientName,
          entriePhone: phone,
        });
      }else{
        await addDoc(collection(db, "entries"), {
          entrieClientName: clientName,
          entrieDatetime: Timestamp.fromDate(new Date(datetime)),
          entriePhone: phone,
          entrieType: type,
          userId: currentUser.uid
        });
      }

      fetchData();

      setDatetime("");
      setType("");
      setClientName("");
      setPhone("");
      setIsEditing({currentEntrie: {
        userId: "",
        entrieId: "",
        entrieDatetime: "",
        entrieType: "",
        entrieClientName: "",
        entriePhone: ""
      }, status: false});

    } catch (err) {
      console.log(err);
    }
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
      setEntries(list);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
    
  const handleSearch = (
    e: React.FormEvent<HTMLFormElement>, 
    selectedFilters: any, 
    filteredArray: any
  ) => {
    e.preventDefault();
        
    if(searchText === ""){
      const {entrieDatetime, entrieType, entrieClientName} = selectedFilters;
      if(entrieDatetime === "" && entrieType === "" && entrieClientName === ""){
        setEntries(data);
        return;
      } else {
        setEntries(filteredArray);
        return;
      }
    }
    
    const searchResult = entries.filter((entrie:any)=>{
      for(let i in entrie){
        if(typeof(entrie[i]) === "string"){
          if(entrie[i].toLowerCase().includes(searchText.toLowerCase())){
            return true
          }
        }
      }
    });
    
    setEntries(searchResult);
  }

  useEffect(()=>{
    fetchData();
  }, []);

  useEffect(()=>{fetchData()}, [currentUser]);

  return (
    <EntriesContext.Provider value={{
      data, fetchData, setData,
      entries, setEntries, isLoading,
      deleteEntrie, editEntrie, datetime,
      setDatetime, type, setType,
      clientName, setClientName, phone, 
      setPhone, isEditing, setIsEditing,
      handleSearch, searchText, setSearchText,
      handleAddEdit
    }}>
      {children}
    </EntriesContext.Provider>
  )
}

export default EntriesProvider;