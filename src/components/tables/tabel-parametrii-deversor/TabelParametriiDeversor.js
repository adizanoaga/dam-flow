import React from 'react';
import { Tabel } from '../Tabel.js'

import { parametriDeversor, NNR } from '../../../start-data/StartData'

export const TabelParametriiDeversor = (props) => {
    const defaultData = [{ id: 0, col1: parametriDeversor.b, col2: parametriDeversor.m, col3: NNR }]
    return <Tabel
        numeTabel={'TabelParametriiDeversor'}
        nrRanduri={1}
        nrColoane={3}
        titluColoana1={'b[m]'}
        titluColoana2={'m'}
        titluColoana3={'NNR'}
        defaultData={defaultData}
        {...props}
    />

}