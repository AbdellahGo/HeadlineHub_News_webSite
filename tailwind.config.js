/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
      arrowMedia: '1600px',
      Msm: {
        max: '575.98px'
      },
      Mmd: {
        max: '767.98px'
      },
      Mlg: {
        max: '991.98px'
      },
      Mxl: {
        max: '1199.98px'
      },
      Mxxl: {
        max: '1399.98px'
      }
    },
    extend: {
      fontSize: {
        '9': '9px',
        '10': '10px',
        '11': '11px',
        '12': '12px',
        '13': '13px',
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '20': '20px',
        '22': '22px',
        '24': '24px',
        '28': '28px',
        '30': '30px',
        '32': '32px',
        '34': '34px',
        '36': '36px',
        '38': '38px',
        '40': '40px',
        '44': '44px',
        '50': '50px',
        '54': '54px',
        '60': '60px'
      },
      fontFamily: {
        inter: [
          'Inter'
        ],
        dmSans: [
          'DM Sans'
        ],
        notoSans: [
          'Noto Sans'
        ]
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900'
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px'
      },
      spacing: {
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '9': '9px',
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '15': '15px',
        '16': '16px',
        '18': '18px',
        '20': '20px',
        '24': '24px',
        '28': '28px',
        '30': '30px',
        '35': '35px',
        '38': '38px',
        '40': '40px',
        '48': '48px',
        '50': '50px',
        '54': '54px',
        '58': '58px',
        '60': '60px',
        '75': '75px',
        '80': '80px',
        '115': '115px',
        '120': '120px',
        '150': '150px',
        '162': '162px'
      },
      transitionDuration: {
        '3': '300ms',
        '4': '400ms',
        '6': '600ms'
      },
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        'solid-white': '#080808',
        'dark-accent': '#191c20',
        'dark-accent-2': '#0e0f12',
        'flex-gray-15': '#88888826',
        'hyperlink-line-color': '#ce490a',
        'nav-color': '#282828',
        'qlink-color': '#232323',
        'meta-fcolor': '#777777',
        'excerpt-color': '#555555',
        'live-color': '#ff1e1e',
        'flex-gray-30': '#88888844',
        'button-blue': '#b6fcf',
        'heading-tagline-color': '#eee',
        'cta-title-color': '#9c471e',
        'bg-side': '#fff3e8',
        'bg-side-dark': '#50230e',
        'bg-side-2': '#fff5ec',
        'bg-side-dark-2': '#22221d',
        'absolute-light': '#ddd',
        'flex-gray-7': '#88888812',
        'flex-gray-20': '#88888833',
        'flex-gray-40': '#88888866',
        'mc-input-bg': '#111111',
        'hover-bg': '#ededed',
        'divider-color': '#88888822',
        'subnav-color-10': '#ffffff15',
        'subnav-color-12': '#28282820',
        'bookmark-color': '#62b088',

      },
      boxShadow: {
        'shadow-12': '0 4px 30px #0000001f',
        'shadow-7': '0 4px 30px #0000004d',
      },
    }
  },
}