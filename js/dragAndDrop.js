var grid_counter=0;
var el=0;
var eldata;
var editting;
var bgcolor;
var textcolor;
var borderrad;
var height;
var width;
var manualcss;
$(document).ready(function() {
	/*window.onbeforeunload = function (e) {
        return "Sayfayı yenilerseniz verileriniz silinir. Emin misiniz?";
    };*/
    //localStorage.clear();
    var content=localStorage.getItem("data");
    if (content==null) {
    	localStorage.setItem("data", "");
    }

   	eldata=content.split("el");
   	content=content.split("-,-");
    el=eldata[eldata.length-1];
    el=el.split('"');
    //console.log(el[0]);
    el=parseInt(el[0])+1;
    $("#content").append(content[0]);
    $('#item').sortable();
    $("#save").on('click', function(event) {
		var data=$("#content").html().trim();
		//console.log(data);
		var timestamp = moment().format("DD.MM.YY HH:mm:ss");
		localStorage.clear();
		localStorage.setItem("data", data+"-,-"+timestamp);
		//console.log(JSON.stringify(localStorage));
	});
	$("#grid-create").on('click', function(event) {
		var col_text=$("#col-text").val();
		var col_number=$("#col-number").val();
		var offset_text=$("#offset-text").val();
		var offset_number=$("#offset-number").val();
		//console.log(col_text);

		$("#content").append("<div class='col-"+col_text+"-"+col_number+" offset-"+offset_text+"-"+offset_number+" draggable grids'><ul id='item' class='grid"+grid_counter+"'></ul></div>");
		grid_counter++;
	});
	$("#input-create").on('click', function(event) {
		var input_placeholder=$("#input-placeholder").val();
		$(".grid0").append("<li class='item'><input id='el"+el+"' type='text' class='form-control draggable' placeholder='"+input_placeholder+"'><span class='erase'>&times;</span><span class='edit'>&#9660; </span></li>");
		$('#item').sortable();
		el++;
	});
	$("#btn-create").on('click', function(event) {
		var btn_type=$("#btn-type").val();
		var btn_val=$("#btn-val").val();
		$(".grid0").append("<li class='item'><button id='el"+el+"' type='button' class='btn btn-"+btn_type+" draggable'>"+btn_val+"</button><span class='erase'>&times;</span><span class='edit'>&#9660; </span></li>");
		$('#item').sortable();
		el++;
	});
	$("#p-create").on('click', function(event) {
		var p_data=$("#p-data").val();
		$(".grid0").append("<li class='item'><div id='el"+el+"' class='card draggable dragg-p'><div class='card-body'><p>"+p_data+"</p></div></div><span class='erase'>&times;</span><span class='edit'>&#9660; </span></li>");
		$('#item').sortable();
		el++;
	});
	$("#textarea-create").on('click', function(event) {
		$(".grid0").append("<li class='item'><textarea id='el"+el+"' cols='30' rows='10' class='form-control draggable'></textarea><span class='erase'>&times;</span><span class='edit'>&#9660; </span></li>");
		$('#item').sortable();
		el++;
	});
	$("#content").on('click', '.erase', function(event) {
    	//console.log(1);
    	$(this).parent().remove();
    	$(".right-sidebar").css('width', '0px');
    	$("#content").removeClass('openrightside');
    });
	/*$("#content").dblclick('.draggable',function() {
		$(".right-sidebar").css('width', '300px');
		$("#content").addClass('openrightside');
		console.log($(this).prop("tagName"));
	});*/
	$("#content").on('click','.edit', function(event) {
		$(".right-sidebar").css('width', '300px');
		$("#content").addClass('openrightside');
		//console.log($(this).parent().children().first().attr('id'));
		editting=$(this).parent().children().first().attr('id');
		$("#edit-css").on('click', function(event) {
			bgcolor=$("#bgcolor").val();
			textcolor=$("#textcolor").val();
			borderrad=$("#borderrad").val();
			//console.log(borderrad);
			height=$("#height").val();
			width=$("#width").val();
			manualcss=$("#manualcss").val();
			$("#"+editting).css({
				'background-color': '#'+bgcolor,
				'color': '#'+textcolor,
				'border-radius': borderrad+'px',
				'height': height+'px',
				'width': width+'px',
			});
		});

	});
	$(".close").on('click', function(event) {
		$(".right-sidebar").css('width', '0px');
		$("#content").removeClass('openrightside');
	});

});

