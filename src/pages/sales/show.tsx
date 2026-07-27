import { Stack, Typography } from '@mui/material';
import { useShow } from '@refinedev/core';
import { Show, TextFieldComponent as TextField } from '@refinedev/mui';

export const SalesShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} canDelete={false} canEdit={false}>
      <Stack gap={1}>
        <Typography variant='body1' fontWeight='bold'>
          {'Business Date'}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant='body1' fontWeight='bold'>
          {'Supervisor'}
        </Typography>
        <TextField value={record?.supervisorPrettyName} />

        <Typography variant='body1' fontWeight='bold'>
          {'Contents / Q: ' + (record?.quantity || '...') + ' / A: ' + (record?.amount || '...')}
        </Typography>
        {record ? record.users.map((user: any) => (
          <>
            <Typography variant='body2' fontWeight='bold'>
              {user.id} - {user.name} / Q: {user.quantity} / A: {user.amount}
            </Typography>
            {user.scratchers.map((scratcher: any) => (
              <TextField value={`${scratcher.quantity}x ${scratcher.name}`} />
            ))}
          </>
        )) : (
          <Typography variant='body2' fontWeight='bold'>
            {'...'}
          </Typography>
        )}
      </Stack>
    </Show>
  );
};
