import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://github.com/AngryMilky/how-to-learn"
            className="portfolio__link"
            >
            Статичный сайт
            <p className="portfolio__link-arrow">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://angrymilky.github.io/russian-travel/"
            className="portfolio__link"
            >
            Адаптивный сайт
            <p className="portfolio__link-arrow">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://mesto.milky.nomoredomainsicu.ru"
            className="portfolio__link"
            >
            Одностраничное приложение
            <p className="portfolio__link-arrow">&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
