import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toggleFavorite } from '../../redux/slices/advertsSlice';
import './AdvertCard.css';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bookingDate: yup.date().required('Booking date is required'),
  comment: yup.string(),
});

const AdvertCard = ({ advert }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.adverts.favorites);
  const isFavorite = favorites.includes(advert._id);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(advert._id));
  };

  const handleShowMore = () => {
    setActiveTab('details'); // Устанавливаем вкладку по умолчанию
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = (data) => {
    console.log('Booking data:', data);
    // Тут можно добавить логику отправки данных на сервер
    closeModal();
  };

  return (
    <div className="advert-card">
      <img src={advert.gallery[0]} alt={advert.name} className="advert-image" />
      <div className="advert-info">
        <h3>{advert.name}</h3>
        <p>Price: {advert.price.toLocaleString('uk-UA', { minimumFractionDigits: 2 })} UAH</p>
        <p>Location: {advert.location}</p>
        <p>Rating: {advert.rating}</p>
        <button 
          onClick={handleFavoriteToggle}
          className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
        >
          ♥
        </button>
        <button onClick={handleShowMore}>
          Show more
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Advert Details"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>{advert.name}</h2>
        <div className="tabs">
          <button onClick={() => setActiveTab('details')} className={activeTab === 'details' ? 'active' : ''}>Details</button>
          <button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>Reviews</button>
          <button onClick={() => setActiveTab('booking')} className={activeTab === 'booking' ? 'active' : ''}>Booking</button>
        </div>
        
        {activeTab === 'details' && <p>{advert.description}</p>}
        {activeTab === 'reviews' && <p>Отзывы (подгрузить или вывести данные).</p>}
        
        {activeTab === 'booking' && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Name:</label>
              <input type="text" {...register('name')} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" {...register('email')} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label>Booking Date:</label>
              <input type="date" {...register('bookingDate')} />
              {errors.bookingDate && <p>{errors.bookingDate.message}</p>}
            </div>
            <div>
              <label>Comment:</label>
              <textarea {...register('comment')} />
            </div>
            <button type="submit">Book Now</button>
          </form>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default AdvertCard;
