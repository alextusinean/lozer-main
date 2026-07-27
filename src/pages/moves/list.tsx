import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  EditButton,
  CreateButton,
  List,
  ShowButton,
  useDataGrid,
} from '@refinedev/mui';
import React from 'react';
import { FaFileExport, FaFileImport } from 'react-icons/fa';
import { useNavigation, useGetIdentity, useMany } from '@refinedev/core';

export const MovesList = () => {
  const {
    push,
    createUrl,
  } = useNavigation();

  const { dataGridProps } = useDataGrid({ });
  const { data: identity } = useGetIdentity<{ roles: string[] }>();
  const canEdit = identity ? identity.roles.includes('admin') : false;

  const { data: scratcherData } = useMany({
    resource: 'scratchers',
    ids: [...new Set(dataGridProps.rows.map(row => Object.keys(row.contents)).flat())]
  });

  const sData = scratcherData?.data;
  
  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        type: 'number',
        display: 'flex',
        minWidth: 300,
        align: 'left',
        headerAlign: 'left',
      },
      {
        field: 'type',
        headerName: 'Type',
        display: 'flex',
        align: 'left',
        headerAlign: 'left',
      },
      {
        field: 'userPrettyName',
        headerName: 'User',
        flex: 1,
        display: 'flex',
        align: 'left',
        headerAlign: 'left',
      },
      {
        field: 'contents',
        flex: 2,
        headerName: 'Contents',
        display: 'flex',
        renderCell: function render({ row }) {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', width: '100%', height: '85%', fontSize: 11, marginTop: 20, marginBottom: 20 }}>
              {Object.keys(row.contents).map(k => (
                <>
                  <span key={k}>{`${row.contents[k]}x ${sData ? sData.find(s => s.id == k)?.name : k}`}</span>
                </>
              ))}
            </div>
          );
        },
      },
      {
        field: 'supervisorPrettyName',
        headerName: 'Supervisor',
        display: 'flex',
        flex: 1,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'businessDate',
        headerName: 'Business Date',
        display: 'flex',
        minWidth: 125,
        align: 'right',
        headerAlign: 'right',
      },
      {
        field: 'createdAt',
        headerName: 'At',
        minWidth: 135,
        display: 'flex',
        align: 'right',
        headerAlign: 'right',
        valueGetter: (v) => {
          const date = new Date(v);
          return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        },
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
              {canEdit && <EditButton hideText recordItemId={row.id} /> }
              <ShowButton hideText recordItemId={row.id} />
              {/* <DeleteButton hideText recordItemId={row.id} /> */}
            </>
          );
        },
      },
    ],
    [sData, canEdit]
  );

  return (
    <List headerButtons={(
      <>
        <CreateButton
          svgIconProps={{component: FaFileExport, viewBox: '-15 -45 625 555' }}
          onClick={() => {
            push(createUrl('moves') + '?isOutput=true');
          }}
        >
          Output
        </CreateButton>
        <CreateButton svgIconProps={{component: FaFileImport, viewBox: '10 -70 625 625' }}>
          Input
        </CreateButton>
      </>
    )}>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
