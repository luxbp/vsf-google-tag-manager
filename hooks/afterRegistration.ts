import rootStore from '@vue-storefront/store'


const injectJs = function(w,d,s,l,i) {
  w[l]=w[l]||[];
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  var f = d.getElementsByTagName(s)[0], j=d.createElement(s),
      dl = l != 'dataLayer' ? '&l='+l : ''; 
  j.async=true;
  j.src= 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
}

export function afterRegistration({ Vue, config, store, isServer }){
  if (!isServer && config.googleTagManager && config.googleTagManager.code) {
    if(!((<any>window).dataLayer && (<any>window).dataLayer.event && (<any>window).dataLayer.event === 'gtm.js'))
      injectJs(window, document, 'script', 'dataLayer', config.googleTagManager.code);
  }
}
