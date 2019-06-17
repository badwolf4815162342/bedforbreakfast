import { createMuiTheme } from '@material-ui/core/styles';

export const MainTheme = {
  primary: {
    light: '#ffcd38',
    main: '#ffc107',
    dark: '#b28704',
    contrastText: '#000',
  },
  secondary: {
    light: '#637bfe',
    main: '#3d5afe',
    dark: '#2a3eb1',
    contrastText: '#fff',
  },
};

export const MainThemeMaterial = createMuiTheme({
  palette: {
    primary: {
      light: MainTheme.primary.light,
      main: MainTheme.primary.main,
      dark: MainTheme.primary.dark,
      contrastText: MainTheme.primary.contrastText,
    },
    secondary: {
      light: MainTheme.secondary.light,
      main: MainTheme.secondary.main,
      dark: MainTheme.secondary.dark,
      contrastText: MainTheme.secondary.contrastText,
    },
  },
});
