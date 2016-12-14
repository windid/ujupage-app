<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
</head>
  <style>
    .main {
      background-color: #eee; padding: 20px;
    }
    .email-container {
      background-color: #fff;
      margin: 10px auto;
      min-width: 360px;
      width: 540px;
      border-radius: 4px;
    }
    .email-header {
      padding: 20px;
      border-bottom: 1px solid #ddd;
    }
    .email-content {
      padding: 20px;
    }
  </style>
<body>

<div class="main">
  <div class="email-container">
    <div class="email-header">
      <a href="http://www.ujupage.com">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAeCAYAAAC7Q5mxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExQjU2MEMzREMyMjA4NUM2MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1REVBOTNFNUI0NzMxMUU2QkI2REY2Njg3MzY0OEFDRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1REVBOTNFNEI0NzMxMUU2QkI2REY2Njg3MzY0OEFDRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzODAxMTc0MDcyMDY4MTFCNTYwQzNEQzIyMDg1QzYxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTFCNTYwQzNEQzIyMDg1QzYxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+aOHnegAAAvRJREFUeNrsWr1u2zAQlou8gDx2VJCt6KL0BQoF6AsoQIHM8htUGjp2sPoG0VyggPUCBWz0BRouQbeiGrvyEVyyOLYfLpRE/SS2ah1wVkQxpPjxuzve2Yv9fu/N0l/O9MfzV68Ho/jr29fFyQKo5eLFy96D/Ph+f7IMfDYb4UgMHMomdAOnZM5ntsbs3U3vAdcfP80mPMtABg5lk6s5q35/pnEcdqfUb3hewt/+CNhI9e7DANTy5fP73m/w5u2Hti56oanjcEkLMJnSXGmsdDMGgEqXgwF8ZDEvuVUaEgiSgabbr+k+JSYK6JNSHwOuaGGrbg+UVmwuLtVgE35CEP96jZa+IQBt2BYyE9YLv2oYY0sAFjTG4/nAA0gdAw1AGYG8pvaInuWMlUZiS1vU8ly4su8YAWxjYE6Lu4XFG2C5pC3jrYf4vmMFsGS7H5O5oQnHzL9F1C4svs6MySN0YpnLp43xSeVUAPQt9yE4e4+uG2CdZD5Q+7UVAwqDQWkJOlouLQBOygdGtHibTxIElGFMQPeGOSFE5ISAKXts2KSDiIBIKAkYc7yQ4OsqBiay69xytHGde/IASoisMfN1dZFTgJaWLMSVgfJ/ALAuyxBwDQjAgh1ztgT6Vce5wjEBPJZiwpJ0BYu7pHsBbRICQWRhqgt44Zj+8JiqMRLy4raDbNwl3WIR2Myl3cbPDrl4M4C6kHrg0nwKx5akYWGYnYQdAEgB+BzyZQ3kHfOz3XwglpzG+IKphyAQO1rM2mJiAWQQ2M+z5LUZpGV4hjR5tDlHmrRwA1mNnJIJYwawo6CQMV9nZEP9BPUrIC1LGdApsfWOgJIAHmY+5wBaTP3TTgx8kCQ+bVneZAYVlK1yy8E6IBUQeVdg1hH9Hz+cS9qYrMFn5rQZt8BKz6Va8wDAA5hzAVfJFoUFUgEAo6wsZie9f3XBwtEkJY2fkE4mF65qqiloZsuWBeGzXZdqSs2GFq6dF00/7Zh/sTAQwFmmdZCepPwWYAB2oubApckhGAAAAABJRU5ErkJggg==" alt="聚页">
      </a>
    </div>
    <div class="email-content">
      @yield('content')
    </div>
  </div>
</div>

</body>
</html>