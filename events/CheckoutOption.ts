declare const dataLayer;

export default (stepIndex: number, option: String): void => {
  dataLayer.push({
    'event': 'checkoutOption',
    'ecommerce': {
      'checkout_option': {
        'actionField': {'step': stepIndex, 'option': option}
      }
    }
  });
}