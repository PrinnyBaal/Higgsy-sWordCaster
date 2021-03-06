//Displays and contains information of currently constructed word

function quickReact(){
    ReactDOM.render(
      <WordConstructor ref={(ourComponent) => {window.editPanel = ourComponent}} />,
      document.getElementById('reactWordConstructor')
    );
}



function TargetWord(props){
    let targetOptions=[];
    let targetValues=Object.values(props.targetWords);
    targetValues.forEach((value)=>{targetOptions.push(<option value={value.Title}>{value.Title}</option>)});
    let metaOptions=[];
    let metaValues=Object.values(props.metaWords);
    metaValues.forEach((value)=>{metaOptions.push(<option value={value.Title}>{value.Title}</option>)});

    return(<div class="wordSlot">
          <select value={props.targetStats.word} onChange={props.onTargetChange}>
          {targetOptions}
          </select><br/>
          <select value={props.targetStats.meta} onChange={props.onMetaChange}>
            {metaOptions}
          </select><br/>
    </div>);
}


function EffectWord(props){
  let effectOptions=[];
  let effectValues=Object.values(props.effectWords);
  // effectValues.forEach((value)=>
  //   {
  //     effectOptions.push(<option disabled={testEffectValidity(value) ? false:true} value={value.Title}>{value.Title}</option>)
  //   }
  // );
  //
  let metaOptions=[];
  let metaValues=Object.values(props.metaWords);
  metaValues.forEach((value)=>{metaOptions.push(<option value={value.Title}>{value.Title}</option>)});


  if (props.effectStats.active){
    return(<div class="wordSlot">
            <select value={props.effectStats.word} onChange={props.onEffectChange}>
              {forgeEffectOptgroups(effectValues, "level")}
            </select><br/>
            <select value={props.effectStats.meta} onChange={props.onMetaChange}>

              {metaOptions}

            </select><br/>
            <button onClick={props.onClick}>X</button>
        </div>);
  }
  else{
    return(<div class="wordSlot">
            <button onClick={props.onClick}>+</button>
        </div>);
  }

  function testEffectValidity(testedEffect){
    //should test for both level validity and group validity, currrently only doing the former
    // let level=parseInt(testedEffect.Levels.match(/\d/));
    let level=getEffectWordLevel(testedEffect);
    let activeEffects=[props.builtWord.effectWord1, props.builtWord.effectWord2, props.builtWord.effectWord3];
    let invalidName=false;
    let invalidGroup=false;
    activeEffects=activeEffects.filter((word)=>{
      if(word.active && word.word){
        if (props.effectStats.effectStats && word.word==props.effectStats.effectStats.Title){
          return false;
        }else{
          return true;
        }
      }else{
        return false
      }
    });
    let wordSize=activeEffects.length;

    activeEffects.forEach((effect)=>{
      if (effect.word==testedEffect.Title){
        invalidName=true;
      }
      // if (effect.effectStats.WordGroup=="Detection"){
      //   if(testedEffect.WordGroup!="Detection"){
      //     invalidGroup=true;
      //   }
      // }else if(effect.effectStats.WordGroup==testedEffect.WordGroup || testedEffect.WordGroup=="Detection"){
      //   invalidGroup=true;
      // }
      if (testedEffect.WordGroup=="Detection"){
        if (effect.effectStats.WordGroup!="Detection"){
          invalidGroup=true;
        }
      }
      else{
        if (effect.effectStats.WordGroup==testedEffect.WordGroup || effect.effectStats.WordGroup=="Detection"){
          invalidGroup=true;
        }
      }


    });
    //test for restriction validity
    if (testedEffect.TargetRestrictions && testedEffect.TargetRestrictions.toUpperCase().includes(props.builtWord.targetWord.word.toUpperCase())){
      return false;
    }
    //test for name validity
    if (invalidName){return false}
    //test for group validity
    if (invalidGroup){return false}
    //test for level validity
    switch(wordSize){
      case 1:
        return twoEffectTable[parseInt(activeEffects[0].effectStats.Levels.match(/\d/))][level]===undefined ? false:true;
        break;
      case 2:
        return threeEffectTable[parseInt(activeEffects[0].effectStats.Levels.match(/\d/))][parseInt(activeEffects[1].effectStats.Levels.match(/\d/))][level]===undefined ? false:true;
        break;
      default:
        return true;
        break;
    }
  }

  function getEffectWordLevel(effectWord){
    let presetLevel=false;
    let activeEffects=[props.builtWord.effectWord1, props.builtWord.effectWord2, props.builtWord.effectWord3];
    activeEffects.forEach((builtEffect)=>{
      if (builtEffect.word==effectWord.Title && builtEffect.effectiveLvl){
        presetLevel=builtEffect.effectiveLvl;
      }
    });
    if (presetLevel){
      return presetLevel;
    }
    else{
      presetLevel=effectWord.Levels.match(/\d/);
      return presetLevel;
    }
  }

  function forgeEffectOptgroups(values, optgroupType){
    let effectOptgroups=[];
    let finalArray=[];
    switch(optgroupType){
      case "level":
      effectOptgroups=[0,1,2,3,4,5,6,7,8,9];
      effectOptgroups.forEach((optgroupLvl)=>{
        let optgroupEffects=[];
        values.forEach((effect)=>{
          let effectLvl=effect.Levels.match(/\d/);
          if (effectLvl==optgroupLvl){
            optgroupEffects.push(<option disabled={testEffectValidity(effect) ? false:true} value={effect.Title}>{effect.Title}</option>);
          }
        });
        finalArray.push(<optgroup label={"Level: "+optgroupLvl}>{optgroupEffects}</optgroup>);
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





class WordConstructor extends React.Component {
  constructor(props){
    super(props);
    this.state={
      wordLibrary:{
        targets:JSON.parse(localStorage.getItem("targetWords")),
        effects:JSON.parse(localStorage.getItem("effectWords")),
        metas:JSON.parse(localStorage.getItem("metaWords")),
      },
      builtWord:{
        targetWord:{active:true, word:"Personal", meta:null, restrictions:[]},
        effectWord1:{active:false, word:null, meta:null, restrictions:[], effectStats:null},
        effectWord2:{active:false, word:null, meta:null, restrictions:[], effectStats:null},
        effectWord3:{active:false, word:null, meta:null, restrictions:[], effectStats:null},
      },
    };
  }

  toggleEffectStatus(i){
    const builtWord= JSON.parse(JSON.stringify(this.state.builtWord));
    let targetEffect=builtWord[`effectWord${i}`];
    if (targetEffect.active){
      targetEffect.active=false;
    }else{
      targetEffect.active=true;
      targetEffect.word=null;
      targetEffect.meta=null;
      targetEffect.restrictions=[];
    }
    this.setState({builtWord:builtWord});
  }

  changeEffectWord(i){
    let newEffect=event.target.value;
    const builtWord= JSON.parse(JSON.stringify(this.state.builtWord));
    let targetEffect=builtWord[`effectWord${i}`];
    targetEffect.word=newEffect;
    targetEffect.effectStats=JSON.parse(JSON.stringify(this.state.wordLibrary.effects[newEffect]));
    targetEffect.effectiveLevel=null;
    //figure out and set new restrictions

    this.setState({builtWord:builtWord}, ()=>{this.getEffectWordLevel(targetEffect.effectStats)});

  }



  changeTargetWord(){
    console.log(event);
    let newTarget=event.target.value;
    const builtWord= JSON.parse(JSON.stringify(this.state.builtWord));
    let target=builtWord.targetWord;

    target.word=newTarget;
    target.effectiveLevel=null;
    //figure out and set new restrictions

    this.setState({builtWord:builtWord});
  }

  changeMeta(i){
    console.log(event);
    let newMeta=event.target.value;
    const builtWord= JSON.parse(JSON.stringify(this.state.builtWord));
    let target= i ? builtWord[`effectWord${i}`]:builtWord.targetWord;
    target.meta=newMeta;
    target.effectiveLevel=null;
    //figure out and set new restrictions???
    this.setState({builtWord:builtWord}, ()=>{this.getEffectWordLevel(targetEffect.effectStats)});

  }

  setLevel(newLvl, i){
    const builtWord= JSON.parse(JSON.stringify(this.state.builtWord));
    let target= i ? builtWord[`effectWord${i}`]:builtWord.targetWord;
    target.effectiveLevel=newLvl;
    //figure out and set new restrictions???
    this.setState({builtWord:builtWord});
  }

  getEffectWordLevel(effectWord){
    if (!effectWord){
      return;
    }
    let presetLevel=false;
    let activeEffects=[this.state.builtWord.effectWord1, this.state.builtWord.effectWord2, this.state.builtWord.effectWord3];
    activeEffects.forEach((builtEffect)=>{
      if (builtEffect.word==effectWord.Title && builtEffect.effectiveLvl){
        presetLevel=builtEffect.effectiveLvl;
      }
    });
    if (presetLevel){
      return presetLevel;
    }
    else{
      presetLevel=parseInt(effectWord.Levels.match(/\d/));
      console.log(presetLevel);
      this.setLevel(presetLevel);
      return presetLevel;
    }
  }



  renderContent(){
    //HEARTH
    //Note lack of meta words and some other key stuff
    let wordLibrary=this.state.wordLibrary;
    let builtWord=this.state.builtWord;
    let target=wordLibrary.targets[builtWord.targetWord.word];
    let effect1=builtWord.effectWord1;
    let effect2=builtWord.effectWord2;
    let effect3=builtWord.effectWord3;
    let effectList=[effect1, effect2, effect3];

    let spellName=`[${target.Title}]`;
    let school=``;
    let level=target.Level;
    let castingTime=`Standard Action`;
    let components="Material/Verbal/Somatic";
    let range=target.Range;
    let targets=target.Description+(target.Boosts=="null" ? "":target.Boosts);
    let duration=``;
    let savingThrow=`none`;
    let spellResist=`No`;
    let onSaveDescriptions=[];
    let concentration=false;
    let seeText=false;
    let highestEffectLevel=-1;
    let descriptions=[];
    let activeEffectLevels=[];

    let durationRanking={
      "instantaneous":0,
      "1 round":1,
      "1d4 rounds":2,
      "1 round/level":3,
      "1 minute/level":4,
      "10 minutes/level":5,
      "1 hour/level":6,
      "1 day/level":7,
    }

    function cleanEffectDuration(rawDuration){
      let polishedDuration=rawDuration;
      //do things with regexes to clean up rawDuration
      //remove dismissable tag
      polishedDuration=polishedDuration.replace(/\(D\)/, '');
      // if has the concentration tag set concentration to true then toss out concentration text
      if (polishedDuration.match("concentration")){
        polishedDuration=polishedDuration.replace(/concentration/, '');
        polishedDuration=polishedDuration.replace(/, up to/, '');
        concentration=true;
      }
      //if has the varies tag set seeText to true then toss out everything
      if (polishedDuration.match("varies")){
        polishedDuration="";
        seeText=true;
      }
      //strip trailing white text
      return polishedDuration;
    }

    function getCombinedEffectLevel(){
      //two and threeset tables loaded in at Sheetstats.js
      let effectiveLevel=0;
      switch(activeEffectLevels.length){
        case 0:
          break;
        case 1:
          effectiveLevel=activeEffectLevels[0];
          break;
        case 2:
          effectiveLevel=twoEffectTable[activeEffectLevels[0]][activeEffectLevels[1]];
          break;
        case 3:
          effectiveLevel=threeEffectTable[activeEffectLevels[0]][activeEffectLevels[1]][activeEffectLevels[2]];
          break;
        default:
          console.log(`Wait whaat?  You're supposed to have 1-3 effect words not ${activeEffectLevels.length}`);
          break;
      }
      console.log(effectiveLevel);
      return effectiveLevel;
    }

    effectList.forEach((effect)=>{
      if (effect.active && effect.word){

        console.log(wordLibrary.effects);
        console.log(effect.word);
        builtEffect=JSON.parse(JSON.stringify(effect));
        effect=wordLibrary.effects[effect.word];
        console.log(effect);
        spellName+=`--[${effect.Title}]--`;
        //
        school+=effect.School;
        //
        // activeEffectLevels.push(parseInt(effect.Levels.match(/\d/)));
        let currentEffectLvl=builtEffect.effectiveLevel? builtEffect.effectiveLevel:parseInt(effect.Levels.match(/\d/));
        activeEffectLevels.push(currentEffectLvl);
        highestEffectLevel= highestEffectLevel<currentEffectLvl ? currentEffectLvl:highestEffectLevel;
        // highestEffectLevel= highestEffectLevel<parseInt(effect.Levels.match(/\d/)) ? parseInt(effect.Levels.match(/\d/)):highestEffectLevel;
        //
        let cleanDuration=cleanEffectDuration(effect.Durations);
        console.log(cleanDuration);
        if(!duration){
          duration=cleanDuration;
        }else{
          if (durationRanking[cleanDuration]!==undefined){
            duration= durationRanking[duration]<durationRanking[cleanDuration] ? duration:cleanDuration;
          }
        }
        //
        if (highestEffectLevel<builtEffect.effectiveLevel || savingThrow=="none"){
          if(!effect.SavingThrow.match(/none/) && effect.SavingThrow.match(/Will\s|Reflex\s|Fortitude\s/).length){
            savingThrow=effect.SavingThrow.match(/Will\s|Reflex\s|Fortitude\s/)[0];
          }
        }else if(highestEffectLevel==builtEffect.effectiveLevel){
          if(!effect.SavingThrow.match(/none/) && !savingThrow.includes(effect.SavingThrow.match(/Will\s|Reflex\s|Fortitude\s/))){
            savingThrow+=`OR ${effect.SavingThrow.match(/Will\s|Reflex\s|Fortitude\s/)}`;
          }
        }
        //
        if(effect.SpellResist.match(/yes/)){
          spellResist="Yes";
        }
        //
        descriptions.push(effect.Description+ (effect.Boosts=="null" ? "":effect.Boosts));
      }
    });
    if(savingThrow.match(/OR/)){savingThrow+=" (Caster's Choice)"}
    level = level<getCombinedEffectLevel() ? getCombinedEffectLevel():level;


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

    function forgeDescription(){
      let finalDescript=[];
      descriptions.forEach((description)=>{
        finalDescript.push(<div>{description}<br/><br/></div>);
      });
      return finalDescript;
    }
    return (<div>
              <div className="spellName"><b>Spell Name: </b>{spellName}</div>
              <div className="basicSpellInfo"><span className="school"><b>School: </b>{school}</span><span className="level"><b>Level: </b>{level}</span></div>
             <hr/>
             CASTING
             <hr/>
              <div className="castingTime"><b>Casting Time: </b>{castingTime}</div>
              <div className="components"><b>Components: </b>{components}</div>
            <hr/>
            EFFECT
            <hr/>
              <div className="range"><b>Range: </b>{range}</div>
              <div className="targets"><b>Targets: </b>{targets}</div>
              <div className="duration"><b>Duration: </b>{duration}</div>
              <div className="defense"><span className="savingThrow"><b>Saving Throw: </b>{savingThrow}</span><span className="spellResist"> <b>Spell Resist: </b>{spellResist}</span></div>
            <hr/>
            DESCRIPTION
            <hr/>
              <div className="description"><b>Description: </b>{forgeDescription()}</div>
            </div>);
  }

  renderTargetWord(){
    return <TargetWord targetStats={this.state.builtWord.targetWord} targetWords={this.state.wordLibrary.targets} metaWords={this.state.wordLibrary.metas} onTargetChange={() => this.changeTargetWord()} onMetaChange={() => this.changeMeta()}/>
  }

  renderEffectWord(i){
    return <EffectWord builtWord={this.state.builtWord} effectStats={this.state.builtWord[`effectWord${i}`]} onClick={() => this.toggleEffectStatus(i)} setLevel={(newLvl) => this.setLevel(newLvl, i)} effectWords={this.state.wordLibrary.effects} metaWords={this.state.wordLibrary.metas} onEffectChange={() => this.changeEffectWord(i)} onMetaChange={() => this.changeMeta(i)}/>
  }

  render() {
    return (
      <div>
        <div className="row h-75">
          <div className="col">
            {this.renderContent()}
          </div>
        </div>
        <div class="row h-25" style={{overflow:"auto"}}>
          <div id="reactWordPanel" className="col-12 wordContainer">
            {this.renderTargetWord()}
            {this.renderEffectWord(1)}
            {this.renderEffectWord(2)}
            {this.renderEffectWord(3)}
          </div>
          </div>
      </div>

    );
  }
}
