import React from 'react';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title" id="about-project">О проекте</h2>
      <div className="about-project__info">
        <div className="about-project__item">
          <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__info-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__item">
          <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__info-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__scheme">
        <div className="about-project__backend">
          <p className="about-project__backend-duration">1 неделя</p>
          <p className="about-project__scheme-subtitle">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <p className="about-project__frontend-duration">4 недели</p>
          <p className="about-project__scheme-subtitle">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
