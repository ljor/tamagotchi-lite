// commonly used selectors
const sleepTracker = document.querySelector('#tiredness')
const boredomTracker = document.querySelector('#boredom')
const ageTracker = document.querySelector('#age')
const hungerTracker = document.querySelector('#hunger')
const nameTracker = document.querySelector('#name')
const petFeedbackSelector = document.querySelector('#message > p')
const petGraphic = document.querySelector('#pet')

// array to store pet skins
const petGraphicsArr = [
  ['img/ghostly1.gif', 'img/ghostly2.gif', 'img/ghostly3.gif'],
  ['img/mork1.gif', 'img/mork2.gif', 'img/mork3.gif'], 
  ['img/blink1.gif', 'img/blink2.gif', 'img/blink3.gif']
]

// other global variables; stores pet creation data
let petName = ''
let myPet

// defines an new class named 'Pet'
class Pet {
  constructor(name){
    this.name = name
    this.age = 0
    this.hunger = 0
    this.sleepiness = 0
    this.boredom = 0
    this.alive = true
    this.lightsOn = true
    this.counter = 0
    this.appearance = []
  }

  // an aptly named method; controls the time flow of the pet
  lifeCycle() {
    let timeInterval = setInterval(()=>{
      this.deathCheck()
      if (this.alive === false) {
        clearInterval(timeInterval)
      } else {
        this.counter++

        if(this.hunger < 10 && this.counter % 2 === 0) {
          this.hunger++
          hungerTracker.innerText = `${this.hunger}`
        }

        if(this.boredom < 10 && this.counter % 3 === 0 && this.lightsOn === true) {
          this.boredom++
          boredomTracker.innerText = `${this.boredom}`
        }

        if(this.sleepiness < 10 && this.counter % 4 === 0 && this.lightsOn === true){
          this.sleepiness++
          sleepTracker.innerText = `${this.sleepiness}`
        }

        if(this.age < 35 && this.counter % 6 === 0) {
          this.age++
          this.morphCheck()
          ageTracker.innerText = `${this.age}`
        }
      }
    }, 500)
  }

  // pet care methods
  feed() {
      if (this.lightsOn === true && this.hunger > 0 && this.alive === true) {
        this.hunger--
        hungerTracker.innerText = `${this.hunger}`
        petFeedbackSelector.innerText = '*nom nom nom*'
      }
    }
  
  play() {
    if (this.lightsOn === true && this.boredom > 0 && this.alive === true) {
      this.boredom--
      boredomTracker.innerText = `${this.boredom}`
      petFeedbackSelector.innerText = '*happy noises*'
    }
  }
  
  lights() {
    if (this.lightsOn === true && this.alive === true) {
      document.querySelector('#screen').style.backgroundColor = 'darkgray'
      petGraphic.style.opacity = 0
      petFeedbackSelector.innerText = '*zzz*'
      this.lightsOn = false
    } else if (this.lightsOn === false && this.alive === true) {
      document.querySelector('#screen').style.backgroundColor = 'lightgray'
      petGraphic.style.opacity = 1
      petFeedbackSelector.innerText = '*looks rested*'
      this.lightsOn = true
    }
    let restInterval = setInterval(()=> {
      if (this.lightsOn === false && this.sleepiness > 0 && this.alive === true) {
        this.sleepiness--
        sleepTracker.innerText = `${this.sleepiness}`
      } else if (this.lightsOn === true && this.sleepiness > 0 && this.alive === true) {
        clearInterval(restInterval)
      }
    }, 500)
  }

  // check methods   
  morphCheck(){
    if (this.age === 20) {
      petGraphic.style.width = '110%'
    } else if (this.age === 10) {
      petGraphic.src = `${this.appearance[2]}`
    } else if (this.age === 5) {
      petGraphic.src = `${this.appearance[1]}`
    }
  }
  
  deathCheck() {
    if (this.hunger === 10 || this.sleepiness === 10 || this.boredom === 10 || this.age === 35) {
      document.querySelector('.pet').style.animation = 'none'
      petGraphic.src = 'img/gravestone.png'
      petGraphic.style.width = '120%'
      petFeedbackSelector.innerText = '*is dead*'
      this.alive = false
    }
  }
}
  
// aka the new game function
const newPet = () => {
  petName = document.getElementById('pet-name').value

  // clears away previous pet from screen
  if(myPet) {
    myPet.alive = false
  }

  petFeedbackSelector.innerText = ''

  // instantiates new pet
  myPet = new Pet(petName)
  document.querySelector('#screen').style.backgroundColor = 'lightgray'
  let randIndex = Math.floor(Math.random() * petGraphicsArr.length)
  myPet.appearance = petGraphicsArr[randIndex]
  petGraphic.src = `${myPet.appearance[0]}`
  petGraphic.style.width = '100%'

  // adds CSS style to animate the new pet
  document.querySelector('.pet').style.animation = '8s infinite alternate-reverse petmotion'
    
  // resets tracker displays of previous pet
  sleepTracker.innerText = `${myPet.sleepiness}`
  boredomTracker.innerText = `${myPet.boredom}`
  hungerTracker.innerText = `${myPet.hunger}`
  ageTracker.innerText = `${myPet.age}`
  nameTracker.innerText = `${myPet.name}`

  // begins the life cycle of the new pet
  myPet.lifeCycle()
}

// event listeners
document.querySelector('#feed').addEventListener('click', ()=>{myPet.feed()})
document.querySelector('#play').addEventListener('click', ()=>{myPet.play()})
document.querySelector('#lights').addEventListener('click', ()=>{myPet.lights()})
document.querySelector('#new-pet').addEventListener('click', ()=>{newPet()})