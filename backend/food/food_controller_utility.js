
function arrayIntoTupleParameter(list) {
    let converted = '"buffer"';

    for (let i=0; i<list.length;i++) {
        converted = converted + `, "${list[i]}"`
    }
    return converted;
}

export {
    arrayIntoTupleParameter
}