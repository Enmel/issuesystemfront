const uniqueReducer = <T>(array: Array<T>) => {

    let inicialValue : Array<T> = [];

    return array.reduce((acc, item) => {
        
        let index = acc.findIndex((ittem2 : any) => JSON.stringify(item) === JSON.stringify(ittem2));

        if (index === -1) {
            acc.push(item)
            return acc;
        }

        return acc

    }, inicialValue)
}

export {uniqueReducer};