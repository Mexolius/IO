import { faChevronRight, faClock, faSignal, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';

import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="grid-ish">
          <div className="site-content big">
            <div className="overlay overlay-title">
              <h1>GumiMoodle</h1>
              <h3>Twoje miejsce na oceny</h3>
            </div>

            <div className="overlay rect" />
            <div className="partial-image">
              <img style={{ height: "100%", width: "100%", minWidth: "80em", overflow: "hidden" }} alt="biurko" src="https://www.tapeteos.pl/data/media/494/big/laptop_065_biurko__ksiazki__zeszyty__przybory__lampka.jpg" />
            </div>
          </div>

          <div className="w3-card-4 site-content">
            <h3>Oceny w czasie rzeczywistym</h3>
            <div className="dot content-dot">
              <FontAwesomeIcon icon={faClock} size={"2x"} inverse/>
            </div>
            <p>Dynamiczny tryb pracy serwisu pozwala przeglądać oceny zaraz po zmieszczeniu ich przez prowadzącego,
               a system powiadomień sprawi, że nic nie umknie twojej uwadze </p>
               <a href="/">
              Zobacz więcej
              <FontAwesomeIcon icon={faChevronRight}/>
            </a>
          </div>


          <div className="w3-card-4 site-content">
            <h3>Szeroki wybór kursów</h3>
            <div className="dot content-dot">
              <FontAwesomeIcon icon={faStar} size={"2x"} inverse/>
            </div>
            <p>Szeroki wybór kursów pozwala przystosować twój tok nauczania do twoich potrzeb</p>
            <a href="/">
              Zobacz więcej
              <FontAwesomeIcon icon={faChevronRight}/>
            </a>
          </div>


          <div className="w3-card-4 site-content">
            <h3>Statystyki dzięki którym widzisz więcej</h3>
            <div className="dot content-dot">
              <FontAwesomeIcon icon={faSignal} size={"2x"} inverse/>
            </div>
            <p>Dzięki tym statystykom przyspieszysz swój postęp oraz poznasz swój poziom na tle grupy</p>
            <a href="/">
              Zobacz więcej
              <FontAwesomeIcon icon={faChevronRight}/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;