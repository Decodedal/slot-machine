const spin = document.querySelector('#spin')
const slots = document.querySelectorAll('.slot')
let emoji = ['😻', '❤️', '🤣', '🎶', '⭐', '🤑']
let spinning
spin.addEventListener('click', play)
let controller = document.querySelectorAll('.controller')
let bet = document.querySelector('#money')
let bettingMoney = 100
let total = document.querySelector('#total')
let totalMoney = 2000
let winTotal = 0 
let winHtml = document.querySelector('#wins')
let message = document.querySelector('#message')
let colorVal1 = 220
let colorVal2 = 250


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
    if(bettingMoney ===0 )return;
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
    const colorChange = setInterval(()=>{
        colorVal1 += 10
        colorVal2 += 20
        document.body.style.background = `linear-gradient(hsl(${colorVal1}deg, 80%, 80%), hsl(${colorVal2}deg, 80%, 80%))`
    },50)
    setTimeout(()=>{
        executeBet(countArr)
        clearInterval(colorChange)
    },5001)

}

function executeBet(arr){
    let won = false
    let winnings = 0;
    if(arr.every((val => val === 2)) || arr.every((val => val === 2))){
        winnings += bettingMoney * 3
        won = true
        setMessage("Wow Three of a kind!")
    }
    else if(arr.every((val => val === 0)) || arr.every((val => val === 1))){
        winnings += bettingMoney * 5
        won = true
        setMessage("High roller Alert")
    }
    else if(arr.every((val => val === 4)) || arr.every((val => val === 5))){
        winnings += bettingMoney * 10
        won = true
        setMessage("JACKPOT!!!")
    }else if(arr[0] === arr[2]){
        winnings += bettingMoney * .3
        setMessage("Nice!")
    }else if(arr[0] === arr[1] || arr[1] === arr[2]){
        winnings += bettingMoney * .5
        won = true
        setMessage("two of a kind!")
    }
    console.log(winnings)
    if(won){}
     totalMoney = (totalMoney - bettingMoney) + winnings
     winTotal += winnings
     winHtml.innerHTML = winTotal
     total.innerHTML = totalMoney
     if(totalMoney === 0)bettingMoney = 0;
     if(bettingMoney > totalMoney)bettingMoney = totalMoney
     bet.innerHTML = bettingMoney
}

