import React, {useState,useEffect} from 'react'
import './kreirajNalog.css';
import axios from 'axios'; 


const FrmIzmeniNalog = () => {
  const [spediteri, setSpediteri] = useState([]);
  const [selectedSpediter, setSelectedSpediter] = useState("");
 
  const [zaposleni, setZaposleni] = useState([]);
  const [selectedZaposleni, setSelectedZaposleni]=useState("");
 
  const[fakture, setFakture]=useState([]);
  const [selectedFaktura, setSelectedFaktura]=useState("");
 
  const [datum, setDatum] = useState("");
 const [sadrzaj, setSadrzaj] = useState("");

 const [nalozi, setNalozi] = useState([]);
  const [selectedNalog, setSelectedNalog] = useState(null);

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

  useEffect(() => {
    //ucitavanje naloga
    axios.get('/nalozi')
      .then((response) => {
        // prikaz
        setNalozi(response.data);
      })
      .catch((error) => {
        console.error('Error fetching nalozi:', error);
      });
  }, []);

  const handleNalogClick = (nalog) => {
    console.log(nalog);
    setSelectedNalog(nalog);
    setDatum(nalog.datumNaloga);
    setSadrzaj(nalog.sadrzajNaloga);
    setSelectedFaktura(nalog.faktura_id);
    setSelectedSpediter(nalog.spediter_id);
    setSelectedZaposleni(nalog.zaposleni_id);

  };

  const handleUpdateNalog = async () => {
    try {
      const updatedNalog = {
        id: selectedNalog.id,
        datumNaloga:datum ,
    sadrzajNaloga: sadrzaj,
    zaposleni_id: selectedZaposleni,
    faktura_id: selectedFaktura,
    spediter_id: selectedSpediter
      };
  

      const response=await axios.put(`/nalog/${selectedNalog.id}`, updatedNalog);
if(response.status===201){
  alert('Nalog uspešno izmenjen!');

    const updatedNaloziResponse = await axios.get('/nalozi');

 
    setNalozi(updatedNaloziResponse.data);
}
    } catch (error) {
      alert('Error updating Nalog:', error);
    }
  };
  
  return (
    <div>
    <h2>Izmeni nalog za carinjenje</h2>
    <div className="update-container">
    <table>
        <thead>
          <tr>
          <th>ID</th>
            <th>Sadrzaj naloga</th>
            <th>Datum naloga</th>
            <th>Ime i prezime zaposlenog</th>
            <th>Datum fakture</th>
            <th>Naziv speditera</th>
          </tr>
        </thead>
        <tbody>
        {nalozi.map((nalog) => (
            <tr
              key={nalog.id}
              onClick={() => handleNalogClick(nalog)}
              className={selectedNalog?.id === nalog.id ? 'selected' : ''}
            >
              <td>{nalog.id}</td>
              <td>{nalog.sadrzajNaloga}</td>
              <td>{nalog.datumNaloga}</td>
              <td>{`${nalog.zaposleni.imeZaposlenog} ${nalog.zaposleni.prezimeZaposlenog}`}</td>
              <td>{nalog.faktura.datum}</td>            
              <td>{nalog.spediter.nazivSpeditera}</td>
            </tr>
            
          ))}
        </tbody>
      </table>
      </div>
      {selectedNalog && (     
    <div className="container">
      <form action="/action_page.php">
        <div className="row">
          <div className="col-25">
            <label htmlFor="fakture">Faktura:</label>
          </div>
          <div className="col-75">
              <input
                type="text"
                id="lname"
                name="pdv"
                placeholder="PDV"
                value={selectedNalog.faktura.datum}
                readOnly
              />
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
              <input
                type="text"
                id="lname"
                name="spediter"
                placeholder="spediter"
                value={selectedNalog.spediter.nazivSpeditera}
                readOnly
              />
            </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="country">Zaposleni:</label>
          </div>
          <div className="col-75">
          <select  onChange={(e) => setSelectedZaposleni(e.target.value)} value={selectedZaposleni}>
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
        <button type="button" defaultValue="Izmeni nalog" onClick={handleUpdateNalog}>Sačuvaj nalog</button>
        </div>
      </form>
    </div>
     )}
  </div>
  )
}

export default FrmIzmeniNalog
