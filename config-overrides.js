const path = require('path');module.exports = function override(config) {
    
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.alias,
        '@': path.resolve(__dirname, 'src'),
        "@components": path.resolve(__dirname, 'src/components'),
        "@config": path.resolve(__dirname, 'src/config'),
        "@hooks": path.resolve(__dirname, 'src/hooks'),
        "@pages": path.resolve(__dirname, 'src/pages'),
        "@services": path.resolve(__dirname, 'src/services'),
        "@store": path.resolve(__dirname, 'src/store'),
        "@utils": path.resolve(__dirname, 'src/utils'),
      },
    };
    
    return config;
};