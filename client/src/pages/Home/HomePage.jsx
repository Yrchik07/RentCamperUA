import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Аренда кемперов в Украине</h1>
        <p>Предоставляем услуги по аренде комфортабельных кемперов для путешествий по Украине.</p>
      </header>
      <section className="services">
        <Link to="/catalog">
          <div className="service">
            <h2>Широкий выбор кемперов</h2>
            <p>Разнообразие моделей и комплектаций кемперов, подходящих для любых потребностей.</p>
          </div>
        </Link>
        <Link to="/favorites">
          <div className="service">
            <h2>Гибкие условия аренды</h2>
            <p>Предлагаем аренду на разные сроки, начиная от нескольких дней до нескольких месяцев.</p>
          </div>
        </Link>
        <Link to="/support">
          <div className="service">
            <h2>Обслуживание и поддержка</h2>
            <p>Наши кемперы регулярно проходят технический осмотр и полностью готовы к путешествию.</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
