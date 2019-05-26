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
    return (<div>Hello</div>);
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
