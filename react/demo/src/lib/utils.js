export const randomColor = () => {
    let r=Math.floor(255*Math.random());
    let g=Math.floor(255*Math.random());
    let b=Math.floor(255*Math.random());
    return `rgba(${r},${g},${b},${Math.random().toFixed(2)})`
}