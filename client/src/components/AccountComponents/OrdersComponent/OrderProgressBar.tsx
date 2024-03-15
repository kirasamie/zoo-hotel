import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { ThemeProvider, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    blue: Palette['primary'];
    orange: Palette['primary'];
    green: Palette['primary'];
  }

  interface PaletteOptions {
    blue?: PaletteOptions['primary'];
    orange?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    blue: true;
    orange: true;
    green: true;
  }
}

const theme = createTheme({
  palette: {
    blue: { main: '#007aff' },
    orange: { main: '#f6ae2d' },
    green: { main: '#2ead32' },
  },
});

function checkDateEntrance(dateIn: Date, dateOut: Date): ['orange' | 'green' | 'blue', number] {
  const realDateIn = new Date(dateIn);
  const realDateOut = new Date(dateOut);
  const today = new Date();

  const dateToCount = new Date(realDateIn);
  const datesArray = [];
  while (dateToCount <= realDateOut) {
    datesArray.push(new Date(dateToCount));
    dateToCount.setDate(dateToCount.getDate() + 1);
  }

  if (today < realDateIn) {
    return ['orange', 100];
  } else if (today > realDateOut) {
    return ['green', 100];
  } else {
    const dateIndex = datesArray.findIndex((date) => date.toDateString() === today.toDateString());
    return ['blue', Math.ceil((100 / datesArray.length) * dateIndex)];
  }
}

type OrderProgressBarPropsType = {
  dateIn: Date;
  dateOut: Date;
};

export default function OrderProgressBar({ dateIn, dateOut }: OrderProgressBarPropsType) {
  const [status, setStatus] = React.useState<['orange' | 'green' | 'blue', number]>(['orange', 100]);

  React.useEffect(() => {
    setStatus(checkDateEntrance(dateIn, dateOut));
  }, [dateIn, dateOut]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: '100%' }}>
        {status[0] === 'orange' ? (
          <span style={{ color: status[0] }}>Ожидаем прибытия...</span>
        ) : status[0] === 'blue' ? (
          <span style={{ color: 'lightblue' }}>В работе</span>
        ) : (
          <span style={{ color: 'lightgreen' }}>Выполнен!</span>
        )}
        <LinearProgress variant="determinate" color={status[0]} value={status[1]} style={{ marginTop: '3px'}}/>
      </div>
    </ThemeProvider>
  );
}
