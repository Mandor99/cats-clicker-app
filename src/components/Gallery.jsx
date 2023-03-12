import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { incClicks, getCat, getCatAge } from '../features/cats/catsSlice';
import baseAxios from '../http/instance'

const Gallery = () => {

  const { cats } = useSelector(state => state.cats)
  const dispatch = useDispatch()

  const increment = (cat) => {
    dispatch(getCat(cat))
    dispatch(incClicks(cat.catId))
    let tempC = cat.catClicks
    tempC += 1
    let model = {
      ...cat,
      catClicks: tempC,
      catAge: getCatAge(tempC)
    }
    baseAxios.put(`/cats/${cat.id}`, model)
  }

  return (
    <section >
      <h1 className='gallery__title capitalize'>cats image gallery</h1>
      <section className='gallery'>
        {
          cats?.map(cat => (
            <div onClick={() => increment(cat)} key={cat.catId} className='gallery__card pointer'>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className='capitalize'>{cat?.catName}</Typography>
                  <Typography variant="body2" color="text.secondary" className='capitalize'>no. of times clicked:{cat?.catClicks}</Typography>
                </CardContent>
                <CardMedia
                  sx={{ height: 200 }}
                  image={`${cat?.catImg}`}
                  title={`${cat?.catNikeName}`}
                />
                <CardActions className='gallery__card--item'>
                  <Button size="small" className='capitalize'>card link</Button>
                </CardActions>
              </Card>
            </div>
          ))
        }
      </section>
    </section>
  )
}

export default Gallery