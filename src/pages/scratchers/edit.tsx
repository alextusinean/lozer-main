import { Box, TextField } from '@mui/material';
import { Edit } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';

export const ScratchersEdit = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Edit isLoading={formLoading} canDelete={false} saveButtonProps={saveButtonProps}>
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
          label={'Price'}
          name='price'
        />
      </Box>
    </Edit>
  );
};
