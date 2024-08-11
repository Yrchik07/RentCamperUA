import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toggleFavorite } from "../../redux/slices/advertsSlice";
import "./AdvertCard.css";
import Icon from "../shared/Icon/Icon";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  bookingDate: yup.date().required("Booking date is required"),
  comment: yup.string(),
});

const AdvertCard = ({ advert }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.adverts.favorites);
  const isFavorite = favorites.includes(advert._id);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [ratingDetails, setRatingDetails] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(advert._id));
  };

  const handleShowMore = () => {
    setActiveTab("details"); 
    setModalIsOpen(true);
  };

  const openRatingDetails = () => {
    setRatingDetails(advert.rating);
    setActiveTab("details");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setRatingDetails(null);
  };

  const onSubmit = (data) => {
    console.log("Booking data:", data);
    closeModal();
  };

  return (
    <div className="advert-card">
      <img src={advert.gallery[0]} alt={advert.name} className="advert-image" />
      <div className="advert-info">
        <div className="advert-card-name-prise">
          <h3>{advert.name}</h3>
          <p>
            €{" "}
            {advert.price.toLocaleString("uk-UA", { minimumFractionDigits: 2 })}
            <button
              onClick={handleFavoriteToggle}
              className={`favorite-button ${isFavorite ? "favorite" : ""}`}
            >
              ♥
            </button>
          </p>
        </div>
        <div className="advert-card-reviews">
        <p>
          <a href="#!" onClick={openRatingDetails} className="rating-link">
            {"\u2B50"} {advert.rating} ({advert.reviews.length} Reviews)
          </a>
        </p>
        <p>
          <Icon width={16} height={16} id="icon-location" /> {advert.location}
        </p>

        </div>
        <p>The pictures shown here are example vehicles of the respective.</p>
        <button onClick={handleShowMore}>Show more</button>
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
          <button
            onClick={() => setActiveTab("details")}
            className={activeTab === "details" ? "active" : ""}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={activeTab === "reviews" ? "active" : ""}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("booking")}
            className={activeTab === "booking" ? "active" : ""}
          >
            Booking
          </button>
        </div>

        {activeTab === "details" && <p>{advert.description}</p>}
        {ratingDetails && <p>Rating Details: {ratingDetails}</p>}
        {activeTab === "reviews" && (
          <p>Отзывы (подгрузить или вывести данные).</p>
        )}

        {activeTab === "booking" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Name:</label>
              <input type="text" {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label>Booking Date:</label>
              <input type="date" {...register("bookingDate")} />
              {errors.bookingDate && <p>{errors.bookingDate.message}</p>}
            </div>
            <div>
              <label>Comment:</label>
              <textarea {...register("comment")} />
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
