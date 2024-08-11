import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdverts } from "../../redux/slices/advertsSlice";
import AdvertCard from "../../components/CamperCard/AdvertCard";
import "./CatalogPage.css";
import Icon from "../../components/shared/Icon/Icon";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { adverts, status } = useSelector((state) => state.adverts);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedAdverts, setDisplayedAdverts] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [equipmentFilter, setEquipmentFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");

  const advertsPerPage = 4;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdverts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const filterAdverts = () => {
      let filteredAdverts = adverts;

      if (locationFilter) {
        filteredAdverts = filteredAdverts.filter((advert) =>
          advert.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
      }

      if (equipmentFilter.length > 0) {
        filteredAdverts = filteredAdverts.filter((advert) =>
          equipmentFilter.every((equip) => advert.details?.[equip] > 0)
        );
      }

      if (typeFilter) {
        filteredAdverts = filteredAdverts.filter(
          (advert) => advert.form === typeFilter
        );
      }

      return filteredAdverts;
    };

    const filteredAdverts = filterAdverts();
    setDisplayedAdverts(filteredAdverts.slice(0, currentPage * advertsPerPage));
  }, [adverts, currentPage, locationFilter, equipmentFilter, typeFilter]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const filteredAdvertsCount = adverts.filter((advert) => {
    let matches = true;

    if (locationFilter) {
      matches =
        matches &&
        advert.location.toLowerCase().includes(locationFilter.toLowerCase());
    }

    if (equipmentFilter.length > 0) {
      matches =
        matches &&
        equipmentFilter.every((equip) => advert.details?.[equip] > 0);
    }

    if (typeFilter) {
      matches = matches && advert.form === typeFilter;
    }

    return matches;
  }).length;

  const hasMoreAdverts = displayedAdverts.length < filteredAdvertsCount;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error fetching adverts</p>;
  }

  const handleCustomCheckboxChange = (value) => {
    setEquipmentFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const CustomCheckbox = ({ value, label, icon }) => {
    const isChecked = equipmentFilter.includes(value);

    return (
      <div
        className="custom-checkbox"
        onClick={() => handleCustomCheckboxChange(value)}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          border: `2px solid ${isChecked ? "red" : "grey"}`,
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "8px",
        }}
      >
        <Icon
          width={25}
          height={25}
          id={icon}
          style={{ fill: isChecked ? "green" : "grey", marginRight: "8px" }}
        />
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="catalog-container">
      <div className="filters">
        <div className="filter-location">
          <label>Location</label>
          <div className="input-wrapper">
            <input
              type="text"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Kyiv, Ukraine"
              className="input-with-icon"
            />
            <Icon
              width={16}
              height={16}
              id="icon-location"
              className="input-icon"
            />
          </div>
        </div>
        <div>
          <label>Filters</label>
          <h3>Vehicle equipment</h3>
          <div className="custom-checkbox-container">
            <CustomCheckbox value="airConditioner" label="AC" icon="icon-As" />
            <CustomCheckbox
              value="automatic"
              label="Automatic"
              icon="icon-Avtomatic"
            />
            <CustomCheckbox value="kitchen" label="Kitchen" icon="icon-Food" />
            <CustomCheckbox value="TV" label="TV" icon="icon-Tv" />
            <CustomCheckbox
              value="shower"
              label="Shower/WC"
              icon="icon-Shower"
            />
          </div>
          <h3>Vehicle type</h3>
        </div>
        <div>
          <label>Type:</label>
          <div>
            <input
              type="radio"
              name="type"
              value="Campervan"
              checked={typeFilter === "Campervan"}
              onChange={(e) => setTypeFilter(e.target.value)}
            />{" "}
            Campervan
          </div>
          <div>
            <input
              type="radio"
              name="type"
              value="Motorhome"
              checked={typeFilter === "Motorhome"}
              onChange={(e) => setTypeFilter(e.target.value)}
            />{" "}
            Motorhome
          </div>
        </div>
      </div>
      <div className="advert-list">
        {displayedAdverts.map((advert) => (
          <AdvertCard key={advert._id} advert={advert} />
        ))}
        {hasMoreAdverts && (
          <button onClick={handleLoadMore} className="load-more-button">
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
