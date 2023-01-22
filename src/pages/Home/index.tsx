import { useState } from 'react'
import Navbar, { ActivePage } from '../../components/Navbar'
import PageTitle from '../../components/PageTitle'

function Home() {

  return (
    <>
      <Navbar activePage={ActivePage.Home} />
      <PageTitle>This is the Home page</PageTitle>
      <p className='fond-bold'>Hallo</p>
    </>
  )
}

export default Home
