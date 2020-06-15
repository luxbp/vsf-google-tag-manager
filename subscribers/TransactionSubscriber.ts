import createProductData from '../helper/createProductData';
import config from 'config';

declare const dataLayer;

/**
 * Order Placed
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;

  if (type.endsWith('order/order/LAST_ORDER_CONFIRMATION')) {
    const orderId = payload.confirmation.backendOrderId;
    const products = payload.order.products.map(product => createProductData(product));
    store.dispatch(
      'user/getOrdersHistory',
      {refresh: true, useCache: false}
    ).then(() => {
      const orderHistory = state.user.orders_history;
      const order = orderHistory.items.find((order) => order['entity_id'].toString() === orderId);
      if (order) {
        dataLayer.push({
          'ecommerce': {
            'purchase': {
              'actionField': {
                'id': order.increment_id || orderId,
                'affiliation': order.store_name,
                'revenue': order.total_due,
                'tax': order.tax_amount,
                'shipping': order.shipping_amount,
                'coupon': order.coupon_code
              },
              'products': products
            }
          }
        })
      }
    })
  }
})
