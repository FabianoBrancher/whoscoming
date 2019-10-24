const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#2c3654',
      '@success-color': '#568C10',
      '@warning-color': '#8C4202',
      '@error-color': '#961B3B',
      '@link-color': '#2c3654',
      '@text-color': '#252525'
    }
  })
);
