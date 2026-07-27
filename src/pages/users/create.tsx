import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { Controller } from 'react-hook-form';

export const UsersCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
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
          type='number'
          label={'ID'}
          name='id'
        />
        <TextField
          {...register('firstName', {
            required: 'This field is required',
          })}
          error={!!errors?.firstName}
          helperText={errors?.firstName?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={'First Name'}
          name='firstName'
        />
        <TextField
          {...register('lastName', {
            required: 'This field is required',
          })}
          error={!!errors?.lastName}
          helperText={errors?.lastName?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={'Last Name'}
          name='lastName'
        />
        {/* <TextField
          {...register('password')}
          error={!!errors?.title}
          helperText={errors?.title?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label={'Password'}
          name='password'
        /> */}
        <Controller
          name='role'
          control={control}
          defaultValue='cashier'
          render={({ field }) => {
            return (
              <FormControl style={{ marginTop: 16 }}>
                <InputLabel>Role</InputLabel>
                <Select
                  {...field}
                  value={field?.value}
                  label='Role'
                >
                  <MenuItem value='cashier'>Cashier</MenuItem>
                  <MenuItem value='supervisor'>Supervisor</MenuItem>
                </Select>
              </FormControl>
            );
          }}
        />
        {/* <Controller
          name='canLogin'
          control={control}
          defaultValue={false}
          render={({ field }) => {
            return (
              <>
                <InputLabel style={{ marginTop: 16 }}>Can Login</InputLabel>
                <Switch
                  {...field}
                  checked={field?.value}
                  label={'Can Login'}
                />
              </>
            );
          }}
        /> */}
      </Box>
    </Create>
  );
};
