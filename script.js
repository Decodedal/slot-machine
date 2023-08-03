const spin = document.querySelector('#spin')
const slots = document.querySelectorAll('.slot')
let emoji = ['😻', '❤️', '🤣', '🎶', '⭐', '🤑']
let spinning
spin.addEventListener('click', play)
let controller = document.querySelectorAll('.controller')
let bet = document.querySelector('#money')
let bettingMoney = 0
let total = document.querySelector('#total')
let totalMoney = 2000
let winnings = 0 
let winHtml = document.querySelector('#wins')
let message = document.querySelector('#message')


total.innerHTML = totalMoney

function setMessage(string){
    message.innerHTML = string
    setTimeout(()=>{
        message.innerHTML = ''
    },2000)
}

controller.forEach((button)=>{
    button.addEventListener('click',()=>{
        console.log("clicked")
        if(button.innerHTML == '-' && bettingMoney != 0){
            bettingMoney -= 100
        }else if(button.innerHTML == '+' && bettingMoney + 100 <= totalMoney){
            bettingMoney += 100
        }
        bet.innerHTML = bettingMoney
    })
})
    



function play() {
    let countArr = []
    slots.forEach((slot, i) => {
        let start = Math.abs(Math.floor(Math.random() * 10 - 5))
        let max = 5
        let count = 0
        spinning = true
        let time = (i * 100) + 300
        const playloop = setInterval(()=>{
            if(count < max){
                count++
            }else{
                count = start
            }
            slot.innerHTML = emoji[count]
        },time)
        setTimeout(() => {
            clearInterval(playloop)
            countArr.push(count)
        }, 5000)
    })
    setTimeout(()=>{
        executeBet(countArr)
    },5001)

}

function executeBet(arr){
    if(arr.every((val => val === 2)) || arr.every((val => val === 2))){
        winnings += bettingMoney * 3
        winHtml.innerHTML = winnings
        setMessage("Wow Three of a kind!")
    }
    else if(arr.every((val => val === 0)) || arr.every((val => val === 1))){
        winnings += bettingMoney * 5
        winHtml.innerHTML = winnings
        setMessage("High roller Alert")
    }
    else if(arr.every((val => val === 4)) || arr.every((val => val === 5))){
        winnings += bettingMoney * 10
        winHtml.innerHTML = winnings
        setMessage("JACKPOT!!!")
    }else if(arr[0] === arr[2]){
        winnings += bettingMoney * .3
        winHtml.innerHTML = winnings
        setMessage("Nice!")
    }else if(arr[0] === arr[1] || arr[1] === arr[2]){
        winnings += bettingMoney * .6
        winHtml.innerHTML = winnings
        setMessage("two of a kind!")
    }
     let newMoney = (totalMoney - bet) + winnings
     total.innerHTML = newMoney
}