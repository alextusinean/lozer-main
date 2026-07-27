import { Box, TextField, Switch, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { Edit } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { Controller } from 'react-hook-form';

export const UsersEdit = () => {
  const {
    saveButtonProps,
    register,
    control,
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
          type='number'
          label={'ID'}
          name='id'
          disabled
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
        <TextField
          {...register('password')}
          error={!!errors?.password}
          helperText={errors?.password?.message as React.ReactNode}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          defaultValue='unchanged'
          type='text'
          label={'Password'}
          name='password'
        />
        <Controller
          name='canLogin'
          control={control}
          render={({ field }) => {
            return (
              <>
                <InputLabel style={{ marginTop: 16 }}>Can Login</InputLabel>
                <Switch
                  {...field}
                  checked={field?.value || false}
                  onChange={event => field.onChange(event.target.checked)}
                />
              </>
            );
          }}
        />
      </Box>
    </Edit>
  );
};
