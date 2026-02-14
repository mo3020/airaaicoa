import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.airaai.app',
  appName: 'سامانه سپاس',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
