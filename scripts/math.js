/*pierogi = 0;
pierogi_second = 0;
dough_level = 0;
presser_level = 0
boiler_level = 0;
dough_multiplier = 1;
presser_multiplier = 5;
boiler_multiplier = 20;

dough_image="images/baker-icon.png";
presser_image="images/former-icon.png";
boiler_image="images/boiler-icon.png";

dough_title="Dough Maker";
presser_title="Pierogi Presser";
boiler_title="Pierogi Boiler";

dough_visible=0;
presser_visible=0;
boiler_visible=0;
*/


Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}


//jobs arr = per second multiplier, image, title, cost multiplier, base cost
let jobs_arr = [
    ['dough',[1,"images/baker-icon.png","Dough Maker",1.5,20]],
    ['presser',[5,"images/former-icon.png","Pierogi Presser",2,1000]],
    ['boiler',[20,"images/boiler-icon.png","Pierogi Boiler",3,10000]]
];

let player_arr = [
    ['pierogi',0],
    ['pierogi_second',0],
    ['dough_level',0],
    ['dough_visibility',0],
    ['presser_level',0],
    ['presser_visibility',0],
    ['boiler_level',0],
    ['boiler_visibility',0]
];

console.log(player_arr);

if(localStorage.getItem("save") !== null){
    player_arr = localStorage.getObj("save");
}

console.log(player_arr);

//console.log(jobs_arr[0][1][1]);

function get_value_from_object(object,search){
    for (let i = 0; i < object.length; i++) {
        if (object[i][0] == search){
            //console.log(object[i][1]);
            return object[i][1];
        }
    }
}

function set_value_from_object(object,search,value,position){
    for (let i = 0; i < object.length; i++) {
        if (object[i][0] == search){
            if (position > 0){
                object[i][1][position] = value;
            }else{
                object[i][1] = value;
            }
        }
    }
}

//get_value_from_object(jobs_arr,"presser");


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function str_to_num_math(x) {
   return parseInt(x.replace(/,/g, ''));
}

function display(){
    $( "#counter" ).text(numberWithCommas(get_value_from_object(player_arr,"pierogi")));
}
function second_display(){
    $( "#second" ).text(numberWithCommas(get_value_from_object(player_arr,"pierogi_second")));
}

function level_update(job, level){
    $( "#"+job+"-level" ).text(level);
}


$( "#pierogi" ).on( "click", function() {
    pierogi_click.restart();
    $('.theExp').remove();
    var current = get_value_from_object(player_arr,"pierogi")+1;
    set_value_from_object(player_arr,"pierogi",current,0);
    display();
    $('.rogie-splosion').prepend('<img class="theExp" src="images/explode.gif'+'?a='+Math.random()+'" />'); 
});



function calc_cost(level,job){
   /* var dough = 1.5;
    var presser = 2;
    var boiler = 3;
    
    var dough_base = 20;
    var presser_base = 1000;
    var boiler_base = 10000;
    
    if (job == "dough"){
        var multi = dough;
        var base = dough_base;
    }else if (job == "presser"){
        var multi = presser;
        var base = presser_base;
    }else if (job == "boiler"){
        var multi = boiler;
        var base = boiler_base;
    }*/
    
    var the_value = get_value_from_object(jobs_arr,job);
    var multi = the_value[3];
    var base = the_value[4];
    
    var cost = base+(base*level*multi);
    var cost = cost;
    return cost;
}

function add_level(job){
    /*if(job == "dough"){
        dough_level = dough_level+1;
        level_update(job, dough_level);
        var new_cost = calc_cost(dough_level,job);
    }else if(job == "presser"){
        presser_level = presser_level+1;
        level_update(job, presser_level);
        var new_cost = calc_cost(presser_level,job);
    }else if(job == "boiler"){
        boiler_level=boiler_level+1;
        level_update(job, boiler_level);
        var new_cost = calc_cost(boiler_level,job);
    }*/
    
    var the_value = get_value_from_object(player_arr,job+"_level")+1;
    set_value_from_object(player_arr,job+"_level",the_value,0);
    level_update(job, the_value);
    
    $("#"+job+"-cost").text(numberWithCommas(calc_cost(the_value,job)));
    /*
    $("#dough-cost").text(numberWithCommas(calc_cost(dough_level,"dough")));
    $("#presser-cost").text(numberWithCommas(calc_cost(presser_level,"presser")));
    $("#boiler-cost").text(numberWithCommas(calc_cost(boiler_level,"boiler")));
    */
}

$( ".job" ).on( "click", function() {
    //console.log('click');
    var job = $(this).attr("job");
    //console.log(job);
    /*if(job == "dough"){
        var level = dough_level;
    }else if(job == "presser"){
        var level = presser_level;
    }else if(job == "boiler"){
        var level = boiler_level;
    }*/
    var level = get_value_from_object(player_arr,job+"_level");
    
    //get cost
    var cost = calc_cost(level,job);
    var pierogi = get_value_from_object(player_arr,"pierogi");
    if (pierogi >= cost){
        pierogi = pierogi-cost;
        set_value_from_object(player_arr,"pierogi",pierogi,0);
        display(pierogi);
        add_level(job);
    }
    
});

//this can be refactored
function color_functions(){
    if(str_to_num_math($("#counter").text()) >= str_to_num_math($("#dough-cost").text())){
        $("#dough-cost").css('color', 'green');
        //dough_visible=1;
        set_value_from_object(player_arr,"dough_visibility",1,0);
        var dough = get_value_from_object(jobs_arr,"dough");
        $("#dough-maker .job-image").attr("src",dough[1]);
        $("#dough-maker .job-title").text(dough[2]);
        $("#dough-maker .hidden-job").hide();
    }else{
        $("#dough-cost").css('color', 'red');
    }
    
    if(str_to_num_math($("#counter").text()) >= str_to_num_math($("#presser-cost").text())){
        $("#presser-cost").css('color', 'green');
        //presser_visible=1;
        set_value_from_object(player_arr,"presser_visibility",1,0);
        var presser = get_value_from_object(jobs_arr,"presser");
        $("#pierogi-presser .job-image").attr("src",presser[1]);
        $("#pierogi-presser .job-title").text(presser[2]);
        $("#pierogi-presser .hidden-job").hide();
    }else{
        $("#presser-cost").css('color', 'red');
    }
    
    if(str_to_num_math($("#counter").text()) >= str_to_num_math($("#boiler-cost").text())){
        $("#boiler-cost").css('color', 'green');
        //boiler_visible=1;
        set_value_from_object(player_arr,"boiler_visibility",1,0);
        var boiler = get_value_from_object(jobs_arr,"boiler");
        $("#pierogi-boiler .job-image").attr("src",boiler[1]);
        $("#pierogi-boiler .job-title").text(boiler[2]);
        $("#pierogi-boiler .hidden-job").hide();
    }else{
        $("#boiler-cost").css('color', 'red');
    }
}

//these init lines can probably be refactored
$("#dough-cost").text(numberWithCommas(calc_cost(get_value_from_object(player_arr,"dough_level"),"dough")));
$("#presser-cost").text(numberWithCommas(calc_cost(get_value_from_object(player_arr,"presser_level"),"presser")));
$("#boiler-cost").text(numberWithCommas(calc_cost(get_value_from_object(player_arr,"boiler_level"),"boiler")));

$("#dough-level").text(get_value_from_object(player_arr,"dough_level"));
$("#presser-level").text(get_value_from_object(player_arr,"presser_level"));
$("#boiler-level").text(get_value_from_object(player_arr,"boiler_level"));

setInterval(function(){
    
    //this can be refactored
    var dough =get_value_from_object(jobs_arr,"dough");
    var presser = get_value_from_object(jobs_arr,"presser");
    var boiler = get_value_from_object(jobs_arr,"boiler");
    
    var add_rogies = get_value_from_object(player_arr,"dough_level")*dough[0];
    add_rogies = add_rogies+(get_value_from_object(player_arr,"presser_level")*presser[0]);
    add_rogies = add_rogies+(get_value_from_object(player_arr,"boiler_level")*boiler[0]);
    //console.log(pierogi+" "+add_rogies);
    var pierogi=get_value_from_object(player_arr,"pierogi")+add_rogies;
    set_value_from_object(player_arr,"pierogi",pierogi,0);
    set_value_from_object(player_arr,"pierogi_second",add_rogies,0);
    //pierogi_second = add_rogies;
    display();
    second_display();
    color_functions();
    
    //save
    localStorage.setObj("save", player_arr);
}, 1000);


