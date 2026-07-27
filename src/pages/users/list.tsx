import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from '@refinedev/mui';
import { useGetIdentity } from '@refinedev/core';
import React from 'react';

export const UsersList = () => {
  const { dataGridProps } = useDataGrid({});
  const { data: identity }: any = useGetIdentity<any>();

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
        field: 'firstName',
        flex: 1,
        headerName: 'First Name',
        minWidth: 200,
        display: 'flex',
      },
      {
        field: 'lastName',
        flex: 1,
        headerName: 'Last Name',
        minWidth: 200,
        display: 'flex',
      },
      {
        field: 'role',
        headerName: 'Role',
        minWidth: 125,
        display: 'flex',
        headerAlign: 'right',
        align: 'right',
      },
      {
        field: 'canLogin',
        headerName: 'Can Login',
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
              {(identity ? identity.roles.includes('admin') : false) && <EditButton hideText recordItemId={row.id} />}
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
