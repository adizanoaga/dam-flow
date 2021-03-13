import React, { useContext, useEffect, useState } from 'react';
import {
    interpolareBiliniara,
    getH,
    concatenareValori
} from '../components/utility-functions/UtilityFunctions';
import { Overflow } from '../components/overflow/Overflow';
import { MyChart } from '../components/chart/MyChart'
import { MyContext } from '../App';

export const AppCompute = () => {
    const context = useContext(MyContext)
    const [renderCounter, setRenderCounter] = useState(0)
    const updateGrafic = () => {
        setRenderCounter(renderCounter + 1)
    }
    context.update = updateGrafic

    useEffect(() => { if (renderCounter === 0) updateGrafic() })

    const { TabelTimpDebit, TabelCoteSuprafete, TabelParametriiDeversor } = context

    const timpDebitOre = context.TabelTimpDebit.map(i => [i.col1, i.col2])
    console.log(context, renderCounter)

    const NNR = TabelParametriiDeversor[0].col3
    const overflow = Overflow({ m: TabelParametriiDeversor[0].col2, b: TabelParametriiDeversor[0].col1, NNR: NNR })

    const coteLac = TabelCoteSuprafete.map(i => i.col1)
    const suprafeteLac = TabelCoteSuprafete.map(i => i.col2)

    const volumeAtenuare = ((coteLac, suprafeteLac) => {
        let volume = [0]
        for (let i = 1; i < coteLac.length; i++) {
            let volum = (suprafeteLac[i] - suprafeteLac[i - 1]) / 2 * (coteLac[i] - coteLac[i - 1]) + volume[i - 1]
            volume.push(volum)
        }
        return volume
    })(coteLac, suprafeteLac);
    const cotaVolumAtenuat = concatenareValori(coteLac, volumeAtenuare)
    const timpViituraOre = TabelTimpDebit.map(i => i.col1)
    const timpViituraSecunde = timpViituraOre.map(item => item * 3600)
    const debiteViitura = TabelTimpDebit.map(i => i.col2)

    const generateHidrograph = (timpViituraSecunde, debiteViitura, NNR) => {
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

    const generareGrafic = generateHidrograph(timpViituraSecunde, debiteViitura, NNR)
    const timpDebitAtenuare = generareGrafic.timpAtenuare

    const timpCota = [{
        label: 'Viitura',
        data: generareGrafic.timpCota,
    },]


    const dateHidrograf = [

        {
            label: 'Viitura',
            data: timpDebitOre
        },
        {
            label: 'Grafic atenuare',
            data: timpDebitAtenuare
        },

    ]
    return <div>
        <div className={'containedItem'} style={{ zIndex: '9999', marginRight: '50px' }}>
            <MyChart data={dateHidrograf} />
            <MyChart data={timpCota} />
        </div>
        {/* <pre style={{ textAlign: 'initial' }}>{jsonData}</pre> */}
    </div >

}

// export { dateHidrograf, timpCota, jsonData }