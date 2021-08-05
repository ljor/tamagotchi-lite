let petName = ""
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
            document.querySelector('#hunger').innerText = `${this.hunger}`
          }
          if(this.counter % 3 === 0) {
            this.boredom++
            document.querySelector('#boredom').innerText = `${this.boredom}`
          }
          if(this.counter % 4 === 0){
            this.sleepiness++
            document.querySelector('#tiredness').innerText = `${this.sleepiness}`
          }
          if(this.counter % 6 === 0) {
          this.age++
          document.querySelector('#age').innerText = `${this.age}`
          }
        }, 500)
    }

    feed() {
      if (this.hunger > 0) {
        this.hunger--
        document.querySelector('#hunger').innerText = `${this.hunger}`
        document.querySelector('#message > p').innerText = '*nom nom nom*'
      }
    }

    play() {
      if (this.boredom > 0) {
        this.boredom--
        document.querySelector('#boredom').innerText = `${this.boredom}`
        document.querySelector('#message > p').innerText = '*happy noises*'
      }
    }

    lights() {
      if (this.sleepiness > 0) {
        this.sleepiness++
        document.querySelector('#tiredness').innerText = `${this.sleepiness}`
        document.querySelector('#message > p').innerText = '*zzz*'
      }
    }

    deathCheck(timer) {
      if (this.hunger === 10 || this.sleepiness === 10 || this.boredom === 10 || this.age === 35) {
        document.querySelector('.pet').style.animation = 'none'
        document.querySelector('#message > p').innerText = '*is dead*'
        document.querySelector('#feed').disabled = true
        document.querySelector('#lights').disabled = true
        document.querySelector('#play').disabled = true
        console.log(`${this.name} has died`)
        clearInterval(timer)
      }
    }
  }
  
  const newPet = () => {
    petName = document.getElementById('pet-name').value
    const myPet = new Pet(petName)
  }

  const testPet = new Pet("Momo")
  console.log(testPet)
  testPet.lifeCycle()

  document.querySelector('#feed').addEventListener('click', ()=>{testPet.feed()})
  document.querySelector('#play').addEventListener('click', ()=>{testPet.play()})
  document.querySelector('#lights').addEventListener('click', ()=>{testPet.lights()})
  document.querySelector('#new-pet').addEventListener('click', ()=>{newPet()})