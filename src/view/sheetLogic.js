
sheetProj.view.sheetLogic = {
  setupUserInterface: function () {
      if (localStorage.getItem("effectWords") === null) {
        effectPromise.then(resolve=>getStarted(),
                           reject=>console.log(reject));
      }
      else{
        getStarted();
      }

      function getStarted(){
        console.log(localStorage.getItem("effectWords"));
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