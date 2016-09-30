<!DOCTYPE html>
<head>
<meta charset="utf-8">
<title>表单</title>
<style>
    *{margin: 0;padding: 0;}
    body {
        padding: 40px 100px;
    }
    .demo {
    width: 600px;
    margin: 40px auto;
    font-family: 'trebuchet MS', 'Lucida sans', Arial;
    font-size: 14px;
    color: #444;
    }
    
    table {
        *border-collapse: collapse; /* IE7 and lower */
        border-spacing: 0;
        width: 100%;
    }
    /*========bordered table========*/
    .bordered {
        border: solid #ccc 1px;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        -webkit-box-shadow: 0 1px 1px #ccc;
        -moz-box-shadow: 0 1px 1px #ccc;
        box-shadow: 0 1px 1px #ccc;
    }
    
    .bordered tr {
        -o-transition: all 0.1s ease-in-out;
        -webkit-transition: all 0.1s ease-in-out;
        -moz-transition: all 0.1s ease-in-out;
        -ms-transition: all 0.1s ease-in-out;
        transition: all 0.1s ease-in-out;        
    }
    .bordered .highlight,
    .bordered tr:hover {
        background: #fbf8e9;        
    }
    .bordered td, 
    .bordered th {
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        padding: 10px;
        text-align: left;
    }
    .bordered th {
        background-color: #dce9f9;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#ebf3fc), to(#dce9f9));
        background-image: -webkit-linear-gradient(top, #ebf3fc, #dce9f9);
        background-image: -moz-linear-gradient(top, #ebf3fc, #dce9f9);
        background-image: -ms-linear-gradient(top, #ebf3fc, #dce9f9);
        background-image: -o-linear-gradient(top, #ebf3fc, #dce9f9);
        background-image: linear-gradient(top, #ebf3fc, #dce9f9);
        filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#ebf3fc, endColorstr=#dce9f9);
        -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#ebf3fc, endColorstr=#dce9f9)";
        -webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;
        -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;
        box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;
        border-top: none;
        text-shadow: 0 1px 0 rgba(255,255,255,.5);
    }
    .bordered td:first-child, 
    .bordered th:first-child {
        border-left: none;
    }
    .bordered th:first-child {
        -moz-border-radius: 6px 0 0 0;
        -webkit-border-radius: 6px 0 0 0;
        border-radius: 6px 0 0 0;
    }
    .bordered th:last-child {
        -moz-border-radius: 0 6px 0 0;
        -webkit-border-radius: 0 6px 0 0;
        border-radius: 0 6px 0 0;
    }
    .bordered tr:last-child td:first-child {
        -moz-border-radius: 0 0 0 6px;
        -webkit-border-radius: 0 0 0 6px;
        border-radius: 0 0 0 6px;
    }
    .bordered tr:last-child td:last-child {
        -moz-border-radius: 0 0 6px 0;
        -webkit-border-radius: 0 0 6px 0;
        border-radius: 0 0 6px 0;
    }
    /*----------------------*/
    .zebra td, 
    .zebra th {
        padding: 10px;
        border-bottom: 1px solid #f2f2f2;
    }
    .zebra .alternate,
    .zebra tbody tr:nth-child(even) {
        background: #f5f5f5;
        -webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;
        -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;
        box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;
    }
    .zebra th {
        text-align: left;
        text-shadow: 0 1px 0 rgba(255,255,255,.5);
        border-bottom: 1px solid #ccc;
        background-color: #eee;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#eee));
        background-image: -webkit-linear-gradient(top, #f5f5f5, #eee);
        background-image: -moz-linear-gradient(top, #f5f5f5, #eee);
        background-image: -ms-linear-gradient(top, #f5f5f5, #eee);
        background-image: -o-linear-gradient(top, #f5f5f5, #eee);
        background-image: linear-gradient(top, #f5f5f5, #eee);
        filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#f5f5f5, endColorstr=#eeeeee);
        -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#f5f5f5, endColorstr=#eeeeee)";
    }
    .zebra th:first-child {
        -moz-border-radius: 6px 0 0 0;
        -webkit-border-radius: 6px 0 0 0;
        border-radius: 6px 0 0 0;
    }
    .zebra th:last-child {
        -moz-border-radius: 0 6px 0 0;
        -webkit-border-radius: 0 6px 0 0;
        border-radius: 0 6px 0 0;
    }
    .zebra tfoot td {
        border-bottom: 0;
        border-top: 1px solid #fff;
        background-color: #f1f1f1;
    }
    .zebra tfoot td:first-child {
        -moz-border-radius: 0 0 0 6px;
        -webkit-border-radius: 0 0 0 6px;
        border-radius: 0 0 0 6px;
    }
    .zebra tfoot td:last-child {
        -moz-border-radius: 0 0 6px 0;
        -webkit-border-radius: 0 0 6px 0;
        border-radius: 0 0 6px 0;
    }
</style>
</head>
<body>
    <div class="demo">
        <table class="bordered">
          <thead>
            <tr>
                <th>#</th>        
                <th>表单信息</th>
                <th>提交日期</th>
            </tr>
          </thead>
          <tbody>
            @if ($forms)
                <?php $last_id = count($forms);?>
                @foreach ($forms as $k => $v)
                <?php $field = json_decode($v->fields);?>
                <tr>
                  <td>{{$last_id - $k}}</td>        
                  <td>
                      @foreach ($field as $kf => $f)
                      <p><b>{{$kf}}</b>：{{$f}}</p>
                      @endforeach
                  </td>
                  <td>{{date('Y-m-d H:i', $v->created_at)}}</td>
                </tr>       
                @endforeach
            @endif        
            </tbody>
        </table>
    </div>
</body>
</html>