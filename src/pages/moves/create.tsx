import { Autocomplete, Box, TextField, Stack, FormControl, MenuItem, Select, InputLabel, createFilterOptions, Typography, Button } from '@mui/material';
import { Create, useAutocomplete } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { Controller, useFieldArray } from 'react-hook-form';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

const ScratcherLine = ({ index, isLast, register, control, scratchersFilterOptions, disabled = false }: any) => {
  const { autocompleteProps } = useAutocomplete({
    resource: 'scratchers',
    onSearch: (value) => [  
      {  
      field: 'name',  
      operator: 'contains',  
      value,  
      },  
    ],
  });

  return (
    <Stack direction='row' alignItems='center' justifyContent='center'>
      <Box sx={{ display: 'flex', width: 57, height: 'fitContent' }}>
        <Typography variant='body2' sx={{ mt: 2, mr: 3, textAlign: 'right', color: 'gray', width: '100%' }}>{!isLast ? `${index + 1}.` : ''}</Typography>
      </Box>
      <TextField
        margin='normal'
        InputProps={{ inputProps: { min: 0 } }}
        type='number'
        label={'Quantity'}
        name='quantity'
        {...register(`scratchers.${index}.quantity`, !isLast ? { required: 'This field is required' } : {})}
        disabled={disabled}
      />
      <Typography variant='h5' sx={{ mx: 2, mt: 3 }}>x</Typography>
      <Controller
        name={`scratchers.${index}.scratcherId`}
        rules={!isLast ? { required: 'This field is required' } : {}}
        control={control}
        defaultValue={null}
        disabled={disabled}
        render={({ field }) => (
          <Autocomplete
            {...field}
            {...autocompleteProps}
            onChange={(_, value) => {
              field.onChange(value?.id || null);
            }}
            autoHighlight
            fullWidth
            filterOptions={scratchersFilterOptions}
            getOptionLabel={(item) => {
              const foundObj = autocompleteProps?.options?.find((p) => {
                const itemId =
                  typeof item === 'object'
                    ? item?.id?.toString()
                    : item?.toString();
                const pId = p?.id?.toString();
                return itemId === pId;
              });
              if (!foundObj)
                return '';

              return `${foundObj.name} (Stock: ${foundObj.stock})`;
            }}
            isOptionEqualToValue={(option, value) => {
              const optionId = option?.id?.toString();
              const valueId =
                typeof value === 'object'
                  ? value?.id?.toString()
                  : value?.toString();
              return value === undefined || optionId === valueId;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={'Scratcher'}
                margin='normal'
                variant='outlined'
                required
              />
            )}
          />
        )}
      />
    </Stack>
  );
};

export const MovesCreate = () => {
  const location = useLocation();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      scratchers: [
        {
          quantity: null,
          scratcherId: null,
        },
      ],
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'scratchers', rules: { minLength: 2 } });
  const { autocompleteProps: userAutocompleteProps } = useAutocomplete({
    resource: 'users',
    onSearch: (value) => [  
      {  
        field: 'prettyName',  
        operator: 'contains',  
        value,  
      },  
    ],
  });

  const { autocompleteProps: scratchersAutocompleteProps } = useAutocomplete({
    resource: 'scratchers',
    onSearch: (value) => [  
      {
        field: 'name',
        operator: 'contains',  
        value,  
      },  
    ],
});

  const scratchersFilterOptions = createFilterOptions({ matchFrom: 'any', stringify: (option: any) => option.name });
  const userFilterOptions = createFilterOptions({ matchFrom: 'any', stringify: (option: any) => option.prettyName });

  const clearAllScratchers = () => remove(fields.map((_, i) => i).slice(0, -1));
  const scratcherSetsOf = (sets: number) => {
    clearAllScratchers();
    const toAppend: any[] = [];
    for (const scratcher of scratchersAutocompleteProps.options.filter(s => s.stock > 0)) {
      toAppend.push({
        quantity: Math.min(scratcher.stock, sets),
        scratcherId: scratcher.id,
      });
    }

    append(toAppend);
  };

  useEffect(() => {
    const { unsubscribe } = watch((value: any) => {
      if (!value)
        return;

      const lastScratcher = value.scratchers[value.scratchers.length - 1];
      if (
        lastScratcher.quantity != null && lastScratcher.quantity != ''
        && lastScratcher.scratcherId != null && lastScratcher.scratcherId != ''
      )
        append({ quantity: null, scratcherId: null });
      else {
        let toRemove = [];
        for (let i = 0; i < value.scratchers.length; i++) {
          const scratcher = value.scratchers[i];
          if (((scratcher.quantity == null || scratcher.quantity == '')
            && (scratcher.scratcherId == null || scratcher.scratcherId == '')))
            toRemove.push(i);
        }

        toRemove = toRemove.slice(0, -1);
        if (toRemove.length)
          remove(toRemove);
      }
    });

    return () => unsubscribe();
  }, [watch]);

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column' }}
        autoComplete='off'
      >
        <Controller
          name={'type' as any}
          control={control}
          defaultValue={(new URLSearchParams(location.search).get('isOutput') ? 'output' : 'input') as any}
          render={({ field }) => {
            return (
              <FormControl style={{ marginTop: 16 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  {...field}
                  value={field?.value}
                  label='Type'
                >
                  <MenuItem value='output'>Output</MenuItem>
                  <MenuItem value='input'>Input</MenuItem>
                </Select>
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name={'userId' as any}
          rules={{ required: 'This field is required' }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...userAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id || null);
              }}
              autoHighlight
              filterOptions={userFilterOptions}
              getOptionLabel={(item) => {
                return (
                  userAutocompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === 'object'
                        ? item?.id?.toString()
                        : item?.toString();
                    const pId = p?.id?.toString();
                    return itemId === pId;
                  })?.prettyName ?? ''
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === 'object'
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={'User'}
                  margin='normal'
                  variant='outlined'
                  error={!!(errors as any)?.userId}
                  helperText={(errors as any)?.userId?.message}
                  required
                />
              )}
            />
          )}
        />
        <Typography variant='body1' sx={{ mb: 2, opacity: 0 }} color='warning'>Warning! User already has an input for today.</Typography>
        <Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 1 }}>
          <Button variant='outlined' color='error' onClick={() => clearAllScratchers()}>CLEAR ALL</Button>
          <Button variant='contained' style={{ marginLeft: 20 }} onClick={() => scratcherSetsOf(10)}>SETS OF 10</Button>
          <Button variant='contained' onClick={() => scratcherSetsOf(5)}>SETS OF 5</Button>
          <Button variant='contained' onClick={() => scratcherSetsOf(3)}>SETS OF 3</Button>
          <Typography variant='body1' sx={{ mb: 2, opacity: errors?.scratchers?.root ? 1 : 0, textAlign: 'right', flex: 1 }} color='error'>Error! At least one scratcher required.</Typography>
        </Stack>
        {fields.map((field, index) => {
          return (
            <ScratcherLine
              key={field.id}
              index={index}
              isLast={index == fields.length - 1}
              register={register}
              control={control}
              scratchersFilterOptions={scratchersFilterOptions}
              exclude={fields.map((f, i) => i == index ? null : f.scratcherId).filter(f => f != null)}
            />
          );
        })}
      </Box>
    </Create>
  );
};
