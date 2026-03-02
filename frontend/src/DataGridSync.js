import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Sort,
  Filter,
  Edit,
  Toolbar
} from '@syncfusion/ej2-react-grids';

const GrupeSifarnikGrid = () => {
  const [data, setData] = useState([]);         
  const [error, setError] = useState(null);     
  const [columns, setColumns] = useState([]); 
  const [table] = useState('Grupe');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/get-sqlserver-data/${table}/`)
      .then((response) => {
        const fetchedData = response.data;
        setData(fetchedData);

        if (fetchedData.length > 0) {
          const dynamicColumns = Object.keys(fetchedData[0]).map((key) => ({
            field: key,
            headerText: key.charAt(0).toUpperCase() + key.slice(1),
            width: 150,
            textAlign: typeof fetchedData[0][key] === 'number' ? 'Right' : 'Left'
          }));
          setColumns(dynamicColumns);
        }
      })
      .catch((err) => {
        setError('Error fetching data');
        console.error('Error fetching data:', err);
      });
  }, [table]);

  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Normal'
  };

  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

  if (error) return <div>{error}</div>;
  if (!data.length) return <div>Loading...</div>;

  return (
    <div style={{ margin: '20px' }}>
      <h2>Šifarnik Artikala</h2>
      <GridComponent
        dataSource={data}
        allowPaging={true}
        allowSorting={true}
        allowFiltering={true}
        filterSettings={{ type: 'Excel' }}
        editSettings={editSettings}
        toolbar={toolbarOptions}
        pageSettings={{ pageSize: 10 }}
        height={400}
      >
        <ColumnsDirective>
          {columns.map((col, index) => (
            <ColumnDirective
              key={index}
              field={col.field}
              headerText={col.headerText}
              width={col.width}
              textAlign={col.textAlign}
              isPrimaryKey={index === 0} // Required for editing — assumes first column is ID
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default GrupeSifarnikGrid;
