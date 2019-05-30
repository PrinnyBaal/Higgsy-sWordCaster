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
  // effectValues.forEach((value)=>
  //   {
  //     effectOptions.push(<option disabled={testEffectValidity(value) ? false:true} value={value.Title}>{value.Title}</option>)
  //   }
  // );
  //
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
        forgeEffectOptgroups(effectValues, "level")
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

  function testEffectValidity(testedEffect) {
    //should test for both level validity and group validity, currrently only doing the former
    var level = parseInt(testedEffect.Levels.match(/\d/));
    var activeEffects = [props.builtWord.effectWord1, props.builtWord.effectWord2, props.builtWord.effectWord3];
    var invalidName = false;
    var invalidGroup = false;
    activeEffects = activeEffects.filter(function (word) {
      if (word.active && word.word) {
        if (props.effectStats.effectStats && word.word == props.effectStats.effectStats.Title) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
    var wordSize = activeEffects.length;

    activeEffects.forEach(function (effect) {
      if (effect.word == testedEffect.Title) {
        invalidName = true;
      }
      if (effect.effectStats.WordGroup == "Detection") {
        if (testedEffect.WordGroup != "Detection") {
          invalidGroup = true;
        }
      } else if (effect.effectStats.WordGroup == testedEffect.WordGroup || testedEffect.WordGroup == "Detection") {
        invalidGroup = true;
      }
    });
    //test for restriction validity
    if (testedEffect.TargetRestrictions && testedEffect.TargetRestrictions.toUpperCase().includes(props.builtWord.targetWord.word.toUpperCase())) {
      return false;
    }
    //test for name validity
    if (invalidName) {
      return false;
    }
    //test for group validity
    if (invalidGroup) {
      return false;
    }
    //test for level validity
    switch (wordSize) {
      case 1:
        return twoEffectTable[parseInt(activeEffects[0].effectStats.Levels.match(/\d/))][level] === undefined ? false : true;
        break;
      case 2:
        return threeEffectTable[parseInt(activeEffects[0].effectStats.Levels.match(/\d/))][parseInt(activeEffects[1].effectStats.Levels.match(/\d/))][level] === undefined ? false : true;
        break;
      default:
        return true;
        break;
    }
  }

  function getEffectWordLevel(effectWord) {
    var presetLevel = false;
    var activeEffects = [props.builtWord.effectWord1, props.builtWord.effectWord2, props.builtWord.effectWord3];
    activeEffects.forEach(function (builtEffect) {
      if (builtEffect.word == effectWord.Title && builtEffect.effectiveLvl) {
        presetLevel = builtEffect.effectiveLvl;
      }
    });
    if (presetLevel) {
      return presetLevel;
    } else {
      presetLevel = effectWord.Levels.match(/\d/);
      props.setLevel(presetLevel);
      return presetLevel;
    }
  }

  function forgeEffectOptgroups(values, optgroupType) {
    var effectOptgroups = [];
    var finalArray = [];
    switch (optgroupType) {
      case "level":
        effectOptgroups = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        effectOptgroups.forEach(function (optgroupLvl) {
          var optgroupEffects = [];
          values.forEach(function (effect) {
            var effectLvl = effect.Levels.match(/\d/);
            if (effectLvl == optgroupLvl) {
              optgroupEffects.push(React.createElement(
                "option",
                { disabled: testEffectValidity(effect) ? false : true, value: effect.Title },
                effect.Title
              ));
            }
          });
          finalArray.push(React.createElement(
            "optgroup",
            { label: "Level: " + optgroupLvl },
            optgroupEffects
          ));
        });
        return finalArray;
        break;
      default:
        console.log("Illegal optgroup type?");
        return "";
        break;
    }
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
        targetWord: { active: true, word: "Personal", meta: null, restrictions: [] },
        effectWord1: { active: false, word: null, meta: null, restrictions: [], effectStats: null },
        effectWord2: { active: false, word: null, meta: null, restrictions: [], effectStats: null },
        effectWord3: { active: false, word: null, meta: null, restrictions: [], effectStats: null }
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
      var newEffect = event.target.value;
      var builtWord = JSON.parse(JSON.stringify(this.state.builtWord));
      var targetEffect = builtWord["effectWord" + i];
      targetEffect.word = newEffect;
      targetEffect.effectStats = JSON.parse(JSON.stringify(this.state.wordLibrary.effects[newEffect]));
      targetEffect.effectiveLevel = null;
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
      target.effectiveLevel = null;
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
      target.effectiveLevel = null;
      //figure out and set new restrictions???
      this.setState({ builtWord: builtWord });
    }
  }, {
    key: "setLevel",
    value: function setLevel(newLvl, i) {
      var builtWord = JSON.parse(JSON.stringify(this.state.builtWord));
      var target = i ? builtWord["effectWord" + i] : builtWord.targetWord;
      target.effectiveLevel = newLvl;
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

      var spellName = "[" + target.Title + "]";
      var school = "";
      var level = target.Level;
      var castingTime = "Standard Action";
      var components = "Material/Verbal/Somatic";
      var range = target.Range;
      var targets = target.Description + (target.Boosts == "null" ? "" : target.Boosts);
      var duration = "";
      var savingThrow = "none";
      var spellResist = "No";
      var onSaveDescriptions = [];
      var concentration = false;
      var seeText = false;
      var highestEffectLevel = -1;
      var descriptions = [];
      var activeEffectLevels = [];

      var durationRanking = {
        "instantaneous": 0,
        "1 round": 1,
        "1d4 rounds": 2,
        "1 round/level": 3,
        "1 minute/level": 4,
        "10 minutes/level": 5,
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

      function getCombinedEffectLevel() {
        //two and threeset tables loaded in at Sheetstats.js
        var effectiveLevel = 0;
        switch (activeEffectLevels.length) {
          case 0:
            break;
          case 1:
            effectiveLevel = activeEffectLevels[0];
            break;
          case 2:
            effectiveLevel = twoEffectTable[activeEffectLevels[0]][activeEffectLevels[1]];
            break;
          case 3:
            effectiveLevel = twoEffectTable[activeEffectLevels[0]][activeEffectLevels[1]][activeEffectLevels[2]];
            break;
          default:
            console.log("Wait whaat?  You're supposed to have 1-3 effect words not " + activeEffectLevels.length);
            break;
        }
        console.log(effectiveLevel);
        return effectiveLevel;
      }

      effectList.forEach(function (effect) {
        if (effect.active && effect.word) {

          console.log(wordLibrary.effects);
          console.log(effect.word);
          builtEffect = JSON.parse(JSON.stringify(effect));
          effect = wordLibrary.effects[effect.word];
          console.log(effect);
          spellName += "--[" + effect.Title + "]--";
          //
          school += effect.School;
          //
          // activeEffectLevels.push(parseInt(effect.Levels.match(/\d/)));
          activeEffectLevels.push(builtEffect.effectiveLevel);
          highestEffectLevel = highestEffectLevel < builtEffect.effectiveLevel ? builtEffect.effectiveLevel : highestEffectLevel;
          // highestEffectLevel= highestEffectLevel<parseInt(effect.Levels.match(/\d/)) ? parseInt(effect.Levels.match(/\d/)):highestEffectLevel;
          //
          var cleanDuration = cleanEffectDuration(effect.Durations);
          console.log(cleanDuration);
          if (!duration) {
            duration = cleanDuration;
          } else {
            if (durationRanking[cleanDuration] !== undefined) {
              duration = durationRanking[duration] < durationRanking[cleanDuration] ? duration : cleanDuration;
            }
          }
          //
          if (highestEffectLevel < builtEffect.effectiveLevel || savingThrow == "none") {
            if (!effect.SavingThrow.match(/none/)) {
              savingThrow = effect.SavingThrow.match(/Will\s|Reflex\s|Fortitude\s/)[0];
            }
          } else if (highestEffectLevel == builtEffect.effectiveLevel) {
            if (!effect.SavingThrow.match(/none/) && !savingThrow.includes(effect.SavingThrow.match(/Will\s|Reflex\s|Fortitude\s/))) {
              savingThrow += "OR " + effect.SavingThrow.match(/Will\s|Reflex\s|Fortitude\s/);
            }
          }
          //
          if (effect.SpellResist.match(/yes/)) {
            spellResist = "Yes";
          }
          //
          descriptions.push(effect.Description + (effect.Boosts == "null" ? "" : effect.Boosts));
        }
      });
      if (savingThrow.match(/OR/)) {
        savingThrow += " (Caster's Choice)";
      }
      level = level < getCombinedEffectLevel() ? getCombinedEffectLevel() : level;

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
        var finalDescript = [];
        descriptions.forEach(function (description) {
          finalDescript.push(React.createElement(
            "div",
            null,
            description,
            React.createElement("br", null),
            React.createElement("br", null)
          ));
        });
        return finalDescript;
      }
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "spellName" },
          React.createElement(
            "b",
            null,
            "Spell Name: "
          ),
          spellName
        ),
        React.createElement(
          "div",
          { className: "basicSpellInfo" },
          React.createElement(
            "span",
            { className: "school" },
            React.createElement(
              "b",
              null,
              "School: "
            ),
            school
          ),
          React.createElement(
            "span",
            { className: "level" },
            React.createElement(
              "b",
              null,
              "Level: "
            ),
            level
          )
        ),
        React.createElement("hr", null),
        "CASTING",
        React.createElement("hr", null),
        React.createElement(
          "div",
          { className: "castingTime" },
          React.createElement(
            "b",
            null,
            "Casting Time: "
          ),
          castingTime
        ),
        React.createElement(
          "div",
          { className: "components" },
          React.createElement(
            "b",
            null,
            "Components: "
          ),
          components
        ),
        React.createElement("hr", null),
        "EFFECT",
        React.createElement("hr", null),
        React.createElement(
          "div",
          { className: "range" },
          React.createElement(
            "b",
            null,
            "Range: "
          ),
          range
        ),
        React.createElement(
          "div",
          { className: "targets" },
          React.createElement(
            "b",
            null,
            "Targets: "
          ),
          targets
        ),
        React.createElement(
          "div",
          { className: "duration" },
          React.createElement(
            "b",
            null,
            "Duration: "
          ),
          duration
        ),
        React.createElement(
          "div",
          { className: "defense" },
          React.createElement(
            "span",
            { className: "savingThrow" },
            React.createElement(
              "b",
              null,
              "Saving Throw: "
            ),
            savingThrow
          ),
          React.createElement(
            "span",
            { className: "spellResist" },
            " ",
            React.createElement(
              "b",
              null,
              "Spell Resist: "
            ),
            spellResist
          )
        ),
        React.createElement("hr", null),
        "DESCRIPTION",
        React.createElement("hr", null),
        React.createElement(
          "div",
          { className: "description" },
          React.createElement(
            "b",
            null,
            "Description: "
          ),
          forgeDescription()
        )
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

      return React.createElement(EffectWord, { builtWord: this.state.builtWord, effectStats: this.state.builtWord["effectWord" + i], onClick: function onClick() {
          return _this3.toggleEffectStatus(i);
        }, setLevel: function setLevel(newLvl) {
          return _this3.setLevel(newLvl, i);
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