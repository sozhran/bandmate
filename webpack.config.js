module.exports = {
  module: {
    rules: [
      {
        test: /\.(mp3|wav)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}