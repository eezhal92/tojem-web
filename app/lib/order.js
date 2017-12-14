/* eslint-disable import/prefer-default-export */
import { AuthorizationError } from 'app/lib/errors';

export const ORDER_CHANNEL_OFFLINE = 'offline';

export const ORDER_TYPE_ON_SITE = 'on_site';

export function validateOrder(type, request) {
  if (type === ORDER_TYPE_ON_SITE && !request.user) {
    throw new AuthorizationError();
  }

  return true;
}
