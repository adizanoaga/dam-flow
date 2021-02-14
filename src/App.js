import './App.css';
import { MyChart } from './components/chart/MyChart';
import {
  timpViitura,
  debiteViitura,
  coteLac,
  suprafeteLac,
  timpDebit,
  NNR,
  cotaSuprafata,
  cotaVolumAtenuat,
  overflowParameter,
  concatenareValori
} from './mock-data/MockData';
import {
  interpolareBiliniara, rightFormula,
} from './components/utility-functions/UtilityFunctions';
import { Overflow } from './components/overflow/Overflow'

function App() {

  const overflow = Overflow({ m: overflowParameter.m, b: overflowParameter.b, NNR: 105 })

  const round = (number) => Math.round(number * 100) / 100

  const getH = (deltaT, leftSum) => {
    let maxH = 117.5;
    let increment = 0.1
    for (let H = NNR; H < maxH; H += increment) {
      let S2 = interpolareBiliniara(H, cotaVolumAtenuat)
      let Q2 = overflow.outflow(H)
      let rightSum = 2 * S2 / deltaT + Q2
      if (rightSum / leftSum > 0.95) {
        return H
      }
    }
  }
  const generateHidrograph = (timpViitura, debiteViitura) => {
    let Q = [0];
    let left = 0;
    for (let i = 0; i < timpViitura.length - 1 - 2; i++) {
      let I1 = debiteViitura[i];
      let I2 = debiteViitura[i + 1]
      let deltaT = timpViitura[i + 1] - timpViitura[i]
      let leftSum = I1 + I2 + left;
      console.log(i, I1, I2, left, I1 + I2 + left, leftSum)
      let H = getH(deltaT, leftSum)
      let Q2 = overflow.outflow(H)
      console.log(H, Q2)
      // console.log(H)
      let S2 = interpolareBiliniara(H, cotaVolumAtenuat)
      left = 2 * S2 / deltaT - 2 * Q2
      Q.push(Q2)
    }
    console.log(Q)
    return concatenareValori(timpViitura.slice(0, -2), Q);
  }

  const timpDebitAtenuare = generateHidrograph(timpViitura, debiteViitura)


  const data = {
    timpViitura: timpViitura,
    debiteViitura: debiteViitura,
    coteLac: coteLac,
    suprafeteLac: suprafeteLac,
    timpDebit: timpDebit,
    NNR: NNR,
    cotaSuprafata: cotaSuprafata,
    cotaVolumAtenuat: cotaVolumAtenuat,
    // timpDebitAtenuare: timpDebitAtenuare
  };


  return (
    <div className="App">
      <MyChart data={data} />
    </div>
  );
}
export default App;
