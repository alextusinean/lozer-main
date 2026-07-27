import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  DeleteButton,
  List,
  ShowButton,
  useDataGrid,
} from '@refinedev/mui';
import React from 'react';

export const SalesList = () => {
  const { dataGridProps } = useDataGrid({ });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: 'Business Date',
        flex: 1,
        align: 'left',
        headerAlign: 'left',
      },
      {
        field: 'supervisorPrettyName',
        headerName: 'Supervisor',
        flex: 1,
        display: 'flex',
      },
      {
        field: 'quantity',
        headerName: 'Quantity',
        display: 'flex',
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'amount',
        headerName: 'Amount',
        display: 'flex',
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'actions',
        headerName: 'Actions',
        align: 'right',
        headerAlign: 'right',
        minWidth: 120,
        sortable: false,
        display: 'flex',
        renderCell: function render({ row }) {
          return (
            <>
              {/* <EditButton hideText recordItemId={row.id} /> */}
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
