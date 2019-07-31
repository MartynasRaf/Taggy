 tagList = ["tag1", "tag2" , "tag3" , "tag4" , "tag5" , "tag6" , "tag7" , "tag8"];
 presetTagAmount= 0;
 let web;
 let tag;
 url="https://script.google.com/macros/s/AKfycbzH-edn_DYhOtVJuHrCC8GAKGDU5I4ujlYDzHiiSwqjfVR4zvo/exec?";

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    web = tabs[0].url;
});

// params: website, tag, id


function clickHandler(e) {
    chrome.runtime.sendMessage({directive: "popup-click"}, function(response) {

  var childDivs = document.getElementById('AllTags').getElementsByTagName('input');

  var tag="";

  for( i=0; i< childDivs.length; i++ )
  {
   tag+= childDivs[i].value;
    (i+1<childDivs.length)? tag+="," : tag+="";
  }

  var sheetID;
  
  chrome.storage.sync.get(['a'], function(result) {
    sheetID=result.a;
 

    url+="Website="+web+"&"+"Tag="+tag.toString()+"&"+"Sid="+sheetID.toString();

const Http = new XMLHttpRequest();
Http.open("GET", url, false);
Http.send( null );
    });


    location.reload();
  });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', clickHandler);
    document.getElementById("options").addEventListener("click", OpenOptions);
    document.getElementById("tagP").addEventListener("click", addTags);
    document.getElementById("tagM").addEventListener("click", removeTags);
    document.getElementById("tagAmount").addEventListener("change", GenerateTags);
   // document.getElementById("debug").addEventListener("click", debug);

    chrome.storage.sync.get(['c'], function(result) {
     updateTagList(result.c);
     chrome.storage.sync.get(['b'], function(result) {
      updateTagAmount(result.b);
     });
    });

})


function updateTagList(e){
tagList=e;
}

function updateTagAmount(e){
presetTagAmount=e;
GenerateTags();
}



function addTags(e){
  e.preventDefault();

  document.getElementById("tagAmount").value=parseInt(document.getElementById("tagAmount").value)+1;

  GenerateTags();

}

function removeTags(e){
  e.preventDefault();

  let tags=document.getElementById("tagAmount").value;

  if(tags===undefined || tags==1 || tags<1){
     document.getElementById("tagAmount").value=1;
  }else{
    document.getElementById("tagAmount").value=parseInt(tags)-1;
  }

  GenerateTags();
}


function debug(e){ // for debugging purposes

  //document.getElementById("selection").selectedIndex
  alert(e);

}

function OpenOptions(e){
  if(e==undefined){

  }else {
      e.preventDefault();
  }

  chrome.runtime.openOptionsPage(function (){});

}

function GenerateTags(e){
    if(e==undefined){

    }else {
        e.preventDefault();
    }

    const div = document.getElementById('AllTags');
    //just to make things nicer
    //cleaning up div if it contains child nodes

    /*
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    };
    */

    for (d=div.children.length;d>document.getElementById('tagAmount').value*2;d-=2){
      div.removeChild(div.childNodes[d]);
      div.removeChild(div.childNodes[d-1]);
    }


    const input = document.getElementById('tagAmount');
    for (let i = (div.children.length/2); i < input.value; i++) {
      // create select

      const newSelect = document.createElement('select');
      div.appendChild(newSelect);
      newSelect.id="selection";
      newSelect.name=i;
      //newSelect.onchange="function(){}"; //!H!O!W!!T!H!E!F!E!C!K!!D!O!!Y!O!U!!P!A!S!S!P!A!R!A!M!E!T!E!R!S!!!!!!!!!!
      

      //append option list

      const newOption=document.createElement('option');
      newSelect.appendChild(newOption);
      newOption.value="";
      newOption.innerHTML="";
      newSelect.addEventListener('change', (e) => {
        SetFromDropDown(e.target);
      }, false);

      for (h=0;h<presetTagAmount;h++){
        const newOption=document.createElement('option');
        newSelect.appendChild(newOption);
        newOption.value=tagList[h];
        newOption.innerHTML=tagList[h];
      }


      //create Input
      const newInput = document.createElement('input');
      div.appendChild(newInput);
      newInput.placeholder="tag "+(i+1); //<input type="text" placeholder="tag" id="tag" value=""></input>
      newInput.className="tag";
      newInput.id="tag"+i;
      newInput.value='';
    }
}

  function SetFromDropDown(e){ // if changes change textbox to select value
    
    var myTextBox=document.getElementById("tag"+e.name);
    myTextBox.value= e.options[e.selectedIndex].value;

  }



// -----------------------------------------------------------------------------
// Additional notes below






/*

Set: 

			<button class="SetTags" id="setTags">Set</button>

    document.getElementById("setTags").addEventListener("click", GenerateTags);



Autocomplete:

  <div class="autocomplete" style="width:300px;">
    <input id="myInput" type="text" name="myCountry" placeholder="Country">
  </div>


	<button class="Submit" id="debug">Debug</button>




function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

<input type="text" class="Tags" placeholder="tag" id="tag" value=""></input>

	<input type="text" placeholder="tag" id="tag" value=""></input>



	  <select name="tags" id="tagSelection">
		<option value="1" selected="selected"></option>
		<option value="2"></option>
		<option value="3"></option>
		<option value="4"></option>
		<option value="5"></option>
		<option value="6"></option>
		<option value="7"></option>
		<option value="8"></option>
		</select>
      <button id="submit">Add bookmark</button>


*/



//https://script.google.com/macros/s/AKfycbzv4M3FVdR6dewr5OwI4Hv88qDlQL-WY-y-koNW9vEWFSmPLG8y/exec
