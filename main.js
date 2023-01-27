// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimanNum, dna) => {
  return {
    specimanNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandomBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherOrg) {
      const similar = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === otherOrg.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);
      const percentOfDNAShared = (similar / this.dna.length) * 100;
      const percentageTo2Deci = percentOfDNAShared.toFixed(2);
      console.log(`${this.specimanNum} and ${otherOrg.specimanNum} have ${percentageTo2Deci}% DNA in common.`);
    },
    willLikelySurvive() {
      const cOrG = this.dna.filter(el => el === "C" || el === "G");
      return cOrG.length / this.dna.length >= 0.6;
    },
    complementStrand() {
      let oppositeString = [];
      for (i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'A':
            oppositeString.push('T');
            break;
          case 'T':
            oppositeString.push('A');
            break;
          case 'G':
            oppositeString.push('C');
            break;
          case 'C':
            oppositeString.push('G');
            break;
        }
      }
      return oppositeString;
    }
  }
};

const survivingOrgs = [];
let idCounter = 1;

while (survivingOrgs.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingOrgs.push(newOrg);
  }
  idCounter++;
}

console.log(survivingOrgs);
