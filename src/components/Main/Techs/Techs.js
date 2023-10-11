import React from 'react';

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title" id="techs">Технологии</h2>
      <div className="techs__info">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__list-point">HTML</li>
          <li className="techs__list-point">CSS</li>
          <li className="techs__list-point">JS</li>
          <li className="techs__list-point">React</li>
          <li className="techs__list-point">Git</li>
          <li className="techs__list-point">Express.js</li>
          <li className="techs__list-point">mongoDB</li>
        </ul>
      </div>
    </section>
  )

}

export default Techs;
