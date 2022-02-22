import React from 'react'
import Header from './Header'
import styled from "styled-components";

function Home() {
  return (
      <>
      <Header />
      <Container> Hello </Container>
    </>
  )
}

export default Home

const Container = styled.div`
margin-top: 40px;
`