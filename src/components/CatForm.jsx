import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Slide from '@mui/material/Slide';
import axios from 'axios'
import baseAxios from '../http/instance'
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getAsyncCats, getCatAge, getCat } from '../features/cats/catsSlice';


const schema = yup.object({
  catName: yup.string('cat name must be string only').required('cat name is required').max(10),
  catClicks: yup.number('count number must be a number').positive('count number must be positive number').integer('count number must be an integer number').required('count is required').max(9999),
  // catImg: yup.mixed().required('cat image is required')
}).required();

const CatForm = ({ children }) => {

  const dispatch = useDispatch()
  const crtCat = useSelector(state => state.cats.crtCat)
  const [toggle, setToggle] = useState(true)
  const [add, setAdd] = useState(false)
  const [imgName, setImgName] = useState(`select image`)
  const [fileVal, setFileVal] = useState(``)
  const [fileData, setFileData] = useState()
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setAdd(prev => false)
    reset({ catName: crtCat?.catName, catClicks: crtCat?.catClicks })
    setImgName(`image/${crtCat?.catNikeName}`)
  }, [reset, crtCat])


  const onSubmit = (data) => {
    let imgData = fileData
    let catAge = getCatAge(data?.catClicks)
    let formData = new FormData()
    formData.append('upload_preset', 's9xucifv')
    formData.append('file', imgData)
    // eslint-disable-next-line no-unused-expressions
    add ? (
      axios.post('https://api.cloudinary.com/v1_1/da55hzvot/image/upload', formData).then(res => {
        const model = {
          catName: data?.catName,
          catNikeName: data?.catName + 'ly',
          catImg: res?.data.url,
          catClicks: data?.catClicks,
          catAge: catAge,
          catId: uuid().slice(0, 8)
        }
        baseAxios.post('/cats', model).then(res => {
          dispatch(getAsyncCats())
          dispatch(getCat(res?.data))
        })
      })) : fileVal.length === 0 ? (
        baseAxios.put(`/cats/${crtCat.id}`, { ...crtCat, catName: data.catName, catClicks: data.catClicks, catAge: catAge }).then(res => {
          dispatch(getCat({ ...crtCat, catName: data.catName, catClicks: data.catClicks, catAge: catAge }))
          dispatch(getAsyncCats())
        })
      ) : (
      axios.post('https://api.cloudinary.com/v1_1/da55hzvot/image/upload', formData).then(res => {
        const model = {
          ...crtCat,
          catName: data?.catName,
          catImg: res?.data.url,
          catClicks: data?.catClicks,
          catAge: catAge,
        }
        dispatch(getCat(model))
        baseAxios.put(`/cats/${crtCat.id}`, model).then(res => {
          dispatch(getAsyncCats())
        })
      })
    )
  }

  const getImg = (e) => {
    setFileData(e.target.files[0])
    let val = e.target.value.split('\\')
    setImgName('images/' + val[val.length - 1])
  }

  const handleNewForm = () => {
    setAdd(prev => true)
    reset({ catName: '', catClicks: null })
    setImgName('select image')
  }

  return (
    <section className="overflow">
      {!toggle && <Stack spacing={2} direction="row" className='form__toggle'>
        <Button variant="contained" color="secondary" className="grow capitalize" onClick={() => setToggle(true)}>Edit</Button>
      </Stack>}
      <Slide direction="up" in={toggle} mountOnEnter unmountOnExit>
        <div className='form__wrapper'>
          <Button variant="contained" color="primary" onClick={(e) => handleNewForm()} className='capitalize'>open new form</Button>
          <Box component="form" noValidate autoComplete="off" className='catForm'>
            <div className='inputWrapper'>
              <label htmlFor="catName" className='capitalize'>cat name</label>
              <TextField name="catName" id='catName' placeholder='cat name' fullWidth size='small' {...register("catName")} />
              <Box component="span" className='errorMsg'>{errors.catName?.message}</Box>
            </div>
            <div className='inputWrapper'>
              <span className='capitalize'>cat image</span>
              <label htmlFor="fileImg" className='labelImg'>
                {imgName}
              </label>
              <input type="file" name="fileImg" id="fileImg" className='hidden'
                value={fileVal}
                onChange={(e) => { setFileVal(e.target.value); getImg(e) }}
              />
              <Box component="span" className='errorMsg'>{errors.catImg?.message}</Box>
            </div>
            <div className='inputWrapper'>
              <label htmlFor="catClicks" className='capitalize'>cat clicks</label>
              <TextField type="number" id="catClicks" name='catClicks' placeholder='count of clicks' fullWidth size="small" {...register("catClicks")} />
              <Box component="span" className='errorMsg'>{errors.catClicks?.message}</Box>
            </div>
            <Stack spacing={2} direction="row">
              <Button type='submit' variant="contained" color="success" className="grow capitalize" onClick={handleSubmit(onSubmit)} disabled={!isValid || (fileVal.length === 0 && add)}>save</Button>
              <Button variant="contained" color="error" className="grow form__undo capitalize" onClick={() => setToggle(false)}>undo</Button>
              {children}
            </Stack>
          </Box>
        </div>
      </Slide>
    </section>
  )
}

export default CatForm