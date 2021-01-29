pierogi = 0;
pierogi_second = 0;
dough_level = 0;
presser_level = 0
boiler_level = 0;
dough_multiplier = 1;
presser_multiplier = 5;
boiler_multiplier = 20;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function str_to_num_math(x) {
   return parseInt(x.replace(/,/g, ''));
}

function display(){
    $( "#counter" ).text(numberWithCommas(pierogi));
}
function second_display(){
    $( "#second" ).text(numberWithCommas(pierogi_second));
}

function level_update(job, level){
    $( "#"+job+"-level" ).text(level);
}


$( "#pierogi" ).on( "click", function() {
    //pierogi_grow.pause();
    pierogi_click.restart();
    $('.theExp').remove();
    pierogi = pierogi+1;
    display();
    $('.rogie-splosion').prepend('<img class="theExp" src="images/explode.gif'+'?a='+Math.random()+'" />'); 
});



function calc_cost(level,job){
    var dough = 1.5;
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
    }
    
    var cost = base+(base*level*multi);
    var cost = cost;
    return cost;
}

function add_level(job){
    if(job == "dough"){
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
    }
    $("#dough-cost").text(numberWithCommas(calc_cost(dough_level,"dough")));
    $("#presser-cost").text(numberWithCommas(calc_cost(presser_level,"presser")));
    $("#boiler-cost").text(numberWithCommas(calc_cost(boiler_level,"boiler")));
    
}

$( ".job" ).on( "click", function() {
    //console.log('click');
    var job = $(this).attr("job");
    //console.log(job);
    if(job == "dough"){
        var level = dough_level;
    }else if(job == "presser"){
        var level = presser_level;
    }else if(job == "boiler"){
        var level = boiler_level;
    }
    //get cost
    var cost = calc_cost(level,job);
    console.log(cost);
    if (pierogi >= cost){
        pierogi = pierogi-cost;
        display(pierogi);
        add_level(job);
    }
    
});

function color_functions(){
    if(str_to_num_math($("#counter").text()) >= str_to_num_math($("#dough-cost").text())){
        $("#dough-cost").css('color', 'green');
    }else{
        $("#dough-cost").css('color', 'red');
    }
    
    if(str_to_num_math($("#counter").text()) >= str_to_num_math($("#presser-cost").text())){
        $("#presser-cost").css('color', 'green');
    }else{
        $("#presser-cost").css('color', 'red');
    }
    
    if(str_to_num_math($("#counter").text()) >= str_to_num_math($("#boiler-cost").text())){
        $("#boiler-cost").css('color', 'green');
    }else{
        $("#boiler-cost").css('color', 'red');
    }
}

$("#dough-cost").text(numberWithCommas(calc_cost(dough_level,"dough")));
$("#presser-cost").text(numberWithCommas(calc_cost(presser_level,"presser")));
$("#boiler-cost").text(numberWithCommas(calc_cost(boiler_level,"boiler")));

$("#dough-level").text(dough_level);
$("#presser-level").text(presser_level);
$("#boiler-level").text(boiler_level);

setInterval(function(){ 
    var add_rogies = dough_level*dough_multiplier;
    add_rogies = add_rogies+(presser_level*presser_multiplier);
    add_rogies = add_rogies+(boiler_level*boiler_multiplier);
    //console.log(pierogi+" "+add_rogies);
    pierogi=pierogi+add_rogies;
    pierogi_second = add_rogies;
    display();
    second_display();
    color_functions();
}, 1000);


