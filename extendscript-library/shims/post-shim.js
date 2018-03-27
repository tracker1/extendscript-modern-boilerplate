var console = (function(){
  function log() {
    Array.from(arguments).forEach(function(item) {
      if (typeof item === 'object') {
        switch(item) {
          case app:
          case $:
            $.write(item);
            break;
          default: 
            $.write(JSON.stringify(item, null, 4));
        }
      } else {
        $.write(item);
      }
      $.write(' ');
    })
    $.write('\n');
  }
  return {
    log: log,
    warn: log,
    error: log,
    info: log,
    dir: log,
  }
}());