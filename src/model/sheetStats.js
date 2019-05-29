

// if (localStorage.getItem("savedChars") === null) {
//   localStorage.setItem('savedChars', JSON.stringify(savedChars));
// }
//
// if (localStorage.getItem("activeChar") === null) {
//   localStorage.setItem('activeChar', 0);
// }

console.log("hitting sheetStats?");

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

let effectPromise= new Promise((resolve, reject)=>{
  $.getJSON("Paizo_effectWords.json", function(data) {

      localStorage.setItem("effectWords", JSON.stringify(data))
    })
  }
);

let targetPromise=new Promise((resolve, reject)=>{
  $.getJSON("Paizo_targetWords.json", function(data) {

      localStorage.setItem("targetWords", JSON.stringify(data))
    })
  }
);

let metaPromise=new Promise((resolve, reject)=>{
  $.getJSON("Paizo_metaWords.json", function(data) {

      localStorage.setItem("metaWords", JSON.stringify(data))
    })
  }
);

let twoEffectTable={
  0:{
    0:2,
    2:3
    },
  1:{
    1:3,
    3:4
    },
  2:{
    0:2,
    2:4,
    4:5,
    },
  3:{
    1:4,
    3:5,
    5:6
    },
  4:{
    2:5,
    4:6,
    6:7
    },
  5:{
    3:6,
    5:7,
    7:8
    },
  6:{
    4:7,
    6:8
    },
  7:{
    5:8,
    7:9
    },
  8:{
    5:9
  },
  9:{}
};
let threeEffectTable={
  0:{
    0:{
      0:3,
      2:4
      },
    2:{
      0:4
      }
    },
  1:{
    1:{
      3:5
      },
    3:{
      1:5
      }
    },
  2:{
    0:{
      0:4
      },
    2:{
      2:5,
      4:6
      },
    4:{
      2:6
      }
    },
  3:{
    1:{
      1:5
      },
    3:{
      3:6,
      5:7
      },
    5:{
      3:7
      }
    },
  4:{
    2:{
      2:6
      },
    4:{
      4:7,
      6:8
      },
    6:{
      4:8
      }
    },
  5:{
    3:{
      3:7
      },
    5:{
      5:8,
      7:9
      },
    7:{
      5:9
      }
    },
  6:{
    4:{
      4:8
      },
    6:{
      6:9
      }
    },
  7:{
    5:{
      5:9
      },
    },
  8:{},
  9{}
};

// if (localStorage.getItem("twoEffectTable") === null) {
//   localStorage.setItem('twoEffectTable', JSON.stringify(twoEffectTable));
// }
//
// if (localStorage.getItem("threeEffectTable") === null) {
//   localStorage.setItem('threeEffectTable', JSON.stringify(threeEffectTable));
// }

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
