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
    metaValues.forEach((value)=>{targetOptions.push(<option value={value.Title}>{value.Title}</option>)});

    return(<div class="wordSlot">
          <select>
          {targetOptions}
          </select><br/>
          <select>
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

  return(<div class="wordSlot">
          <select>
            {effectOptions}
          </select><br/>
          <select>
            {metaOptions}
          </select><br/>
      </div>);
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
        targetWord:{},
        effectWord1:{},
        effectWord2:{},
        effectWord3:{},
      },
    };
  }

  renderContent(){
    return (<div>Hello</div>);
  }

  renderTargetWord(){
    return <TargetWord targetWords={this.state.wordLibrary.targets} metaWords={this.state.wordLibrary.metas}/>
  }

  renderEffectWord(i){
    return <EffectWord effectWords={this.state.wordLibrary.effects} metaWords={this.state.wordLibrary.metas}/>
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
            {this.renderEffectWord(0)}
            {this.renderEffectWord(1)}
            {this.renderEffectWord(2)}
          </div>
          </div>
      </div>

    );
  }
}
