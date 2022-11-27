import React from 'react'
import { getDeptosFilter } from '../helpers/getDeptosFilter';

export const DeptosFilter = () => {

    const filtrar = (event) =>{
        event.preventDefault();
        console.log(event.target.region.value);
        console.log(event.target.comuna.value);
        getDeptosFilter(event.target.region.value,event.target.comuna.value)
    }
  return (
    <form onSubmit={filtrar}>
        <input type="text" name="region" id="region" />
        <input type="text" name="comuna" id="comuna" />
        <button type='submit'>Filtrar</button>
    </form>
  )
}
