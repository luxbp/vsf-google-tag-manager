declare const dataLayer;

export default (
    products,
    currency: string
  ): void => {
    try {
      if (!('dataLayer' in window)) {
        throw new Error('GTM not installed');
      }
  
      dataLayer.push({
        ecommerce: {
          currencyCode: currency,
          impressions: products
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  };