const {
    stdin,
    stdout
} = require("process")
const readline = require("readline")

function strToAscii(str) {
    return [...str].map(char => char.charCodeAt(0))
}

function numToBinary(number) {
    let str = ""
    for (let maxSafeInt = 52; maxSafeInt != -1; maxSafeInt--) {
        if (2 ** maxSafeInt <= number) {
            str += "1"
            number -= 2 ** maxSafeInt
        } else str += "0"
    }
    return str.replace(/^0+/g, "")
}

function encrypt(str) {
    return strToAscii(str).map(numToBinary).join(" ")
}

function binaryToNum(binary) {
    let num = 0
    for (let [index, char] of [...binary].reverse().entries()) {
        if (char === "1") num += 2 ** index
    }
    return num
}

function decrypt(str) {
    const binaries = str.split(" ")
    const nums = binaries.map(binaryToNum)
    return nums.map(num => String.fromCharCode(num)).join("")
}
const rl = readline.createInterface({
    input: stdin,
    output: stdout
})

rl.on('line', (data) => {
    if ([...data].every(char => char.match(/[0 1]/g))) {
        console.log("\nDecrypted")
        console.log(decrypt(data) + "\n")
    } else {
        console.log("\nEncrypted")
        console.log(encrypt(data) + "\n")
    }
})