import { type UserInfo } from "firebase/auth"

export type AuthContextType = {
  currentUser: UserInfo,
  error: string,
  setError: (error: string) => void,
  email: string,
  setEmail: (email: string) => void,
  password: string,
  setPassword: (password: string) => void,
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void,
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void,
  handleLogout: () => void
}

export type EntriesContextType = {
  data: Entrie[],
  fetchData: () => void,
  setData: (data: Entrie[]) => void,
  entries: Entrie[],
  setEntries: (data: Entrie[]) => void,
  isLoading: boolean,
  deleteEntrie: (id: string) => void
  editEntrie: (entrie: Entrie) => void
  datetime: string,
  setDatetime: (datetime: string) => void,
  type: string, 
  setType: (type: string) => void,
  clientName: string,
  setClientName: (clientName: string) => void,
  phone: string, 
  setPhone: (phone: string) => void,
  isEditing: IsEditing,
  setIsEditing: (isEditing: IsEditing) => void,
  handleSearch: (
    e: React.FormEvent<HTMLFormElement>, 
    selectedFilters: SelectedFilters, 
    filteredArray: Entrie[]
  ) => void,
  searchText: string,
  setSearchText: (searchText: string) => void,
  handleAddEdit: (e: React.FormEvent<HTMLFormElement>) => void
}

export interface IsEditing{
  currentEntrie: Entrie, 
  status: boolean
}

export interface FiltersData{
  entrieDatetimes: Array<string> ,
  entrieTypes: Array<string>,
  entrieClientNames: Array<string>,
}

export interface Entrie{
  [key: string]: string | number | {},
  entrieDatetime: {
    seconds: number,
    nanoseconds: number
  },
  entrieType: string,
  entrieClientName: string,
  entriePhone: string,
  entrieId: string,
  userId: string,
}

export interface SelectedFilters{
  entrieDatetime: string,
  entrieType: string,
  entrieClientName: string
}

export type FiltersContextType = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void, 
  selectedFilters: SelectedFilters,
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  filtersData: FiltersData,
  filteredArray: Array<Entrie>,
  submitFilters: (e: React.FormEvent<HTMLFormElement>) => void 
}