const { HotModuleReplacementPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const socketConfig = require("../config");
const addBaseConfig = require("./webpack-base.config");

const configs = addBaseConfig({
    mode: "development",
    output: {
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "HootNet",
            filename: "index.html",
            template: "src/html/index.html",
            chunks: ["app"]
        }),
        new HtmlWebpackPlugin({
            title: "Loop Test",
            filename: "loopTest.html",
            template: "src/html/loopTest.html",
            chunks: ["looper"]
        })
    ],
    devServer: {
        compress: true,
        disableHostCheck: true,
        // sockHost: '5000-e86f92db-f24e-4089-b8df-7bed4a3a25dd.ws-us02.gitpod.io',
        hot: true,
        liveReload: false,
        port: `${socketConfig.DEVPORT}`,
        allowedHosts: [".github.io"],
        // public: `${socketConfig.GITPODURL}`,
        host: "localhost",
        proxy: {
            "/bridge/": `http://localhost:${socketConfig.PORT}`
            // '/bridge/': {
            //     target: `http://localhost:${socketConfig.PORT}`,

            // },
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
});

// module.exports = configs;

// const doAsync = async () => {
//     //   const GITPODURL = await socketConfig.GETURL()
//     //   configs.devServer.public = GITPODURL
//     // console.log(`UPDATE '${configs.devServer.public}' to '${GITPODURL}'`)
//     configs.devServer.public = "https://localhost:5000";
//     console.log(`UPDATE '${configs.devServer.public}`);
//     return configs;
// };

const doAsync = async () => {
    const URL = await socketConfig.GETURL()
    configs.devServer.public = URL
    console.log(`UPDATE '${configs.devServer.public}' to '${URL}'`)
    return configs
};
module.exports = doAsync;
