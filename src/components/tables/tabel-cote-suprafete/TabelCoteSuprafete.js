import React from 'react';

import { Tabel } from '../Tabel.js'

import { coteLac, suprafete } from '../../../start-data/StartData'

export const TabelCoteSuprafete = (props) => {
    const defaultData = coteLac.map((element, index) => {
        return { id: index, col1: element, col2: suprafete[index] }
    });
    return <Tabel numeTabel={'TabelCoteSuprafete'} nrRanduri={10} nrColoane={2} titluColoana1={'Cote Abs[m]'} titluColoana2={'Suprafete[m2]'} defaultData={defaultData} {...props} />
}