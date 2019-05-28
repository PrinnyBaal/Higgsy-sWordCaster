
sheetProj.view.sheetLogic = {
  setupUserInterface: function () {
      if (localStorage.getItem("effectWords") === null || localStorage.getItem("targetWords") === null || localStorage.getItem("metaWords") === null) {
          console.log("launching promises to get all words loaded in...");
        Promise.all([effectPromise, targetPromise, metaPromise]).then(function(values) {
          console.log(values);
          console.log("get it started for the first time!");
          getStarted();
        });
      }
      else{
        console.log("words already loaded so lets just get into it!");
        getStarted();
      }

      function getStarted(){
        let effectWords=JSON.parse(localStorage.getItem("effectWords"));
        let targetWords=JSON.parse(localStorage.getItem("targetWords"));
        let metaWords=JSON.parse(localStorage.getItem("metaWords"));
        console.log(effectWords);
        console.log(targetWords);
        console.log(metaWords);
        quickReact();
      }
      // updateAll();
      // displayTabs();
      // createStatSheet();
      // createSkillSheet();
      // displayStats();
      // setClicks();
    }
};

let wordSlots={
  displayWordSlots:function(){

  },
  addEffectWord:function(){

  },
  deleteEffectWord:function(){

  },
  updateBaseWord:function(wordId){

  },
  updateMetaWord:function(wordId){

  },
  craftWordSpell:function(){

  },
}

function setClicks(){
  $("#resetButton").click(resetStorage);

  $("#charPortrait").click({element:'#charOverlay'},toggleDisplay);
  $("#exitPageButton").click({element:'#charOverlay'},toggleDisplay);
  $("#skillsPageButton").click({page:'#skillSheet'},turnPage);
  $("#statsPageButton").click({page:'#statSheet'},turnPage);

  $(".tabHead").click(collapseTabBody);
}
