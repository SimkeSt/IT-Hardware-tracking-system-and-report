import logo from './logo.svg';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-react-pivotview/styles/material.css'; // Or any other theme you prefer
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-react-grids/styles/material.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataGrid, { Column, Paging, Pager, Scrolling, SearchPanel } from 'devextreme-react/data-grid';  // Corrected import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import MaloprodajaGrid from './DataGrid';
import MaloprodajaPivotGrid from './Pivotgrid';
import Sifarnik from './Sifarnik';
import MaloprodajaGridSync from './DataGridSync';
import { registerLicense } from '@syncfusion/ej2-base';
import PivotGridSync from './PivotGridSync';



  function App() {

  registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXteeXRXR2NfVEN/V0RWYUA=');

    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MaloprodajaGrid />} />
          <Route path="/pivot" element={<MaloprodajaPivotGrid />} />
          <Route path="/sifarnik" element={<Sifarnik />} />
          <Route path="/GridSync" element={<MaloprodajaGridSync />} />
          <Route path="/PivotGridSync" element={<PivotGridSync />} />
        </Routes>
      </Router>
    );
  }


export default App;
