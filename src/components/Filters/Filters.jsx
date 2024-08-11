import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAdverts, setFilters } from '../../redux/slices/advertsSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const [equipment, setEquipment] = useState('');
  const [type, setType] = useState('');

  const handleFilterChange = () => {
    const filters = { location, equipment, type };
    dispatch(setFilters(filters));
    dispatch(fetchAdverts(filters));
  };

  useEffect(() => {
    handleFilterChange();
  }, [location, equipment, type, dispatch]);

  return (
    <div className="filters">
      <select value={location} onChange={(e) => setLocation(e.target.value)} onBlur={handleFilterChange}>
        <option value="">Select Location</option>
      </select>
      <select value={equipment} onChange={(e) => setEquipment(e.target.value)} onBlur={handleFilterChange}>
        <option value="">Select Equipment</option>
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)} onBlur={handleFilterChange}>
        <option value="">Select Type</option>
      </select>
    </div>
  );
};

export default Filters;
