var socket = io.connect();

var section = document.getElementById("main");
var btn = section.getElementsByClassName("btn")[0];
var head =section.getElementsByClassName("head")[0];
var reg_btn =document.getElementsByClassName("register-path")[0];
var log_btn =document.getElementsByClassName("log-path")[0];
var log_div = document.getElementsByClassName("log-div")[0];
var reg_div = document.getElementsByClassName("reg-div")[0];
btn.addEventListener('click',function(e){
  section.classList.add('slide-left');
  head.classList.add('head-slide');
  btn.style.display='none';
  log_div.classList.add('log-appear');
});

reg_btn.addEventListener('click',function(e){
  log_div.classList.remove('log-appear');
  reg_div.classList.add('reg-appear');
});
log_btn.addEventListener('click',function(e){
  reg_div.classList.remove('reg-appear');
    log_div.classList.add('log-appear');
});
