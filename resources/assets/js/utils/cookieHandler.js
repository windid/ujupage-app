const cookieHandler = {
  get: function(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
  },

  set: function (name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = "; expires="+date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
}

export default cookieHandler
