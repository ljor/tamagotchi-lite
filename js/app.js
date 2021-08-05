// commonly used selectors
const sleepTracker = document.querySelector('#tiredness')
const boredomTracker = document.querySelector('#boredom')
const ageTracker = document.querySelector('#age')
const hungerTracker = document.querySelector('#hunger')
const petFeedbackSelector = document.querySelector('#message > p')

let petName = ""
let myPet

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
    }

    lifeCycle() {
        let timeInterval = setInterval(()=>{
          if (this.alive === false) {
            clearInterval(timeInterval)
          }
          this.deathCheck()
          this.counter++
          if(this.counter % 2 === 0) {
            this.hunger++
            hungerTracker.innerText = `${this.hunger}`
          }
          if(this.counter % 3 === 0) {
            this.boredom++
            boredomTracker.innerText = `${this.boredom}`
          }
          if(this.counter % 4 === 0 && this.lightsOn === true){
            this.sleepiness++
            sleepTracker.innerText = `${this.sleepiness}`
          }
          if(this.counter % 6 === 0) {
          this.age++
          ageTracker.innerText = `${this.age}`
          }
        }, 500)
    }

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
        document.querySelector('.pet').style.animation = 'none'
        petFeedbackSelector.innerText = '*zzz*'
        this.lightsOn = false
      } else if (this.lightsOn === false && this.alive === true) {
        document.querySelector('#screen').style.backgroundColor = 'lightgray'
        document.querySelector('.pet').style.animation = '8s infinite alternate-reverse petmotion'
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

    deathCheck() {
      if (this.hunger === 10 || this.sleepiness === 10 || this.boredom === 10 || this.age === 35) {
        document.querySelector('.pet').style.animation = 'none'
        petFeedbackSelector.innerText = '*is dead*'
        this.alive = false
      }
    }
  }
  
  // aka the new game function
  const newPet = () => {
    petName = document.getElementById('pet-name').value

    // kills off old pet, if any
    if(myPet) {
      myPet.alive = false
    }

    petFeedbackSelector.innerText = ''

    myPet = new Pet(petName)
    document.querySelector('#screen').style.backgroundColor = 'lightgray'
    document.querySelector('.pet').style.animation = '8s infinite alternate-reverse petmotion'
    
    // resets tracker displays of previous pet
    sleepTracker.innerText = `${myPet.sleepiness}`
    boredomTracker.innerText = `${myPet.boredom}`
    hungerTracker.innerText = `${myPet.hunger}`
    ageTracker.innerText = `${myPet.age}`
    console.log(myPet)
    myPet.lifeCycle()
  }

  // event listeners
  document.querySelector('#feed').addEventListener('click', ()=>{myPet.feed()})
  document.querySelector('#play').addEventListener('click', ()=>{myPet.play()})
  document.querySelector('#lights').addEventListener('click', ()=>{myPet.lights()})
  document.querySelector('#new-pet').addEventListener('click', ()=>{newPet()})

// ------------------------------------------------------------------------//

//                                tasks

  // add morphs when pet hit certain ages (separate function, checked in the age cycle, I'm thinking) -- test as CSS scaling on pet div

  // Stylize the page
    // pet "sprite"
    // flexbox working
    // display pet name

  // extra: have an array of multiple pet images to cycle through, so that player gets a random pet each time