/*
	2DCoulombAnimation.js
	Menampilkan animasi gaya coulomb
	
	Kevin Misrano Khanwijaya | misranok@gmail.com | https://github.com/kmisrano
	
	Include: <script src="2DCoulombAnimation.js"></script> in a HTML file
	Execute: Refresh web browser viewing the HTML file
	
	20190320
	1600 Start Creating Vector3 Object
	20190322
	1248 Start Creating Muatan Object
	1327 rest
	1933 Start Constructing Layout
	2340 Start Constructing Button Function
	2352 Start Constucting Canvas Draw
	20190323
	0438 Problem at assigning force
*/

var muatan1 = new muatan();
var muatan2 = new muatan();
var xmin, xmax, ymin, ymax;
var radiusbola, tbeg,tend,dt,tdata,t,tproc,t2;

var div0,div1,div2,div3;

//div1 layout variables
var divIn	= [];
var divIn2	= [];
var btIn 	= [];
var inputIn	= [];
var ReadStatus = [];
var btReadAll;
var divInTitle1,divInTitle2,divInTitle3,divInTitle4;

//div2 layout variables
var caOut;
var div2btBox,div2btBox2, div2Canvas, div2LoadTitle;
var btStart,btReset;
var btDefault = [];

//div3 layout variables
var taOut1,taOut2;

	var F12 = new vec3();
	var a12 = new vec3();
	var v1baru = new vec3();
	var r1baru = new vec3();
	var F21 = new vec3();
	var a21 = new vec3();
	var v2baru = new vec3();
	var r2baru = new vec3();
var x1,x2,y1,y2,q1,q2,m1,m2;
main();
function main (){
	setElementsLayout();
}
function simulate() {
	// Stop simulation
	if(t >= tend) {
		btStart.innerHTML = "Start";
		writeConsole("Simulation stops, t = end\n\n");
		clearInterval(proc);
	}
	
	// Verbose result each tdata period
	if(t2 >= tdata) {
		writeTa(
			t+ " " +
			muatan1.r.x + "\t" +
			muatan1.r.y + "\t" +
			muatan1.v.x + "\t " +
			muatan1.v.y + "\t " +
			muatan2.r.x + "\t " +
			muatan2.r.y + "\t " +
			muatan2.v.x + "\t " +
			muatan2.v.y + "\t " +
			"\n"
		);
		clearCanvas();
		drawCanvas();
		
		t2-=tdata;
	}
	
		
	// Calculate acceleration, velocity, and position

	
	F12 = muatan.vektorGaya(muatan1,muatan2);  //gaya pada muatan 1 akibat muatan 2
	a12 = vec3.divideScalar(F12,muatan1.m);
	v1baru = vec3.add(muatan1.v,vec3.multiplyScalar(a12,dt));
	r1baru = vec3.add(muatan1.r,vec3.multiplyScalar(muatan1.v,dt));
	F21 = muatan.vektorGaya(muatan2,muatan1);
	a21 = vec3.divideScalar(F21,muatan2.m);
	v2baru = vec3.add(muatan2.v,vec3.multiplyScalar(a21,dt));
	r2baru = vec3.add(muatan2.r,vec3.multiplyScalar(muatan2.v,dt));
	
	muatan1.r= r1baru;
	muatan1.v= v1baru;
	muatan2.r= r2baru;
	muatan2.v= v2baru;
	
	// Increase time
	t +=dt;
	t2+=dt;
	
	
}

function setElementsLayout (){
		
	for (var i=0; i<22; i++){		
		divIn[i] = document.createElement("div");
		divIn[i].style.width = "224px";
		divIn[i].style.height = "23px";
		divIn[i].style.background = "#eee";
		
		
		divIn2[i] = document.createElement("div");
		divIn2[i].style.width = "50px";
		divIn2[i].style.height = "21px";
		divIn2[i].style.background = "#eee";
		divIn2[i].style.float = "left";
		divIn2[i].align = "center";
		
		btIn[i] = document.createElement("Button");
		btIn[i].id = "Read" + i;
		btIn[i].disabled = true;
		btIn[i].innerHTML = "Read";
		btIn[i].style.width = "70px";
		btIn[i].style.float = "left";
		btIn[i].addEventListener("click", readButtonClick);

		inputIn[i] = document.createElement ("input");
		inputIn[i].id = "Input" + i;
		inputIn[i].style.width = "100px";
		inputIn[i].style.float = "left";
		
		ReadStatus[i]=0;
	}	
		
	divIn2[0].innerHTML = "x";
	divIn2[1].innerHTML = "y";
	divIn2[2].innerHTML = "vx";
	divIn2[3].innerHTML = "vy";
	divIn2[4].innerHTML = "q";
	divIn2[5].innerHTML = "m";
	divIn2[6].innerHTML = "x";
	divIn2[7].innerHTML = "y";
	divIn2[8].innerHTML = "vx";
	divIn2[9].innerHTML = "vy";
	divIn2[10].innerHTML = "q";
	divIn2[11].innerHTML = "m";
	divIn2[12].innerHTML = "xmin";
	divIn2[13].innerHTML = "xmax";
	divIn2[14].innerHTML = "ymin";
	divIn2[15].innerHTML = "ymax";
	divIn2[16].innerHTML = "tbeg";
	divIn2[17].innerHTML = "tend";
	divIn2[18].innerHTML = "tstep";
	divIn2[19].innerHTML = "tdata";
	divIn2[20].innerHTML = "tproc";
	divIn2[21].innerHTML = "radius";
	
	for (var i=0; i<1; i++){		
		btDefault[i] = document.createElement("Button");
		btDefault[i].id = i;
		btDefault[i].innerHTML = "Default "+i;
		btDefault[i].style.width = "70px";
		btDefault[i].style.float = "center";
		btDefault[i].addEventListener("click", loadButtonClick);
	}	
	
	divInTitle1 = document.createElement("div");	
	divInTitle1.style.border = "#aaa 1px solid";
	divInTitle1.style.width = "222px";
	divInTitle1.style.height = "20px";
	divInTitle1.style.background = "#eee";
	divInTitle1.innerHTML = "Muatan 1";
	divInTitle1.align = "center";
	
	divInTitle2 = document.createElement("div");	
	divInTitle2.style.border = "#aaa 1px solid";
	divInTitle2.style.width = "222px";
	divInTitle2.style.height = "20px";
	divInTitle2.style.background = "#eee";
	divInTitle2.innerHTML = "Muatan 2";
	divInTitle2.align = "center";
	
	divInTitle3 = document.createElement("div");	
	divInTitle3.style.border = "#aaa 1px solid";
	divInTitle3.style.width = "222px";
	divInTitle3.style.height = "20px";
	divInTitle3.style.background = "#eee";
	divInTitle3.innerHTML = "Animation Coordinates";
	divInTitle3.align = "center";
	
	divInTitle4 = document.createElement("div");	
	divInTitle4.style.border = "#aaa 1px solid";
	divInTitle4.style.width = "222px";
	divInTitle4.style.height = "20px";
	divInTitle4.style.background = "#eee";
	divInTitle4.innerHTML = "Animation Control";
	divInTitle4.align = "center";

	btReadAll = document.createElement("Button");
	btReadAll.id = "ReadAll";
	btReadAll.disabled = true;
	btReadAll.innerHTML = "Read All";
	btReadAll.style.width = "222px";
	btReadAll.style.float = "center";
	btReadAll.addEventListener("click", readButtonClick);
	
	
	caOut = document.createElement("canvas");
	caOut.width = 546;
	caOut.height = caOut.width;
	caOut.style.width = caOut.width + "px";
	caOut.style.height = caOut.height + "px";
	caOut.style.float = "left";
	caOut.style.border = "#aaa 1px solid";
	caOut.style.paddingRight = "2px";
	clearCanvas();
	
	btStart = document.createElement("button");
	btStart.innerHTML = "Start";
	btStart.style.width = "70px";
	btStart.addEventListener("click", buttonClick);
	
	btReset = document.createElement("button");
	btReset.innerHTML = "Reset";
	btReset.style.width = "70px";
	btReset.addEventListener("click", buttonClick);
	
	div2Canvas = document.createElement("div");
	div2Canvas.width = caOut.width+2;
	div2Canvas.style.width = div2Canvas.width+"px";
	div2Canvas.height = caOut.height;
	div2Canvas.style.height = div2Canvas.height+"px";
	div2Canvas.style.background = "#eee";
	div2Canvas.align = "center";
	
	div2btBox = document.createElement("div");	
	div2btBox.width = caOut.width;
	div2btBox.style.width = div2btBox.width+"px";
	div2btBox.style.height = "24px";
	div2btBox.style.background = "#eee";
	div2btBox.align = "center";
	
	div2btBox2 = document.createElement("div");	
	div2btBox2.width = caOut.width;
	div2btBox2.style.width = div2btBox.width+"px";
	div2btBox2.style.height = "24px";
	div2btBox2.style.background = "#eee";
	div2btBox2.align = "center";
	
	div2LoadTitle = document.createElement("div");	
	div2LoadTitle.style.border = "#aaa 1px solid";
	div2LoadTitle.width = caOut.width;
	div2LoadTitle.style.width = div2btBox.width+"px";
	div2LoadTitle.style.height = "20px";
	div2LoadTitle.style.background = "#eee";
	div2LoadTitle.innerHTML = "Default Loading Button List";
	div2LoadTitle.align = "center";
	
	// Create ouput textarea
	taOut1 = document.createElement("textarea");
	taOut1.width = 400;
	taOut1.style.width = taOut1.width+"px";
	taOut1.style.height = "300px";
	taOut1.style.overflowY = "scroll";
	
	// Create Console Log Textarea
	taOut2 = document.createElement("textarea");
	taOut2.style.width = taOut1.width+"px";
	taOut2.style.height = taOut1.style.height;
	taOut2.style.overflowY = "scroll";
	
	div1 = document.createElement("div");	
	div1.style.border = "#aaa 1px solid";
	div1.width = 224;
	div1.style.width = div1.width+"px";
	div1.height= 616;
	div1.style.height= div1.height+"px";
	div1.style.background = "#eee";
	div1.style.float = "left";
	
	div2 = document.createElement("div");	
	div2.style.border = "#aaa 1px solid";
	div2.width = caOut.width+2;
	div2.style.width = div2.width+"px";
	div2.height = div1.height;
	div2.style.height = div2.height+"px";
	div2.style.background = "#eee";
	div2.style.float = "left";
	
	div3 = document.createElement("div");	
	div3.style.border = "#aaa 1px solid";
	div3.width =taOut1.width+6;
	div3.style.width = div3.width+"px";
	div3.height = div1.height;
	div3.style.height = div2.height+"px";
	div3.style.background = "#eee";
	div3.style.float = "left";
	
	div0 = document.createElement("div");	
	div0.style.border = "#aaa 1px solid";
	div0.width = div1.width+div2.width+div3.width+6;
	div0.style.width = div0.width+"px";
	div0.height = div1.height+2;
	div0.style.height = div0.height+"px";
	div0.style.background = "#eee";
	div0.align = "left";
	
	document.body.append(div0);
		div0.append(div1);
			div1.append(divInTitle1);
			for (var i=0; i<6; i++){
				div1.append(divIn[i]);
					divIn[i].append(divIn2[i]);
					divIn[i].append(inputIn[i]);
					divIn[i].append(btIn[i]);
			}
			div1.append(divInTitle2);
			for (var i=6; i<12; i++){
				div1.append(divIn[i]);
					divIn[i].append(divIn2[i]);
					divIn[i].append(inputIn[i]);
					divIn[i].append(btIn[i]);
			}
			div1.append(divInTitle3);
			for (var i=12; i<16; i++){
				div1.append(divIn[i]);
					divIn[i].append(divIn2[i]);
					divIn[i].append(inputIn[i]);
					divIn[i].append(btIn[i]);
			}
			div1.append(divInTitle4);
			for (var i=16; i<22; i++){
				div1.append(divIn[i]);
					divIn[i].append(divIn2[i]);
					divIn[i].append(inputIn[i]);
					divIn[i].append(btIn[i]);
			}
			div1.append(btReadAll);
		div0.append(div2);
			div2.append(div2Canvas);
				div2Canvas.append(caOut);
			div2.append(div2btBox);
				div2btBox.append(btStart);
				div2btBox.append(btReset);
			div2.append(div2LoadTitle);
			div2.append(div2btBox2);
			for (var i=0;i<1;i++){
				div2btBox2.append(btDefault[i]);
			}
		div0.append(div3);
			div3.append(taOut1);
			div3.append(taOut2);
			
}

function readButtonClick (){
	// Get target and verbose to taOut1
	var target = event.target;
	var tid = target.id;
	
	if (tid=="Read0"){
		muatan1.r.x = parseFloat(inputIn[0].value);
		ReadStatus[0] = 1;
		writeConsole("Read\nPosisi x Muatan 1\n\n");
	} else if (tid=="Read1"){
		muatan1.r.y = parseFloat(inputIn[1].value);
		ReadStatus[1] = 1;
		writeConsole("Read\nPosisi y Muatan 1\n\n");
	} else if (tid=="Read2"){
		muatan1.v.x = parseFloat(inputIn[2].value);
		ReadStatus[2] = 1;
		writeConsole("Read\nKecepatan x Muatan 1\n\n");
	} else if (tid=="Read3"){
		muatan1.v.y = parseFloat(inputIn[3].value);
		ReadStatus[3] = 1;
		writeConsole("Read\nKecepatan y Muatan 1\n\n");
	} else if (tid=="Read4"){
		muatan1.q = parseFloat(inputIn[4].value)*1e-6;
		ReadStatus[4] = 1;
		writeConsole("Read\nBesar Muatan dari Muatan 1\n\n");
	} else if (tid=="Read5"){
		muatan1.m = parseFloat(inputIn[5].value);
		ReadStatus[5] = 1;
		writeConsole("Read\nMassa Muatan 1\n\n");
	} else if (tid=="Read6"){
		muatan2.r.x = parseFloat(inputIn[6].value);
		ReadStatus[6] = 1;		
		writeConsole("Read\nPosisi x Muatan 2\n\n");
	} else if (tid=="Read7"){
		muatan2.r.y = parseFloat(inputIn[7].value);
		ReadStatus[7] = 1;
		writeConsole("Read\nPosisi y Muatan 2\n\n");
	} else if (tid=="Read8"){
		muatan2.v.x = parseFloat(inputIn[8].value);
		ReadStatus[8] = 1;
		writeConsole("Read\nKecepatan x Muatan 2\n\n");
	} else if (tid=="Read9"){
		muatan2.v.y = parseFloat(inputIn[9].value);
		ReadStatus[9] = 1;
		writeConsole("Read\nKecepatan y Muatan 2\n\n");
	} else if (tid=="Read10"){
		muatan2.q = parseFloat(inputIn[10].value)*1e-6;
		ReadStatus[10] = 1;
		writeConsole("Read\nBesar Muatan dari Muatan 2\n\n");
	} else if (tid=="Read11"){
		muatan2.m = parseFloat(inputIn[11].value);
		ReadStatus[11] = 1;
		writeConsole("Read\nMassa Muatan 2\n\n");
	} else if (tid=="Read12"){
		xmin = parseFloat(inputIn[12].value);
		ReadStatus[12] = 1;
		writeConsole("Read\nX minimium kotak\n\n");
	} else if (tid=="Read13"){
		xmax = parseFloat(inputIn[13].value);
		ReadStatus[13] = 1;
		writeConsole("Read\nX maximum kotak\n\n");
	} else if (tid=="Read14"){
		ymin = parseFloat(inputIn[14].value);
		ReadStatus[14] = 1;
		writeConsole("Read\nY minimium kotak\n\n");
	} else if (tid=="Read15"){
		ymax = parseFloat(inputIn[15].value);
		ReadStatus[15] = 1;
		writeConsole("Read\nY maximum kotak\n\n");
	} else if (tid=="Read16"){
		tbeg = parseFloat(inputIn[16].value);
		ReadStatus[16] = 1;
		writeConsole("Read\nWaktu awal animasi\n\n");
	} else if (tid=="Read17"){
		tend = parseFloat(inputIn[17].value);
		ReadStatus[17] = 1;
		writeConsole("Read\nWaktu akhir animasi\n\n");
	} else if (tid=="Read18"){
		dt = parseFloat(inputIn[18].value);
		ReadStatus[18] = 1;
		writeConsole("Read\nSelang waktu euler\n\n");
	} else if (tid=="Read19"){
		tdata = parseFloat(inputIn[19].value);
		ReadStatus[19] = 1;
		writeConsole("Read\nSelang waktu bola dianimasikan dan dituliskan\n\n");
	} else if (tid=="Read20"){
		tproc = parseFloat(inputIn[20].value);
		ReadStatus[20] = 1;
		writeConsole("Read\nTproc\n\n");
	} else if (tid=="Read21"){
		radiusbola = parseFloat(inputIn[21].value);
		ReadStatus[21] = 1;
		writeConsole("Read\nRadius Bola\n\n");
	} else if (tid=="ReadAll"){
		muatan1.r.x = parseFloat(inputIn[0].value);
		muatan1.r.y = parseFloat(inputIn[1].value);
		muatan1.v.x = parseFloat(inputIn[2].value);
		muatan1.v.y = parseFloat(inputIn[3].value);
		muatan1.q = parseFloat(inputIn[4].value);
		muatan1.m = parseFloat(inputIn[5].value);
		muatan2.r.x = parseFloat(inputIn[6].value);
		muatan2.r.y = parseFloat(inputIn[7].value);
		muatan2.v.x = parseFloat(inputIn[8].value);
		muatan2.v.y = parseFloat(inputIn[9].value);
		muatan2.q = parseFloat(inputIn[10].value);
		muatan2.m = parseFloat(inputIn[11].value);
		tbeg = parseFloat(inputIn[16].value);
		xmin = parseFloat(inputIn[12].value);
		xmax = parseFloat(inputIn[13].value);
		ymin = parseFloat(inputIn[14].value);
		ymax = parseFloat(inputIn[15].value);
		tend = parseFloat(inputIn[17].value);
		dt = parseFloat(inputIn[18].value);
		tdata = parseFloat(inputIn[19].value);
		tproc = parseFloat(inputIn[20].value);
		radiusbola = parseFloat(inputIn[21].value);
		for (var i=0; i<22; i++){
			ReadStatus[i] = 1;
		}
		writeConsole("Read\nRead All\n\n");
	}
	if(CekStatus){
		clearCanvas();
		drawCanvas();
	}
}

function loadButtonClick(){
	// Get target and verbose to taOut1
	var target = event.target;
	var tid = target.id;
	
	if (tid==0) {
		LoadDefault(tid);
		writeConsole("Default 0 loaded\nData simulasi partikel saling tarik menarik\n\n");
	}

	for (var i=0;i<22;i++){
		btIn[i].disabled = false;
	}
	btReadAll.disabled=false;
}

function buttonClick(){
	var target = event.target;
	var name = target.innerHTML;
	
	if (name=="Start"&&CekStatus()){
		initData();
		target.innerHTML = "Stop";
		disableReadButton;
		btReset.disabled=true;
		writeConsole("Simulasi dimulai\n\n");
		proc = setInterval(simulate, tproc);
	} else if (name=="Start"&&!CekStatus()){
		var alertext = "";
		for (var i=0; i<22;i++){
			alertext += divIn2[i].innerHTML + " belum diread\n";
		}
		alert(alertext);
	} else if (name=="Stop"){
		target.innerHTML = "Resume";
		enableReadButton;
		btReset.disabled=false;
		writeConsole("Simulasi selesai\n\n");
		clearInterval(proc);
	} else if (name=="Resume"){
		target.innerHTML = "Stop";
		disableReadButton;
		btReset.disabled=true;
		writeConsole("Simulasi dilanjutkan\n\n");
		proc = setInterval(simulate, tproc);
	} else if (name=="Reset"){
		resetAll();
		writeConsole("Reset Berhasil");
	}
}

function LoadDefault(i){
	if (i==0){
		inputIn[0].value=-5; //x1
		inputIn[1].value=0; //y1
		inputIn[2].value=0; //vx1
		inputIn[3].value=0; //vy1
		inputIn[4].value=1; //q1
		inputIn[5].value=1; //m1
		inputIn[6].value=5; //x2
		inputIn[7].value=0; //y2
		inputIn[8].value=0; //vx2
		inputIn[9].value=0; //vy2
		inputIn[10].value=-1; //q2
		inputIn[11].value=1; //m2
		inputIn[12].value=-10; //xmin
		inputIn[13].value=10; //xmax
		inputIn[14].value=-10; //ymin
		inputIn[15].value=10; //ymax
		inputIn[16].value=0; //tbeg
		inputIn[17].value=1; //tend
 		inputIn[18].value=0.001; //dt
		inputIn[19].value=0.01; //tdata
		inputIn[20].value=1; //tproc
		inputIn[21].value=0.5; //radius
	}
}

function initData (){
	t=tbeg;
	t2=0;
	writeTa("t\tx1\ty1\tv1x\tv1y\tx2\ty2\tv2x\tv2y\n");
	writeTa(t+"\t"+muatan1.r.x+"\t"+muatan1.r.y+"\t"+muatan1.v.x+"\t"+muatan1.v.y+
			  "\t"+muatan2.r.x+"\t"+muatan2.r.y+"\t"+muatan2.v.x+"\t"+muatan2.v.y+"\n");
			  
	F12 = muatan.vektorGaya(muatan1,muatan2);  //gaya pada muatan 1 akibat muatan 2
	a12 = vec3.divideScalar(F12,muatan1.m);
	v1baru = vec3.add(muatan1.v,vec3.multiplyScalar(a12,dt));
	r1baru = vec3.add(muatan1.r,vec3.multiplyScalar(muatan1.v,dt));
	F21 = muatan.vektorGaya(muatan2,muatan1);
	a21 = vec3.divideScalar(F21,muatan2.m);
	v2baru = vec3.add(muatan2.v,vec3.multiplyScalar(a21,dt));
	r2baru = vec3.add(muatan2.r,vec3.multiplyScalar(muatan2.v,dt));
	
	writeConsole(t+"\t"+F12.x+"\t"+vec3.show(muatan.vektorGaya(muatan1,muatan2))
					+"\t"+vec3.show(muatan.arahGaya(muatan1,muatan2))
					+"\t"+muatan.besarGaya(muatan1,muatan2));
}

function resetAll (){
	clearCanvas();
	taOut1.value="";
	disableReadButton ();
	for (var i=0;i<22;i++){
		ReadStatus[i]=0;
		inputIn[i].value="";
	}
	
	btStart.innerHTML="Start";
}

function disableReadButton (){
	for (var i=0;i<22;i++){
		btIn[i].disabled=true;
	}
	btReadAll.disabled=true;
}

function enableReadButton (){
	for (var i=0;i<22;i++){
		btIn[i].disabled=false;
	}
	btReadAll.disabled=false;
}

function drawCanvas (){
	var cx = caOut.getContext("2d");
	
	x1= transformX (muatan1.r.x);
	x2= transformX (muatan2.r.x);
	y1= transformY (muatan1.r.y);
	y2= transformY (muatan2.r.y);
	radius = transformR (radiusbola);
	
	drawBall (x1,y1,radius);
	drawBall (x2,y2,radius);

	function transformX (x){ //transform to canvas coordinate
		return ((x-xmin) * caOut.width/(xmax-xmin));
	}
	function transformY (y){
		return ((y-ymin) * caOut.width/(ymax-ymin));
	}
	
	function transformR (r){ //transform to canvas coordinate
		return (r * caOut.width/(xmax-xmin));
	}
	
	function drawBall(x,y,ballradius){
		cx.beginPath();
		cx.arc(x,y,ballradius,0,2*Math.PI);
		cx.fillStyle = "#a8f";
		cx.closePath();
		cx.fill();
		
		cx.beginPath();
		cx.arc(x,y,ballradius,0,2*Math.PI);
		cx.strokeStyle = "#000";
		cx.stroke();
	}
}

function clearCanvas (){
	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);
}

function CekStatus(){
	var sum=0;
	for (var i=0;i<22;i++){
		sum+=ReadStatus[i];
	}
	return (sum==22);
}
function writeConsole (){
	var msg = arguments[0];
	taOut2.value += msg;
	taOut2.scrollTop = taOut2.scrollHeight;
}

function writeTa (){
	var msg = arguments[0];
	taOut1.value += msg;
	taOut1.scrollTop = taOut1.scrollHeight;
}
//Membuat objek muatan
function muatan (){
	this.q = 0; //Mendefisikan 
	this.m = 1; //Mendefisikan massa;
	this.r = new vec3(); //Mendefiniskan posisi;
	this.v = new vec3(); //Mendefiniskan kecepatan;
	
	muatan.perpindahan1ke2 = function(muatan1,muatan2){ //Menghasilkan perpindahan dari 1 ke 2
		return vec3.substract(muatan1.r,muatan2.r);
	}
	muatan.jarak = function(muatan1,muatan2){
		return vec3.magnitude(muatan.perpindahan1ke2(muatan1,muatan2)); //Menghasilkan jarak antara 2 muatan
	}
	
	muatan.besarGaya = function(muatan1,muatan2){ //Menghasilkan besar gaya coulomb
		return muatan1.q*muatan2.q/vec3.dot(muatan.perpindahan1ke2(muatan1,muatan2),muatan.perpindahan1ke2(muatan1,muatan2)); 
	}
	
 	muatan.arahGaya = function(muatan1,muatan2){ //Menghasilkan arah gaya coulomb

		return vec3.unit(muatan.perpindahan1ke2(muatan1,muatan2));
	}
	
	muatan.vektorGaya = function(muatan1,muatan2){//Menghasilkan vektor gaya coulomb
		return vec3.multiplyScalar (muatan.arahGaya(muatan1,muatan2),muatan.besarGaya(muatan1,muatan2));
	}
}

//Membuat objek vektor 3D
function vec3( x, y, z ) {
	
	//constructor
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	
	//setter
	vec3.set = function(x,y,z){
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		return this;
	}
	//getter
	vec3.getX = function(r){
		return r.x;
	}
	vec3.getY = function(r){
		return r.y;
	}
	vec3.getZ = function(r){
		return r.z;
	}
	vec3.add = function(r1,r2){
		return vec3.set(r1.x+r2.x,r1.y+r2.y,r1.z+r2.z);
	}
	
	vec3.substract = function(r1,r2){
		return vec3.set(r1.x-r2.x,r1.y-r2.y,r1.z-r2.z);
	}
	
	vec3.divideScalar = function(r,c){
		return vec3.set(r.x/c,r.y/c,r.z/c);
	}
	vec3.multiplyScalar = function(r,c){
		return vec3.set(r.x*c,r.y*c,r.z*c);
	}
	vec3.dot = function(r1,r2){
		return r1.x*r2.x+r1.y*r2.y+r1.z*r2.z;
	}
	
	vec3.magnitude = function(r){
		return Math.sqrt(vec3.dot(r,r));
	}
	
	vec3.unit = function(r){
		return vec3.divideScalar(r,vec3.magnitude(r));
	}
	
	vec3.cross = function(r1,r2){
		return vec3.setter(r1.y*r2.z-r2.y*r1.z,r1.z*r2.x-r2.z*r1.x,r1.x*r2.y-r2.x*r1.y);
	}
	
	vec3.show = function(r){
		return "("+r.x+","+r.y+","+r.z+")";
	}
}

