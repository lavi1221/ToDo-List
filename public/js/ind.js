var socket = io.connect();


$(document).ready(function(){
    $('a[data-toggle="list"]').on('show.bs.tab', function(e) {
        localStorage.setItem('activeTab', $(e.target).attr('href'));
    });
    var activeTab = localStorage.getItem('activeTab');
    if(activeTab){
        $('#list-tab a[href="' + activeTab + '"]').tab('show');
    }
});


if(document.getElementById('da')!== null)
      document.getElementById('da').setAttribute("min",  new Date().toISOString().split("T")[0]);


function pla(data){
  var tot ={
    personid:document.getElementById(data.name).elements[1].value,
    titlename:document.getElementById(data.name).elements[2].value,
    task:document.getElementById(data.name).elements[0].value
  };
  socket.emit('check',tot);
  setTimeout(function(){
    window.location.href = '/dash';
  },900);
 }
function play(re){
   document.getElementById("suc").style.display='inline-block';
   setTimeout(function(){
 	  document.getElementById("suc").style.display='none';
   },900);
     document.getElementById(re.name).submit();
};


  var list_div;
  var term;
  var lists;
  var search;
function fund(dod){
 var rt = dod.childNodes[1].querySelector('h1');
  search = document.getElementById('filter'+rt.innerText).querySelectorAll('input')[0];
 var title = document.getElementById('filter'+rt.innerText).querySelectorAll('input')[1];
  list_div= document.querySelectorAll('.op'+rt.innerText);
  search.addEventListener("keyup",function(e){
   term = e.target.value.toLowerCase();
   Array.from(list_div).forEach(function(list){
     title = list.innerText.split('2')[0].toLowerCase();
     if(title.indexOf(term)<0){
       list.style.display='none';
     }else{
       list.style.display='';
     }
   });
  });
};

function fnd(opa){
    search = opa.value.toLowerCase();
     list_div=document.querySelectorAll('.popo');
      Array.from(list_div).forEach(function(list){
        var task = list.cells[document.querySelector('select').value].innerText.toLowerCase();
        console.log(document.querySelector('select').value);
        if(task.indexOf(search)<0){
          list.style.display='none';
        }else{
          list.style.display='';
        }
     });
   }
