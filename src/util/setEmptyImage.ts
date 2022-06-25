export const setEmptyImage = (e: DragEvent) => {
    e.dataTransfer?.setData('text/plain', 'dummy')
    // var emptyImage = document.createElement('img')
    // // Set the src to be a 0x0 gif
    // emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    // event.dataTransfer?.setData('text/html', 'fwefwfe')
}
