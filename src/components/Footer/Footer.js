import React from 'react';

function Footer() {
  return (
      <footer className="footer">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__info">
          <p className="footer__copyright">&copy;&nbsp;{new Date().getFullYear()}</p>
          <div className="footer__links">
            <a href="https://practicum.yandex.ru" target="_blank" className="footer__link">Яндекс.Практикум</a>
            <a href="https://github.com/AngryMilky" target="_blank" className="footer__link">Github</a>
          </div>
        </div>
      </footer>
    )
}

export default Footer;
