import useMaloprodajaData from './DataFetch';
import React, { useState, useRef } from 'react';  // Import useState and useRef
import { PivotViewComponent, Inject, FieldList } from '@syncfusion/ej2-react-pivotview';  // Import PivotViewComponent, Inject, and FieldList
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';  // Import SwitchComponent


const PivotGridSync = () => {
  const { data, error } = useMaloprodajaData();
  const pivotObj = useRef(null); // Use a ref to access the PivotViewComponent
  const [layout, setLayout] = useState('Tabular'); // State to manage the layout

  if (error) return <div>{error}</div>;
  if (!data || data.length === 0) return <div>Loading...</div>;

  // Dynamically extract keys from the data
  const columns = Object.keys(data[0]);

  // Pivot Grid data source settings
  const pivotDataSourceSettings = {
    dataSource: data,
    expandAll: false,
    columns: columns.filter(key => key !== 'id').map(col => ({ name: col, caption: col.charAt(0).toUpperCase() + col.slice(1) })),
    rows: ['id'].map(row => ({ name: row, caption: row.charAt(0).toUpperCase() + row.slice(1) })),
    values: columns.filter(key => key !== 'id').map(column => ({
      name: column,
      caption: column.charAt(0).toUpperCase() + column.slice(1),
      type: 'Sum',
    })),
    formatSettings: columns.filter(key => key !== 'id').map(val => ({ name: val, format: 'C2' })),
    filters: [],
    allowGrouping: true,  // Allow users to group (drag and drop) rows/columns
    allowDeferUpdate: true, // Optimize for performance with delayed updates
  };

  // Field list options
  const fieldListSettings = {
    allowDragAndDrop: true,  // Enable drag and drop of fields
    showFilterIcon: true,    // Show filter icon in the field list
    showSortIcon: true,      // Show sort icon in the field list
    showValueIcon: true,     // Show value icon in the field list
  };

  // Function to handle layout switch
  function onLayoutChange() {
    setLayout(prevLayout => (prevLayout === 'Tabular' ? 'Compact' : 'Tabular'));
  }

  return (
    <div className="control-pane">
      <div className="control-section" style={{ overflow: 'initial' }}>
        <div className="tabular-layout-switch">
          <label id="layout-label" htmlFor="layout-switch">Classic Layout</label>
          <SwitchComponent
            id="layout-switch"
            checked={layout === 'Tabular'} // Checked if the layout is Tabular
            cssClass="pivot-layout-switch"
            change={onLayoutChange}
          />
        </div>

        <div>
          <PivotViewComponent
            id="PivotView"
            ref={pivotObj}  // Attach ref to the component
            dataSourceSettings={pivotDataSourceSettings}
            showFieldList={true}  // Ensure field list is shown
            fieldListSettings={fieldListSettings}  // Custom settings for the field list
            showToolbar={true}    // Show toolbar for actions like add/edit
            allowSorting={true}
            allowFiltering={true}
            enableVirtualization={true}  // Enable virtualization for large datasets
            showGroupedColumn={true}  // Show grouped columns
            gridSettings={{
              columnWidth: window.innerWidth < 768 ? 100 : 120,  // Dynamic column width for mobile
              layout: layout, // Set layout dynamically based on switch state
            }}
          >
            <Inject services={[FieldList]} />
          </PivotViewComponent>
        </div>
      </div>
    </div>
  );
};
export default PivotGridSync;