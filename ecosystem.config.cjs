module.exports = {
  apps: [
    {
      name: 'if-juku-site',
      script: 'npx',
      args: 'serve -s build -l 3000',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}