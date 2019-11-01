const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    style: true,
    libraryName: 'antd',
    libraryDirectory: 'es'
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@link-color': '#2c3654',
      '@text-color': '#252525',
      '@error-color': '#961B3B',
      '@warning-color': '#8C4202',
      '@success-color': '#568C10',
      '@primary-color': '#2c3654'
    }
  })
);
