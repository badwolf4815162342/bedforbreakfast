import { createMuiTheme } from '@material-ui/core/styles';

export const MainTheme = {
  primary: '#fdd835',
  secondary: '#7986cb',
};

export const MainThemeMaterial = createMuiTheme({
  palette: {
    primary: {
      main: MainTheme.primary,
    },
    secondary: {
      main: MainTheme.secondary,
    },
  },
});
