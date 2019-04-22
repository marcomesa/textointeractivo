﻿// JavaScript Document. Enric Ripoll Mira
function calculos_expo() {
	
	var x = document.getElementById("entradax").value;
	var y = document.getElementById("entraday").value;
	var f = document.getElementById("frecuencia").value;
	x=x.replace(' ','');
	y=y.replace(' ','');
	f=f.replace(' ','');	
	var arr=x.split(',');
	var arr2=y.split(',');
	var arr3=f.split(',');
	
// Valores máximos
    var max_x = Math.max.apply(Math, arr);
	var min_x = Math.min.apply(Math, arr);
	var max_y = Math.max.apply(Math, arr2);
	var min_y = Math.min.apply(Math, arr2);
	var max_x = Math.max(max_x,Math.abs(min_x));
	var max_y = Math.max(max_y,Math.abs(min_y));
	
	
	if(arr.length!=arr2.length||arr.length==0 || arr2.length!=arr3.length || arr.length!=arr3.length){
		alert("¡Cuidado, revisa los datos!");
		
	}

	var lcm=0;
	var flag=false;
	var total=1;
	var x=0;
	var y=0;
	var xy=0;
	var xx=0;
	var yy=0;
	var lny=0;
	var xlny=0;
	var lnylny=0;
	var ft=0;
	var x2y2=0;
        var arr4= new Array();

	for(var j=0;j<arr.length;j++){
		arr[j]=parseFloat(arr[j]);
		arr2[j]=parseFloat(arr2[j]);
		arr4[j]=Math.log(arr2[j]);
		arr3[j]=parseFloat(arr3[j]);
		x+=arr[j]*arr3[j];
		y+=arr2[j]*arr3[j];
		lny+=arr3[j]*Math.log(arr2[j]);
		xlny+=arr3[j]*arr[j]*Math.log(arr2[j]);
		lnylny+=arr3[j]*Math.pow(Math.log(arr2[j]),2);
		ft+=arr3[j];
		xx+=arr3[j]*Math.pow(arr[j],2);
		yy+=arr3[j]*Math.pow(arr2[j],2);
		xy+=arr[j]*arr2[j]*arr3[j];
		
		
	}
	
	
	var xy_n=xy/ft;
	var xx_n=xx/ft;
	var xy_n=xy/ft;
	var xmean=x/ft;
	var ymean=y/ft;
	var covarxy=xy_n-xmean*ymean;
	var lnymean=lny/ft;
	var B =(xlny-lnymean*x)/(xx-xmean*x);
	var A = Math.exp(lnymean-B*xmean);
	var lnA=Math.log(A);
	var ssresid=0;
	var sstotal=0;
	var ssreg=0;
		
	
	for(i=0; i<arr.length;i++){
		ssresid+=arr3[i]*Math.pow((arr4[i]-(lnA+B*arr[i])),2);
		sstotal+= arr3[i]*Math.pow((arr4[i]-lnymean),2);
	}
	ssreg=sstotal-ssresid;
		
	var R_2= ssreg/sstotal;
		
		
	document.getElementById("res_area").style.visibility = "visible";
	document.getElementById("result1").value = ft;
	document.getElementById("result2").value = xmean;
	document.getElementById("result3").value = ymean;
	document.getElementById("result4").value = covarxy;
	document.getElementById("result5").value = R_2;
	document.getElementById("result6").value = "";
	document.getElementById("result7").value = A;
	document.getElementById("result8").value = B;
	document.getElementById("result9").value = "";
	document.getElementById("result10").value = "";
	document.getElementById("result11").value = "";
	document.getElementById("result12").value = "";
	
	var AA = Math.round(A * 1000) / 1000;
	var BB = Math.round(B * 1000) / 1000;
	var tipo = "exponencial"
	document.getElementById("tipo").value = tipo;
	var controlx = new Array();
    var controly = new Array();
	for(i=0;i<1199;i++){
	controlx[i]=min_x+i*(max_x-min_x)/1199;
	controly[i]=A*Math.exp(B*controlx[i]);
	}
	
	
			
		var dps=new Array;
		var dps2=new Array;
			
			
		for(i=0;i<arr.length;i++){
			dps[i]=({x: parseFloat(arr[i]),y: parseFloat(arr2[i])});
		}
		
		for(i=0;i<1199;i++){
			dps2[i]=({x: parseFloat(controlx[i]),y: parseFloat(controly[i])});
		}
		
				
		
		var chart = new CanvasJS.Chart("chartContainer",
    {
	  zoomEnabled: true,
	  backgroundColor: "#F5F6CE",
      theme: "theme3",    // "theme1"
      title:{
      text: "Ajuste exponencial"
	   
      },
      data: [
      { 
	    markerColor: "orange",     
        type: "scatter",
		markerBorderColor : "red", 
		
        dataPoints: dps
      },
        {        
        type: "line",
		color: "#2060EE",
		showInLegend: true,
		legendText: "y="+AA+"\u00B7"+"e^("+BB+"\u00B7x)",
		dataPoints: dps2
      }     
      ]
    });

    chart.render();
	
  }





