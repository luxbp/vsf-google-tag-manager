import createProductData from '../helper/createProductData';
import config from 'config';

declare const dataLayer;

(function () {
  // do work
})();

/**
 * Order Placed
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;

  if (type.endsWith('order/order/LAST_ORDER_CONFIRMATION')) {
    const orderId = payload.confirmation.backendOrderId;
    const products = payload.order.products.map((product, index) => createProductData(product, {position: index}));
    store.dispatch(
      'user/getOrdersHistory',
      {refresh: true, useCache: false}
    ).then(() => {
      const orderHistory = state.user.orders_history;

      // in the event this is empty, tag manager should pull order and tax from CartStateSubscriber
      if (!orderHistory) {
        dataLayer.push({
          'event': 'purchase'
        });
        return;
      }

      const order = orderHistory.items.find((order) => order['entity_id'].toString() === orderId);
      if (order) {
        dataLayer.push({
          'event': 'purchase',
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
