async function testMe(name, callback) {
	console.log("I have entered the testMe method");
	let date = "";
	for(let i=0; i <10000000; i ++){
		date = new Date();
	}
    console.log("This is the date",date);
	callback();	
}


console.log("I am running on the main thread");
testMe("Sudarshan", () => {
	console.log("I am the callback function");
})

console.log("I am ending the program");