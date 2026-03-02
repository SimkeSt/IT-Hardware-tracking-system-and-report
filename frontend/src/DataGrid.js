import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid, Column, Scrolling, SearchPanel, Pager,LoadPanel, Editing  } from 'devextreme-react/data-grid';
import axios from 'axios';
import Button from 'devextreme-react/button';



const MaloprodajaGrid = () => {

   const [loadPanelEnabled, setLoadPanelEnabled] = useState(true);
   const logEvent = useCallback((eventName) => {
    setEvents((previousEvents) => [eventName, ...previousEvents]);
  }, []);
  const [events, setEvents] = useState([]);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

   const onContentReady = useCallback(() => {
      setLoadPanelEnabled(false);
    }, []);

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
        <SearchPanel visible={true} highlightCaseSensitive={true}  allowColumnReordering={true}
        showBorders={true}
        onEditingStart={() => logEvent('EditingStart')}
        onInitNewRow={() => logEvent('InitNewRow')}
        onRowInserting={() => logEvent('RowInserting')}
        onRowInserted={() => logEvent('RowInserted')}
        onRowUpdating={() => logEvent('RowUpdating')}
        onRowUpdated={() => logEvent('RowUpdated')}
        onRowRemoving={() => logEvent('RowRemoving')}
        onRowRemoved={() => logEvent('RowRemoved')}
        onSaving={() => logEvent('Saving')}
        onSaved={() => logEvent('Saved')}
        onContentReady={onContentReady}
        onEditCanceling={() => logEvent('EditCanceling')}
        onEditCanceled={() => logEvent('EditCanceled')}/>
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
        <Scrolling mode="virtual" />
        <LoadPanel enabled={loadPanelEnabled} />

        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />

        

        <Pager showPageSizeSelector={true} showInfo={true} />
      </DataGrid>

    </div>
  );
};

export default MaloprodajaGrid;