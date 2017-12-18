/* eslint-disable import/prefer-default-export */

import ExtendableError from 'es6-error';
import { AuthorizationError } from 'app/lib/errors';

export const ORDER_CHANNEL_OFFLINE = 'offline';

export const ORDER_TYPE_ON_SITE = 'on_site';
export const ORDER_TYPE_COD = 'cod';

const isValidOrderType = (type) => {
  const whiteList = [ORDER_TYPE_ON_SITE, ORDER_TYPE_COD];

  return whiteList.indexOf(type) !== -1;
};

export class InvalidOrderTypeError extends ExtendableError {}

export function validateOrder(type, request) {
  if (!request.user) {
    throw new AuthorizationError();
  }

  if (!isValidOrderType(type)) {
    throw new InvalidOrderTypeError(`Type of '${type}' is not valid type`);
  }

  return true;
}
