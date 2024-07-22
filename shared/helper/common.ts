export const convertToRGB = (index: number, str: string, opacity?: number) => {
    if (index == 0) { return opacity != undefined ? `rgba(40, 100, 255, ${opacity / 100})` : 'rgb(40, 100, 255)' }
    if (index == 1) { return opacity != undefined ? `rgba(154, 117, 236, ${opacity / 100})` : 'rgb(154, 117, 236)' }
    if (index == 2) { return opacity != undefined ? `rgba(42, 153, 40, ${opacity / 100})` : 'rgb(42, 153, 40)' }
    if (index == 3) { return opacity != undefined ? `rgba(244, 182, 60, ${opacity / 100})` : 'rgb(244, 182, 60)' }
    if (index == 4) { return opacity != undefined ? `rgba(232, 12, 12, ${opacity / 100})` : 'rgb(232, 12, 12)' }

    let hash = 0;
    for (let i = 0; i < str?.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate RGB values
    const red = (hash & 0xFF0000) >> 16;
    const green = (hash & 0x00FF00) >> 8;
    const blue = hash & 0x0000FF;

    if (opacity != undefined)
        return `rgba(${red}, ${green}, ${blue}, ${opacity / 100})`;
    else
        return `rgb(${red}, ${green}, ${blue})`;
}