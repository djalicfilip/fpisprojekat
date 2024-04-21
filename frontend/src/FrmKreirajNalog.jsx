import React, {useState,useEffect} from 'react';
import './kreirajNalog.css';
import axios from 'axios'; 

const FrmKreirajNalog = () => {

  const [spediteri, setSpediteri] = useState([]);
  const [selectedSpediter, setSelectedSpediter] = useState("");
 
  const [zaposleni, setZaposleni] = useState([]);
  const [selectedZaposleni, setSelectedZaposleni]=useState("");
 
  const[fakture, setFakture]=useState([]);
  const [selectedFaktura, setSelectedFaktura]=useState("");
 
  const [datum, setDatum] = useState("");
 const [sadrzaj, setSadrzaj] = useState("");


 useEffect(() => {
   
   
  fetchFakture();
}, []);

useEffect(() => {
   
   
  fetchZaposleni();
}, []);


useEffect(() => {
   
   
  fetchSpediteri();
}, []);


 const fetchZaposleni = async()=>{
  try {
    const response = await axios.get('/zaposleni');
    setZaposleni(response.data);
  } catch (error) {
    console.error('Error fetching Zaposleni:', error);
  } 
}
  const fetchFakture = async () => {
    try {
      const response = await axios.get('/fakture');
      setFakture(response.data);
    } catch (error) {
      console.error('Error fetching Fakture:', error);
    }
  }

  const fetchSpediteri = async () => {
    try {
      const response = await axios.get('/spediteri');
      setSpediteri(response.data);
    } catch (error) {
      console.error('Error fetching Spediteri:', error);
    }
  };

  const nalogData = {
    datumNaloga:datum ,
    sadrzajNaloga: sadrzaj,
    zaposleni_id: selectedZaposleni,
    faktura_id: selectedFaktura,
    spediter_id: selectedSpediter
  };



  const handleSacuvajClick = async () => {
    try {

  if (!selectedSpediter) {
    alert('Morate izabrati špeditera!');
    return;
  }

  if (!selectedZaposleni) {
    alert('Morate izabrati zaposlenog!');
    return;
  }

  if (!selectedFaktura) {
    alert('Morate izabrati fakturu!');
    return;
  }


  const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (!dateRegex.test(datum)) {
    alert('Datum mora biti u formatu YYYY/MM/DD.');
    return;
  }


  if (!sadrzaj.trim()) {
    alert('Sadržaj ne može biti prazan.');
    return;
  }

      const response= await axios.post('/nalog', nalogData);
  if(response.status===201){
    alert(response.data.message);
  }
      setDatum("");
      setSadrzaj("");
      
    } catch (error) {
      alert('Error kod cuvanja Naloga',nalogData, error);
    }
  };

  return (
    <div>
    <h2>Kreiraj nalog za carinjenje</h2>
    
    <div className="container">
      <form action="/action_page.php">
        <div className="row">
          <div className="col-25">
            <label htmlFor="fakture">Faktura:</label>
          </div>
          <div className="col-75">
          <select defaultValue=""  onChange={(e) => setSelectedFaktura(e.target.value)}>
          <option value="" disabled hidden>Izaberite fakturu</option>
            {fakture.map((faktura) => (
              <option key={faktura.id} value={faktura.id}>
                {faktura.datum}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="datePicker">Datum:</label>
          </div>
          <div className="col-75">
          <input
  type="text"
  id="lname"
  name=""
  placeholder="YYYY/MM/DD"
  value={datum}
  onChange={(e) => setDatum(e.target.value)}
/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="country">Spediter:</label>
          </div>
          <div className="col-75">
          <select defaultValue="" onChange={(e) => setSelectedSpediter(e.target.value)}>
          <option value="" disabled hidden>Izaberite špeditera</option>
            {spediteri.map((spediter) => (
              <option key={spediter.id} value={spediter.id}>
                {spediter.nazivSpeditera}
              </option>
            ))}
                 </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="country">Zaposleni:</label>
          </div>
          <div className="col-75">
          <select defaultValue=""  onChange={(e) => setSelectedZaposleni(e.target.value)}>
          <option value="" disabled hidden>Izaberite zaposlenog</option>
            {zaposleni.map((zaposlen) => (
              <option key={zaposlen.id} value={zaposlen.id}>
                {`${zaposlen.imeZaposlenog} ${zaposlen.prezimeZaposlenog}`}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="subject">Sadržaj</label>
          </div>
          <div className="col-75">
            <textarea id="subject" name="subject" placeholder="Sadrzaj" style={{height: '200px'}} value={sadrzaj}
  onChange={(e) => setSadrzaj(e.target.value)}
  required  />
          </div>
        </div>
        <br />
        <div className="row">
        <button type="button" defaultValue="Kreiraj nalog" onClick={handleSacuvajClick}>Kreiraj nalog</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default FrmKreirajNalog
