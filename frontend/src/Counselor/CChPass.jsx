import React from 'react'
import ChPass from '../Components/ChPass'

function CChPass() {
  
  return (
    <div>
        <h3>Counselor</h3>
        <ChPass id={localStorage.getItem('Counselor')} role="Counselor"/>
    </div>
  )
}

export default CChPass