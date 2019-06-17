import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MainThemeRGB } from '../../StyledComponents/Theme';
import { InputBase } from '@material-ui/core';
import { Screensizes } from '../../StyledComponents/Screensizes';

const MarginLeftSmall = '10px';

export const HeaderLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const Grow = styled.div`
  flex-grow: 1;
`;

export const Title = styled.h3`
  display: 'none';
`;

export const Search = styled.div`
  position: 'relative';
  borderradius: theme.shape.borderRadius;
  background-color: rgba(
    ${MainThemeRGB.secondary.contrastText.r},
    ${MainThemeRGB.secondary.contrastText.g},
    ${MainThemeRGB.secondary.contrastText.b},
    0.25
  );
  :hover {
    background-color: rgba(
      ${MainThemeRGB.secondary.contrastText.r},
      ${MainThemeRGB.secondary.contrastText.g},
      ${MainThemeRGB.secondary.contrastText.b},
      0.35
    );
  }
  ,display: -webkit-flex;
  display: flex;
  margin-left: ${MarginLeftSmall};
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
`;

export const ContainerSearchIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${MarginLeftSmall};
`;

export const StyledInputBase = styled(InputBase)`
  color: 'inherit';
  padding: auto;
  width: '100%';
  max-width: 300px;
  align-items: center;
  justify-content: center;
  margin-left: ${MarginLeftSmall};
`;

export const SectionDesktop = styled.div`
  display: none;
  @media (min-width: ${Screensizes.md}) {
    display: flex;
  }
`;

export const SectionMobile = styled.div`
  display: flex;
  @media (min-width: ${Screensizes.md}) {
    display: none;
  }
`;
