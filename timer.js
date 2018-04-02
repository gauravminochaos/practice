var s_up, s_down, s_display;
var max = 300;
var second_counter, minute_counter;

window.onload = function() {
  s_up = document.getElementById('s_up');
  s_down = document.getElementById('s_down');
  s_display = document.getElementById('s_display');
  second_counter = new counter();
  second_counter.hookup(s_display, s_up, s_down, 60);

  m_up = document.getElementById('m_up');
  m_down = document.getElementById('m_down');
  m_display = document.getElementById('m_display');
  minute_counter = new counter();
  minute_counter.hookup(m_display, m_up, m_down, 60);
}

function counter() {
  var self = this;

  this.hookup = function(display, up, down, max) {
    self.display = display;
    self.up = up;
    self.down = down;
    self.audio_file = 'beep.mp3';
    self.max = max;
    self.counting = 0;
    self.interval;
    self.timeout;

    display.onclick = self.handle_display_press;
    up.onclick = self.handle_up;
    down.onclick = self.handle_down;
    up.onmouseup = self.handle_mouseup;
    up.onmousedown = self.handle_up_mousedown;
    down.onmouseup = self.handle_mouseup;
    down.onmousedown = self.handle_down_mousedown;
  };

  this.handle_display_press = function() {
    if (self.counting) {
      self.counting = 0;
      clearInterval(self.interval);
    } else {
      self.counting = 1;
      self.interval = setInterval(function() {
        self.decrement();
      }, 1000);
    }
  };

  this.decrement = function() {
    count = Number(self.display.innerText);
    count = count - 1 > 0 ? count - 1 : 0;
    if (count == 0) {
      self.counting = 0;
      clearInterval(self.interval);
      self.play_sound();
    }
    self.display.innerText = count < 10 ? '0' + count : count;;
  };

  this.play_sound = function() {
    var audio = new Audio(self.audio_file);
    audio.play();
  };

  this.handle_up = function() {
    var new_count = Number(self.display.innerText) + 1;
    new_count = new_count <= self.max ? new_count : self.max;
    self.display.innerText = new_count < 10 ? '0' + new_count : new_count;
  };

  this.handle_down = function() {
    var new_count = Number(self.display.innerText) - 1;
    new_count = new_count > 0 ? new_count : 0;
    self.display.innerText = new_count < 10 ? '0' + new_count : new_count;
  };

  this.handle_up_mousedown = function() {
    self.timeout = setInterval(function() {
      self.handle_up();
    }, 100)
  };

  this.handle_down_mousedown = function() {
    self.timeout = setInterval(self.handle_down(), 100)
  };

  this.handle_mouseup = function() {
    clearInterval(self.timeout);
  };
}
