export type ID = string;
export type message = string;
export type variant = 'success' | 'error' | 'warning' | 'info';
export type timeout = number;

export type showNotificationOpts = {
  text: message;
  variant?: variant;
  timeout?: timeout;
};

export type hideNotificationOpts = {
  ID: ID;
  timeout?: timeout;
};

export interface INotification {
  ID: ID;
  text: message;
  variant?: variant;
  timeout?: timeout;
}
