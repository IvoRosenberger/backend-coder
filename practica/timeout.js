const tempo = (callback) => {
    setTimeout(callback,2000)
}

const operacion = () => console.log('BOOM')


console.log('tik tik')
tempo(operacion)
console.log('fin')
