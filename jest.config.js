// module.exports = {
//   preset: 'react-native',
// "modulePaths": ["<rootDir>/src"],
// };


module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/Components/$1',
    '^@screens/(.*)$': '<rootDir>/Screens/$1',
    '^@assets/(.*)$': '<rootDir>/Assets/$1',
    '^@utils/(.*)$': '<rootDir>/Utils/$1',
    '^@template/(.*)$': '<rootDir>/Template/$1',
    '^@core/(.*)$': '<rootDir>/Components/Core/$1',
    '^@validations/(.*)$': '<rootDir>/Validations/$1',
    '^@types/(.*)$': '<rootDir>/Types/$1',
    '^@redux/(.*)$': '<rootDir>/Redux/$1',
    '^@services/(.*)$': '<rootDir>/Services/$1',
    '^@hooks/(.*)$': '<rootDir>/Hooks/$1',
    '^@navigation/(.*)$': '<rootDir>/Navigation/$1',
    '^@config/(.*)$': '<rootDir>/Config/$1',
    '^@helpers/(.*)$': '<rootDir>/Helpers/$1',
    '^@api/(.*)$': '<rootDir>/Api/$1',
  },
};
