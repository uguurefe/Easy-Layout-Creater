var grid_counter=0;
var el=0;
var eldata;
var griddata;
var editting;
var bgcolor;
var textcolor;
var borderrad;
var height;
var width;
var manualCss;
var manualcss;
var manualtemp;
var cssprop=[];
var cssattr=[];
var container;
var appendedEl=[];
var pageData="";
var pageDivs=[];
var pageEl=[];
var temp;
var tempArray=[];
var tempArray2=[];
var grid0=[];
var grid1=[];
var elementLength=0;
var cssData=[];
var cssCounter=-1;
$(document).ready(function() {
	/*window.onbeforeunload = function (e) {
        return "Sayfayı yenilerseniz verileriniz silinir. Emin misiniz?";
    };*/
    //localStorage.clear();
    var content=localStorage.getItem("data");
    if (content==null) {
    	localStorage.setItem("data", "");
	    window.location.reload();
    }

   	eldata=content.split("el");
   	griddata=content.split("grid");
   	grid_counter=griddata[griddata.length-1];
   	grid_counter=grid_counter.split('"');
   	//console.log(griddata);
   	content=content.split("-,-");
    el=eldata[eldata.length-1];
    el=el.split('"');
    //console.log(el[0]);
    if (jQuery.isEmptyObject(grid_counter[0])) {
    	window.grid_counter=0;
    }
    else{
    	grid_counter=parseInt(grid_counter[0])+1;
    }
    if (jQuery.isEmptyObject(el[0])) {
    	window.el=0;
    }
    else{
    	el=parseInt(el[0])+1;
    }
    $("#content").append(content[0]);
    $('#item').sortable();
    $("#save").on('click', function(event) {
		var data=$("#content").html().trim();
		console.log(data);
		var timestamp = moment().format("DD.MM.YY HH:mm:ss");
		//localStorage.clear();
		localStorage.setItem("data", data+"-,-"+timestamp);
		//console.log(JSON.stringify(localStorage));
		//console.log($("#content").html());
		if (!$("#content").children().hasClass("grids")) {
			console.log("yes");
			window.el=0;
			window.grid_counter=0;
			//console.log(el);
		}
		//console.log(el);
	});
	$("#grid-create").on('click', function(event) {
		var col_text=$("#col-text").val();
		var col_number=$("#col-number").val();
		var offset_text=$("#offset-text").val();
		var offset_number=$("#offset-number").val();
		//console.log(col_text);

		$("#content").append("<div id='el"+el+"' class='col-"+col_text+"-"+col_number+" offset-"+offset_text+"-"+offset_number+" draggable grids'><span class='erase'>&times;</span><span class='edit'>&#9660; </span><ul id='item' class='grid"+grid_counter+"'></ul></div>");
		$(".grid-list").append('<option value="grid'+grid_counter+'">Grid'+grid_counter+'</option>');
		appendedEl[el]="<div id='el"+el+"' class='grid"+parseInt(grid_counter)+" grids col-"+col_text+"-"+col_number+" offset-"+offset_text+"-"+offset_number+"'>";
		grid_counter++;
		el++;
		//console.log(appendedEl);
	});
	$("#input-create").on('click', function(event) {
		var input_placeholder=$("#input-placeholder").val();
		var gridNum=$("#grid-list-input").val();
		//console.log(gridNum);
		$("."+gridNum).append("<li class='item'><input id='el"+el+"' type='text' class='form-control draggable' placeholder='"+input_placeholder+"'><span class='erase'>&times;</span><span class='edit'>&#9660; </span></li>");
		$('#item').sortable();
		var num = gridNum.split("grid");
		num=parseInt(num[1]);
		appendedEl[el]="<input id='el"+el+"' type='text' placeholder='"+input_placeholder+"' class='grid"+num+" form-control'>"
		el++;
	});
	$("#btn-create").on('click', function(event) {
		var btn_type=$("#btn-type").val();
		var btn_val=$("#btn-val").val();
		var gridNum=$("#grid-list-btn").val();
		//console.log(gridNum);
		$("."+gridNum).append("<li class='item'><button id='el"+el+"' type='button' class='btn btn-"+btn_type+" draggable'>"+btn_val+"</button><span class='erase'>&times;</span><span class='edit'>&#9660; </span></li>");
		$('#item').sortable();
		var num = gridNum.split("grid");
		num=parseInt(num[1]);
		appendedEl[el]="<button id='el"+el+"' type='button' class='grid"+num+" btn btn-"+btn_type+"'>"+btn_val+"</button>"
		el++;
	});
	$("#p-create").on('click', function(event) {
		var p_data=$("#p-data").val();
		var gridNum=$("#grid-list-p").val();
		$("."+gridNum).append("<li class='item'><div id='el"+el+"' class='card draggable dragg-p'><div class='card-body'><p>"+p_data+"</p></div></div><span class='erase'>&times;</span><span class='edit'>&#9660; </span></li>");
		$('#item').sortable();
		var num = gridNum.split("grid");
		num=parseInt(num[1]);
		appendedEl[el]="<div id='el"+el+"' class='grid"+num+" card'><div class='card-body'><p>"+p_data+"</p></div></div>"
		el++;
	});
	$("#textarea-create").on('click', function(event) {
		var gridNum=$("#grid-list-textarea").val();
		$("."+gridNum).append("<li class='item'><textarea id='el"+el+"' cols='30' rows='10' class='form-control draggable'></textarea><span class='erase'>&times;</span><span class='edit'>&#9660; </span></li>");
		$('#item').sortable();
		var num = gridNum.split("grid");
		num=parseInt(num[1]);
		appendedEl[el]="<textarea id='el"+el+"' cols='30' rows='10' class='grid"+num+" form-control'></textarea>"
		el++;
	});
	$("#content").on('click', '.erase', function(event) {
    	//console.log(1);
    	$(this).parent().remove();
    	if ($(this).parent().hasClass("grids")) {
    		var gridName=$(this).parent().children('#item').attr('class');
    		$(".grid-list>option[value="+gridName+"]").remove();
    	}
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
		if ($(this).parent().hasClass("grids")) {
			editting=$(this).parent().attr('id');
		}
		else{
			editting=$(this).parent().children().first().attr('id');
		}
		$("#edit-css").on('click', function(event) {
			bgcolor=$("#bgcolor").val();
			textcolor=$("#textcolor").val();
			borderrad=$("#borderrad").val();
			//console.log(borderrad);
			height=$("#height").val();
			width=$("#width").val();
			manualCss=$("#manualcss").val();
			manualcss=manualCss.split(";");
			//console.log(manualcss);
			for (var i = 0; i < manualcss.length-1 ; i++) {
				manualtemp=manualcss[i].split(":");
				cssprop[i]=manualtemp[0];
				cssattr[i]=manualtemp[1];
			}
			//console.log(cssprop);
			$("#"+editting).css({
				'background-color': '#'+bgcolor,
				'color': '#'+textcolor,
				'border-radius': borderrad+'px',
				'height': height+'px',
				'width': width+'px',
			});
			for (var i = 0; i < cssprop.length; i++) {
				$("#"+editting).css(cssprop[i],cssattr[i]);
			}
			//cssData[cssCounter]={["#"+editting]:"background-color:#"+bgcolor+";color:#"+textcolor+";border-radius:"+borderrad+"px;height:"+height+"px;width:"+width+"px;"+manualCss}
			//console.log(cssData);
			$(".right-sidebar").css('width', '0px');
			$("#content").removeClass('openrightside');
			$("#bgcolor").val("");
			$("#textcolor").val("");
			$("#borderrad").val("");
			$("#height").val("");
			$("#width").val("");
			$("#manualcss").val("");
		});
		//cssCounter++;
	});
	$(".close").on('click', function(event) {
		$(".right-sidebar").css('width', '0px');
		$("#content").removeClass('openrightside');
		$("#bgcolor").val("");
		$("#textcolor").val("");
		$("#borderrad").val("");
		$("#height").val("");
		$("#width").val("");
		$("#manualcss").val("");
	});
	$("#export").on('click', function(event) {
		var data=$("#content").html().trim();
		var timestamp = moment().format("DD.MM.YY HH:mm:ss");
		localStorage.setItem("data", data+"-,-"+timestamp);
		var page=$("#content").html().trim();
		console.log(page);

		/* Get fonksiyonu Id=content' i ve içeriğini DOM olarak verir. 
		1-İLk child DİV.col-md 
		2-ikincisi UL.grid0 
		3-üçüncüsü Lİ 
		4-dördüncüsü APPENDEN ELEMENT */
		/* Sortable elementleri çekmek için gidilen yol
		//console.log($("#content").get(0).children[0].children[2].children[0].children[0]);
		temp=$("#content").get(0).children;
		//console.log(temp);
		for (var i = 0; i < temp.length; i++) {
			pageDivs[i]=temp[i].outerHTML.split("<span")[0];
		}
		//console.log(pageDivs);
		for (var i = 0; i < pageDivs.length; i++) {
			//console.log($("#content").get(0).children[i]);
			elementLength=elementLength+$("#content").get(0).children[i].children[2].children.length;
			tempArray[i]=$("#content").get(0).children[i].children[2].children;
			//console.log(tempArray);
		}
		for (var i = 0; i < tempArray.length; i++) {
			console.log(tempArray.length);
			tempArray2[0]=$("#content").get(0).children[i].children[2].children;
			console.log(tempArray2);
		}
		//console.log(pageDivs);
		*/


		/*
		//console.log(appendedEl);
		for (var i = 0; i < appendedEl.length; i++) {
			//console.log(appendedEl.length);
			var temp=appendedEl[i].split("class=");
			//console.log(temp);
			temp=temp[1].split("'>");
			//console.log(temp);
			temp=temp[0].split("'grid");
			//console.log(temp);
			temp=temp[1].split(" ");
			//console.log(temp[0]);
			if (parseInt(temp[0])==0) {
				grid0[i]=appendedEl[i];
				//pageData=data[0];	
			}
			if (parseInt(temp[0])==1) {
				grid1[i]=appendedEl[i];
				//pageData=data[0];	
			}
		}
		grid0 = grid0.filter(function (el) {
		  return el != null;
		});
		grid1 = grid1.filter(function (el) {
		  return el != null;
		});
		//console.log(grid0);
		//console.log(grid1);
		for (var i = 0; i < grid0.length; i++) {
			pageData=pageData+grid0[i];
		}
		pageData=pageData+"</div>";
		for (var i = 0; i < grid1.length; i++) {
			pageData=pageData+grid1[i];
		}
		pageData=pageData+"</div>";
		console.log(pageData);
		*/
		var blob = new Blob(["<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Easy Layout Creater</title><link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk' crossorigin='anonymous'><script src='https://code.jquery.com/jquery-3.5.1.slim.min.js' integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj' crossorigin='anonymous'></script><script src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js' integrity='sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo' crossorigin='anonymous'></script><script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js' integrity='sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI' crossorigin='anonymous'></script><style>body{background-color: #e6e6e6;}</style></head><body><div class='container'>"+page+"</div><script>$(document).ready(function() {var dataCount=$('#item').children().length;var arr=[];var j;var page='';for (var i = 0; i < dataCount; i++) {j=i+1;arr[i]=$('#el'+j).get(0).outerHTML;}console.log(arr);for (var i = 0; i < arr.length; i++) {page=page+arr[i];}console.log(page);$('#el0').append(page);$('span').remove();$('ul').remove();$('li').remove();});</script></body></html>"],{type:"text/plain;charset:utf-8"});
		saveAs(blob,"elc.html");
	});
});

