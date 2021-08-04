console.log("Good to go!")
class Pet {
    constructor(name){
      this.name = name
      this.age = 0
      this.hunger = 0
      this.sleepiness = 0
      this.boredom = 0
    }
    ageIncrement() {
        let ageInterval = setInterval(()=>{
            if (this.age < 35) {
            this.age++
            document.querySelector('#age').innerText = `${this.age}`
            }
            else if (this.age >= 35){
                clearInterval(ageInterval)
                this.deathCheck()
            }
        }, 3000)
    }
    hungerIncrement() {
        let hungerInterval = setInterval(()=> {
            if (this.hunger < 10) {
                this.hunger++
                document.querySelector('#hunger').innerText = `${this.hunger}`
                }
                else if (this.hunger >= 10){
                    clearInterval(hungerInterval)
                    this.deathCheck()
                }
        }, 1000)
        
    }

    deathCheck() {
      if (this.age === 35 || this.hunger === 10 || this.sleepiness === 10 || this.boredom === 10) {
        document.querySelector('.pet').style.animation = 'none'
        document.querySelector('#message > p').innerText = '*is dead*'
        console.log(`${this.name} has died`)
      }
    }
  }
  
  const testPet = new Pet("Momo")
  console.log(testPet)
  testPet.deathCheck()
  testPet.ageIncrement()
  testPet.hungerIncrement()