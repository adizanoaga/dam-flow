import React from 'react';

import { Tabel } from '../Tabel.js'

import { debiteViitura, timpViituraOre } from '../../../start-data/StartData'

export const TabelTimpDebit = (props) => {
    const defaultData = timpViituraOre.map((element, index) => {
        return { id: index, col1: element, col2: debiteViitura[index] }
    });
    return <Tabel numeTabel={'TabelTimpDebit'} nrRanduri={10} nrColoane={2} titluColoana1={'Timp[ore]'} titluColoana2={'Debit[m3/s]'} defaultData={defaultData} {...props} />
}

