import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';



const initialState = {
  adverts: [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  status: 'idle',
  error: null,
  filters: {
    location: '',
    equipment: '',
    type: '',
  },
};

export const fetchAdverts = createAsyncThunk('adverts/fetchAdverts', async (params) => {
  const response = await axiosInstance.get('adverts', { params });
  return response.data;
});

const advertsSlice = createSlice({
  name: 'adverts',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const advertId = action.payload;
      const isFavorite = state.favorites.includes(advertId);

      if (isFavorite) {
        state.favorites = state.favorites.filter((id) => id !== advertId);
      } else {
        state.favorites.push(advertId);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAdverts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.adverts = action.payload.map((advert) => ({
          ...advert,
          isFavorite: state.favorites.includes(advert._id),
        }));
      })
      .addCase(fetchAdverts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite, setFilters } = advertsSlice.actions;
export const advertsReducer = advertsSlice.reducer;

