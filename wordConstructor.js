var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Displays and contains information of currently constructed word

function quickReact() {
  ReactDOM.render(React.createElement(WordConstructor, { ref: function ref(ourComponent) {
      window.editPanel = ourComponent;
    } }), document.getElementById('reactWordConstructor'));
}

function TargetWord(props) {
  var targetOptions = [];
  var targetValues = Object.values(props.targetWords);
  targetValues.forEach(function (value) {
    targetOptions.push(React.createElement(
      "option",
      { value: value.Title },
      value.Title
    ));
  });
  var metaOptions = [];
  var metaValues = Object.values(props.metaWords);
  metaValues.forEach(function (value) {
    metaOptions.push(React.createElement(
      "option",
      { value: value.Title },
      value.Title
    ));
  });

  return React.createElement(
    "div",
    { "class": "wordSlot" },
    React.createElement(
      "select",
      { value: props.targetStats.word, onChange: props.onTargetChange },
      targetOptions
    ),
    React.createElement("br", null),
    React.createElement(
      "select",
      { value: props.targetStats.meta, onChange: props.onMetaChange },
      metaOptions
    ),
    React.createElement("br", null)
  );
}

function EffectWord(props) {
  var effectOptions = [];
  var effectValues = Object.values(props.effectWords);
  effectValues.forEach(function (value) {
    effectOptions.push(React.createElement(
      "option",
      { value: value.Title },
      value.Title
    ));
  });
  var metaOptions = [];
  var metaValues = Object.values(props.metaWords);
  metaValues.forEach(function (value) {
    metaOptions.push(React.createElement(
      "option",
      { value: value.Title },
      value.Title
    ));
  });

  if (props.effectStats.active) {
    return React.createElement(
      "div",
      { "class": "wordSlot" },
      React.createElement(
        "select",
        { value: props.effectStats.word, onChange: props.onEffectChange },
        effectOptions
      ),
      React.createElement("br", null),
      React.createElement(
        "select",
        { value: props.effectStats.meta, onChange: props.onMetaChange },
        metaOptions
      ),
      React.createElement("br", null),
      React.createElement(
        "button",
        { onClick: props.onClick },
        "X"
      )
    );
  } else {
    return React.createElement(
      "div",
      { "class": "wordSlot" },
      React.createElement(
        "button",
        { onClick: props.onClick },
        "+"
      )
    );
  }
}

var WordConstructor = function (_React$Component) {
  _inherits(WordConstructor, _React$Component);

  function WordConstructor(props) {
    _classCallCheck(this, WordConstructor);

    var _this = _possibleConstructorReturn(this, (WordConstructor.__proto__ || Object.getPrototypeOf(WordConstructor)).call(this, props));

    _this.state = {
      wordLibrary: {
        targets: JSON.parse(localStorage.getItem("targetWords")),
        effects: JSON.parse(localStorage.getItem("effectWords")),
        metas: JSON.parse(localStorage.getItem("metaWords"))
      },
      builtWord: {
        targetWord: { active: true, word: null, meta: null, restrictions: [] },
        effectWord1: { active: true, word: null, meta: null, restrictions: [] },
        effectWord2: { active: false, word: null, meta: null, restrictions: [] },
        effectWord3: { active: false, word: null, meta: null, restrictions: [] }
      }
    };
    return _this;
  }

  _createClass(WordConstructor, [{
    key: "toggleEffectStatus",
    value: function toggleEffectStatus(i) {
      var builtWord = JSON.parse(JSON.stringify(this.state.builtWord));
      var targetEffect = builtWord["effectWord" + i];
      if (targetEffect.active) {
        targetEffect.active = false;
      } else {
        targetEffect.active = true;
        targetEffect.word = null;
        targetEffect.meta = null;
        targetEffect.restrictions = [];
      }
      this.setState({ builtWord: builtWord });
    }
  }, {
    key: "changeEffectWord",
    value: function changeEffectWord(i) {
      console.log(event);
      var newEffect = event.target.value;
      var builtWord = JSON.parse(JSON.stringify(this.state.builtWord));
      var targetEffect = builtWord["effectWord" + i];
      targetEffect.word = newEffect;

      //figure out and set new restrictions

      this.setState({ builtWord: builtWord });
    }
  }, {
    key: "changeTargetWord",
    value: function changeTargetWord() {
      console.log(event);
      var newTarget = event.target.value;
      var builtWord = JSON.parse(JSON.stringify(this.state.builtWord));
      var target = builtWord.targetWord;

      target.word = newTarget;

      //figure out and set new restrictions

      this.setState({ builtWord: builtWord });
    }
  }, {
    key: "changeMeta",
    value: function changeMeta(i) {
      console.log(event);
      var newMeta = event.target.value;
      var builtWord = JSON.parse(JSON.stringify(this.state.builtWord));
      var target = i ? builtWord["effectWord" + i] : builtWord.targetWord;
      target.meta = newMeta;
      //figure out and set new restrictions???
      this.setState({ builtWord: builtWord });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return React.createElement(
        "div",
        null,
        "Hello"
      );
    }
  }, {
    key: "renderTargetWord",
    value: function renderTargetWord() {
      var _this2 = this;

      return React.createElement(TargetWord, { targetStats: this.state.builtWord.targetWord, targetWords: this.state.wordLibrary.targets, metaWords: this.state.wordLibrary.metas, onTargetChange: function onTargetChange() {
          return _this2.changeTargetWord();
        }, onMetaChange: function onMetaChange() {
          return _this2.changeMeta();
        } });
    }
  }, {
    key: "renderEffectWord",
    value: function renderEffectWord(i) {
      var _this3 = this;

      return React.createElement(EffectWord, { effectStats: this.state.builtWord["effectWord" + i], onClick: function onClick() {
          return _this3.toggleEffectStatus(i);
        }, effectWords: this.state.wordLibrary.effects, metaWords: this.state.wordLibrary.metas, onEffectChange: function onEffectChange() {
          return _this3.changeEffectWord(i);
        }, onMetaChange: function onMetaChange() {
          return _this3.changeMeta(i);
        } });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "row h-75" },
          React.createElement(
            "div",
            { className: "col" },
            this.renderContent()
          )
        ),
        React.createElement(
          "div",
          { "class": "row h-25", style: { overflow: "auto" } },
          React.createElement(
            "div",
            { id: "reactWordPanel", className: "col-12 wordContainer" },
            this.renderTargetWord(),
            this.renderEffectWord(1),
            this.renderEffectWord(2),
            this.renderEffectWord(3)
          )
        )
      );
    }
  }]);

  return WordConstructor;
}(React.Component);