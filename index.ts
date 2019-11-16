import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { afterEach } from './router/afterEach'

export const KEY = 'vsf-google-tag-manager'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  router: { afterEach },
  afterRegistration
}

export const VsfGoogleTagManager = new VueStorefrontModule(moduleConfig)
