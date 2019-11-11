import { gridTheme } from '../theme';
import { useMediaQuery } from 'react-responsive';

const mediaUpLG = () => useMediaQuery({ minWidth: gridTheme.breakpoints.lg });

export { mediaUpLG };
