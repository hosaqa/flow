import { useContext } from 'react';
import NotificationsContext from './NotificationsContext';

const useNotifications = () => {
  const context = useContext(NotificationsContext);

  return context;
};

export default useNotifications;
