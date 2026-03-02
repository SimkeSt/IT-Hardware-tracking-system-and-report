import React, { useEffect, useState } from 'react';
import { DataGrid, Column, Paging, Scrolling, SearchPanel, Pager } from 'devextreme-react/data-grid';
import axios from 'axios';


const Sifarnik = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from Django API
    axios.get('http://localhost:8000/api/maloprodaja/')
      .then((response) => {
        setData(response.data);  // Set the data from the response
      })
      .catch((err) => {
        setError('Error fetching data');  // Handle error if API call fails
        console.error('Error fetching data:', err);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Maloprodaja Data</h2>
      <DataGrid dataSource={data} showBorders={true} columnAutoWidth={true}>
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="id" caption="ID" />
        <Column dataField="Godina" caption="Godina" />
        <Column dataField="Kvartal" caption="Kvartal" />
        <Column dataField="Mesec" caption="Mesec" />
        <Column dataField="SifraMPOB" caption="Sifra MPOB" />
        <Column dataField="NazivMPOB" caption="Naziv MPOB" />
        <Column dataField="NadgrupaN" caption="Nadgrupa N" />
        <Column dataField="GrupaN" caption="Grupa N" />
        <Column dataField="PodgrupaN" caption="Podgrupa N" />
        <Column dataField="PodpodgrupaN" caption="Podpodgrupa N" />
        <Column dataField="SifraArt" caption="Sifra Art" />
        <Column dataField="BarArt" caption="Bar Art" />
        <Column dataField="NazivArt" caption="Naziv Art" />
        <Column dataField="PKolicina" caption="PKolicina" />
        <Column dataField="PVPDV" caption="PVPDV" />

        <Paging defaultPageSize={100} />
        <Scrolling mode="standard" />
        <Pager showPageSizeSelector={true} showInfo={true} />
      </DataGrid>
    </div>
  );
};

export default Sifarnik;