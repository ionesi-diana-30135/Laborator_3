
function decode(bits) {
//	bits[0] = 1; //modificarea facuta de noi pentru a forta o eroare
	/*var z8=parity(bits[7]+bits[8]+bits[9]+bits[10]+bits[11]);
	var z4=parity(bits[3]+bits[4]+bits[5]+bits[6]+bits[9]);
	var z2=parity(bits[1]+bits[2]+bits[5]+bits[6]+bits[9]+bits[10]);
	var z1=parity(bits[0]+bits[2]+bits[4]+bits[6]+bits[8]+bits[10]);
	*/
/*
	var z = bits[0];
	var matrix1 = bits[1];
	var matrix2 = bits[2];
	var lengthMatrix = bits[3];
	var widthMatrix = bits[4];
	*/
	// var z0 = ...

  var length= bits.length; //vreau sa stiu lungimea ca sa stiu 2^i<=n, deci cati biti de control o sa am
  var c =[];  //the vector of controlBits
  for(var i=0;2^i<length;i++) {
        var sum = 0;  //aici calculez suma pentru fiecare z
        var count=0;  //aici tin cont ca e din 2^i din 2^i
        for(var j=2^i;j<length;j++) {
          sum = sum + bits[j];
                if(count==2^i){  //o sa numar cate pozitii adun in sum
                  count=0;
                  j=j+1+2^i;
                }
                
         }
        c[2^i] = parity(sum);
        errorPosition=errorPosition+c[2^i];
      } 
   
	var errorDetected=false;
	if (errorPosition!=0) errorDetected=true;
	if (errorDetected) {
		bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
	}
    return { errorCorrected: errorDetected, errorPosition: errorPosition, bits: bits};
}

parity = function(number){
	return number % 2;
}

reverseNumber =  function(number) {
	number = number + "";
	return number.split("").reverse("").join("");
}
transposeArrayMatrix = function(array, width, length) {
	var newArray = [];
	for(var i=0; i<width; i++) {
		newArray[i] = [];
	}
	for(var i=0; i<length; i++){
		for(var j=0; j<width; j++) {
			newArray[j].push(array[i][j]);
		}
	}
	return newArray;
}

pad = function(num,size) {
	while(num.length < size) num = "0" + num;
	return num;
}

powerOfTwo = function(number){
	return (Math.log(number)/Math.log(2)) % 1 === 0;
}

dec2Bin = function(number) {
	return number.toString(2);
}

exports.decode = decode;
