var socket = io.connect();

var item = document.getElementsByClassName("cff");

$(document).ready(function () {

    socket.on('active',function(data){
    console.log(data);
    document.getElementById("cff"+data).classList.add("active");
    document.getElementById(data).style.display="block";
    });

});
document.getElementById('da').setAttribute("min",  new Date().toISOString().split("T")[0]);

for (var i = 0; i < item.length; i++) {
  item[i].addEventListener("click", function(e){
    for (var j = 0; j < item.length && j!=i; j++) {
      document.getElementById(item[j].innerText).style.display="none";
      if (document.getElementById("cff"+e.target.innerText).classList.contains('active')) {
          document.getElementById("cff"+e.target.innerText).classList.remove("active");
      }
    }
     document.getElementById('erw').style.display='none';
    document.getElementById("archives").style.display="none";
    document.getElementById(e.target.innerText).style.display="block";
    document.getElementById("cff"+e.target.innerText).classList.add("active");
 });
}
function fun(anc){
  if(anc.checked){
    document.getElementsByClassName("btn-warning")[0].style.display ="none";
    document.getElementsByClassName("btn-success")[0].style.display ="inline-block";
  }else{
     document.getElementsByClassName("btn-warning")[0].style.display ="inline-block";
  }
}
var trarr =   document.getElementsByClassName("trr");
for (var k = 0; k < trarr.length; k++) {
  trarr[k].addEventListener("click", function(e){
    console.log(e.target.type);
    if(e.target.type == 'checkbox'){
      document.getElementsByClassName("btn-warning")[e.target.value].style.display ="none";
      document.getElementsByClassName("btn-info")[e.target.value].style.display ="inline-block";
      document.getElementsByClassName("btn-success")[e.target.value].style.display ="inline-block";
    }
  });
};
//'none';
function play(){
   document.getElementById("suc").style.display='inline-block';
   setTimeout(function(){
 	  document.getElementById("suc").style.display='none';
  },20000);

    $('#asd').submit();
};
document.getElementById("arc").addEventListener('click',function(e){
  for (var j = 0; j < item.length; j++) {
    document.getElementById(item[j].innerText).style.display="none";
    if (document.getElementById("cff"+item[j].innerText).classList.contains('active')) {
        document.getElementById("cff"+item[j].innerText).classList.remove("active");
    }
  }
  document.getElementById("cfferw").classList.remove("active");
  e.target.classList.add("active");
    document.getElementById(e.target.getAttribute('name')).style.display="inline-block";
});
document.getElementById("hom").addEventListener('click',function(e){
  for (var j = 0; j < item.length; j++) {
    document.getElementById(item[j].innerText).style.display="none";
    if (document.getElementById("cff"+item[j].innerText).classList.contains('active')) {
        document.getElementById("cff"+item[j].innerText).classList.remove("active");
    }
  }
  document.getElementById("arc").classList.remove("active");
  e.target.classList.add("active");
    document.getElementById(e.target.getAttribute('name')).style.display="inline-block";
});
  var list_div;
  var term;
  var lists;
  var search;
function fund(dod){
 var rt = dod.childNodes[1].querySelector('h1');
  search = document.getElementById('filter'+rt.innerText).querySelectorAll('input')[0];
 var title = document.getElementById('filter'+rt.innerText).querySelectorAll('input')[1];
  list_div= document.querySelectorAll('.op'+rt.innerText);
 console.log(list_div);
  search.addEventListener("keyup",function(e){
   term = e.target.value.toLowerCase();
   Array.from(list_div).forEach(function(list){
     console.log(list);
     title = list.innerText.split('2')[0].toLowerCase();
     if(title.indexOf(term)<0){
       list.style.display='none';
     }else{
       list.style.display='';
     }
   });
  });
};
