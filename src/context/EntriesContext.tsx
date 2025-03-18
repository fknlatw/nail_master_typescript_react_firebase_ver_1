import { 
  createContext, PropsWithChildren, useContext, 
  useEffect, useState 
} from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType, Entrie, EntriesContextType, 
  SelectedFilters } from "../types/types";
import { db } from "../firebase";
import { 
  collection, getDocs, query, 
  where, Timestamp 
} from "firebase/firestore";
import { formatDateToInputValue } from "../utils/dateFormatting";
import { firebaseAddDoc, firebaseDeleteDoc, firebaseUpdateDoc } from "../utils/firebaseDocCRUD";
import { entrieDefaultValue, isEditingDefaultValue } from "../constants/constants";



export const EntriesContext = createContext<EntriesContextType | null>(null);

const EntriesProvider = ({children}: PropsWithChildren) => {
  const [data, setData] = useState<Entrie[]>([]);
  const [entries, setEntries] = useState<Entrie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [entrie, setEntrie] = useState(entrieDefaultValue);
  const [isEditing, setIsEditing] = useState(isEditingDefaultValue);
  const [searchText, setSearchText] = useState("");
  
  const {currentUser} = useContext(AuthContext) as AuthContextType;
    
    
  const deleteEntrie = async (id: string) => {
    firebaseDeleteDoc(id);

    fetchData();
  }

  const editEntrie = (entrie: Entrie) => {
    const formattedDate = formatDateToInputValue(entrie.entrieDatetime.seconds);
        
    setEntrie({
      entrieDatetime: formattedDate,
      entrieType: entrie.entrieType,
      entrieClientName: entrie.entrieClientName,
      entriePhone: entrie.entriePhone,
      entrieStatus: entrie.entrieStatus,
      entrieId: entrie.entrieId,
      userId: entrie.userId,
    });
    setIsEditing({ currentEntrie: entrie, status: true });
  }

  const handleAddEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(isEditing.status === true){
        const { userId, entrieId } = isEditing.currentEntrie;
        firebaseUpdateDoc(entrieId, {
          userId: userId,
          entrieId: entrieId,
          entrieDatetime: Timestamp.fromDate(new Date(entrie.entrieDatetime)),
          entrieType: entrie.entrieType,
          entrieClientName: entrie.entrieClientName,
          entriePhone: entrie.entriePhone,
          entrieStatus: entrie.entrieStatus
        });
      }else{
        firebaseAddDoc({
          entrieClientName: entrie.entrieClientName,
          entrieDatetime: Timestamp.fromDate(new Date(entrie.entrieDatetime)),
          entriePhone: entrie.entriePhone,
          entrieType: entrie.entrieType,
          userId: currentUser.uid,
          entrieStatus: entrie.entrieStatus
        });
      }
      
      fetchData();
      setEntrie(entrieDefaultValue);
      setIsEditing(isEditingDefaultValue);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchData = async () => {
    let list: Entrie[] = []
    if(!currentUser) return;

    setIsLoading(true);
    try {
      const q = query(collection(db, "entries"), where("userId", "==", currentUser?.uid));
      // const data = firebaseGetDoc(q);
      const data = await getDocs(q);
      

      data.forEach((doc: any) => {
        list.push({...doc.data(), entrieId: doc.id} as Entrie);
      }); 
            
      list.sort((a: Entrie, b: Entrie) => new Date(b.entrieDatetime.seconds * 1000).getTime() - new Date(a.entrieDatetime.seconds * 1000).getTime())
            
      setData(list);
      setEntries(list);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
    
  const handleSearch = (
    e: React.FormEvent<HTMLFormElement>, 
    selectedFilters: SelectedFilters, 
    filteredArray: Array<Entrie>
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
    
    const searchResult = entries.filter((entrie: Entrie)=>{
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
      deleteEntrie, editEntrie, isEditing, setIsEditing,
      handleSearch, searchText, setSearchText,
      handleAddEdit, entrie, setEntrie
    }}>
      {children}
    </EntriesContext.Provider>
  )
}

export default EntriesProvider;