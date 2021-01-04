import React from 'react';
import './App.css';

import Application from './Application'
import UserProvider from './providers/UserProvider'
import LogRocket from 'logrocket';

import { db } from './firebase'

import { requestFirebaseNotificationPermission } from './firebase'

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
