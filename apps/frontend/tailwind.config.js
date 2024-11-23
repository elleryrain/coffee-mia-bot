const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { nextui } = require('@nextui-org/react');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlack: '#18181A',
        secondaryBlack: 'rgba(24,24,26,0.7)',
        tetriaryBlack: 'rgba(24,24,26,0.5)',
        systemRed: '#FF3B30',
        red60: '#EB5757',
        red10: '#FFE8E0',
        systemOrange: '#FF9500',
        orange60: '#F2994A',
        orange10: '#FFF1D9',
        systemYellow: '#FFCC00',
        yellow60: '#F6CE46',
        yellow10: '#FFF6D9',
        systemGreen: '#34C759',
        green60: '#219653',
        green10: '#DAF7E0',
        systemBlue: '#007AFF',
        blue60: '#2F80ED',
        blue10: 'EBF1FF',
        gray90: '#3C3C43',
        gray80: '#525259',
        gray70: '#767680',
        gray60: '#8E8E93',
        gray50: '#A9A9AC',
        gray40: '#D1D1D5',
        gray30: '#E3E3E8',
        gray20: '#F2F2F2',
        gray15: '#F5F5F5',
      },
      boxShadow: {
        light: '0 2px 12px 0 rgba(12,0,69,0.12)',
        hard: '0 4px 12px 0 rgba(12,0,69,0.16)',
        soft: '0 4px 40px 0 rgba(236,232,232,0.6)',
      },
    },
  },
  plugins: [nextui()],
};
