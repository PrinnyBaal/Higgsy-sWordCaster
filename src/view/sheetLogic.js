
sheetProj.view.sheetLogic = {
  setupUserInterface: function () {
      setAllIDs();
      updateAll();
      displayTabs();
      createStatSheet();
      createSkillSheet();
      displayStats();
      setClicks();
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
