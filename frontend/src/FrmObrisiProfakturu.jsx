import axios from 'axios'; 
import './kreirajNalog.css';
import React, {useState,useEffect} from 'react';


const FrmObrisiProfakturu = () => {
    const [profakture, setProfakture] = useState([]);
    // const [selectedNalozi, setSelectedNalozi] = useState([]);
     
   
     useEffect(() => {
       
       axios.get('/profakture')
         .then((response) => {
         
           setProfakture(response.data);
         })
         .catch((error) => {
           console.error('Error fetching profakture:', error);
         });
     }, []);
   
     const handleRemoveProfaktura = async (profId) => {
       try {
       
        const response= await axios.delete(`/profaktura?profId=${profId}`);
         
         if(response.status===201){
           alert('Uspesno: '+ response.data.message);
         }else if(response.status===500){
           alert('Ne mozete obrisati profakturu');
         }
         
     
         setProfakture((prevProf) =>
           prevProf.filter((profaktura) => profaktura.id !== profId)
         );
       } catch (error) {
         alert('Ne mozete obrisati profakturu',error);
       }
     };
     
     
     return (
       <div className="delete-container">
         <h2>Obriši profakturu</h2>
         
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
               <tr key={profaktura.id}>
                 <td>{profaktura.id}</td>
                 <td>{profaktura.datum}</td>
                 <td>{profaktura.PDV}</td>
                 <td>{profaktura.ukupanIznos}</td>          
                 <td>{profaktura.dobavljac.naziv_dobavljaca}</td>
                 <td>{profaktura.stavke_count}</td>
                 <td>
           <button className="custom-button" onClick={() => handleRemoveProfaktura(profaktura.id)}>Obrisi</button>
         </td>      
               </tr>
             ))}
           </tbody>
           
         </table>
       </div>
  )
}

export default FrmObrisiProfakturu
