import CracoAlias from 'craco-alias';
import CracoLessPlugin from 'craco-less';

import path from 'path';

module.exports = {
  plugins: [
    /* 支持less module */
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' },
        },
        /* eslint-disable no-param-reassign */
        modifyLessRule(lessRule) {
          lessRule.test = /\.(module)\.(less)$/;
          lessRule.exclude = path.join(__dirname, 'node_modules');
          return lessRule;
        },
      },
    },
    /* 别名设置 */
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
  devServer: (devServerConfig) => ({
    ...devServerConfig,
    // 服务开启gzip
    compress: true,
    proxy: {
      '/api': {
        target: 'https://test.com/',
        changeOrigin: true,
        xfwd: false,
      },
    },
  }),
};
