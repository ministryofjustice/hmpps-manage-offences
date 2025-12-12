import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
   allowlist: {
      'node_modules/@parcel/watcher@2.5.0': 'FORBID',
      'node_modules/cypress@14.4.0': 'ALLOW',
      'node_modules/dtrace-provider@0.8.8': 'FORBID',
      'node_modules/fsevents@2.3.3': 'FORBID',
      'node_modules/unrs-resolver@1.7.2': 'FORBID'
   },
})
