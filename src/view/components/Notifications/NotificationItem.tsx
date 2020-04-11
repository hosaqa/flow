import React, { useEffect, useCallback } from 'react';
import styled, { Theme } from 'view/theme';
import { keyframes } from '@emotion/core';
import {
  ID,
  message,
  variant,
  timeout,
  hideNotificationOpts,
} from './Notifications.interface';

interface INotificationItem {
  ID: ID;
  message: message;
  variant?: variant;
  timeout?: timeout;
  hideNotification({}: hideNotificationOpts): void;
}

type NotificationStyledProps = {
  variant: variant;
};

const bounce = keyframes`
  0% {
    transform: matrix3d(.1, 0, 0, 0, 0, .1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  3.4% {
    transform: matrix3d(.384, 0, 0, 0, 0, .466, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  4.7% {
    transform: matrix3d(.505, 0, 0, 0, 0, .639, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  6.81% {
    transform: matrix3d(.693, 0, 0, 0, 0, .904, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  9.41% {
    transform: matrix3d(.895, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  10.21% {
    transform: matrix3d(.947, 0, 0, 0, 0, 1.204, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  13.61% {
    transform: matrix3d(1.111, 0, 0, 0, 0, 1.299, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  14.11% {
    transform: matrix3d(1.127, 0, 0, 0, 0, 1.298, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  17.52% {
    transform: matrix3d(1.187, 0, 0, 0, 0, 1.216, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  18.72% {
    transform: matrix3d(1.191, 0, 0, 0, 0, 1.169, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  21.32% {
    transform: matrix3d(1.177, 0, 0, 0, 0, 1.062, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  24.32% {
    transform: matrix3d(1.135, 0, 0, 0, 0, .964, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  25.23% {
    transform: matrix3d(1.121, 0, 0, 0, 0, .944, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  29.03% {
    transform: matrix3d(1.057, 0, 0, 0, 0, .907, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  29.93% {
    transform: matrix3d(1.043, 0, 0, 0, 0, .909, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  35.54% {
    transform: matrix3d(.981, 0, 0, 0, 0, .966, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  36.74% {
    transform: matrix3d(.974, 0, 0, 0, 0, .981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  41.04% {
    transform: matrix3d(.965, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  44.44% {
    transform: matrix3d(.969, 0, 0, 0, 0, 1.029, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  52.15% {
    transform: matrix3d(.992, 0, 0, 0, 0, 1.006, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  59.86% {
    transform: matrix3d(1.005, 0, 0, 0, 0, .991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  63.26% {
    transform: matrix3d(1.007, 0, 0, 0, 0, .993, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  75.28% {
    transform: matrix3d(1.001, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  85.49% {
    transform: matrix3d(.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  90.69% {
    transform: matrix3d(.999, 0, 0, 0, 0, .999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
`;

const getNotificationColor = (theme: Theme, variant: variant) =>
  theme.palette.status[variant];

const NotificationStyled = styled.div<NotificationStyledProps>`
  display: inline-flex;
  margin-top: ${({ theme }) => theme.spacing(1.5)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  border-radius: ${({ theme }) => theme.borderRadius(1)}px;
  box-shadow: ${({ theme }) => theme.shadows.primary};
  background-color: ${({ theme, variant }) =>
    getNotificationColor(theme, variant)};
  color: ${({ theme }) => theme.palette.text.light};
  animation: ${bounce} 1s linear both;
`;

const NotificationItem: React.FC<INotificationItem> = ({
  ID,
  message,
  variant = 'success',
  timeout,
  hideNotification,
}) => {
  const handleClick = useCallback(() => {
    hideNotification({ ID });
  }, [hideNotification]);

  useEffect(() => {
    if (timeout) hideNotification({ ID, timeout });
  }, []);

  return (
    <NotificationStyled role="alert" variant={variant} onClick={handleClick}>
      {message}
    </NotificationStyled>
  );
};

export default NotificationItem;
