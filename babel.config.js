const path = require('path');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname, '.')],
        alias: {
          '@hooks': path.resolve(__dirname, 'Hooks'),
          '@components': path.resolve(__dirname, 'Components'),
          '@project-types': path.resolve(__dirname, 'Types'),
          '@assets': path.resolve(__dirname, 'Assets'),
          '@navigation': path.resolve(__dirname, 'Navigation'),
          '@redux': path.resolve(__dirname, 'Redux'),
          '@services': path.resolve(__dirname, 'Services'),
          '@utils': path.resolve(__dirname, 'Utils'),
          '@helpers': path.resolve(__dirname, 'Helpers'),
          '@api': path.resolve(__dirname, 'Api'),
          '@config': path.resolve(__dirname, 'Config'),
          '@template': path.resolve(__dirname, 'Template'),
          '@screens': path.resolve(__dirname, 'Screens'),
          '@validations': path.resolve(__dirname, 'Validations'),
        },
      },
    ],
    'react-native-reanimated/plugin', // must be last
  ],
};
