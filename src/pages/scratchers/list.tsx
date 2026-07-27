import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  List,
  ShowButton,
  useDataGrid,
} from '@refinedev/mui';
import { useGetIdentity } from '@refinedev/core';
import React from 'react';

export const ScratchersList = () => {
  const { dataGridProps } = useDataGrid({});
  const { data: identity } = useGetIdentity<any>();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        minWidth: 50,
        display: 'flex',
        align: 'left',
        headerAlign: 'left',
      },
      {
        field: 'name',
        headerName: 'Name',
        flex: 2,
        minWidth: 200,
        display: 'flex',
      },
      {
        field: 'ean',
        headerName: 'EAN',
        display: 'flex',
        flex: 1,
        align: 'left',
      },
      {
        field: 'price',
        headerName: 'Price',
        display: 'flex',
        align: 'right',
        headerAlign: 'right',
        valueGetter: (v: number) => v.toFixed(2),
      },
      {
        field: 'stock',
        headerName: 'Stock',
        display: 'flex',
        headerAlign: 'right',
        align: 'right',
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
              {/* {(identity ? identity.roles.includes('admin') : false) && <EditButton hideText recordItemId={row.id} />} */}
              <ShowButton hideText recordItemId={row.id} />
              {/* {(identity ? identity.roles.includes('admin') : false) && <DeleteButton hideText recordItemId={row.id} />} */}
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List
      canCreate={identity ? identity.roles.includes('admin') : false}
    >
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
