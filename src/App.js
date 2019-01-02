import React, {
  useState
} from 'react';

import AuthPage from './pages/auth'
import TodoContainer from './pages/todo'



const App = () => {
  const [user, setUser] = useState(null)
  return (
    <div className="App">
        {/* {
          user === null ?
          <AuthPage onAuthSuccessful={user=>setUser(user)}/> :
          <TodoContainer/>
        } */}
        <TodoContainer/>
    </div>
  );
}

export default App;
