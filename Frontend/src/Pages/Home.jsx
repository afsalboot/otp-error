import React from 'react'
import Header from '../Components/Header';
import styled from 'styled-components'


const Hometxt = styled.div`
  color: burlywood;
  font-size: 50px;
  position: absolute;
  top: 40%;
  left: 40%
`
function Home() {
  


  return (
    <div>
      <Header />
      <Hometxt> HOME PAGE </Hometxt>
    </div>
  )
}

export default Home