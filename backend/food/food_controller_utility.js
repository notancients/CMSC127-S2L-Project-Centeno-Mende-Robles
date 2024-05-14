
function arrayIntoTupleParameter(list) {
    let converted = '("buffer"';
    list.forEach(element => {
        converted = converted + `, "${element}"`
    });
    converted += ")"
    return converted;
}

export {
    arrayIntoTupleParameter
}