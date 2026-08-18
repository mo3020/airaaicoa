import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.realaro.app',
  appName: 'realaro',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
