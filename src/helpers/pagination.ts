
export const getPaginationArray = (pageNumber: number, totalPage: number): (number | string)[] => {
    if(totalPage <= 4){
        const arr = Array.from({length: totalPage}, (_, i) => i + 1);
        return arr;
    }

    if(pageNumber === 1){
        return [1, 2, 3, "...", totalPage];
    }

    if(pageNumber >= 2 && pageNumber+2 < totalPage){
        return [pageNumber-1, pageNumber, pageNumber+1, "...", totalPage];
    }

    if(pageNumber >= 2 && pageNumber+2 >= totalPage){
        return [totalPage-3, totalPage-2, totalPage-1, totalPage]
    }

    return [];
}