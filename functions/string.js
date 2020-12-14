module.exports = {
    correctCase(string){
        let out = "";
        let arr = string.split(" ");
        for (let word of arr) {
            out += word[0].toUpperCase() + word.slice(1).toLowerCase()  +" ";
        }
        return out.trim();
    }
}