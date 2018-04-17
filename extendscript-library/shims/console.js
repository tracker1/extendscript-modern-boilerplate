var console = (function(){
    /*
     * Clear console when running via Extendscript Toolkit
     */
    function clearConsole() {
      var bt = new BridgeTalk();
      bt.target = 'estoolkit-4.0';
      bt.body = 'app.clc();';
      bt.send(5);  
    }
  
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
      clear: clearConsole,
      log: log,
      warn: log,
      error: log,
      info: log,
      dir: log,
    }
  }());