import React, { useEffect, useState } from 'react';
import PivotGrid, { FieldChooser } from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import useMaloprodajaData from './DataFetch';

const MaloprodajaPivotGrid = () => {
  const { data, error } = useMaloprodajaData();
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      const pivotDataSource = new PivotGridDataSource({
        fields: [
          { caption: 'ID', dataField: 'id', dataType: 'number', area: null },
          { caption: 'Godina', dataField: 'Godina', area: 'row' },
          { caption: 'Kvartal', dataField: 'Kvartal', area: 'row' },
          { caption: 'Mesec', dataField: 'Mesec', area: 'row' },
          { caption: 'Sifra MPOB', dataField: 'SifraMPOB', area: 'column' },
          { caption: 'Naziv MPOB', dataField: 'NazivMPOB', area: 'column' },
          { caption: 'Nadgrupa N', dataField: 'NadgrupaN', area: 'filter' },
          { caption: 'Grupa N', dataField: 'GrupaN', area: 'filter' },
          { caption: 'Podgrupa N', dataField: 'PodgrupaN', area: 'filter' },
          { caption: 'Podpodgrupa N', dataField: 'PodpodgrupaN', area: 'filter' },
          { caption: 'Sifra Art', dataField: 'SifraArt', area: 'column' },
          { caption: 'Bar Art', dataField: 'BarArt', area: 'column' },
          { caption: 'Naziv Art', dataField: 'NazivArt', area: 'column' },
          {
            caption: 'PKolicina',
            dataField: 'PKolicina',
            dataType: 'number',
            summaryType: 'sum',
            area: 'data',
            format: 'fixedPoint',
            precision: 2,
          },
          {
            caption: 'PVPDV',
            dataField: 'PVPDV',
            dataType: 'number',
            summaryType: 'sum',
            area: 'data',
            format: 'currency',
            precision: 2,
          },
        ],
        store: data,
      });

      setDataSource(pivotDataSource);
    }
  }, [data]);

  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Maloprodaja Pivot Grid (All Fields)</h2>
      {dataSource && (
        <PivotGrid
          dataSource={dataSource}
          allowSortingBySummary={true}
          allowFiltering={true}
          showBorders={true}
          showColumnTotals={true}
          showRowTotals={true}
          showColumnGrandTotals={true}
          showRowGrandTotals={true}
          height={600}
        >
          <FieldChooser enabled={true} />
        </PivotGrid>
      )}
    </div>
  );
};

export default MaloprodajaPivotGrid;