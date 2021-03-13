import React, { useContext } from 'react'
import './App.css';

import { AppCompute } from './app-compute/AppCompute'

import { TabelTimpDebit } from './components/tables/tabel-timp-debit/TabelTimpDebit'
import { TabelCoteSuprafete } from './components/tables/tabel-cote-suprafete/TabelCoteSuprafete'
import { TabelParametriiDeversor } from './components/tables/tabel-parametrii-deversor/TabelParametriiDeversor'

export const MyContext = React.createContext();
const initState = [{ col1: 0, col2: 0, col3: 0 }]

function App() {
  const context = useContext(MyContext)
  return (
    <div className="App" >
      <MyContext.Provider value={{ TabelTimpDebit: initState, TabelCoteSuprafete: initState, TabelParametriiDeversor: initState }}>
        <div >Test app</div>
        <div>
          <div className='tableAndInfo'>
            <AppCompute />
            <div>
              <TabelTimpDebit />
            </div>
            <div>
              <TabelCoteSuprafete />
            </div>
            <div>
              <TabelParametriiDeversor />
            </div>
          </div>
        </div>
      </MyContext.Provider>
    </div >
  );
}
export default App;
