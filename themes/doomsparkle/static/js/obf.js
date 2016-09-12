(function () {
  function decodeEmail () {
    /* encode / decode strings to / from base36

         based on: http://snipplr.com/view/12653/
         */

    var encode = function (str) {
          return Array.prototype.map.call(str, function (c) {
            return c.charCodeAt(0).toString(36);
          }).
          join("");
        };

    var base36 = function (str) {
          //assumes one character base36 strings have been zero padded by encodeAscii
          var chunked = [];
          for (var i = 0; i < str.length; i = i + 2) {
            chunked[ i ] = String.fromCharCode(parseInt(str[ i ] + str[ i + 1 ], 36));
          }
          return chunked.join("");
        };

    var element = document.getElementById('fourtyeight-id');
    if (element) {
          var realValue = base36(element.innerHTML);
          // console.log(encode(element.innerHTML));
          element.href = "mailto:" + realValue;
          element.innerText = realValue;
      }
  }

  function countdownTimer() {

    var element = document.getElementById('countdown');
    if (!element) { return; }

    var targetDate = element.dataset.date.split('-');
    var targetTime = element.dataset.time.split(':');

    var destination = new Date(targetDate[0], targetDate[1]-1 /* Javascript Months start at 0 */,
      targetDate[2], targetTime[0], targetTime[1]);

    if (destination - Date.now() < 0) {
      element.parentNode.removeChild(element);
      return;
    }

    window.setInterval(function() {
      var returnValue = [];
      var timeUntil = destination - Date.now();
      var days = Math.floor(timeUntil / 86400000);
      if (days > 0) {
        returnValue.push('' + days + ' days');
      }

      timeUntil = timeUntil % 86400000;
      var hours = Math.floor(timeUntil / 3600000);
      if (hours > 0) {
        returnValue.push('' + hours + ' hours');
      }

      timeUntil = timeUntil % 3600000;
      var minutes = Math.floor(timeUntil / 60000);
      if (minutes > 0) {
        returnValue.push('' + minutes + ' minutes');
      }

      timeUntil = timeUntil % 60000;
      var seconds = Math.floor(timeUntil / 1000);
      if (seconds > 0) {
        returnValue.push('' + seconds + ' seconds');
      }

      element.innerText = returnValue.join(", ") + " until the start.";

    }, 1000);
  }

  decodeEmail();
  countdownTimer();
})();
