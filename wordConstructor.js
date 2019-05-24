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

function Button(props) {

  return React.createElement("button", { className: props.buttonClasses, onClick: props.onClick });
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
    targetOptions.push(React.createElement(
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
      null,
      targetOptions
    ),
    React.createElement("br", null),
    React.createElement(
      "select",
      null,
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
    targetOptions.push(React.createElement(
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
      null,
      effectOptions
    ),
    React.createElement("br", null),
    React.createElement(
      "select",
      null,
      metaOptions
    ),
    React.createElement("br", null)
  );
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
        targetWord: {},
        effectWord1: {},
        effectWord2: {},
        effectWord3: {}
      }
    };
    return _this;
  }

  _createClass(WordConstructor, [{
    key: "renderTargetWord",
    value: function renderTargetWord() {
      return React.createElement(TargetWord, { targetWords: this.state.wordLibrary.targets, metaWords: this.state.wordLibrary.metas });
    }
  }, {
    key: "renderEffectWord",
    value: function renderEffectWord(i) {
      return React.createElement(EffectWord, { effectWords: this.state.wordLibrary.effects, metaWords: this.state.wordLibrary.metas });
    }
  }, {
    key: "render",
    value: function render() {
      var panelClasses = "panel " + (this.state.raisedPanel ? "" : "reducedPanel");
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "row h-75" },
          React.createElement(
            "div",
            { className: "col", style: "border: 2px solid black; background-color:grey;" },
            this.renderContent()
          )
        ),
        React.createElement(
          "div",
          { "class": "row h-25", style: "overflow:auto;" },
          React.createElement(
            "div",
            { id: "reactWordPanel", className: "col-12 wordContainer", style: "border: 2px solid black;" },
            this.renderTargetWord(),
            this.renderEffectWord(0),
            this.renderEffectWord(1),
            this.renderEffectWord(2)
          )
        )
      );
    }
  }]);

  return WordConstructor;
}(React.Component);