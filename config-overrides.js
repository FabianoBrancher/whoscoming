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
      '@primary-color': '#002F5C',
      '@success-color': '#1A7C2F',
      '@warning-color': '#FCD600',
      '@error-color': '#B23623',
      '@link-color': '#002F5C',
      '@text-color': '#252525'
    }
  })
);
