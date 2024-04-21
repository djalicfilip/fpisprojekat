import React from 'react'
import './nav.css';
import { useState } from 'react';
import FrmKreirajNalog from './FrmKreirajNalog';
import FrmIzmeniNalog from './FrmIzmeniNalog';
import FrmObrisiNalog from './FrmObrisiNalog';
import FrmKreirajProfakturu from './FrmKreirajProfakturu';
import FrmObrisiProfakturu from './FrmObrisiProfakturu';
import FrmIzmeniProfakturu from './FrmIzmeniProfakturu';



const NavBar = () => {
  
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const prikaziForme = () => {
    switch (selectedOption) {
      case "kreirajNalog":
        return <FrmKreirajNalog />;
        case "izmeniNalog":
          return <FrmIzmeniNalog />;
          case "obrisiNalog":
            return <FrmObrisiNalog />;
            case "kreirajProfakturu":
              return <FrmKreirajProfakturu />;
              case "izmeniProfakturu":
                return <FrmIzmeniProfakturu />;
              case "obrisiProfakturu":
                return <FrmObrisiProfakturu />;
                case "home":
                return null;
      default:
        return null;
    }
  };
  return (
    <div>
<div className="navbar">
  <a onClick={() => handleOptionChange('home')}>Početna</a>
  <div className="dropdown">
    <button className="dropbtn">Nalog za carinjenje
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
      <a onClick={() => handleOptionChange('kreirajNalog')}>Kreiraj nalog</a>
      <a onClick={() => handleOptionChange('izmeniNalog')}>Izmeni nalog</a>
      <a onClick={() => handleOptionChange('obrisiNalog')}>Obriši nalog</a>
      
    </div>
  </div>
  <div className="dropdown">
    <button className="dropbtn">Profaktura
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
    <a onClick={() => handleOptionChange('kreirajProfakturu')}>Kreiraj profakturu</a>
      <a onClick={() => handleOptionChange('izmeniProfakturu')}>Izmeni profakturu</a>
      <a onClick={() => handleOptionChange('obrisiProfakturu')}>Obriši profakturu</a>
    </div>
  </div>
</div>
<div className="form-container">{prikaziForme()}</div>
</div>

  )
}

export default NavBar
