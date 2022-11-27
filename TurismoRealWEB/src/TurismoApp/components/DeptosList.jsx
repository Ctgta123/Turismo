import React from 'react'
import { getDeptos } from '../helpers/getDeptos'
import { DeptosCard } from './DeptosCard';

export const DeptosList = () => {
    const deptos = getDeptos();
  return (
    <>
    <div className="row rows-cols-1 row-cols-md-3 g-3" style={{'justifyContent':'space-between'}}>
        {deptos.map(depto=>(<DeptosCard key={depto.id}{...depto}/>))}
    </div>
    </>
  )
}
