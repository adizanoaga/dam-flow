import React, { useState, useRef, useContext } from 'react';
import { MyContext } from '../../App'

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const range = (len) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push({ id: i, col1: undefined, col2: undefined, col3: undefined });
    }
    return arr;
};


export const Tabel = ({ numeTabel = '', nrRanduri = 10, nrColoane = 2, titluColoana1 = '', titluColoana2 = '', titluColoana3 = '', defaultData = false, coloaneNonEditabile = [] }) => {
    const [tableData,] = useState(defaultData ? defaultData : range(nrRanduri))

    const context = useContext(MyContext)
    context[numeTabel] = tableData

    const Cell = (props) => {
        const ref = useRef(tableData[props.info.original.id][props.info.column.id])
        const inputValueUpdate = (val) => {
            ref.current = val
            tableData[props.info.original.id][props.info.column.id] = Number(val)
            context[numeTabel] = tableData
            context.update()
        }
        return <div><input type={'number'} ref={ref} defaultValue={ref.current} style={{ width: '80%', zIndex: '1000' }}
            onBlur={(e, e2) => { inputValueUpdate(e.target.value) }}
            onKeyUp={(e) => {
                if (e.code === 'Enter') inputValueUpdate(e.target.value)
            }}
        /></div>
    }

    const configColoane = [
        {
            Header: 'id',
            accessor: 'id',
            show: false
        },
        {
            Header: titluColoana1,
            accessor: 'col1',
            Cell: (info) => {
                if (coloaneNonEditabile.find(i => i === 'col1')) return <div>{info.original.col1}</div>
                return <Cell info={info} />
            },
            show: nrColoane > 0,
            minWidth: 110
        },
        {
            Header: titluColoana2,
            accessor: 'col2',
            Cell: (info) => {
                if (coloaneNonEditabile.find(i => i === 'col1')) return <div>{info.original.col2}</div>

                return <Cell info={info} />
            },
            show: nrColoane > 1,
            minWidth: 110
        },
        {
            Header: titluColoana3,
            accessor: 'col3',
            Cell: (info) => {
                if (coloaneNonEditabile.find(i => i === 'col1')) return <div>{info.originalcol3}</div>

                return <Cell info={info} />
            },
            show: nrColoane > 2,
            minWidth: 110
        }
    ]

    return <div className={'containedItem'}><form onSubmit={e => { e.preventDefault() }}>
        <ReactTable
            data={tableData}
            columns={configColoane}
            showPagination={false}
            defaultPageSize={tableData.length}
        /></form ></div>
}
