import './App.css';
import UserLists from './shared/components/user-list/user-list';
import { UserListContextProvider } from './context/userList-context';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <UserListContextProvider>
       <UserLists/>
       </UserListContextProvider>
      </header>
    </div>
  );
}

export default App;
