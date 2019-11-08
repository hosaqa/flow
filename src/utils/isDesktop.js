import { gridTheme } from '../theme';
import { useMediaQuery } from 'react-responsive';

export const isDesktop = () =>
  useMediaQuery({ minWidth: gridTheme.breakpoints.lg });

export default isDesktop;
