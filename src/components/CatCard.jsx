import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { incClicks, getCat, getCatAge } from '../features/cats/catsSlice';
import baseAxios from '../http/instance'


const CatCard = ({ initCat }) => {

  let crtCat = useSelector(state => state.cats.crtCat)
  const dispatch = useDispatch()
  // let timeId;
  let id = crtCat.id
  const increment = () => {
    dispatch(incClicks(crtCat.catId))
    // clearTimeout(timeId)
    // timeId = setTimeout(() => {
    let tempC = crtCat.catClicks
    tempC += 1
    let model = {
      ...crtCat,
      catClicks: tempC,
      catAge: getCatAge(tempC)
    }
    baseAxios.put(`/cats/${id}`, model)
    // }, 2000)
  }

  useEffect(() => {
    dispatch(getCat(initCat))
  }, [])

  return (
    <div onClick={() => increment()} className='pointer'>
      <Card >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='capitalize'>{crtCat?.catName}</Typography>
          <Typography variant="body2" color="text.secondary" className='capitalize'>no. of times clicked:{crtCat?.catClicks}</Typography>
        </CardContent>
        <CardMedia
          sx={{ height: 200 }}
          image={`${crtCat?.catImg}`}
          title={`${crtCat?.catNikeName}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='capitalize'>{crtCat?.catNikeName}</Typography>
          <Typography variant="body2" color="text.secondary" className='capitalize'>grown up {crtCat?.catAge}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" className='capitalize'>card link</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default CatCard