import React, { createContext, useEffect, useState, useCallback } from "react";
import userListApi from "../services/api/userlist-api";
const UserListContext = createContext();

function UserListContextProvider(props) {
  const [users, setUsers] = useState([]);
  const [usersOriginal, setUsersOriginal] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await userListApi(100,0);
          setUsersOriginal(response.users); 
          setUsers(response.users)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      
      fetchData();
  }, []);

  const sortedAndFilteredUsers = (value,sortColumn) => {
    console.log(value);
    if (value) {
       let filteredUsers = usersOriginal.filter(user => user.gender == value);
       setUsers(filteredUsers);
    }
    if (value == "asc" || value == "desc") {
    users.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return value === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return value === 'asc' ? 1 : -1;
      return 0;
  });
  setUsers(users); 
    }
};


  

  return (
    <UserListContext.Provider
      value={{
        users,
        sortedAndFilteredUsers,
        usersOriginal,
        setUsers,
        
      }}
    >
      {props.children}
    </UserListContext.Provider>
  );
}

export default UserListContext;
export { UserListContextProvider };
