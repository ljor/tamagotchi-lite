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
      this.counter = 0
    }

    lifeCycle() {
        let timeInterval = setInterval(()=>{
          this.deathCheck(timeInterval)
          this.counter++
          if(this.counter % 2 === 0) {
            this.hunger++
            hungerTracker.innerText = `${this.hunger}`
          }
          if(this.counter % 3 === 0) {
            this.boredom++
            boredomTracker.innerText = `${this.boredom}`
          }
          if(this.counter % 4 === 0){
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
      if (this.hunger > 0) {
        this.hunger--
        hungerTracker.innerText = `${this.hunger}`
        petFeedbackSelector.innerText = '*nom nom nom*'
      }
    }

    play() {
      if (this.boredom > 0) {
        this.boredom--
        boredomTracker.innerText = `${this.boredom}`
        petFeedbackSelector.innerText = '*happy noises*'
      }
    }

    lights() {
      if (this.sleepiness > 0) {
        this.sleepiness--
        sleepTracker.innerText = `${this.sleepiness}`
        petFeedbackSelector.innerText = '*zzz*'
      }
    }

    deathCheck(timer) {
      if (this.hunger === 10 || this.sleepiness === 10 || this.boredom === 10 || this.age === 35) {
        document.querySelector('.pet').style.animation = 'none'
        petFeedbackSelector.innerText = '*is dead*'
        document.querySelector('#feed').disabled = true
        document.querySelector('#lights').disabled = true
        document.querySelector('#play').disabled = true
        console.log(`${this.name} has died`)
        clearInterval(timer)
      }
    }
  }
  
  // aka the new game function
  const newPet = () => {
    petName = document.getElementById('pet-name').value

    document.querySelector('#feed').disabled = false
    document.querySelector('#lights').disabled = false
    document.querySelector('#play').disabled = false

    myPet = new Pet(petName)
    document.querySelector('.pet').style.animation = '8s infinite alternate-reverse petmotion'
    myPet.sleepiness = 0
    sleepTracker.innerText = `${myPet.sleepiness}`
    myPet.boredom = 0
    boredomTracker.innerText = `${myPet.boredom}`
    myPet.hunger = 0
    hungerTracker.innerText = `${myPet.hunger}`
    myPet.age = 0
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

  // update lights to turn on/off -- if possible, stop increment while lights are off

  // add morphs when pet hit certain ages (separate function, checked in the age cycle, I'm thinking) -- test as CSS scaling on pet div

  // Stylize the page
    // pet "sprite"
    // flexbox working
    // display pet name

  // extra: have an array of multiple pet images to cycle through, so that player gets a random pet each time
  
//                              debug

  // solve overlapping pet instances