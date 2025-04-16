import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';

export default defineVuetifyConfiguration({
  icons: {
    defaultSet: 'fa'
  },
  defaults: {
    VButton: {
      size: 'large',
      color: 'primary'
    },
    VTextField: {
      variant: 'outlined',
      color: 'primary',
      hideDetails: 'auto',
      rounded: true
    },
    VCheckbox: {
      color: 'primary',
      hideDetails: 'auto'
    },
  },
  theme: {
    defaultTheme: 'defaultTheme',
    themes: {
      defaultTheme: {
        dark: false,
        colors: {
          'primary': '#299271',
          'primary2': '#1D7E62',
          'primary3': '#176550',
          'primary4': '#154E3C',
          'primary5': '#0D3025',
          'primary6': '#09251E',
          'primary7': '#729187',
          'primary8': '#4EB994',
          'primary9': '#AEE7D5',
          'primary10': '#D8F1E9',
          'primary11': '#D7F3EA',
          'primary12': '#EBF9F5',
          'primary13': '#EFFAF7',
          'primary14': '#A4B7B1',
          'primary15': '#E9F2F0',
          'primary16': '#EEF7F4',
          'primary17': '#9ACDBC',
          'primary18': '#F3F7EE',
          'primary19': '#C3DCA3',
          'on-primary': '#FFFFFF',
          'gray': '#767676',
          'gray2': '#999999',
          'gray3': '#D9D9D9',
          'gray4': '#F2F2F2',
          'gray5': '#F0F4F3',
          'gray6': '#1A1A1A',
          'gray7': '#F8F8F8',
          'text': '#0D3025',
          'error': '#B90040',
          'error2': '#FFF2F2',
          'error3': '#EFE2E4',
          'error4': '#DD6991',
          'accent': '#FFA45B',
          'accent2': '#FF9F8A',
          'accent3': '#B48D00',
          'purple1': '#6200EE',
          'info': '#006CD0'
        }
      }
    }
  }
});
