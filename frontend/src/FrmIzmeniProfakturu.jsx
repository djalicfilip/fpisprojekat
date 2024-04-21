import React, {useState,useEffect} from 'react'
import './kreirajNalog.css';
import axios from 'axios'; 


const FrmIzmeniProfakturu = () => {
    const [profakture, setProfakture] = useState([]);
    const [selektovanaProfaktura, setSelektovanaProfaktura] = useState(null);
    const[datum,setDatum]=useState('');
    const[PDV,setPDV]=useState(0);
    const[dobavljac,setDobavljac]=useState('');
    const [stavkeProfakture, setStavkeProfakture] = useState([]);
    const [selectedProfId, setSelectedProfId] = useState(null);

    const[iDStavke,setIdStavke]=useState('');
    const[proizvodi,setProizvodi]=useState([]);
    const[proizvod,setProizvod]=useState('');
    const[kolicinaStavke, setKolicinaStavke]=useState(0);
    const [ukupanIznosProfakture, setUkupanIznosProfakture] = useState(0);
    const [noveStavke, setNoveStavke] = useState([]);
    const [deletedStavke, setDeletedStavke] = useState([]);
    const [kriterijum,setKriterijum]=useState('');
  
    useEffect(() => {
    
      const findLastStavkaId = () => {
        let lastId = 0;
        stavkeProfakture.forEach((stavka) => {
          if (stavka.id > lastId) {
            lastId = stavka.id;
          }
        });
        return lastId;
      };
  
    
      setIdStavke(findLastStavkaId() + 1);
    }, [stavkeProfakture]);

    useEffect(()=>{
        fetchProizvode();
      },[]);


      const fetchProizvode=async ()=>{
        try{
      const response=await axios.get('/proizvodi');
      setProizvodi(response.data);
      console.log(proizvodi);
        }catch(error){
      console.error('Greska u prikazu proizvoda',error);
        }
      }
  
      const pretrazi=async()=>{

        try{
         if(kriterijum===''){
          axios.get('/profakture')
          .then((response) => {
            // prikaz
            setProfakture(response.data);
          })
         }
      const response=await axios.get(`/pretraga?naziv_dobavljaca=${kriterijum}`);
      setProfakture(response.data);
        }catch(error){
          console.log('error');
        }
      }
  
      useEffect(() => {
        //ucitavanje dobavljaca
        axios.get('/profakture')
          .then((response) => {
            // prikaz
            setProfakture(response.data);
          })
          .catch((error) => {
            console.error('Error fetching profakture:', error);
          });
      }, []);
  
      
      useEffect(() => {
        
        fetchStavkeProfakture(selectedProfId);
      }, [selectedProfId]);


      const fetchStavkeProfakture = async (selectedProfId) => {
        try {
          if (selectedProfId) {
            const response = await axios.get(`/stavke?selectedProfId=${selectedProfId}`);
            setStavkeProfakture(response.data);
          } else {
            setStavkeProfakture([]);
          }
        } catch (error) {
          console.error('Error fetching Stavke profakture:', error);
        }
      };

   const handleProfakturaClick = (profaktura) => {
      console.log(profaktura);
      setSelektovanaProfaktura(profaktura);
      setSelectedProfId(profaktura.id)
      setDatum(profaktura.datum);
      setPDV(profaktura.PDV);
      setDobavljac(profaktura.dobavljac);
      setUkupanIznosProfakture(profaktura.ukupanIznos);
    };
    // Funkcija koja se poziva kada treba generisati novi ID
    const generateNewId = (isAddingStavka) => {
      if (isAddingStavka) {
        setIdStavke((prevId) => prevId + 1);
      }
    };

  //DODAVANJE STAVKE!! 
  const addStavka = () => {
    if (!proizvod) {
      alert('Izaberite proizvod!');
      return;
    }
  
    const parsedKolicina = parseFloat(kolicinaStavke);
    if (isNaN(parsedKolicina) || parsedKolicina <= 0) {
      alert('Unesite broj veci od 0 za kolicinu.');
      return;
    }
         const proizvodInfo = proizvodi.find((p) => p.id == proizvod);
         
        if (proizvodInfo) {
            // Računanje iznosa stavke
            const iznosStavke = proizvodInfo.nabavna_cena * kolicinaStavke;
      
            const novaStavka = {
              id:iDStavke,
              profaktura_id:selektovanaProfaktura.id,
              kolicina: kolicinaStavke,
              iznos: parseFloat(iznosStavke.toFixed(2)),
              proizvod_id: proizvod,
              proizvod: proizvodInfo,
            };
      
            // Ažuriranje ukupnog iznosa
          //  setIznosStavke((prevIznos) => prevIznos + iznosStavke);
            setUkupanIznosProfakture((prevIznos) => prevIznos + iznosStavke);
              
  console.log(novaStavka);
      setStavkeProfakture([...stavkeProfakture, novaStavka]);
      
        setNoveStavke([...noveStavke, novaStavka]);

        generateNewId(true);
      setKolicinaStavke('');
    }

  };

//BRISANJE STAVKE
  const removeStavka = (indexToRemove) => {
    const removedStavka = stavkeProfakture[indexToRemove];
    const updatedStavke = stavkeProfakture.filter((_, index) => index !== indexToRemove);
    generateNewId(false);
    // Provera da li je stavka već dodata u deletedStavke
    if (!deletedStavke.some((stavka) => stavka.id === removedStavka.id)) {
      setDeletedStavke((prevDeletedStavke) => [...prevDeletedStavke, removedStavka]);
    }
    setStavkeProfakture(updatedStavke);

    //setIdStavke((prevId) => prevId - 1);
    setUkupanIznosProfakture((prevIznos) => parseFloat((prevIznos - removedStavka.iznos).toFixed(2)));
    
  };
  
//EDITOVANJE STAVKE

const editStavka = (index) => {
  //event.preventDefault();
  const updatedStavke = [...stavkeProfakture];
  const editedStavka = updatedStavke[index];

  const novaKolicina = prompt('Unesite novu količinu:', editedStavka.kolicina);

  if (novaKolicina !== null) {
    const novaKolicinaInt = parseInt(novaKolicina, 10);
    if (!isNaN(novaKolicinaInt) && novaKolicinaInt > 0) {
      // Ažuriranje količine
      editedStavka.kolicina = novaKolicinaInt;

      // Ažuriranje iznosa stavke

      const noviIznosStavke = novaKolicinaInt * editedStavka.proizvod.nabavna_cena;
      editedStavka.iznos = parseFloat(parseFloat(noviIznosStavke).toFixed(2));
            // Ažuriranje stanja stavki
            setStavkeProfakture(updatedStavke);


                 // Ažuriranje ukupnog iznosa profakture
            let noviUkupanIznos = 0.0;

            for (const stavka of stavkeProfakture) {
              let iznosStavke=parseFloat(parseFloat(stavka.iznos).toFixed(2));
              noviUkupanIznos += iznosStavke;
            }
            generateNewId(false);
            noviUkupanIznos = parseFloat(parseFloat(noviUkupanIznos).toFixed(2));
            
    setUkupanIznosProfakture(noviUkupanIznos);
   

    } else {
      alert('Molimo unesite broj veci od 0.');
    }
  }
};

  const handleUpdateProfaktura = async () => {
    try {
      const updatedProfaktura = {
      id:selektovanaProfaktura.id,
      datum: datum,
      PDV: parseFloat(PDV),
      ukupanIznos:parseFloat(ukupanIznosProfakture),
      };

      const updatedStavke = stavkeProfakture
      .filter((stavka) => stavka.profaktura_id === selektovanaProfaktura.id)
      .map((stavka) => ({
        id: stavka.id,
        profaktura_id: stavka.profaktura_id, 
        kolicina: parseInt(stavka.kolicina, 10),
        iznos: parseFloat(stavka.iznos),
      }));

     
   
  
      const deletedStavkeFormatted = deletedStavke.map((deletedStavka) => ({
        id: deletedStavka.id,
        profaktura_id: deletedStavka.profaktura_id,
        kolicina: parseInt(deletedStavka.kolicina, 10),
        iznos: parseFloat(deletedStavka.iznos),
      }));
      
      const nove=noveStavke.map((novaStavka)=>({
        id:novaStavka.id ,
        profaktura_id: novaStavka.profaktura_id,
        kolicina: novaStavka.kolicina,
        iznos: parseFloat(novaStavka.iznos.toFixed(2)),
        proizvod_id: novaStavka.proizvod_id,
      
      }));

      
      const data = {
        profaktura: updatedProfaktura,
        stavke: updatedStavke,
        deletedStavke: deletedStavkeFormatted,
        addedStavke:nove
      };
      
  console.log(data);
    
   const response=   await axios.put(`/profaktura/${selektovanaProfaktura.id}`, data);

  
      if(response.status===201){
        alert('Uspesno:'+ response.data.message);
      }
    setSelektovanaProfaktura(null);
    axios.get('/ugovor')
    .then((response) => {
      // prikaz
      setProfakture(response.data);
    })
    .catch((error) => {
      console.error('Error prikaz profaktura:', error);
    });
    } catch (error) {
      console.error('Error updating profaktura:', error);
    }
  };
  return (
    <div>
      <h2>Izmeni profakturu</h2>
      <div className="update-container">
        <div className="row">
          <div className="col-25">
            <label htmlFor="subject">Pretraga:</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="lname"
              name="nazivDob"
              placeholder="Unesite naziv dobavljaca"
              value={kriterijum}
              onChange={(e) => setKriterijum(e.target.value)}
              required
            />
            <button type="button" onClick={pretrazi}>
              Pretrazi
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Datum profakture</th>
              <th>Pdv</th>
              <th>Iznos profakture</th>
              <th>Naziv dobavljaca</th>
              <th>Broj stavki</th>
            </tr>
          </thead>
          <tbody>
            {profakture.map((profaktura) => (
              <tr
                key={profaktura.id}
                onClick={() => handleProfakturaClick(profaktura)}
                className={selektovanaProfaktura?.id === profaktura.id ? 'selected' : ''}
              >
                <td>{profaktura.id}</td>
                <td>{profaktura.datum}</td>
                <td>{profaktura.PDV}</td>
                <td>{profaktura.ukupanIznos}</td>
                <td>{profaktura.dobavljac.naziv_dobavljaca}</td>
                <td>{profaktura.stavke_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selektovanaProfaktura && (
        <div className="container">
          <div className="row">
            <div className="col-25">
              <label htmlFor="subject">Dobavljac:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="lname"
                name="pdv"
                placeholder="PDV"
                value={dobavljac.naziv_dobavljaca}
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="subject">PDV:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="lname"
                name="pdv"
                placeholder="PDV"
                value={PDV}
                onChange={(e) => setPDV(e.target.value)}
                required
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
          <div className="stavke-container">
            <h3>Stavke profakture</h3>
            <div className="stavke-group">
              <label>ID Stavke:</label>
              <input
                type="number"
                value={iDStavke}
                onChange={(e) => {
                  setIdStavke(parseInt(e.target.value, 10));
                }}
                readOnly
                required
              />
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="proizvodi">Proizvod:</label>
              </div>
              <div className="col-75">
                <select defaultValue="" onChange={(e) => setProizvod(e.target.value)}>
                  <option value="" disabled hidden>
                    Izaberite proizvod
                  </option>
                  {proizvodi.map((proizvod) => (
                    <option key={proizvod.id} value={proizvod.id}>
                      {proizvod.naziv_proizvoda}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="subject">Količina stavke:</label>
              </div>
              <div className="col-75">
                <input
                  placeholder="Kolicina"
                  type="text"
                  value={kolicinaStavke}
                  onChange={(e) => setKolicinaStavke(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="dugme">
              <button type="button" onClick={addStavka}>
                Dodaj stavku
              </button>
              <br />
              <br />
            </div>
          </div>
          {selektovanaProfaktura && (
            <div className="update-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Naziv proizvoda</th>
                    <th>Nabavna cena</th>
                    <th>Kolicina</th>
                    <th>Iznos stavke</th>
                    <th>Izmeni</th>
                    <th>Obrisi</th>
                  </tr>
                </thead>
                <tbody>
                  {stavkeProfakture.map((stavka, index) => (
                    <tr key={index}>
                      <td>{stavka.proizvod.naziv_proizvoda}</td>
                      <td>{stavka.proizvod.nabavna_cena}</td>
                      <td>{stavka.kolicina}</td>
                      <td>{stavka.iznos}</td>
                      <td>
                        <button className="custom-button" onClick={() => editStavka(index)}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button className="custom-button" onClick={() => removeStavka(index)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div>
            <label>Ukupan iznos profakture: {parseFloat(ukupanIznosProfakture.toFixed(2))} RSD</label>
          </div>
          <br />
          <div className="row">
            <button type="button" defaultValue="Izmeni profakturu" onClick={handleUpdateProfaktura}>
              Sačuvaj profakturu
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default FrmIzmeniProfakturu
