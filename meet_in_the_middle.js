let n = 281041;
let e = 13;
let c = 148219;
let m = 8;
let l = Math.pow(2, Math.floor(m / 2));

function powerMod(base, exponent, modulus) {
    if (exponent === 0) return 1;
    let result = 1;
    base %= modulus; 
    if (exponent < 0) {
        exponent = -exponent;
        base = modInverse(base, modulus);
    }
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus; 
        exponent = Math.floor(exponent / 2);
    }
    return result;
}

function modInverse(a, m) {
    let m0 = m;
    let y = 0, x = 1;
    if (m === 1)
        return 0;
    while (a > 1) {
        let q = Math.floor(a / m);
        let t = m;
        m = a % m, a = t;
        t = y;
        y = x - q * y;
        x = t;
    }
    if (x < 0)
        x += m0;

    return x;
}

function formFirstList(e, n, l){
    let list = [];
    for(let j = 0; j < l+1; j++){
        list.push(powerMod(j, e, n));
    }
    return list;
}

function formSecondList(e, n, l, c, flist){
    let list = [];
    for(let i = 1; i < l+1; i++){
        let val = (powerMod(i, -e, n) * c) % n;
        for(let j = 0; j < flist.length; j++){
            if(val === flist[j]){
                let M = i * j;
                console.log(`Result = ${M} \n i = ${i}, j = ${j}`);
                list.push(val);
                return list;
            }
        }
        list.push(val);
    }
    console.log("No match found.");
    return list;
}


let firstList = formFirstList(e, n, l);

console.log(`First list = ${firstList}. \n l = ${l}`);
console.log(`Second list = ${formSecondList(e, n, l, c, firstList)}`);