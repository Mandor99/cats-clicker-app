import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useSelector, useDispatch } from 'react-redux'
import { getCat } from '../features/cats/catsSlice';

const SideBar = () => {
  const catsState = useSelector(state => state.cats.cats)
  const activeCat = useSelector(state => state.cats.activeCat)
  const dispatch = useDispatch('')

  const showCat = (cat) => {
    dispatch(getCat(cat))
  }

  return (
    <div>
      <List aria-label="mailbox folders" className="b-1 catsItem">
        {
          catsState?.map((cat) => (
            <div key={cat?.catId} className={`catItem pointer ${cat.catId === activeCat ? 'active' : ''}`} onClick={() => showCat(cat)}>
              <ListItem className="capitalize">
                <ListItemText primary={`${cat?.catName}`} className='flex-1' />
                <Chip label={`${cat?.catClicks}`} className={`${cat.catId === activeCat ? 'catClick' : ''}`} />
              </ListItem>
              <Divider />
            </div>
          ))
        }
      </List>
    </div>
  )
}

export default SideBar