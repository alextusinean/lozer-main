import { Stack, Typography } from '@mui/material';
import { useShow, useGetIdentity } from '@refinedev/core';
import {
  Show,
  TextFieldComponent as TextField,
} from '@refinedev/mui';

export const ScratchersShow = () => {
  const { data: identity } = useGetIdentity<any>();
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
          {'Name'}
        </Typography>
        <TextField value={record?.name} />

        <Typography variant='body1' fontWeight='bold'>
          {'EAN'}
        </Typography>
        <TextField value={record?.ean} />

        <Typography variant='body1' fontWeight='bold'>
          {'Price'}
        </Typography>
        <TextField value={record?.price?.toFixed(2)} />

        <Typography variant='body1' fontWeight='bold'>
          {'Stock'}
        </Typography>
        <TextField value={record?.stock} />
      </Stack>
    </Show>
  );
};
