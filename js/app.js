var divs = document.getElementsByClassName("tecla");
longitud=0;
total=0;
simbolo="0"
invalid=true;
for (var i=0; i< divs.length; i++) {     
    divs[i].addEventListener("click",function() {
        valor=this.getAttribute('alt');
        valor2=isNaN(valor);
        pantalla=document.getElementById("display").innerHTML;
        
		
        if(valor2==false){//comprueba si esta llegando un numero    	
			
			if(longitud<8&&invalid==true){ 
				document.getElementById("display").innerHTML=valor;
				longitud++;
				invalid=false;
			}else if(longitud<8){
				document.getElementById("display").innerHTML=pantalla+valor;
				longitud++;
			}
		}else{//si no, es un simbolo
			switch(valor){	//se evalua el simbolo al que se le dio click		

			case "=":
				pantalla=document.getElementById("display").innerHTML;
				pantalla=parseFloat(pantalla);
				total=igual(simbolo,total,pantalla);
				document.getElementById("display").innerHTML=total;
				total=0;
				invalid=true;	
				simbolo="0";
				longitud=0;		
				break;
			case ".":
				document.getElementById("display").innerHTML=pantalla+".";
				invalid=false;
				longitud++;
				break;
			case "on":
				document.getElementById("display").innerHTML="0";
				total=0;
				invalid=true;	
				simbolo="0";
				longitud=0;	
				break;
			case "raiz":
				if(pantalla>=0){
					total= Math.sqrt(pantalla);					
					total=total.toString();					
					total=total.substr(0,9);
					document.getElementById("display").innerHTML=total;
					total=0;
					invalid=true;	
					simbolo="0";
					longitud=0;	
				}else{
					document.getElementById("display").innerHTML="Sin raiz";
				}	
				break;
			case "signo":
				if(pantalla.indexOf('-')==0){
					pantalla=pantalla.replace("-","");
					document.getElementById("display").innerHTML=pantalla;					
				}else{					
					pantalla="-"+pantalla;
					document.getElementById("display").innerHTML=pantalla;								
				}
				break;	
			default://si no es ninguno de los simbolos anteriores, es un signo para operacion
				if(simbolo=="0"){//se comprueba si hay un simbolo pendiente de operacion
					//si es igual a 0 no hay y se agrega el simbolo para su operacion con el sigiente numero que se agregara
					simbolo=valor;
					pantalla=document.getElementById("display").innerHTML;
					pantalla=parseFloat(pantalla);
					total=pantalla;				
					document.getElementById("display").innerHTML="0";
					invalid=true;
					longitud=0;
				}
				else{//si hay un signo se manda a hacer operacion con la funcion igual()
					pantalla=parseFloat(pantalla);				
					total=igual(simbolo,total,pantalla);
					simbolo=valor;
					document.getElementById("display").innerHTML="0";
					invalid=true;
					longitud=0;
				}
				break;
		}
	
        }

});
}  

function igual(simbolo,total,pantalla){
	switch (simbolo){//evalua que signo llega para su correspondiente operacion
					case "+":
						total=suma(pantalla,total);						
						simbolo=valor;
						return total;
						break;
					case "-":
						total=resta(pantalla,total);						
						simbolo=valor;
						return total;
						break;
					case "*":
						total=multiplicacion(pantalla,total);						
						simbolo=valor;
						return total;
						break;
					case "/":
						total=divicion(pantalla,total);						
						simbolo=valor;
						return total;
						break;				
					case "0":
						return pantalla;
						break;
				}		
}
function suma(pantalla,total){
	total=pantalla+total;
	return total;
}
function resta(pantalla,total){
	total=total-pantalla;
	return total;
}
function multiplicacion(pantalla,total){
	total=total*pantalla;
	return total;
}
function divicion(pantalla,total){
	total=total/pantalla;
	return total;
}
