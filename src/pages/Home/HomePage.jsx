import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Camper rental in Ukraine</h1>
        <p>We provide services for renting comfortable campers for traveling around Ukraine.</p>
      </header>
      <section className="services">
        <Link to="/catalog">
          <div className="service">
            <h2>Wide selection of campers</h2>
            <p>A variety of camper models and configurations to suit any need.</p>
          </div>
        </Link>
        <Link to="/favorites">
          <div className="service">
            <h2>Campers you liked</h2>
            <p>We offer rentals for different periods, ranging from several days to several months.</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
