export type AuthContextType = {
  currentUser: any,
  error: any,
  setError: any,
  email: any,
  setEmail: any,
  password: any,
  setPassword: any,
  handleRegister: any,
  handleLogin: any,
  handleLogout: any
}

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
  setIsEditing: (isEditing:any) => void,
  handleSearch: (e: React.FormEvent<HTMLFormElement>, selectedFilters: any, filteredArray: any) => void,
  searchText: any,
  setSearchText: any,
  handleAddEdit: any
}