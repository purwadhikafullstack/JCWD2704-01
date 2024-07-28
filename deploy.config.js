module.exports = {
    apps: [
      {
        name: 'jcwd270401-web',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 2701,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwd270401.purwadhikabootcamp.com/apps/web',
      },
      {
        name: 'jcwd270401-api',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 2801,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwd270401.purwadhikabootcamp.com/apps/api',
      },
    ],
}
