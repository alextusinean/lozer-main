import { Box, TextField } from '@mui/material';
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';

export const ScratchersCreate = () => {
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
          {...register('id', {
            required: 'This field is required',
          })}
          error={!!errors?.id}
          helperText={errors?.id?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          label={'ID'}
          name='id'
        />
        <TextField
          {...register('name', {
            required: 'This field is required',
          })}
          error={!!errors?.content}
          helperText={errors?.content?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          label={'Name'}
          name='name'
        />
        <TextField
          {...register('ean', {
            required: 'This field is required',
          })}
          error={!!errors?.content}
          helperText={errors?.content?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='number'
          label={'EAN'}
          name='ean'
        />
        <TextField
          {...register('price', {
            required: 'This field is required',
          })}
          error={!!errors?.content}
          helperText={errors?.content?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='number'
          label={'Price'}
          name='price'
        />
      </Box>
    </Create>
  );
};
