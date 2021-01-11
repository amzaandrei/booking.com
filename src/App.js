import React from 'react';
import './App.css';

import Application from './Application'
import UserProvider from './providers/UserProvider'
import LogRocket from 'logrocket';

function App() {

  LogRocket.init('qsidio/mamaproject');

  return (
    <div className="App">
      <UserProvider>
        <Application />
      </UserProvider>
    </div>
  );
}

export default App;
