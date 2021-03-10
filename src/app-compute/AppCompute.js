import {
    timpViituraSecunde,
    debiteViitura,
    coteLac,
    timpDebitOre,
    NNR,
    cotaVolumAtenuat,
    parametriDeversor,
    concatenareValori,
    timpViituraOre,
    initialData
} from '../start-data/StartData';
import React, { useContext } from 'react';
import {
    interpolareBiliniara,
    getH
} from '../components/utility-functions/UtilityFunctions';
import { Overflow } from '../components/overflow/Overflow';
import { MyChart } from '../components/chart/MyChart'
import { MyContext } from '../App';


const overflow = Overflow({ m: parametriDeversor.m, b: parametriDeversor.b, NNR: 105 })

const generateHidrograph = (timpViituraSecunde, debiteViitura) => {
    let Q = [0];
    let arrayH = [NNR]
    let left = 0;
    for (let i = 0; i < timpViituraSecunde.length - 1; i++) {
        let I1 = debiteViitura[i];
        let I2 = debiteViitura[i + 1]
        let deltaT = timpViituraSecunde[i + 1] - timpViituraSecunde[i]
        let leftSum = I1 + I2 + left;
        let H = getH(NNR, overflow, coteLac, cotaVolumAtenuat, deltaT, leftSum)
        let Q2 = overflow.outflow(H)
        let S2 = interpolareBiliniara(H, cotaVolumAtenuat)
        left = 2 * S2 / deltaT - 2 * Q2
        Q.push(Q2)
        arrayH.push(H)
    }
    return {
        timpAtenuare: concatenareValori(timpViituraOre, Q),
        cotaAtenuare: concatenareValori(arrayH, Q),
        timpCota: concatenareValori(timpViituraOre, arrayH)
    }
}

const generareGrafic = generateHidrograph(timpViituraSecunde, debiteViitura)
const timpDebitAtenuare = generareGrafic.timpAtenuare

const dateHidrograf = [
    {
        label: 'Viitura',
        data: timpDebitOre
    },
    {
        label: 'Grafic atenuare',
        data: timpDebitAtenuare
    }
]

const timpCota = [{
    label: 'Viitura',
    data: generareGrafic.timpCota,
},]

const jsonData = JSON.stringify(initialData, undefined, 2)

export const AppCompute = () => {
    const context = useContext(MyContext)
    return <div>
        <div>
            <MyChart data={dateHidrograf} />
            <MyChart data={timpCota} />
        </div>
        <pre style={{ textAlign: 'initial' }}>{jsonData}</pre>
    </div >

}

export { dateHidrograf, timpCota, jsonData }