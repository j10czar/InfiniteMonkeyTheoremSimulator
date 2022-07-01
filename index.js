const runBtn = document.getElementById('run-sim')
const inputForm = document.getElementById('input-form')
const DOMconsole = document.getElementById('console')
const simBox = document.getElementById('simulation-box')
var stopped = false
const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var userWord = ''
var strokes= 0
var start

var typewriter = ''

var duration = 0

var found = false

document.getElementById('input-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    userWord = document.getElementById('word-input').value

    if(!onlyLetters(userWord))
    {
        alert("Please only use letters in the word input.")

    }
    else
    {

    
        start = new Date();

        userWord = userWord.toLowerCase()
        runBtn.remove()
        const stopBtn = document.createElement('button')
        stopBtn.innerHTML='Stop Simulation'
        stopBtn.setAttribute('id','stop-sim')
        stopBtn.setAttribute('type','button')
        stopBtn.addEventListener('click',()=>{
            stopped=true
            stopBtn.remove()
            



            const resetBtn = document.createElement('button')
            resetBtn.innerText="Reset"
            resetBtn.setAttribute('id','reset-sim')
            resetBtn.setAttribute('type','button')
            resetBtn.addEventListener('click',()=>{
                window.location.reload()

            })
            inputForm.appendChild(resetBtn)
        })   
        
        inputForm.appendChild(stopBtn)
        document.getElementById('probability').innerHTML='Word probability: '+((1/Math.pow(26,userWord.length))*100)+'%'


        runningSim = setInterval(function(){
            if(!stopped)
            {
                updateTime()
                simulation(userWord)

            }
            else
            {
                return
            }      

        },1)

        checkWord = setInterval(function(){
            if(!stopped)
            {
                
                checkStreak(userWord)

            }
            else
            {
                return
            }      

        },50)
        updateTime()
    }        
})

function onlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
}


function updateTime(){
        elapsed = Date.now() - start
        var hours = Math.floor(elapsed/1000/60/60);

		elapsed -= hours*60*60*1000;
		if(hours < 10)
			hours = "0"+hours;
				
		var min = Math.floor(elapsed/1000/60);
		elapsed -= min*1000*60;
		if(min < 10)
			min = "0"+min;
				
		var sec = Math.floor(elapsed/1000);
		elapsed -= sec*1000;
		if(sec< 10)
			sec = "0"+sec;

        var ms = Math.floor(elapsed);
        if(ms < 10)
            ms = "00"+ms;
        else if(ms < 100)
            ms = "0"+ms;    
	
				
		document.getElementById("time-spent").innerHTML = 'Time Spent: '+ hours+":"+min+":"+sec+':'+ms;
        document.getElementById('total-letters').innerHTML='Total letters typed: '+strokes

}



function simulation()
{
    let temp = ''
    strokes++

    let letter = letters[parseInt(Math.random()*26)]
    DOMconsole.value+=letter
    DOMconsole.scrollTop=DOMconsole.scrollHeight

    typewriter+=letter

    if(typewriter.substring(typewriter.length-userWord.length,typewriter.length)== userWord)
    {
        stopped = true
        const label = document.createElement('h2')
        label.innerText = "The monkey found "+userWord+"!"
        document.getElementById("closest-word").innerHTML ="Closest word: "+ userWord
        simBox.appendChild(label)

    }



}

var bestStreak = 0
var handOffIndex = 0



function checkStreak(){
    let temp = handOffIndex
    handOffIndex+=userWord.length
        if(typewriter.substring(temp,temp+1)==userWord.substring(0,1))
        {

            //checks if its first time
            if(bestStreak==0)
            {
                bestStreak=1
                document.getElementById("closest-word").innerHTML ="Closest word: "+ userWord.substring(0,bestStreak)

            }

            for(let i = 1; i<userWord.length;i++)
            {
                if(typewriter.substring(temp+i,temp+i+1)==userWord.substring(i,i+1))  //something wrong here
                {

                    if(bestStreak<i+1)
                    {
                        bestStreak=i+1
                        document.getElementById("closest-word").innerHTML = "Closest word: "+ userWord.substring(0,bestStreak)

                    }

                }
                else
                {

                    break
                }


            }
        }
        
    }










