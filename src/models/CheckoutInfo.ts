import { Address } from './Address';

/**
 * Information necessary to checkout, for example:
 *   shippingAddress
 *   shippingOptions
 *   paymentMethod
 *
 * For simplicity, we ask for shippingAddress only
 */
export interface CheckoutInfo {
  shippingAddress: Address;
}
