var elixir = require('laravel-elixir');

require('laravel-elixir-webpack');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

//watch状态下页面自动刷新
require('laravel-elixir-livereload');

elixir(function(mix) {
    mix.livereload();
});

elixir(function(mix) {
    //bootstrap sass单独打包
    mix.sass('bootstrap.scss');
    //编辑器
    mix.sass('editor.scss');
});

elixir(function(mix) {
    mix.webpack('pages/editor/index.js', {
        module: {
            loaders: [
                {test: /\.css$/, loader: 'style-loader!css-loader'},
                {test: /\.html$/, loader: 'text-loader'},
                {test: /\.vue$/,loader: 'vue'},
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {presets:['es2015',"stage-0"],plugins:['transform-runtime']}}
            ]
        },

        resolve: {
            extensions: ['', '.js', '.css'],
        },

        externals: {
            "vue" : "Vue",
            "jquery" : "jQuery"
        },
    },'./public/js/editor.js');

});
