import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearUser } from '../Redux/AuthSlice'

const Headercontianer = styled.div`
    width: 100%;
    height: 50px;
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Button = styled.button`
    all: unset;
    margin: 35px;
    width: 120px;
    height: 40px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
`

function Header({log,home}) {

  const dispatch = useDispatch()

  function logout () {
    dispatch(clearUser());
  }

  return (
    <>
      <Headercontianer>
      {log ? "" : <Link to={'/profile'}><Button>Profile</Button></Link> }
            <Link to={'/'}><Button>{home}</Button></Link>
            {log ? "" : <Button onClick={logout}>Logout</Button> } 
      </Headercontianer>
    </>
  )
}

export default Header
