// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAdverts } from '../../redux/slices/advertsSlice';
// import AdvertCard from '../../components/CamperCard/AdvertCard';
// import './CatalogPage.css';

// const CatalogPage = () => {
//   const dispatch = useDispatch();
//   const { adverts, status } = useSelector((state) => state.adverts);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [displayedAdverts, setDisplayedAdverts] = useState([]);
//   const [locationFilter, setLocationFilter] = useState('');
//   const [equipmentFilter, setEquipmentFilter] = useState([]);
//   const [typeFilter, setTypeFilter] = useState('');

//   const advertsPerPage = 4; // Количество объявлений, показываемых за один раз

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchAdverts());
//     }
//   }, [dispatch, status]);

//   useEffect(() => {
//     let filteredAdverts = adverts;

//     if (locationFilter) {
//       filteredAdverts = filteredAdverts.filter(advert => 
//         advert.location.toLowerCase().includes(locationFilter.toLowerCase())
//       );
//     }

//     if (equipmentFilter.length > 0) {
//       filteredAdverts = filteredAdverts.filter(advert =>
//         equipmentFilter.every(equip => advert.equipment?.includes(equip))
//       );
//     }

//     if (typeFilter) {
//       filteredAdverts = filteredAdverts.filter(advert => advert.type === typeFilter);
//     }

//     // Update displayed adverts based on currentPage
//     setDisplayedAdverts(filteredAdverts.slice(0, currentPage * advertsPerPage));

//     // Reset currentPage when filters change
//     setCurrentPage(1);

//   }, [adverts, currentPage, locationFilter, equipmentFilter, typeFilter]);

//   const handleLoadMore = () => {
//     setCurrentPage(prevPage => prevPage + 1);
//   };

//   // Calculate filtered adverts for checking "Load more"
//   let filteredAdverts = adverts;

//   if (locationFilter) {
//     filteredAdverts = filteredAdverts.filter(advert => 
//       advert.location.toLowerCase().includes(locationFilter.toLowerCase())
//     );
//   }

//   if (equipmentFilter.length > 0) {
//     filteredAdverts = filteredAdverts.filter(advert =>
//       equipmentFilter.every(equip => advert.equipment?.includes(equip))
//     );
//   }

//   if (typeFilter) {
//     filteredAdverts = filteredAdverts.filter(advert => advert.type === typeFilter);
//   }

//   // Determine if there are more adverts to load based on filtered adverts
//   const hasMoreAdverts = filteredAdverts.length > displayedAdverts.length;

//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   if (status === 'failed') {
//     return <p>Error fetching adverts</p>;
//   }

//   return (
//     <div>
//       <h2>Catalog</h2>
//       <div className="filters">
//         <div>
//           <label>Location:</label>
//           <input 
//             type="text" 
//             value={locationFilter}
//             onChange={e => setLocationFilter(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Equipment:</label>
//           <div>
//             <input 
//               type="checkbox" 
//               value="CD" 
//               onChange={e => setEquipmentFilter(
//                 e.target.checked 
//                 ? [...equipmentFilter, e.target.value] 
//                 : equipmentFilter.filter(equip => equip !== e.target.value)
//               )}
//             /> CD
//           </div>
//           <div>
//             <input 
//               type="checkbox" 
//               value="Air Conditioning" 
//               onChange={e => setEquipmentFilter(
//                 e.target.checked 
//                 ? [...equipmentFilter, e.target.value] 
//                 : equipmentFilter.filter(equip => equip !== e.target.value)
//               )}
//             /> Air Conditioning
//           </div>
//         </div>
//         <div>
//           <label>Type:</label>
//           <div>
//             <input 
//               type="radio" 
//               name="type" 
//               value="Campervan"
//               onChange={e => setTypeFilter(e.target.value)}
//             /> Campervan
//           </div>
//           <div>
//             <input 
//               type="radio" 
//               name="type" 
//               value="Motorhome"
//               onChange={e => setTypeFilter(e.target.value)}
//             /> Motorhome
//           </div>
//         </div>
//       </div>
//       <div className="advert-list">
//         {displayedAdverts.map(advert => (
//           <AdvertCard 
//             key={advert._id} 
//             advert={advert} 
//           />
//         ))}
//       </div>
//       {hasMoreAdverts && (
//         <button onClick={handleLoadMore} className="load-more-button">
//           Load more
//         </button>
//       )}
//     </div>
//   );
// };

// export default CatalogPage;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdverts } from '../../redux/slices/advertsSlice';
import AdvertCard from '../../components/CamperCard/AdvertCard';
import './CatalogPage.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { adverts, status } = useSelector((state) => state.adverts);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedAdverts, setDisplayedAdverts] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');

  const advertsPerPage = 4;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAdverts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const filterAdverts = () => {
      console.log('Applying filters...');
      let filteredAdverts = adverts;

      if (locationFilter) {
        filteredAdverts = filteredAdverts.filter(advert => 
          advert.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
      }

      if (equipmentFilter.length > 0) {
        filteredAdverts = filteredAdverts.filter(advert => 
          equipmentFilter.every(equip => advert.details?.[equip] > 0)
        );
      }

      if (typeFilter) {
        filteredAdverts = filteredAdverts.filter(advert => advert.form === typeFilter);
      }

      console.log('Filtered adverts:', filteredAdverts);
      return filteredAdverts;
    };

    const filteredAdverts = filterAdverts();
    setDisplayedAdverts(filteredAdverts.slice(0, currentPage * advertsPerPage));
  }, [adverts, currentPage, locationFilter, equipmentFilter, typeFilter]);

  const handleLoadMore = () => {
    console.log('Load more clicked');
    setCurrentPage(prevPage => prevPage + 1);
  };

  // Проверка на наличие дополнительных объявлений для загрузки
  const filteredAdvertsCount = adverts.filter(advert => {
    let matches = true;

    if (locationFilter) {
      matches = matches && advert.location.toLowerCase().includes(locationFilter.toLowerCase());
    }

    if (equipmentFilter.length > 0) {
      matches = matches && equipmentFilter.every(equip => advert.details?.[equip] > 0);
    }

    if (typeFilter) {
      matches = matches && advert.form === typeFilter;
    }

    return matches;
  }).length;

  const hasMoreAdverts = displayedAdverts.length < filteredAdvertsCount;

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error fetching adverts</p>;
  }

  return (
    <div>
      <h2>Catalog</h2>
      <div className="filters">
        <div>
          <label>Location:</label>
          <input 
            type="text" 
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
          />
        </div>
        <div>
          <label>Equipment:</label>
          <div>
            <input 
              type="checkbox" 
              value="CD" 
              checked={equipmentFilter.includes('CD')}
              onChange={e => setEquipmentFilter(
                e.target.checked 
                ? [...equipmentFilter, 'CD'] 
                : equipmentFilter.filter(equip => equip !== 'CD')
              )}
            /> CD
          </div>
          <div>
            <input 
              type="checkbox" 
              value="TV" 
              checked={equipmentFilter.includes('TV')}
              onChange={e => setEquipmentFilter(
                e.target.checked 
                ? [...equipmentFilter, 'TV'] 
                : equipmentFilter.filter(equip => equip !== 'TV')
              )}
            /> TV
          </div>
          <div>
            <input 
              type="checkbox" 
              value="Air Conditioning" 
              checked={equipmentFilter.includes('Air Conditioning')}
              onChange={e => setEquipmentFilter(
                e.target.checked 
                ? [...equipmentFilter, 'Air Conditioning'] 
                : equipmentFilter.filter(equip => equip !== 'Air Conditioning')
              )}
            /> Air Conditioning
          </div>
        </div>
        <div>
          <label>Type:</label>
          <div>
            <input 
              type="radio" 
              name="type" 
              value="Campervan"
              checked={typeFilter === 'Campervan'}
              onChange={e => setTypeFilter(e.target.value)}
            /> Campervan
          </div>
          <div>
            <input 
              type="radio" 
              name="type" 
              value="Motorhome"
              checked={typeFilter === 'Motorhome'}
              onChange={e => setTypeFilter(e.target.value)}
            /> Motorhome
          </div>
        </div>
      </div>
      <div className="advert-list">
        {displayedAdverts.map(advert => (
          <AdvertCard 
            key={advert._id} 
            advert={advert} 
          />
        ))}
      </div>
      {hasMoreAdverts && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load more
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
