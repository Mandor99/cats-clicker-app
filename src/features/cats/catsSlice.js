import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import baseAxios from '../../http/instance'

export const getAsyncCats = createAsyncThunk(
  'cats/fetchCats',
  async () => {
    const {data} = await baseAxios.get('/cats')
    return data
  }
);

export const getCatAge = (catAge) => {
  let age = (catAge>=0 && catAge<=5)?'infant': (catAge>=6 && catAge<=12) ? 'child' : (catAge>=13 && catAge<=25) ? 'young':(catAge>=26 && catAge<=40) ? 'middle-age' : (catAge>=41 && catAge<=60) ? 'old' :'very old'
  return age
}

export const catsSlice = createSlice({
  name: 'catsSlice',
  initialState: {cats:[],crtCat: {}, activeCat: 0},
  reducers: {
    getCat: (state, action) => {
      state.crtCat = {...action.payload}
      state.activeCat = action.payload.catId
    },
    incClicks: (state, action) => {
      state.cats.map(cat => {
        if (cat.catId === action.payload) {
          let catAge = ++cat.catClicks
          let getAge = getCatAge(catAge)
          state.crtCat.catClicks = catAge
          state.crtCat.catAge = getAge
          return {...cat, catClicks: catAge, catAge: getAge}
        } else {
          return cat
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncCats.fulfilled, (state, action) => {
        state.cats = [...action.payload]
      });
  },
});

export const { getCat, incClicks } = catsSlice.actions;

export default catsSlice.reducer;
