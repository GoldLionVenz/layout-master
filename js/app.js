const unsplash= new Unsplash()
const layout=new MasonryLayout()
let colm=4
const spinner=document.querySelector('.spinner')
const modal_img=document.getElementById('img-modal')
const imgs=document.querySelector('.imagenes')

if(window.innerWidth<500)
    colm=2
if(window.innerWidth<850&&window.innerWidth>500)
    colm=3
init();

function init(){
    spinner.style.display='block'
    
    unsplash.getPics()
    .then(data=>{
        builImgs(data)
    }) .finally(() => {
        spinner.style.display='none'
      })
}


document.getElementById('form').addEventListener('submit',e=>{
    e.preventDefault();
    const query=document.getElementById('search').value
    imgs.innerHTML=''
    spinner.style.display='block'
    unsplash.getQuery(query)
        .then(data=>{
            builImgs(data)
        }) .finally(() => {
            spinner.style.display='none'
          }) 
})

document.querySelector('.imagenes').addEventListener('click',e=>{
    e.preventDefault();
    if(e.target.parentElement.parentElement.classList.contains('gallery-item')){
        
        const img= createCustomElement('img',{
            src: e.target.src
        },)
        printModal(img)  
        
    }
})

function builImgs(data){
    data.forEach(dato=>{
        const template=`
        <a href="#">
            <img src="${dato.urls.regular}" alt="">
        </a>`
        const contenedor=document.createElement('div')
        contenedor.className='gallery-item'
        contenedor.innerHTML=template
        imgs.appendChild(contenedor)
    })
    layout.buil(imgs,
        document.querySelectorAll('.gallery-item'), colm)
}

// Añadir un objeto de atributos a un elemento
const addAttributes = (element, attrObj) => {
    for (let attr in attrObj) {
      if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr]);
    }
  };
  // Crear elementos con atributos e hijo 
  const createCustomElement = (element, attributes, children) => {
    let customElement = document.createElement(element);
    if (children !== undefined)
      children.forEach(el => {
        if (el.nodeType) {
          if (el.nodeType === 1 || el.nodeType === 11)
            customElement.appendChild(el);
        } else {
          customElement.innerHTML += el;
        }
      });
    addAttributes(customElement, attributes);
    return customElement;
  };
  
  const printModal = content => {
    const modalContentEl = createCustomElement(
      "div",
      {
        id: "modal-content",
        class: "modal-content"
      },
      [content]
    );
  
    const modalContainerEl = createCustomElement(
      "div",
      {
        id: "modal-container",
        class: "modal-container"
      },
      [modalContentEl]
    );
    modalContainerEl.style.top=`{window.scrollY}px`
    
    //Imprimir el modal
    document.body.appendChild(modalContainerEl);
    
    const removeModal=()=>document.body.removeChild(modalContainerEl)
    
    modalContainerEl.addEventListener('click', e=>{
      if(e.target===modalContainerEl) removeModal()
    })
  };
  
