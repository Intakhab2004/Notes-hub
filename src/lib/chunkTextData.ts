
export function chunkTextData(text: string): string[] {
    const chunkSize = 3000;
    const chunks = [];

    let start = 0;
    while(start < text.length){
        chunks.push(text.slice(start, start + chunkSize));
        start += chunkSize;
    }

    return chunks;
}