class MasonryLayout{
    buil(containerElem, itemsElems, columns){
        containerElem.classList.add('masonry-layout', `columns-${columns}`)
        let columnsElements = []
    
        for( let i = 0; i < columns; i++){
            let column = document.createElement('div')
            column.classList.add('masonry-column', `column-${i+1}`)
            containerElem.appendChild(column)
            columnsElements.push(column)
        }
    
        for(let i = 0; i < Math.ceil(itemsElems.length / columns); i++){
            for(let j = 0; j < columns; j++){
                let item = itemsElems[ i * columns + j]
                if(item){
                columnsElements[j].appendChild(item)
                item.classList.add('masonry-item')}
            }
        }
    }
}