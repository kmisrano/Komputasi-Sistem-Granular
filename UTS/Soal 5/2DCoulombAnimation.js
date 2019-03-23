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
	0827 Detected problem at object, moving object to comment, changing all code to work without object
	0844 Creating more default problem set
	1102 Finishing touch, completing missing detail
*/

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
var btStop,btStart,btReset,btInfo,btDataSetInfo;
var btDefault = [];

//div3 layout variables
var taOut1,taOut2;
var x1,x2,y1,y2,v1x,v2x,v1y,v2y,q1,q2,m1,m2;
main();
function main (){
	setElementsLayout();
	writeConsole("Tekan Help untuk membaca panduan \n");
	writeConsole("Tekan Data Info untuk membaca informasi data set\n");
	writeConsole("Tekan Info untuk mengetahui informasi penulis\n\n");
}
function simulate() {
	// Stop simulation
	if(t >= tend) {
		btStart.innerHTML = "Start";
		btReset.disabled = false;
		btStop.disabled = true;	
		writeConsole("Simulasi berhenti pada waktu akhir\n\n");
		clearInterval(proc);
		for (var i=0;i<22;i++){
			ReadStatus[i]=0;
		}
		enableReadButton();
	}
	
	// Verbose result each tdata period
	if(t2 >= tdata) {
		
		writeTa(
			t.toFixed(2)+ "\t" +
			x1.toFixed(2) + "\t" +
			y1.toFixed(2) + "\t" +
			v1x.toFixed(2) + "\t " +
			v1y.toFixed(2) + "\t " +
			x2.toFixed(2) + "\t " +
			y2.toFixed(2) + "\t " +
			v2x.toFixed(2) + "\t " +
			v2y.toFixed(2) + "\t " +
			"\n"
		);
		clearCanvas();
		drawCanvas();
		
		t2-=tdata;
	}
		
	// Calculate acceleration, velocity, and position
	var besarF = 9e9*q1*q2/((y1-y2)*(y1-y2)+(x1-x2)*(x1-x2));
	var arahFx12 = (x1-x2)/Math.sqrt((y1-y2)*(y1-y2)+(x1-x2)*(x1-x2));
	var arahFy12 = (y1-y2)/Math.sqrt((y1-y2)*(y1-y2)+(x1-x2)*(x1-x2));
	var ax12 = besarF * arahFx12/m1;
	var ay12 = besarF * arahFy12/m1;
	var ax21 = -besarF * arahFx12/m2;
	var ay21 = -besarF * arahFy12/m2;
	x1 = x1 + dt*v1x;
	y1 = y1 + dt*v1y;
	x2 = x2 + dt*v2x;
	y2 = y2 + dt*v2y;
	v1x = v1x + dt*ax12;
	v1y = v1y + dt*ay12;
	v2x = v2x + dt*ax21;
	v2y = v2y + dt*ay21;
	
	
	
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
		
	divIn2[0].innerHTML = "x1";
	divIn2[1].innerHTML = "y1";
	divIn2[2].innerHTML = "v1x";
	divIn2[3].innerHTML = "v1y";
	divIn2[4].innerHTML = "q1(&#181;C)";
	divIn2[5].innerHTML = "m1";
	divIn2[6].innerHTML = "x2";
	divIn2[7].innerHTML = "y2";
	divIn2[8].innerHTML = "v2x";
	divIn2[9].innerHTML = "v2y";
	divIn2[10].innerHTML = "q2(&#181;C)";
	divIn2[11].innerHTML = "m2";
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
	
	for (var i=0; i<8; i++){		
		btDefault[i] = document.createElement("Button");
		btDefault[i].id = i;
		var j=i+1;
		btDefault[i].innerHTML = "Data "+j;
		btDefault[i].style.width = "60px";
		btDefault[i].style.float = "center";
		btDefault[i].addEventListener("click", loadButtonClick);
	}	
	
	btDefault[0].info = "Data simulasi partikel saling tarik menarik tanpa kecepatan awal\n\n";
	btDefault[1].info = "Data simulasi partikel saling tolak menolak tanpa kecepatan awal\n\n";
	btDefault[2].info = "Data simulasi partikel saling tarik menarik dengan kecepatan awal\n\n";
	btDefault[3].info = "Data simulasi partikel saling tolak menolak dengan kecepatan awal\n\n";
	btDefault[4].info = "Data simulasi partikel saling tarik menarik dengan kecepatan tangensial dan Massa 1 >> Massa 2,";
	btDefault[4].info += "sehingga partikel 1 hampir tidak bergerak dan partikel 2 berputar mengelilingi partikel 1\n";
	btDefault[4].info += "Data diperoleh dengan perhitungan analitik, tidak diperoleh lintasan lingkaran sempurna karena galat metode euler\n\n";
	btDefault[5].info = "Data simulasi partikel saling tarik menarik dengan kecepatan tangensial dan Massa 1 == Massa 2\n";
	btDefault[5].info += "Data diperoleh dengan perhitungan analitik sehingga kedua partikel mengitari titik tengah antara 2 partikel\n";
	btDefault[5].info += "Tidak diperoleh lintasan lingkaran yang sempurna karena galat metode euler\n\n";
	btDefault[6].info = "Seperti pada data 5, tetapi kedua partikel diberi kecepatan ke kanan sehingga terlihat seperti partikel 2 yang sedang mengorbit pada partikel 1 yang sedang bergerak\n";
	btDefault[6].info += "Tidak diperoleh lintasan orbit yang lingkaran sempurna karena galat metode euler\n\n";
	btDefault[7].info = "Seperti pada data 6, tetapi kedua partikel diberi kecepatan ke kanan sehingga terlihat seperti 2 partikel yang mengorbit pada titik kosong\n";
	btDefault[7].info += "Tidak diperoleh lintasan orbit yang lingkaran sempurna karena galat metode euler\n\n";
	
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

	btStop = document.createElement("button");
	btStop.innerHTML = "Stop";
	btStop.style.width = "70px";
	btStop.addEventListener("click", buttonClick);
	btStop.disabled = true;
	
	btInfo = document.createElement("button");
	btInfo.innerHTML = "Info";
	btInfo.style.width = "80px";
	btInfo.addEventListener("click", informasi);
	
	btDataSetInfo = document.createElement("button");
	btDataSetInfo.innerHTML = "Data Info";
	btDataSetInfo.style.width = "80px";
	btDataSetInfo.addEventListener("click", informasidataset);
	
	btReset = document.createElement("button");
	btReset.innerHTML = "Reset";
	btReset.style.width = "70px";
	btReset.addEventListener("click", buttonClick);
	
	btClear = document.createElement("button");
	btClear.innerHTML = "Clear Log";
	btClear.style.width = "80px";
	btClear.addEventListener("click", buttonClick);
	
	btHelp = document.createElement("button");
	btHelp.innerHTML = "Help";
	btHelp.style.width = "80px";
	btHelp.addEventListener("click", informasiBantuan);
	
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
	div2LoadTitle.innerHTML = "Daftar Data Set:";
	div2LoadTitle.align = "center";
	
	// Create ouput textarea
	taOut1 = document.createElement("textarea");
	taOut1.width = 550;
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
				div2btBox.append(btInfo);
				div2btBox.append(btHelp);
				div2btBox.append(btStop);
				div2btBox.append(btStart);
				div2btBox.append(btReset);
				div2btBox.append(btClear);
				div2btBox.append(btDataSetInfo);
			div2.append(div2LoadTitle);
			div2.append(div2btBox2);
			for (var i=0;i<8;i++){
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
		x1 = parseFloat(inputIn[0].value);
		if(inputIn[0].value!="") ReadStatus[0] = 1;
		if(inputIn[0].value=="") alert("Data Kosong");
		else writeConsole("Read\nPosisi x Muatan 1\n\n");
	} else if (tid=="Read1"){
		y1 = parseFloat(inputIn[1].value);
		if(inputIn[1].value!="") ReadStatus[1] = 1;
		if(inputIn[1].value=="") alert("Data Kosong");
		else writeConsole("Read\nPosisi y Muatan 1\n\n");
	} else if (tid=="Read2"){
		v1x = parseFloat(inputIn[2].value);
		if(inputIn[2].value!="") ReadStatus[2] = 1;
		if(inputIn[2].value=="") alert("Data Kosong");
		else writeConsole("Read\nKecepatan x Muatan 1\n\n");
	} else if (tid=="Read3"){
		v1y = parseFloat(inputIn[3].value);
		if(inputIn[3].value!="") ReadStatus[3] = 1;
		if(inputIn[3].value=="") alert("Data Kosong");
		else writeConsole("Read\nKecepatan y Muatan 1\n\n");
	} else if (tid=="Read4"){
		q1 = parseFloat(inputIn[4].value)*1e-6;
		if(inputIn[4].value!="") ReadStatus[4] = 1;
		if(inputIn[4].value=="") alert("Data Kosong");
		else writeConsole("Read\nBesar Muatan dari Muatan 1\n\n");
	} else if (tid=="Read5"){
		m1 = parseFloat(inputIn[5].value);
		if(inputIn[5].value!="") ReadStatus[5] = 1;
		if(inputIn[5].value=="") alert("Data Kosong");
		else writeConsole("Read\nMassa Muatan 1\n\n");
	} else if (tid=="Read6"){
		x2 = parseFloat(inputIn[6].value);
		if(inputIn[6].value!="") ReadStatus[6] = 1;		
		if(inputIn[6].value=="") alert("Data Kosong");
		else writeConsole("Read\nPosisi x Muatan 2\n\n");
	} else if (tid=="Read7"){
		y2 = parseFloat(inputIn[7].value);
		if(inputIn[7].value!="") ReadStatus[7] = 1;
		if(inputIn[7].value=="") alert("Data Kosong");
		else writeConsole("Read\nPosisi y Muatan 2\n\n");
	} else if (tid=="Read8"){
		v2x = parseFloat(inputIn[8].value);
		if(inputIn[8].value!="") ReadStatus[8] = 1;
		if(inputIn[8].value=="") alert("Data Kosong");
		else writeConsole("Read\nKecepatan x Muatan 2\n\n");
	} else if (tid=="Read9"){
		v2y = parseFloat(inputIn[9].value);
		if(inputIn[9].value!="") ReadStatus[9] = 1;
		if(inputIn[9].value=="") alert("Data Kosong");
		else writeConsole("Read\nKecepatan y Muatan 2\n\n");
	} else if (tid=="Read10"){
		q2 = parseFloat(inputIn[10].value)*1e-6;
		if(inputIn[10].value!="") ReadStatus[10] = 1;
		if(inputIn[10].value=="") alert("Data Kosong");
		else writeConsole("Read\nBesar Muatan dari Muatan 2\n\n");
	} else if (tid=="Read11"){
		m2 = parseFloat(inputIn[11].value);
		if(inputIn[11].value!="") ReadStatus[11] = 1;
		if(inputIn[11].value=="") alert("Data Kosong");
		else writeConsole("Read\nMassa Muatan 2\n\n");
	} else if (tid=="Read12"){
		xmin = parseFloat(inputIn[12].value);
		if(inputIn[12].value!="") ReadStatus[12] = 1;
		if(inputIn[12].value=="") alert("Data Kosong");
		else writeConsole("Read\nX minimium kotak\n\n");
	} else if (tid=="Read13"){
		xmax = parseFloat(inputIn[13].value);
		if(inputIn[13].value!="") ReadStatus[13] = 1;
		if(inputIn[13].value=="") alert("Data Kosong");
		else writeConsole("Read\nX maximum kotak\n\n");
	} else if (tid=="Read14"){
		ymin = parseFloat(inputIn[14].value);
		if(inputIn[14].value!="") ReadStatus[14] = 1;
		if(inputIn[14].value=="") alert("Data Kosong");
		else writeConsole("Read\nY minimium kotak\n\n");
	} else if (tid=="Read15"){
		ymax = parseFloat(inputIn[15].value);
		if(inputIn[15].value!="") ReadStatus[15] = 1;
		if(inputIn[15].value=="") alert("Data Kosong");
		else writeConsole("Read\nY maximum kotak\n\n");
	} else if (tid=="Read16"){
		tbeg = parseFloat(inputIn[16].value);
		if(inputIn[16].value!="") ReadStatus[16] = 1;
		if(inputIn[16].value=="") alert("Data Kosong");
		else writeConsole("Read\nWaktu awal animasi\n\n");
	} else if (tid=="Read17"){
		tend = parseFloat(inputIn[17].value);
		if(inputIn[16].value!="") ReadStatus[17] = 1;
		if(inputIn[16].value=="") alert("Data Kosong");
		else writeConsole("Read\nWaktu akhir animasi\n\n");
	} else if (tid=="Read18"){
		dt = parseFloat(inputIn[18].value);
		if(inputIn[18].value!="") ReadStatus[18] = 1;
		if(inputIn[18].value=="") alert("Data Kosong");
		else writeConsole("Read\nSelang waktu euler\n\n");
	} else if (tid=="Read19"){
		tdata = parseFloat(inputIn[19].value);
		if(inputIn[19].value!="") ReadStatus[19] = 1;
		if(inputIn[19].value=="") alert("Data Kosong");
		else writeConsole("Read\nSelang waktu bola dianimasikan dan dituliskan\n\n");
	} else if (tid=="Read20"){
		tproc = parseFloat(inputIn[20].value);
		if(inputIn[20].value!="") ReadStatus[20] = 1;
		if(inputIn[20].value=="") alert("Data Kosong");
		else writeConsole("Read\nTproc\n\n");
	} else if (tid=="Read21"){
		radiusbola = parseFloat(inputIn[21].value);
		if(inputIn[21].value!="") ReadStatus[21] = 1;
		if(inputIn[21].value=="") alert("Data Kosong");
		else writeConsole("Read\nRadius Bola\n\n");
	} else if (tid=="ReadAll"){
		for (var i=0; i<22; i++){
			if(inputIn[i].value!="") ReadStatus[i] = 1;
		}
		if (CekStatus()){
			x1 = parseFloat(inputIn[0].value);
			y1 = parseFloat(inputIn[1].value);
			v1x = parseFloat(inputIn[2].value);
			v1y = parseFloat(inputIn[3].value);
			q1 = parseFloat(inputIn[4].value)*1e-6;
			m1 = parseFloat(inputIn[5].value);
			x2 = parseFloat(inputIn[6].value);
			y2 = parseFloat(inputIn[7].value);
			v2x = parseFloat(inputIn[8].value);
			v2y = parseFloat(inputIn[9].value);
			q2 = parseFloat(inputIn[10].value)*1e-6;
			m2 = parseFloat(inputIn[11].value);
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
			writeConsole("Read\nRead All\n\n");
		} else alert ("Ada data yang kosong");
	}
	if(CekStatus()){
		clearCanvas();
		drawCanvas();
	}
}

function loadButtonClick(){
	// Get target and verbose to taOut1
	var target = event.target;
	var tid = target.id;
	LoadDefault(tid);
	writeConsole(target.innerHTML+" loaded\n"+target.info);
	enableReadButton();
}

function buttonClick(){
	var target = event.target;
	var name = target.innerHTML;
	
	if (name=="Start"&&CekStatus()){
		initData();
		target.innerHTML = "Pause";
		disableReadButton();
		btReset.disabled=true;
		btStop.disabled = false;
		writeConsole("Simulasi dimulai\n\n");
		proc = setInterval(simulate, tproc);
	} else if (name=="Start"&&!CekStatus()){
		var alertext = "";
		for (var i=0; i<22;i++){
			if (ReadStatus[i]==0){
				alertext += divIn2[i].innerHTML + " belum diread\n";
			}
		}
		alert(alertext);
	} else if (name=="Pause"){
		target.innerHTML = "Resume";
		btReset.disabled=false;
		writeConsole("Simulasi dihentikan\n\n");
		clearInterval(proc);
	} else if (name=="Resume"){
		target.innerHTML = "Pause";
		disableReadButton();
		btReset.disabled=true;
		writeConsole("Simulasi dilanjutkan\n\n");
		proc = setInterval(simulate, tproc);
	} else if (name=="Stop"){
		btStart.innerHTML = "Start";
		btReset.disabled = false;
		btStop.disabled = true;
		writeConsole("Simulasi dihentikan\n\n");
		clearInterval(proc);
		for (var i=0;i<22;i++){
			ReadStatus[i]=0;
		}
		enableReadButton();
	} else if (name=="Reset"){
		resetAll();
		enableReadButton();
		writeConsole("Reset Berhasil\n\n");
	}  else if (name=="Clear Log"){
		taOut2.value="";
	}
}

function LoadDefault(i){
	if (i==0){
		inputIn[0].value=-5; //x1
		inputIn[1].value=0; //y1
		inputIn[2].value=0; //vx1
		inputIn[3].value=0; //vy1
		inputIn[4].value=100; //q1
		inputIn[5].value=0.1; //m1
		inputIn[6].value=5; //x2
		inputIn[7].value=0; //y2
		inputIn[8].value=0; //vx2
		inputIn[9].value=0; //vy2
		inputIn[10].value=-100; //q2
		inputIn[11].value=0.1; //m2
		inputIn[12].value=-10; //xmin
		inputIn[13].value=10; //xmax
		inputIn[14].value=-10; //ymin
		inputIn[15].value=10; //ymax
		inputIn[16].value=0; //tbeg
		inputIn[17].value=0.8; //tend
 		inputIn[18].value=0.001; //dt
		inputIn[19].value=0.01; //tdata
		inputIn[20].value=1; //tproc
		inputIn[21].value=0.5; //radius
	} else if (i==1){
		inputIn[0].value=-3; //x1
		inputIn[1].value=0; //y1
		inputIn[2].value=0; //vx1
		inputIn[3].value=0; //vy1
		inputIn[4].value=100; //q1
		inputIn[5].value=0.1; //m1
		inputIn[6].value=3; //x2
		inputIn[7].value=0; //y2
		inputIn[8].value=0; //vx2
		inputIn[9].value=0; //vy2
		inputIn[10].value=100; //q2
		inputIn[11].value=0.1; //m2
		inputIn[12].value=-10; //xmin
		inputIn[13].value=10; //xmax
		inputIn[14].value=-10; //ymin
		inputIn[15].value=10; //ymax
		inputIn[16].value=0; //tbeg
		inputIn[17].value=0.8; //tend
 		inputIn[18].value=0.001; //dt
		inputIn[19].value=0.01; //tdata
		inputIn[20].value=1; //tproc
		inputIn[21].value=0.5; //radius
	} else if (i==2){
		inputIn[0].value=-2; //x1
		inputIn[1].value=0; //y1
		inputIn[2].value=-10; //vx1
		inputIn[3].value=0; //vy1
		inputIn[4].value=100; //q1
		inputIn[5].value=0.1; //m1
		inputIn[6].value=2; //x2
		inputIn[7].value=0; //y2
		inputIn[8].value=10; //vx2
		inputIn[9].value=0; //vy2
		inputIn[10].value=-100; //q2
		inputIn[11].value=0.1; //m2
		inputIn[12].value=-10; //xmin
		inputIn[13].value=10; //xmax
		inputIn[14].value=-10; //ymin
		inputIn[15].value=10; //ymax
		inputIn[16].value=0; //tbeg
		inputIn[17].value=0.8; //tend
 		inputIn[18].value=0.001; //dt
		inputIn[19].value=0.01; //tdata
		inputIn[20].value=1; //tproc
		inputIn[21].value=0.5; //radius
	} else if (i==3){
		inputIn[0].value=-5; //x1
		inputIn[1].value=0; //y1
		inputIn[2].value=8; //vx1
		inputIn[3].value=0; //vy1
		inputIn[4].value=100; //q1
		inputIn[5].value=1; //m1
		inputIn[6].value=5; //x2
		inputIn[7].value=0; //y2
		inputIn[8].value=-8; //vx2
		inputIn[9].value=0; //vy2
		inputIn[10].value=100; //q2
		inputIn[11].value=1; //m2
		inputIn[12].value=-10; //xmin
		inputIn[13].value=10; //xmax
		inputIn[14].value=-10; //ymin
		inputIn[15].value=10; //ymax
		inputIn[16].value=0; //tbeg
		inputIn[17].value=0.75; //tend
 		inputIn[18].value=0.001; //dt
		inputIn[19].value=0.01; //tdata
		inputIn[20].value=1; //tproc
		inputIn[21].value=0.5; //radius
	} else if (i==4){
		inputIn[0].value=0; //x1
		inputIn[1].value=0; //y1
		inputIn[2].value=0; //vx1
		inputIn[3].value=0; //vy1
		inputIn[4].value=-100; //q1
		inputIn[5].value=10000000000000; //m1
		inputIn[6].value=4; //x2
		inputIn[7].value=0; //y2
		inputIn[8].value=0; //vx2
		inputIn[9].value=150; //vy2
		inputIn[10].value=100; //q2
		inputIn[11].value=0.001; //m2
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
	} else if (i==5){
		inputIn[0].value=-4; //x1
		inputIn[1].value=0; //y1
		inputIn[2].value=0; //vx1
		inputIn[3].value=-75; //vy1
		inputIn[4].value=-100; //q1
		inputIn[5].value=0.001; //m1
		inputIn[6].value=4; //x2
		inputIn[7].value=0; //y2
		inputIn[8].value=0; //vx2
		inputIn[9].value=75; //vy2
		inputIn[10].value=100; //q2
		inputIn[11].value=0.001; //m2
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
	} else if (i==6){
		inputIn[0].value=-14; //x1
		inputIn[1].value=0; //y1
		inputIn[2].value=15; //vx1
		inputIn[3].value=0; //vy1
		inputIn[4].value=-100; //q1
		inputIn[5].value=10000000000000; //m1
		inputIn[6].value=-10; //x2
		inputIn[7].value=0; //y2
		inputIn[8].value=15; //vx2
		inputIn[9].value=150; //vy2
		inputIn[10].value=100; //q2
		inputIn[11].value=0.001; //m2
		inputIn[12].value=-20; //xmin
		inputIn[13].value=20; //xmax
		inputIn[14].value=-20; //ymin
		inputIn[15].value=20; //ymax
		inputIn[16].value=0; //tbeg
		inputIn[17].value=1; //tend
 		inputIn[18].value=0.001; //dt
		inputIn[19].value=0.01; //tdata
		inputIn[20].value=1.5; //tproc
		inputIn[21].value=0.5; //radius
	} else if (i==7){
		inputIn[0].value=-14; //x1
		inputIn[1].value=4; //y1
		inputIn[2].value=-60; //vx1
		inputIn[3].value=0; //vy1
		inputIn[4].value=-100; //q1
		inputIn[5].value=0.001; //m1
		inputIn[6].value=-14; //x2
		inputIn[7].value=-4; //y2
		inputIn[8].value=90; //vx2
		inputIn[9].value=0; //vy2
		inputIn[10].value=100; //q2
		inputIn[11].value=0.001; //m2
		inputIn[12].value=-20; //xmin
		inputIn[13].value=20; //xmax
		inputIn[14].value=-20; //ymin
		inputIn[15].value=20; //ymax
		inputIn[16].value=0; //tbeg
		inputIn[17].value=1.5; //tend
 		inputIn[18].value=0.001; //dt
		inputIn[19].value=0.01; //tdata
		inputIn[20].value=1; //tproc
		inputIn[21].value=0.5; //radius
	}
}

function initData (){
	t=tbeg;
	t2=0;
	taOut1.value="";
	writeTa("t\tx1\ty1\tv1x\tv1y\tx2\ty2\tv2x\tv2y\n");
	writeTa(t+"\t"+x1+"\t"+y1+"\t"+v1x+"\t"+v1y+
			  "\t"+x2+"\t"+y2+"\t"+v2x+"\t"+v2y+"\n");
}

function resetAll (){
	clearCanvas();
	taOut1.value="";
	btStop.disabled = true;
	for (var i=0;i<22;i++){
		ReadStatus[i]=0;
		inputIn[i].value="";
	}
	
	btStart.innerHTML="Start";
}

function informasi(){
	writeConsole("Dibuat oleh:\n"
				+"Nama\t: Kevin Misrano Khanwijaya\n"
				+"NIM\t: 10215012\n"
				+"E-mail\t: misranok@gmail\n"
				+"Date\t: 23 Maret 2019\n\n"
				)
}

function informasidataset(){
	for (var i=0;i<8;i++){
		writeConsole(btDefault[i].innerHTML+"\t:\n");
		writeConsole(btDefault[i].info);
	}
}

function informasiBantuan(){
	
	writeConsole("Informasi Tombol :\n"
				+"Info\t: Menampilkan data pribadi pembuat program\n"
				+"Help\t: Menampilkan bantuan tentang tombol dan program, serta tutorial praktis\n"
				+"Stop\t: Menghentikan simulasi yang sedang berjalan (reset waktu)\n"
				+"Start\t: Menjalankan simulasi\n"
				+"Pause\t: Memberhentikan simulasi sementara\n"
				+"Resume\t: Menjalankan kembali simulasi yang berhenti sementara\n"
				+"Reset\t: Membersihkan input box, canvas dan textarea atas dan memberhentikan simulasi\n"
				+"Clear Log\t: Membersihkan log\n"
				+"Data info\t: Memberikan informasi mengenai data set default yang diberikan\n"
				+"Data 1-8\t: Mengisi input box dengan data set default yang diberikan, penjelasan data ada pada Data Info\n"
				+"Read\t: Membaca data per variabel\n"
				+"Read All\t: Membaca semua data yang ada di atas\n\n"
		     	+"Tutorial Praktis:\n"
		     		+"1. Tekan salah satu tombol data 1-8\n"
		     		+"2. Tekan Read All\n"
		     		+"3. Start\n\n"
			+"Informasi Program :\n"
				+"Anda dapat mengisi variabel yang diinginkan dengan mengisi input box pada bagian kiri program. "
				+"Setelah input box terisi, anda dapat membaca variabel tersebut dengan menekan tombol Read. "
				+"Tombol Read atau ReadAll hanya akan berhasil jika input box bersangkutan ada isinya. "
				+"Tombol Data 1-8 dapat digunakan untuk mengisi input box dengan data set default yang telah diberikan. "
				+"Informasi data set tersebut dapat dibaca di tombol Data Info. "
				+"Tekan tombol start untuk menjalankan simulasi, tombol start hanya bisa ditekan ketika semua variabel telah dibaca\n\n"
				
				+"Selamat Menjalankan Programnya !\n\n")				
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
	
	xx1= transformX (x1);
	xx2= transformX (x2);
	yy1= transformY (y1);
	yy2= transformY (y2);
	radius = transformR (radiusbola);
	
	drawBall (xx1,yy1,radius);
	drawBall (xx2,yy2,radius);

	function transformX (x){ //transform to canvas coordinate
		return ((x-xmin) * caOut.width/(xmax-xmin));
	}
	function transformY (y){
		return ((ymax-y) * caOut.height/(ymax-ymin));
	}
	
	function transformR (r){ //transform to canvas coordinate
		return (r * caOut.width/(xmax-xmin));
	}
	
	function drawBall(x,y,ballradius){
		cx.beginPath();
		cx.arc(x,y,ballradius,0,2*Math.PI);
		cx.fillStyle = "#fca3b7";
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

function r2 (x,y){
	return x*x+y*y;
}

/*//Membuat objek muatan
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
}*/

/*//Membuat objek vektor 3D
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
		this.x=r.x*c;
		this.y=r.y*c;
		this.z=r.z*c;
		return this;
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
}*/

