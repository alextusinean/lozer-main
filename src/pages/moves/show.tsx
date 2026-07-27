import { Stack, Typography } from '@mui/material';
import { useShow } from '@refinedev/core';
import { Show, TextFieldComponent as TextField } from '@refinedev/mui';
import { useGetIdentity, useMany } from '@refinedev/core';

export const MovesShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;
  const { data: identity } = useGetIdentity<any>();
  const canEdit = identity ? identity.roles.includes('admin') : false;
  const record = data?.data;
  
  const { data: scratcherData, isLoading: sIsLoading } = useMany({
    resource: 'scratchers',
    ids: record?.contents ? Object.keys(record.contents) : [],
  });

  const sData = scratcherData?.data;

  return (
    <Show isLoading={isLoading || sIsLoading} canDelete={false} canEdit={canEdit}>
      <Stack gap={1}>
        <Typography variant='body1' fontWeight='bold'>
          {'ID'}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant='body1' fontWeight='bold'>
          {'Type'}
        </Typography>
        <TextField value={record?.type} />

        <Typography variant='body1' fontWeight='bold'>
          {'User'}
        </Typography>
        <TextField value={record?.userPrettyName} />

        <Typography variant='body1' fontWeight='bold'>
          {'Contents'}
        </Typography>
        {(record && sData) ? Object.keys(record.contents).map(k => (
          <TextField value={`${record.contents[k]}x ${sData.find(s => s.id == k)?.name}`} />
        )) : '...'}

        <Typography variant='body1' fontWeight='bold'>
          {'Supervisor'}
        </Typography>
        <TextField value={record?.supervisorPrettyName} />
        
        <Typography variant='body1' fontWeight='bold'>
          {'Business Date'}
        </Typography>
        <TextField value={record?.businessDate} />
        
        <Typography variant='body1' fontWeight='bold'>
          {'At'}
        </Typography>
        <TextField value={record?.createdAt} />
        
        <Typography variant='body1' fontWeight='bold'>
          {'Semnatura'}
        </Typography>
        <Stack width='500px' height='100px' borderRadius={'5px'} border={'1px solid gray'} />
      </Stack>
    </Show>
  );
};
