// Logica para navegação da pagina web //
const btnCadastro = document.querySelector('#btnCadastro')
const btnBusca = document.querySelector('#btnBusca')

btnCadastro.addEventListener('click', () => {
    window.scrollBy({ top: 1.1 * window.innerHeight, behavior: "smooth" })
})

btnBusca.addEventListener('click', () => {
    window.scrollBy({ top: 10 * window.innerHeight, behavior: "smooth" })
})