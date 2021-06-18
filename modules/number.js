module.exports = {
    plural (sinword, pluword, number) {
        return (number<2) ? sinword:pluword;
    }
}