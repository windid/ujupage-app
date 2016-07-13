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
                {test: /\.html$/, loader: 'text-loader'}
            ],
            //preLoaders: [
            //    {test: /\.js$/, loader: "amdcss-loader"}
            //]
        },

        resolve: {
            extensions: ['', '.js', '.css'],
            //alias: {
            //    "../avalon": "avalon"
            //}
        },

        externals: {
            "avalon" : true,
            "jquery" : "jQuery"
        },
    },'./public/js/editor.js');

});
