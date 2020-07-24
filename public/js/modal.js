    const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards){
    card.addEventListener('click', () => {
        const videoId = card.getAttribute('id');

        window.location.href = `/video?id=${videoId}`

        //modalOverlay.querySelector('iframe').src = `https://www.youtube.com/embed/${videoId}`;
        //modalOverlay.classList.add('active');
    })
}

/*document.querySelector('.close-modal').addEventListener('click',() =>{
    modalOverlay.querySelector('iframe').src = "";
    modalOverlay.classList.remove('active')
})*/

