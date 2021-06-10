const charset = {
  letters : 'abcdefghijklmnopqrstuvwxyz',
  numbers : '0123456789',
  symbols : '!§$%&/()=?#,;.:-_'
}

// const uppercase = document.querySelector("#uppercase")
// const numbers = document.querySelector("#numbers")
// const symbols = document.querySelector("#symbols")

const wrapper = document.createElement("div")
wrapper.id = "wrapper"
wrapper.style.width = "100%"
wrapper.style.display = "flex"
wrapper.style.flexDirection = "column"
wrapper.style.alignItems = "center"


// const genPass = document.createElement("h1")
// genPass.id = "genPass"
// genPass.textContent = "Generate password"
// genPass.style.width = "79%"
// genPass.style.textAlign = "center"
// genPass.style.padding = "10px"
// genPass.style.margin = "10px"
// genPass.style.border = "1px solid grey"
// genPass.style.borderRadius = "2px"

const genPass = document.createElement("input")
genPass.id = "genPass"
genPass.type = "text"
genPass.value = "Generate password"
genPass.style.width = "79%"
genPass.style.fontSize = "2em"
genPass.style.textAlign = "center"
genPass.style.padding = "10px"
genPass.style.margin = "10px"
genPass.style.border = "1px solid grey"
genPass.style.borderRadius = "2px"

const inputContainer = document.createElement("div")
inputContainer.style.width = "80%"
inputContainer.style.position = "relative"

const numberOf = document.createElement("input")
numberOf.type = "number"
numberOf.value = "10"
numberOf.style.width = "50%"
numberOf.style.padding = "10px"
numberOf.style.marginBlockEnd = "0.67em"

const uppercase = document.createElement("input")
uppercase.type = "checkbox"
uppercase.id = "uppercase"
uppercase.style.marginLeft = "20px"
const upLabel = document.createElement("label")
upLabel.for = "uppercase"
upLabel.textContent = " Use UPPERCASE"

const numbers = document.createElement("input")
numbers.type = "checkbox"
numbers.id = "numbers"
numbers.style.marginLeft = "20px"
const numLabel = document.createElement("label")
numLabel.for = "numbers"
numLabel.textContent = " Use NUMBERS"

const symbols = document.createElement("input")
symbols.type = "checkbox"
symbols.id = "symbols"
symbols.style.marginLeft = "20px"
const symLabel = document.createElement("label")
symLabel.for = "symbols"
symLabel.textContent = " Use SYMBOLS"

const genButton = document.createElement("button")
genButton.textContent = "Generate password!"
genButton.style.backgroundColor = "green"
genButton.style.fontSize = "1em"
genButton.style.color = "white"
genButton.style.width = "80%"
genButton.style.padding = "10px"
genButton.style.borderRadius = "2px"
genButton.style.marginBlockStart = "0.67em"

document.body.appendChild(wrapper)
wrapper.append(genPass, inputContainer, genButton)
inputContainer.append(numberOf, uppercase, upLabel, numbers, numLabel, symbols, symLabel)

function randomChar(type){
  let r = Math.floor(Math.random()*charset[type].length)
  let upLow = Math.ceil(Math.random()*2)
  if(type == "letters"){
    if (uppercase.checked == false) {
      return charset[type][r]
    }
    else{
      if(upLow == 1){
        return charset[type][r]
      }
      else{
      return charset[type][r].toUpperCase()
      }
    }
  }
  else{
    return charset[type][r]
  }
}

function randomPassword(length){
  let password = ""
  let type
  for(i=length; i>0; i--){
    if(numbers.checked == true && symbols.checked == false){
      let r = Math.ceil(Math.random()*2)
      type = r == 1 ? 'letters' : 'numbers'
      password += randomChar(type)
      length--
    }
    else if(symbols.checked == true && numbers.checked == false){
      let r = Math.ceil(Math.random()*2)
      type = r == 1 ? 'letters' : 'symbols'
      password += randomChar(type)
      length--
    }    
    else if(numbers.checked == true && symbols.checked == true){
      let r = Math.ceil(Math.random()*3)
      type = r == 1 ? 'letters' : r == 2 ? 'numbers' : "symbols"
      password += randomChar(type)
      length--
    }
    else{
      type = "letters"
      password += randomChar(type)
      length--
    }
  }
  return password
}
window.onload = function() {
  genPass.value = randomPassword(numberOf.value)  
};
genButton.addEventListener("click", ()=>{
  genPass.value = randomPassword(numberOf.value)
})

const copy = document.createElement("button")
copy.id = "copy"
copy.textContent = "copy"
copy.style.position = "absolute"
copy.style.top = "0"
copy.style.right = "0"
inputContainer.appendChild(copy)

document.querySelector("#copy").onclick = function(){
  document.querySelector("#genPass").select();
  document.execCommand('copy');
}
