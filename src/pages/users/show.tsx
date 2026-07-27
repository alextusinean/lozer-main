import { Stack, Typography } from '@mui/material';
import { useShow, useGetIdentity } from '@refinedev/core';
import { Show, TextFieldComponent as TextField } from '@refinedev/mui';

export const UsersShow = () => {
  const { data: identity }: any = useGetIdentity();
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} canDelete={false} canEdit={identity ? identity.roles.includes('admin') : false}>
      <Stack gap={1}>
        <Typography variant='body1' fontWeight='bold'>
          {'ID'}
        </Typography>
        <TextField value={record?.id} />
        <Typography variant='body1' fontWeight='bold'>
          {'Pretty Name'}
        </Typography>
        <TextField value={`${record?.prettyName}`} />
        <Typography variant='body1' fontWeight='bold'>
          {'First Name'}
        </Typography>
        <TextField value={record?.firstName} />
        <Typography variant='body1' fontWeight='bold'>
          {'Last Name'}
        </Typography>
        <TextField value={record?.lastName} />
        <Typography variant='body1' fontWeight='bold'>
          {'Role'}
        </Typography>
        <TextField value={record?.role} />
        <Typography variant='body1' fontWeight='bold'>
          {'Can Login'}
        </Typography>
        <TextField value={record?.canLogin ? 'Yes' : 'No'} />
      </Stack>
    </Show>
  );
};
