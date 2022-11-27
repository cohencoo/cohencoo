const time = {
    roundTo: function(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    },
    time: function () {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ap = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':' + minutes + ':' + seconds + ' ' + ap;
    },
    date: function () {
        var date = new Date();
        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month] + ' ' + day + ', ' + year;
    },
    day: function () {
        var date = new Date();
        var day = date.getDay();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[day];
    },
    complete: function () {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        var percentage = time.roundTo(((totalSeconds / 86400) * 100), 2) + "%"
        return percentage;
    },
    yearComplete: function () {
        var today = new Date();
        var startOfYear = new Date(today.getFullYear(), 0, 0);
        var diff = (today - startOfYear) + ((startOfYear.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        var percentage = time.roundTo((day / 365) * 100, 2) + "%"
        return percentage
    },
    countdown: function(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
      }
};