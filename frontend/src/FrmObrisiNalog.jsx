import axios from 'axios'; 
import './kreirajNalog.css';
import React, {useState,useEffect} from 'react';


const FrmObrisiNalog = () => {
  const [nalozi, setNalozi] = useState([]);
 // const [selectedNalozi, setSelectedNalozi] = useState([]);
  

  useEffect(() => {
    
    axios.get('/nalozi')
      .then((response) => {
      
        setNalozi(response.data);
      })
      .catch((error) => {
        console.error('Error fetching nalozi:', error);
      });
  }, []);

  const handleRemoveNalog = async (nalogId) => {
    try {
    
    const response=  await axios.delete(`/nalog/${nalogId}`);
      
      if(response.status===201){
        alert('Uspesno '+ response.data.message);
      }else if(response.status===500){
        alert('Ne mozete obrisati nalog');
      }
      
  
      setNalozi((prevNalozi) =>
        prevNalozi.filter((nalog) => nalog.id !== nalogId)
      );
    } catch (error) {
      alert('Ne mozete obrisati nalog',error);
    }
  };
  
  
  return (
 
    

    <div className="delete-container">
         <h2>Obrisi nalog za carinjenje</h2>
      <table>
        <thead>
          <tr>
          <th>ID</th>
            <th>Sadrzaj naloga</th>
            <th>Datum naloga</th>
            <th>Ime i prezime zaposlenog</th>
            <th>Datum fakture</th>
            <th>Naziv speditera</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {nalozi.map((nalog) => (
            <tr key={nalog.id}>
              <td>{nalog.id}</td>
              <td>{nalog.sadrzajNaloga}</td>
              <td>{nalog.datumNaloga}</td>
              <td>{`${nalog.zaposleni.imeZaposlenog} ${nalog.zaposleni.prezimeZaposlenog}`}</td>
              <td>{nalog.faktura.datum}</td>            
              <td>{nalog.spediter.nazivSpeditera}</td>
            
              <td>
        <button className="custom-button" onClick={() => handleRemoveNalog(nalog.id)}>Obrisi</button>
      </td>
             
            </tr>
          ))}
        </tbody>
      
      </table> 
    </div>
    
  );
}

export default FrmObrisiNalog
