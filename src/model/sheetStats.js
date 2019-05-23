

// if (localStorage.getItem("savedChars") === null) {
//   localStorage.setItem('savedChars', JSON.stringify(savedChars));
// }
//
// if (localStorage.getItem("activeChar") === null) {
//   localStorage.setItem('activeChar', 0);
// }

let construct={
  targetWord:function(request){
    //request is an object containing anything that must be something other than default
    this.name= request.name ? request.name:"Generic_Target_Word";
    this.level= request.level ? request.level:0;
    this.range= request.range ? request.range:"close";  //ranges can be: personal/close/medium/long/ or an integer
    this.description= request.description ? request.description:"No description for this word given.";
    this.boostedDescriptions= request.boostedDescriptions ? request.boostedDescriptions:[];
  },
  effectWord:function(request){
    this.name= request.name ? request.name:"Generic_Target_Word";
    this.group="";
    this.school="";
    this.availability=[];
    this.duration="";
    this.spellResist="";
    this.targetRestrict="";
    this.description= request.description ? request.description:"No description for this word given.";
    this.boostedDescriptions= request.boostedDescriptions ? request.boostedDescriptions:[];
    this.saveAllowed=request.saveAllowed ? request.saveAllowed:"false";
    this.savingThrow=request.savingThrow ? request.savingThrow:"None"; //Other options are: Will/Fort/Ref
    this.onSaveEffect =request.onSaveEffect ? request.onSaveEffect:"A succesful save negates this effect."; //possibilities: full negation/half effect/ see description


  },
  metaWord:function(request){
    this.name= request.name ? request.name:"Generic_Meta_Word";
    this.level= request.level ? request.level:0;
    this.description= request.description ? request.description:"No description for this word given.";
    this.appliedEffect= request.appliedEffect ? request.appliedEffect:[];
  }

}

let data={
  getCharData:function(){

  },
  saveCharData:function(newData){

  },
  getWordData:function(){

  },
  saveWordData:function(newData){

  },
  getId:function(clubMembers){
    //takes an array of objects as an argument and returns the lowest valid ID
  }
}

let effectPromise= new Promise((resolve, reject)=>{$.getJSON("Paizo_effectWords.json", function(data) {
      localStorage.setItem("effectWords", data);})});

// function loadWords(){
//   var promise1 = new Promise(function(resolve, reject) {
//   setTimeout(function() {
//     resolve('foo');
//   }, 300);
// });
//   new Promise $.getJSON( "Paizo_effectWords.json", function(data) {
//   resolve(data);
// });
//   $.getJSON( "Paizo_effectWords.json", function(data) {
//   console.log(data);
//   });
//   $.getJSON( "Paizo_effectWords.json", function(data) {
//   console.log(data);
// });
//
// }

function resetStorage(){
  if (window.confirm("Do you really want to delete all your saved info?")) {
  localStorage.clear();
  location.reload();
}
}
