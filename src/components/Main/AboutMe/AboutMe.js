import React from 'react';
import StudentPhoto from '../../../images/photo-student.png'

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title" id="student">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Татьяна</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">Я родилась в городе Братск. Живу на Кипре. В 2015 году окончила МГТУ ГА.</p>
          <a href="https://github.com/AngryMilky" target="_blank" className="about-me__link">Github</a>
        </div>
        <img className="about-me__image" alt="Фотография" src={StudentPhoto} />
      </div>
    </section>
    )
}

export default AboutMe;
