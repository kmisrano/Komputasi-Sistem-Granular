/*
	hello.js
	Menampilkan tulisan hello, nama, dan nim ke pengguna
	
	Kevin Misrano Khanwijaya | misranok@gmail.com | https://github.com/kmisrano
	
	Include: <script src="hello.js"></script> in a HTML file
	Execute: Refresh web browser viewing the HTML file
	
	20190320
	1540 Start
*/
main();

function main() {
	var TA = document.createElement("Textarea");
	TA.value = "Hello, Kevin Misrano Khanwijaya yang ber-NIM 10215012!";
	TA.style.width = "400px";
	TA.style.height= "20px";
	document.body.append(TA);
}