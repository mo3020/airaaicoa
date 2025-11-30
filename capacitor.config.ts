import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.airaai.app',
  appName: 'Aira AI',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
