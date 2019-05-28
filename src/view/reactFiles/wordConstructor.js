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
  effectValues.forEach((value)=>{effectOptions.push(<option value={value.Title}>{value.Title}</option>)});
  let metaOptions=[];
  let metaValues=Object.values(props.metaWords);
  metaValues.forEach((value)=>{metaOptions.push(<option value={value.Title}>{value.Title}</option>)});

  if (props.effectStats.active){
    return(<div class="wordSlot">
            <select value={props.effectStats.word} onChange={props.onEffectChange}>
              {effectOptions}
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
        targetWord:{active:true, word:null, meta:null, restrictions:[]},
        effectWord1:{active:true, word:null, meta:null, restrictions:[]},
        effectWord2:{active:false, word:null, meta:null, restrictions:[]},
        effectWord3:{active:false, word:null, meta:null, restrictions:[]},
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
    console.log(event);
    let newEffect=event.target.value;
    const builtWord= JSON.parse(JSON.stringify(this.state.builtWord));
    let targetEffect=builtWord[`effectWord${i}`];
    targetEffect.word=newEffect;

    //figure out and set new restrictions

    this.setState({builtWord:builtWord});
  }

  changeTargetWord(){
    console.log(event);
    let newTarget=event.target.value;
    const builtWord= JSON.parse(JSON.stringify(this.state.builtWord));
    let target=builtWord.targetWord;

    target.word=newTarget;

    //figure out and set new restrictions

    this.setState({builtWord:builtWord});
  }

  changeMeta(i){
    console.log(event);
    let newMeta=event.target.value;
    const builtWord= JSON.parse(JSON.stringify(this.state.builtWord));
    let target= i ? builtWord[`effectWord${i}`]:builtWord.targetWord;
    target.meta=newMeta;
    //figure out and set new restrictions???
    this.setState({builtWord:builtWord});
  }



  renderContent(){
    //HEARTH
    //Note lack of meta words and some other key stuff
    let wordLibrary=this.state.wordLibrary;
    let builtWord=this.state.builtWord;
    let target=builtWord.targetWord;
    let effect1=builtWord.effectWord1;
    let effect2=builtWord.effectWord2;
    let effect3=builtWord.effectWord3;
    let effectList=[effect1, effect2, effect3];

    let spellName=target.Title;
    let school=``;
    let level=target.Level;
    let castingTime=`Standard Action`;
    let components="<b>M</b>aterial/<b>V</b>erbal/<b>S</b>omatic";
    let range=target.Range;
    let targets=target.Description;
    let duration=``;
    let savingThrow=`none`;
    let spellResist=`No`;
    let onSaveDescriptions=[];
    let concentration=false;
    let seeText=false;
    let highestEffectLevel=-1;
    let descriptions=[target.Description+target.Boosts];

    let durationRanking={
      "instantaneous":0,
      "1 round":1,
      "1d4 rounds":2,
      "1 round/level":3,
      "1 minute/level":4,
      "10 minute/level":5,
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

    effectList.forEach((effect)=>{
      if (effect.active){
        spellName+=` ${effect.Title}`;
        //
        school+=effect.school;
        //
        highestEffectLevel= highestEffectLevel<parseInt(effect.level.match(/\d/)) ? parseInt(effect.level.match(/\d/)):highestEffectLevel;
        //
        let cleanDuration=cleanEffectDuration(effect.Durations);
        console.log(cleanDuration);
        if(!duration){
          duration=cleanDuration;
        }else{
          if (durationRanking[cleanDuration].length){
            duration= durationRanking[duration]<durationRanking[cleanDuration] ? duration:cleanDuration;
          }
        }
        //
        if (highestEffectLevel<effect.Levels.match(/\d/) || savingThrow=="none"){
          if(!effect.SavingThrow.match(/none/)){
            savingThrow=effect.savingThrow.match(/Will\s|Reflex\s|Fortitude\s/);
          }
        }else if(highestEffectLevel==effect.Levels.match(/\d/)){
          if(!effect.SavingThrow.match(/none/)){
            savingThrow+=`OR ${effect.savingThrow.match(/Will\s|Reflex\s|Fortitude\s/)} (Caster's Choice)`;
          }
        }
        //
        if(effect.SpellResist.match(/yes/)){
          spellResist="Yes";
        }
        //
        descriptions.push(effect.Description+ effect.Boosts=="null" ? "":effect.Boosts);
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

    function forgeDescription(){
      let finalDescript=``;
      descriptions.forEach((description)=>{
        finalDescript+=description;
      });
      return finalDescript;
    }
    return (<div>
              <div className="wordSpellName">{spellName}</div>
             <hr/>
              <div className="school">{school}</div>
              <div className="level">{level}</div>
              <div className="castingTime">{castingTime}</div>
              <div className="components">{components}</div>
             <hr/>
              <div className="range">{range}</div>
              <div className="targets">{targets}</div>
              <div className="duration">{duration}</div>
              <div className="savingThrow">{savingThrow}</div> //saveDC added here
              <div className="spellResist">{spellResist}</div>
              <div className="description">{forgeDescription()}</div>// Damage noted here?
            </div>);
  }

  renderTargetWord(){
    return <TargetWord targetStats={this.state.builtWord.targetWord} targetWords={this.state.wordLibrary.targets} metaWords={this.state.wordLibrary.metas} onTargetChange={() => this.changeTargetWord()} onMetaChange={() => this.changeMeta()}/>
  }

  renderEffectWord(i){
    return <EffectWord effectStats={this.state.builtWord[`effectWord${i}`]} onClick={() => this.toggleEffectStatus(i)} effectWords={this.state.wordLibrary.effects} metaWords={this.state.wordLibrary.metas} onEffectChange={() => this.changeEffectWord(i)} onMetaChange={() => this.changeMeta(i)}/>
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
