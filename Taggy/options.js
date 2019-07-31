
function onSubmit(e){ // save button

  var saved= [];

  for (i=0;i<document.getElementById('SavedTags').children.length; i++){
    saved[i]=document.getElementById('SavedTags').children[i].value.toString();
  }

  chrome.storage.sync.set({ // for some reason naming something more complex than a,b gets negative results
  a: document.getElementById('ID').value,
  b: document.getElementById("tagAmount").value,
  c: saved
}, function() {
    return false;
  });
  




/*
  Get saved object

  chrome.storage.sync.get(['a'], function(result) {
    alert(result.a);
  });
*/
}

  document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save').addEventListener('click', onSubmit);
  document.getElementById("tagP").addEventListener('click', addTags);
  document.getElementById("tagM").addEventListener('click', removeTags);
  document.getElementById("setupSheet").addEventListener('click', setupSheet);

  chrome.storage.sync.get(['a'], function(result) {
    if(result.a===undefined){}else{
    document.getElementById('ID').value=(result.a).replace('"','');
    }
  });

  chrome.storage.sync.get(['b'], function(result) {
    if(result.b===undefined || result.b===NaN || result.b===null){
      document.getElementById('tagAmount').value=0;
    }else{
    document.getElementById('tagAmount').value=(result.b);
    }
    GenerateTags();
  });

  chrome.storage.sync.get(['c'], function(result) {
    
    for (i = 0; i < document.getElementById('SavedTags').children.length;i++){
      document.getElementById('SavedTags').children[i].value=result.c[i];
    }
    
  });


})

function setupSheet(){

  chrome.storage.sync.get(['a'], function(result) {
    var url="https://script.google.com/macros/s/AKfycbzH-edn_DYhOtVJuHrCC8GAKGDU5I4ujlYDzHiiSwqjfVR4zvo/exec?";
  
    url+="type=1&Sid="+result.a;
  
    const Http = new XMLHttpRequest();
    Http.open("GET", url, false);
    Http.send( null );
    
  });


}


function addTags(e){
  e.preventDefault();

  document.getElementById("tagAmount").value=parseInt(document.getElementById("tagAmount").value)+1;

  GenerateTags();

}

function removeTags(e){
  e.preventDefault();

  let tags=document.getElementById("tagAmount").value;

  if(tags===undefined || tags==0 || tags<0){
     document.getElementById("tagAmount").value=0;
  }else{
    document.getElementById("tagAmount").value=parseInt(tags)-1;
  }

  GenerateTags();
}

function GenerateTags(e){
  if(e==undefined){

  }else {
      e.preventDefault();
  }

  const div = document.getElementById('SavedTags');
  //just to make things nicer
  //cleaning up div if it contains child nodes
  for (d=div.children.length;d>document.getElementById('tagAmount').value;d--){
    div.removeChild(div.childNodes[d]);
  }

  const input = document.getElementById('tagAmount');

  for (let i = div.children.length; i < input.value; i++) {
    // this is what you need
    const newInput = document.createElement('input');
    div.appendChild(newInput);
    newInput.placeholder="saved tag-"+(i+1); //<input type="text" placeholder="tag" id="tag" value=""></input>
    newInput.id="tag";
    newInput.name="tag"+(i);
    newInput.value='';
  }
}



/*
        chrome.storage.sync.set({key: value}, function() {
          console.log('Value is set to ' + value);
        });
      
        chrome.storage.sync.get(['key'], function(result) {
          console.log('Value currently is ' + result.key);
        });
*/