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
      //HEARTH
      //Note lack of meta words and some other key stuff
      var wordLibrary = this.state.wordLibrary;
      var builtWord = this.state.builtWord;
      var target = wordLibrary.targets[builtWord.targetWord.word];
      var effect1 = builtWord.effectWord1;
      var effect2 = builtWord.effectWord2;
      var effect3 = builtWord.effectWord3;
      var effectList = [effect1, effect2, effect3];

      var spellName = target.Title;
      var school = "";
      var level = target.Level;
      var castingTime = "Standard Action";
      var components = "<b>M</b>aterial/<b>V</b>erbal/<b>S</b>omatic";
      var range = target.Range;
      var targets = target.Description;
      var duration = "";
      var savingThrow = "none";
      var spellResist = "No";
      var onSaveDescriptions = [];
      var concentration = false;
      var seeText = false;
      var highestEffectLevel = -1;
      var descriptions = [target.Description + target.Boosts];

      var durationRanking = {
        "instantaneous": 0,
        "1 round": 1,
        "1d4 rounds": 2,
        "1 round/level": 3,
        "1 minute/level": 4,
        "10 minute/level": 5,
        "1 hour/level": 6,
        "1 day/level": 7
      };

      function cleanEffectDuration(rawDuration) {
        var polishedDuration = rawDuration;
        //do things with regexes to clean up rawDuration
        //remove dismissable tag
        polishedDuration = polishedDuration.replace(/\(D\)/, '');
        // if has the concentration tag set concentration to true then toss out concentration text
        if (polishedDuration.match("concentration")) {
          polishedDuration = polishedDuration.replace(/concentration/, '');
          polishedDuration = polishedDuration.replace(/, up to/, '');
          concentration = true;
        }
        //if has the varies tag set seeText to true then toss out everything
        if (polishedDuration.match("varies")) {
          polishedDuration = "";
          seeText = true;
        }
        //strip trailing white text
        return polishedDuration;
      }

      effectList.forEach(function (effect) {
        if (effect.active) {
          effect = wordLibrary.effects[effect.word];
          spellName += " " + effect.Title;
          //
          school += effect.School;
          //
          highestEffectLevel = highestEffectLevel < parseInt(effect.Levels.match(/\d/)) ? parseInt(effect.Levels.match(/\d/)) : highestEffectLevel;
          //
          var cleanDuration = cleanEffectDuration(effect.Durations);
          console.log(cleanDuration);
          if (!duration) {
            duration = cleanDuration;
          } else {
            if (durationRanking[cleanDuration].length) {
              duration = durationRanking[duration] < durationRanking[cleanDuration] ? duration : cleanDuration;
            }
          }
          //
          if (highestEffectLevel < effect.Levels.match(/\d/) || savingThrow == "none") {
            if (!effect.SavingThrow.match(/none/)) {
              savingThrow = effect.savingThrow.match(/Will\s|Reflex\s|Fortitude\s/);
            }
          } else if (highestEffectLevel == effect.Levels.match(/\d/)) {
            if (!effect.SavingThrow.match(/none/)) {
              savingThrow += "OR " + effect.savingThrow.match(/Will\s|Reflex\s|Fortitude\s/) + " (Caster's Choice)";
            }
          }
          //
          if (effect.SpellResist.match(/yes/)) {
            spellResist = "Yes";
          }
          //
          descriptions.push(effect.Description + effect.Boosts == "null" ? "" : effect.Boosts);
        }
      });

      //School : A combination of all schools found in effect words
      //Level: The heighest level among EITHER the target word or the COMBINATION of Effect words (see table)// OR the highest level meta word (note that some meta words ALSO increase the level of what they alter)
      //Casting Time: Always seems to be a standard action?
      //Components: Material||Divine Focus/Verbal/Somatic/
      //Range: Determined by target word
      //Targets:  Determined by target word
      //Duration: determined by effect word, in a combination takes the shortest
      // Saving Throw: Save type determined by highest level effect word that allows a save.  Different effect words have different consequences if the victim passes their save.
      //Save DC: Based on level of wordspell
      //Spell Resistance:  All or nothing, if ANY effect word allows SR the entire spell allows SR
      //Description: A cobble of all the effect descriptions OR a cobble of all the on-save effect descriptions.  Just put both side by side.
      //Damage: Is it a combo word?  If so damage is limited by dice equal to caster level.

      function forgeDescription() {
        var finalDescript = "";
        descriptions.forEach(function (description) {
          finalDescript += description;
        });
        return finalDescript;
      }
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "wordSpellName" },
          spellName
        ),
        React.createElement("hr", null),
        React.createElement(
          "div",
          { className: "school" },
          school
        ),
        React.createElement(
          "div",
          { className: "level" },
          level
        ),
        React.createElement(
          "div",
          { className: "castingTime" },
          castingTime
        ),
        React.createElement(
          "div",
          { className: "components" },
          components
        ),
        React.createElement("hr", null),
        React.createElement(
          "div",
          { className: "range" },
          range
        ),
        React.createElement(
          "div",
          { className: "targets" },
          targets
        ),
        React.createElement(
          "div",
          { className: "duration" },
          duration
        ),
        React.createElement(
          "div",
          { className: "savingThrow" },
          savingThrow
        ),
        " //saveDC added here",
        React.createElement(
          "div",
          { className: "spellResist" },
          spellResist
        ),
        React.createElement(
          "div",
          { className: "description" },
          forgeDescription()
        ),
        "// Damage noted here?"
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