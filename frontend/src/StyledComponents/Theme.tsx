import { createMuiTheme } from '@material-ui/core/styles';

export const MainTheme = {
  primary: {
    light: '#ffcd38',
    main: '#ffc107',
    dark: '#b28704',
    contrastText: '#000000',
  },
  secondary: {
    light: '#637bfe',
    main: '#3d5afe',
    dark: '#2a3eb1',
    contrastText: '#ffffff',
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

export const MainThemeRGB = {
  primary: {
    light: hexToRgb(MainTheme.primary.light),
    main: hexToRgb(MainTheme.primary.main),
    dark: hexToRgb(MainTheme.primary.dark),
    contrastText: hexToRgb(MainTheme.primary.contrastText),
  },
  secondary: {
    light: hexToRgb(MainTheme.secondary.light),
    main: hexToRgb(MainTheme.secondary.main),
    dark: hexToRgb(MainTheme.secondary.dark),
    contrastText: hexToRgb(MainTheme.secondary.contrastText),
  },
};

function hexToRgb(hex: string) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        r: 0,
        g: 0,
        b: 0,
      };
}
