import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdvertCard from '../../components/CamperCard/AdvertCard';
import { fetchAdverts } from '../../redux/slices/advertsSlice';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts.adverts);
  const favorites = useSelector((state) => state.adverts.favorites);

  useEffect(() => {
    // Запрашиваем объявления с сервера при загрузке страницы
    dispatch(fetchAdverts());
  }, [dispatch]);

  useEffect(() => {
    console.log('Adverts:', adverts);
    console.log('Favorites:', favorites);
  }, [adverts, favorites]);

  if (!adverts.length) {
    return <p>No adverts available.</p>;
  }

  const favoriteAdverts = adverts.filter(advert => favorites.includes(advert._id));

  return (
    <div>
      <h2>Favorites</h2>
      <div className="advert-list">
        {favoriteAdverts.length ? (
          favoriteAdverts.map((advert) => (
            <AdvertCard 
              key={advert._id} 
              advert={advert}
            />
          ))
        ) : (
          <p>No favorite adverts</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
