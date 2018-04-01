  var count, counting = 0;
  var interval, timeout;
  var s_up, s_down, s_display;
  var audio_file = 'beep.mp3';
  var max = 300;

  window.onload = function() {
    s_up = document.getElementById('s_up');
    s_down = document.getElementById('s_down');
    s_display = document.getElementById('s_display');

    s_down.onmousedown = function() {
      timeout = setInterval(function() {
        handle_down(s_display)
      }, 100)
    };
    s_down.onmouseup = function() {
      clearInterval(timeout);
    };
    s_up.onmousedown = function() {
      timeout = setInterval(function() {
        handle_up(s_display, 300)
      }, 100)
    };
    s_up.onmouseup = function() {
      clearInterval(timeout);
    };

    s_display.onclick = function() {
      handle_display_press(s_display)
    };
    s_up.onclick = function() {
      handle_up(s_display, 300)
    };
    s_down.onclick = function() {
      handle_down(s_display)
    };
  }

  function handle_display_press(display) {
    count = display.innerText;
    if (count == 0)
      return;

    if (counting) {
      counting = 0;
      clearInterval(interval);
    } else {
      counting = 1;
      interval = setInterval(function() {
        decrement(display)
      }, 1000);
    }
  }

  function decrement(display) {
    count = count - 1 > 0 ? count - 1 : 0;
    if (count == 0) {
      counting = 0;
      clearInterval(interval);
      play_sound();
    }
    display.innerText = count < 10 ? '0' + count : count;;
  }

  function play_sound() {
    var audio = new Audio(audio_file);
    audio.play();
  }

  function handle_up(display, max) {
    var new_count = Number(display.innerText) + 1;
    new_count = new_count <= max ? new_count : max;
    display.innerText = new_count < 10 ? '0' + new_count : new_count;
  }

  function handle_down(display) {
    var new_count = Number(display.innerText) - 1;
    new_count = new_count > 0 ? new_count : 0;
    display.innerText = new_count < 10 ? '0' + new_count : new_count;
  }
