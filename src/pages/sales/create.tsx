import { Box, TextField } from '@mui/material';
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';

export const SalesCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column' }}
        autoComplete='off'
      >
        <TextField
          {...register('businessDate', {
            required: 'This field is required',
          })}
          error={!!errors?.businessDate}
          helperText={errors?.businessDate?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          defaultValue={`${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}`}
          type='number'
          label={'Business Date'}
          name='businessDate'
        />
        <TextField
          {...register('data', {
            required: 'This field is required',
          })}
          error={!!errors?.data}
          helperText={errors?.data?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          rows={10}
          label={'Sale Data'}
          name='data'
        />
      </Box>
    </Create>
  );
};
