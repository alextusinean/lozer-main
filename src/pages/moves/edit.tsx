import { Box, TextField } from '@mui/material';
import { Edit } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';

export const MovesEdit = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} canDelete={false}>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column' }}
        autoComplete='off'
      >
        <TextField
          {...register('id', {
            required: 'This field is required',
          })}
          error={!!errors?.id}
          helperText={errors?.id?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={'ID'}
          name='id'
          disabled
        />
        <TextField
          {...register('type', {
            required: 'This field is required',
          })}
          error={!!errors?.type}
          helperText={errors?.type?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={'Type'}
          name='type'
          disabled
        />
        <TextField
          {...register('userPrettyName', {
            required: 'This field is required',
          })}
          error={!!errors?.userPrettyName}
          helperText={errors?.userPrettyName?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={'User'}
          name='userPrettyName'
          disabled
        />
        <TextField
          {...register('businessDate', {
            required: 'This field is required',
          })}
          error={!!errors?.userPrettyName}
          helperText={errors?.userPrettyName?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='number'
          label={'Business Date'}
          name='businessDate'
        />
        <TextField
          {...register('createdAt', {
            required: 'This field is required',
          })}
          error={!!errors?.userPrettyName}
          helperText={errors?.userPrettyName?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={'At'}
          name='createdAt'
          disabled
        />
      </Box>
    </Edit>
  );
};
