import React, { useState, useEffect } from "react";
import "./kreirajNalog.css";
import axios from "axios";
const FrmKreirajProfakturu = () => {
  const [dobavljaci, setDobavljaci] = useState([]);

  const [dobavljac, setDobavljac] = useState("");
  const [proizvodi, setProizvodi] = useState([]);
  const [proizvod, setProizvod] = useState(null);

  const [kolicinaStavke, setKolicinaStavke] = useState("");
  // const[iznosStavke, setIznosStavke]=useState(0);
  const [stavkeProfakture, setStavkeProfakture] = useState([]);
  const [iDStavke, setIdStavke] = useState(1);

  const [datum, setDatum] = useState("");
  const [PDV, setPDV] = useState("");

  const [ukupanIznosProfakture, setUkupanIznosProfakture] = useState(0);

  const profakturaData = {
    datum: datum,
    PDV: parseFloat(PDV),
    ukupanIznos: parseFloat(ukupanIznosProfakture),
    dobavljac_id: dobavljac,
  };

  const stavkeData = stavkeProfakture.map((stavka) => {
    return {
      id: stavka.id,
      kolicina: parseInt(stavka.kolicina, 10),
      iznos: parseFloat(stavka.iznos),
      proizvod_id: stavka.proizvod_id,
    };
  });

  const fetchDobavljaci = async () => {
    try {
      const response = await axios.get("/dobavljaci");
      setDobavljaci(response.data);
    } catch (error) {
      console.error("Error fetching Dobavljaci:", error);
    }
  };

  const addStavka = () => {
    if (!proizvod) {
      alert("Izaberite proizvod!");
      return;
    }

    const parsedKolicina = parseFloat(kolicinaStavke);
    if (isNaN(parsedKolicina) || parsedKolicina <= 0) {
      alert("Unesite broj veci od 0 za kolicinu.");
      return;
    }
    const proizvodInfo = proizvodi.find((p) => p.id == proizvod);

    if (proizvodInfo) {
      // Računanje iznosa stavke
      const iznosStavke = proizvodInfo.nabavna_cena * kolicinaStavke;

      const novaStavka = {
        id: iDStavke,
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
      generateNewId();
      setKolicinaStavke("");
    }
  };

  const removeStavka = (indexToRemove) => {
    const removedStavka = stavkeProfakture[indexToRemove];
    const updatedStavke = stavkeProfakture.filter(
      (_, index) => index !== indexToRemove
    );
    setStavkeProfakture(updatedStavke);
    setIdStavke((prevId) => prevId - 1);
    setUkupanIznosProfakture((prevIznos) =>
      parseFloat((prevIznos - removedStavka.iznos).toFixed(2))
    );
  };

  const editStavka = (index) => {
    const updatedStavke = [...stavkeProfakture];
    const editedStavka = updatedStavke[index];

    const novaKolicina = prompt(
      "Unesite novu količinu:",
      editedStavka.kolicina
    );

    if (novaKolicina !== null) {
      const novaKolicinaInt = parseInt(novaKolicina, 10);
      if (!isNaN(novaKolicinaInt) && novaKolicinaInt > 0) {
        // Ažuriranje količine
        editedStavka.kolicina = novaKolicinaInt;

        // Ažuriranje iznosa stavke
        editedStavka.iznos =
          novaKolicinaInt * editedStavka.proizvod.nabavna_cena;
        // Ažuriranje stanja stavki
        setStavkeProfakture(updatedStavke);
        // Ažuriranje ukupnog iznosa profakture
        let noviUkupanIznos = 0.0;

        for (const stavka of stavkeProfakture) {
          noviUkupanIznos += stavka.iznos;
        }

        noviUkupanIznos = parseFloat(parseFloat(noviUkupanIznos).toFixed(2));

        setUkupanIznosProfakture(noviUkupanIznos);
      } else {
        alert("Molimo unesite broj veci od 0.");
      }
    }
  };

  useEffect(() => {
    fetchDobavljaci();
  }, []);

  useEffect(() => {
    fetchProizvode();
  }, []);

  const fetchProizvode = async () => {
    try {
      const response = await axios.get("/proizvodi");
      setProizvodi(response.data);
      console.log(proizvodi);
    } catch (error) {
      console.error("Grrska u prikazu proizvoda", error);
    }
  };

  const generateNewId = () => {
    setIdStavke((prevId) => prevId + 1);
  };

  const requestData = {
    profaktura: profakturaData,
    stavke: stavkeData,
  };

  const saveProfakturaAndStavke = async (e) => {
    e.preventDefault();

    if (PDV <= 0 || PDV > 1) {
      alert("PDV mora biti u opsegu od 0 do 1. Npr za 20% ide 0.2");
      return;
    }

    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!dateRegex.test(datum)) {
      alert("Datum mora biti u formatu YYYY/MM/DD.");
      return;
    }

    if (!dobavljac) {
      alert("Morate izabrati dobavljača.");
      return;
    }

    if (stavkeProfakture.length === 0) {
      alert("Unesite stavke profakture.");
      return;
    }

    try {
      const response = await axios.post("/profaktura", requestData);

      if (response.status === 201) {
        alert("Uspesno: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert("Neuspesno: " + error.response.data.message);
      } else {
        alert("Neuspesno: Doslo je do greske prilikom slanja zahteva.");
      }
    }
  };

  return (
    <div>
      <h2>Kreiraj profakturu</h2>

      <div className="container">
        <form action="/action_page.php">
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
          <div className="row">
            <div className="col-25">
              <label htmlFor="country">Dobavljac:</label>
            </div>
            <div className="col-75">
              <select
                defaultValue=""
                onChange={(e) => setDobavljac(e.target.value)}
              >
                <option value="" disabled hidden>
                  Izaberite dobavljaca
                </option>
                {dobavljaci.map((dobavljac) => (
                  <option key={dobavljac.id} value={dobavljac.id}>
                    {dobavljac.naziv_dobavljaca}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
        <div>
          <div className="stavke-container">
            <form className="stavke-form">
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
                  <select
                    defaultValue=""
                    onChange={(e) => setProizvod(e.target.value)}
                  >
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
            </form>

            <div className="update-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
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
                      <td>{stavka.id}</td>
                      <td>{stavka.proizvod.naziv_proizvoda}</td>
                      <td>{stavka.proizvod.nabavna_cena}</td>
                      <td>{stavka.kolicina}</td>
                      <td>{stavka.iznos}</td>
                      <td>
                        <button
                          className="custom-button"
                          onClick={() => editStavka(index)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="custom-button"
                          onClick={() => removeStavka(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <label>
            Ukupan iznos profakture:{" "}
            {parseFloat(ukupanIznosProfakture.toFixed(2))} RSD
          </label>
        </div>
        <br />
        <button type="button" onClick={saveProfakturaAndStavke}>
          Kreiraj profakturu
        </button>
      </div>
    </div>
  );
};

export default FrmKreirajProfakturu;
