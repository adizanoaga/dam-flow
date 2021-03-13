import React, { useContext } from 'react'
import './App.scss';

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
        <div style={{ marginBottom: '50px' }}>Trecerea viiturii prin lacul de acumulare <br />ing A.Z.</div>
        <div>
          <div className='tableAndInfo'>
            <AppCompute />
            <div>
              <div className={'title'}>Dependinta Timp-Debit Viitura</div>
              <TabelTimpDebit />
            </div>
            <div>
              <div style={{ paddingBottom: '20px' }}>
                <div className={'title'}>Parametrii deversor</div>
                <TabelParametriiDeversor />
              </div>
              <div className={'title'}>Caracteristica lacului</div>
              <TabelCoteSuprafete />
            </div>

          </div>
        </div>
      </MyContext.Provider>
    </div >
  );
}
export default App;
