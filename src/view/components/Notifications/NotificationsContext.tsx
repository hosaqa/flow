import { createContext } from 'react';
import { showNotificationOpts } from './Notifications.interface';

interface INotificationsContext {
  showNotification: ({}: showNotificationOpts) => void;
}

const NotificationsContext = createContext<INotificationsContext | null>(null);

export default NotificationsContext;
