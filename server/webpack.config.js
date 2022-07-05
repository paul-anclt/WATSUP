module.exports = {
    devtool: 'source-map',
    entry: "./index.ts",
    mode: "development",
    target: "node",
    output: {
        filename: "index.bundle.js",
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            }
        ]
    }
}