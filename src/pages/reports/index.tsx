import { Typography, TextField, Button, Stack } from '@mui/material';
import { axiosInstance } from '@refinedev/nestjsx-crud';
import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';

const businessDateify = (date: Date) => `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${(date.getDate()).toString().padStart(2, '0')}`;

export const Reports = ({ API_URL }: { API_URL: string }) => {
  const date = new Date();
  const lastMonthFirstDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const lastMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);

  if (date.getHours() < 8)
    date.setDate(date.getDate() - 1);

  const [businessDate, setBusinessDate] = useState(businessDateify(date));
  const [fromBusinessDate, setFromBusinessDate] = useState(businessDateify(lastMonthFirstDate));
  const [toBusinessDate, setToBusinessDate] = useState(businessDateify(lastMonthLastDate));
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  if (blobUrl) {
    return (
      <>
        <Button
          variant='contained'
          startIcon={<FaChevronLeft />}
          sx={{ mb: 2 }}
          onClick={() => {
            setBlobUrl(null);
            URL.revokeObjectURL(blobUrl);
          }}
        >
          GO BACK
        </Button>
        <Button
          variant='contained'
          startIcon={<FiExternalLink />}
          sx={{ mb: 2, ml: 2 }}
          onClick={() => window.open(blobUrl, '_blank')}
        >
          OPEN IN NEW TAB
        </Button>
        <embed src={blobUrl} width='100%' height='365%' type='application/pdf' />
      </>
    );
  }

  return (
    <>
      <Typography variant='h5' mb={2}>
        Daily Cashier Report
      </Typography>
      <Stack direction='row' spacing={2} alignItems='center' mb={5}>
        <TextField
          value={businessDate}
          onChange={e => setBusinessDate(e.target.value)}
          label='Business Date'
          type='number'
        />
        <Stack>
          <Button
            variant='contained'
            onClick={() => {
              axiosInstance
                .get(`${API_URL}/reports/daily/${businessDate}`, {
                  responseType: 'blob',
                })
                .then(response => {
                  setBlobUrl(URL.createObjectURL(response.data));
                })
                .catch(error => console.log(error));
            }}
          >
            CREATE REPORT
          </Button>
        </Stack>
      </Stack>
      
      <Typography variant='h5' mb={2}>
        Monthly Consolidated Cashier Report
      </Typography>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Stack spacing={2}>
          <TextField
            value={fromBusinessDate}
            onChange={e => setFromBusinessDate(e.target.value)}
            label='From Business Date'
            type='number'
            disabled
          />
          <TextField
            value={toBusinessDate}
            onChange={e => setToBusinessDate(e.target.value)}
            label='To Business Date'
            type='number'
            disabled
          />
        </Stack>
        <Stack>
          <Button
            variant='contained'
            disabled
          >
            CREATE REPORT
          </Button>
        </Stack>
      </Stack>
    </>
  );
};