var s_up, s_down, s_display;
var second_counter, minute_counter;
var counting;
var s_count, m_count;
var audio_file;

window.onload = function() {
  counting = 0;
  audio_file = "beep.mp3"

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

  s_count = Number(s_display.innerText);
  m_count = Number(m_display.innerText);

  m_display.onclick = handle_display_press;
  s_display.onclick = handle_display_press;
}

handle_display_press = function() {
  if (counting) {
    counting = 0;
    clearInterval(self.interval);
  } else {
    counting = 1;
    self.interval = setInterval(function() {
      self.decrement();
    }, 1000);
  }
};

decrement = function() {
  s_count = Number(s_display.innerText);
  s_count = s_count - 1 > 0 ? s_count - 1 : 0;
  s_display.innerText = s_count < 10 ? '0' + s_count : s_count;

  if (s_count == 0) {
    m_count = Number(m_display.innerText);
    if (m_count != 0) {
      m_count = m_count - 1;
      m_display.innerText = m_count < 10 ? '0' + m_count : m_count;
      s_display.innerText = 60;
    } else if (m_count == 0) {
      counting = 0;
      clearInterval(self.interval);
      play_sound();
    }
  }
};

play_sound = function() {
  var audio = new Audio(audio_file);
  audio.play();
};

function counter() {
  var self = this;

  this.hookup = function(display, up, down, max) {
    self.display = display;
    self.up = up;
    self.down = down;

    self.max = max;
    self.interval;
    self.timeout;

    up.onclick = self.handle_up;
    down.onclick = self.handle_down;
    up.onmouseup = self.handle_mouseup;
    down.onmouseup = self.handle_mouseup;
    up.onmousedown = self.handle_up_mousedown;
    down.onmousedown = self.handle_down_mousedown;
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
