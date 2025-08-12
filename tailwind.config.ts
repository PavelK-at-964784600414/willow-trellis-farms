import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px', // Extra small devices
      },
      colors: {
        // Farm-inspired color palette
        farm: {
          green: {
            50: '#f0f9f0',
            100: '#dcf2dc',
            200: '#bae5ba',
            300: '#8fd18f',
            400: '#5fb65f',
            500: '#3d9b3d',
            600: '#2d7d2d',
            700: '#256525',
            800: '#1f5020',
            900: '#1a431b',
          },
          brown: {
            50: '#faf8f5',
            100: '#f0ebe2',
            200: '#e1d4c0',
            300: '#d0ba99',
            400: '#bd9d6f',
            500: '#a67c52',
            600: '#926846',
            700: '#79553b',
            800: '#634735',
            900: '#523c2f',
          },
          cream: {
            50: '#fffef7',
            100: '#fffceb',
            200: '#fff7d1',
            300: '#ffeda6',
            400: '#ffdc70',
            500: '#ffc641',
            600: '#ffab1a',
            700: '#e5940d',
            800: '#cc7506',
            900: '#a3620a',
          },
          sage: {
            50: '#f6f8f6',
            100: '#e8f0e8',
            200: '#d3e2d3',
            300: '#b5ccb5',
            400: '#91b091',
            500: '#6d946d',
            600: '#567a56',
            700: '#486348',
            800: '#3c523c',
            900: '#344434',
          }
        },
        // New light theme colors
        'light-bg': '#D9D7D3',  // Main background color
        'light-text': '#000000', // Black text
      },
      fontFamily: {
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        'rustic': ['Georgia', 'serif'],
      },
      backgroundImage: {
        'wood-texture': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJ3b29kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNkMGJhOTkiLz4KICAgICAgPHBhdGggZD0iTTAgMTBsMTAgMTBMMCAzMHoiIGZpbGw9IiNiZDlkNmYiLz4KICAgICAgPHBhdGggZD0iTTQwIDEwbC0xMCAxMEw0MCAzMHoiIGZpbGw9IiNiZDlkNmYiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3b29kKSIvPgo8L3N2Zz4=')",
      },
    },
  },
  plugins: [],
} satisfies Config;
