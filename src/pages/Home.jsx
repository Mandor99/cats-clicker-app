import React, {useEffect} from 'react'
import CatForm from '../components/CatForm'
import SideBar from '../components/SideBar'
import '../styles/home.css'
import {useDispatch, useSelector} from 'react-redux'
import { getAsyncCats } from '../features/cats/catsSlice'
import CatCard from '../components/CatCard'
import Gallery from '../components/Gallery'


const Home = () => {
  const catsState = useSelector(state => state.cats?.cats)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAsyncCats())
  }, [dispatch])

  return (
    <div>
    <main className='grid'>
      {
      (catsState?.length > 0)  ? (
        <>
          <div className='grid__item grid__item--sidebar'><SideBar /></div>
          <div className='grid__item'>{ <CatCard initCat={catsState[0]}/>}</div>
          <div className='grid__item grid__item--form'><CatForm /></div>
        </>
      ) : (<h2>loading ...</h2>)
      }
    </main>
    <div><Gallery /></div>
  </div>
  )
}

export default Home