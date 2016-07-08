<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Editor</title>
  <link href="css/bootstrap.css" rel="stylesheet">
  <link href="css/editor.css" rel="stylesheet">
  <style>
    .loading{
      width:128px;
      height:128px;
      text-align: center;
      position:absolute; 
      top:50%;
      left:50%;
      transform:translate(-50%,-50%); 
      background: url('./img/preloader.gif');
    }
  </style>
</head>
<body @click="bodyClick">
<editor>
  <div class="loading"></div>
</editor>
@if ( Config::get('app.debug') )
  <script type="text/javascript">
    document.write('<script src="//localhost:35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
  </script> 
  <script src="js/libs/vue.js"></script>
@else
  <script src="js/libs/vue.min.js"></script>
@endif
  <script src="js/libs/jquery-1.12.3.min.js"></script>
  <script src="js/editor.js"></script>
</body>
</html>