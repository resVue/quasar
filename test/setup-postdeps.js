'use strict';

(function() {

  var
    server,
    appManifest,
    callback
    ;

  if ($('.quasar-layout').length === 0) {
    $('<div id="quasar-app">').appendTo($('body'));
  }

  window.testing.isAllVisible = function($this) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $this.offset().top;
    var elemBottom = elemTop + $this.height();

    return $this.is(':visible') && elemBottom <= docViewBottom && elemTop >= docViewTop;
  };

  window.testing.isPartVisible = function($this) {
    var docViewTop = $(window).scrollTop();

    var elemTop = $this.offset().top;
    var elemBottom = elemTop + $this.height();

    return $this.is(':visible') && elemTop < docViewTop && elemBottom > docViewTop;
  };

  window.testing.line = function(strip, fn) {
    if (_.isFunction(strip)) {
      fn = strip;
      strip = false;
    }
    else if (!_.isFunction(fn)) {
      throw new TypeError('line() expects a function');
    }
    else if (!_.isBoolean(strip)) {
      throw new TypeError('line() expects a boolean');
    }

    var match = /\/\*[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//.exec(fn.toString());

    if (!match) {
      throw new TypeError('line() expects a function with comment; check syntax');
    }

    return strip ? _.trim(match[1].replace(/(\s)*\n(\s)*/g, '')) : match[1];
  };

  window.testing.app = {
    reset: function() {
      if (quasar.layout.vm && quasar.layout.vm.$destroy) {
        quasar.layout.vm.$destroy();
      }
      if (quasar.page.vm && quasar.page.vm.$destroy) {
        quasar.page.vm.$destroy();
      }
      $('#quasar-app').html('');
      quasar.stop.router();
      window.location.hash = '';
      if (server) {
        server.restore();
      }
      quasar.clear.requests.cache();
      quasar.clear.require.cache();
      quasar.clear.css();
      quasar.global.manifest = {pages: {}};
      appManifest = {pages: {}};
      quasar.layout = {};
      quasar.page = {};
      testing.app.var = {};
    },
    prepare: function() {
      callback = null;
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    },
    start: function() {
      this.registerFile('app.json', JSON.stringify(appManifest));
      quasar.start.app();
    },

    addIndex: function(js, files, manifest) {
      this.addPage('index', [
        {
          url: 'script.index.js',
          content: js
        }
      ].concat(files || []), manifest);
    },
    addPage: function(name, files, manifest) {
      appManifest.pages[name] = manifest || {};

      _.forEach(files, function(file) {
        if (_.isFunction(file.content)) {
          file.content = '(' + file.content.toString() + '());';
        }
        this.registerFile('/pages/' + name + '/' + file.url, file.content, file.code);
      }.bind(this));
    },

    addLayout: function(name, content, code) {
      if (_.isFunction(content)) {
        content = '(' + content.toString() + '());';
      }
      this.registerFile('/layouts/' + name + '/layout.' + name + '.js', content, code);
    },

    registerFile: function(url, content, code) {
      server.respondWith('GET', url, [code || 200, {'Content-Type': 'application/json'}, content]);
    },

    tag: function(template, fn) {
      testing.app.addIndex(
        '(function() {module.exports = { template: \'' + template + '\',' +
        'ready: function() { _html = $(\'#quasar-app\').html();(' + fn.toString() + '());}};}());'
      );
      testing.app.start();
    }
  };

  window.testing.done = function() {
    if (callback) {
      callback();
    }
  };
  window.testing.done.set = function(done) {
    callback = done;
  };

  window.testing.assert = {
    pageCSS: function(href) {
      var cssNode = $(quasar.page.vm.$el).find('.__quasar_page_css');

      expect(cssNode).to.have.length(1);
      expect(cssNode.children()).to.have.length(1);
      var css = cssNode.html();

      expect(css).to.contain('<link');
      expect(css).to.contain('type="text/css"');
      expect(css).to.contain('href="' + href + '"');
      expect(css).to.contain('rel="stylesheet"');
    }
  };

}());