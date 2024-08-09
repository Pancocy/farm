import { UserConfig } from "@farmfe/core";
import * as path from "node:path";
import jsPluginVue from "@farmfe/js-plugin-vue";
function defineConfig(config: UserConfig): UserConfig {
    return config
}

export default defineConfig({
    compilation: {
        input: {
            index: './src/index.html'
        },
        output: {
            // 输入目录
            path: 'build',
            // 局部打包后，入口文件所在资源的文件名配置
            entryFilename: 'main.js',
            // public path：资源加载前缀
            publicPath:  process.env.DEV_ENV === process.env.DEV_ENV ? 'https://cdn.com' : '/',
            // 静态资源文件名配置
            assetsFilename: 'source',
            // 目标执行环境，浏览器或者 Node
            targetEnv: "browser",
            // 输出模块格式
            format: "esm",
        },
        resolve: {
            //配置解析别名
            alias: {
                "/@": path.join(process.cwd(), "src"),
            },

            //配置解析依赖时的后缀，例如解析 ./index 时，如果没有解析到，则会自动加上后缀解析，如尝试 ./index.tsx, ./index.css 等。
            extensions: ["tsx", "ts", "jsx", "js", "mjs", "json", "html", "css", "scss", "less", "sass"],

            //解析 node_modules 下依赖时，从 package.json 中将会按照 mainFields 中配置的字段和顺序进行解析。对于 package.json
            mainFields: ["exports", "browser", "module", "main"],

            //解析文件时，是否追踪 symlink 对应的真实目录
            symlinks: true,

            //是否严格遵循 package.json 中 exports 中定义的导出
            strictExports: true,
        },
        external: [
            'node:fs'
        ],

        //配置静态资源
        assets:{
            //额外视为静态资源的文件后缀
            include:['txt','tft','ico','jpg','svg','png','jpeg','md'],
        },

        script: {
            //配置 Farm 解析 js/jsx/ts/tsx 的 AST 以及生成代码时支持的 ES 语法版本。 可选值：es5, es6, es2015 - es2023, esnext
            target: "esnext",
            //配置SWC插件，数组每个对象都包括三个属性：
                // name：swc插件名、
                // options:传递给swc插件的配置项,
                // filters：匹配规则，支持 resolvedPaths 和 moduleTypes 这两个过滤项
            plugins: [
                //以vue支持jsx的swc插件为例展示配置
                {
                    name:'swc-jsx-vue-plugin',
                    options:{
                        transformOn: true,
                        optimize: true,
                    },
                    filters:{
                        // resolvedPaths: [".+"]
                        moduleTypes: ["tsx", "jsx"],
                    }
                }
            ]
        },
        css:{
            modules: {
                //配置哪些路径对应的模块会被视为 CSS Modules。需要配置正则字符串。默认是以 .module.(css|scss|sass|less) 结尾的文件。
                paths: ["\\modules\\.(css|less|sass|scss)"],
            },
            //旧版本
            prefixer:{
                targets:["chrome","opera","edge","firefox","safari","ie","ios","android"]
            }
        },



        //配置 Tree Shake 和压缩(minify)
        treeShaking: true,
        minify: true,

        //语法降级和 Polyfill, 默认情况下，Farm 将降级到ES5并在生产模式下自动注入polyfills。
        presetEnv: {
            include: [],
            options: {
                targets: "Chrome 48",
            }

        },
        //增量构建
        persistentCache: true

    },
    //插件
    plugins: [  '@farmfe/plugin-react',
                '@farmfe/plugin-sass',
    ],
    //dev-server
    server: {
            //端口
            port: 9001,
            //host: 'localhost',
            //监听编译过程中涉及到的模块的变动，推送给 Farm Runtime 进行更新；true、或者使用配置文件
            hmr: true,
            //配置服务器代理。基于 koa-proxies 实现
            proxy: {},
            //协议类型；'http' | 'https';
            //protocol: 'http',
            strictPort: true,
            open: true,
            //dev插件
            // plugins: hmrPlugin(),
            //cors: boolean | cors.Options,
            //spa: boolean;
            //writeToDisk?: boolean;
        }
})
