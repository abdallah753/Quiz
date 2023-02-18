let ib = 0
let tru = 0
let objquist;
let qarea = document.querySelector('.quiz-app .quiz-area')
let answersarea = document.querySelector('.quiz-app .answers-area')
let supmit = document.querySelector('.submit-button')
let spans = document.querySelector('.spans')

function creatbullets(){
    for(let i = 0 ; i < 9 ; i++){
        let span = document.createElement('span')
        if(i === 0){
            span.classList.add('on')
        }
        spans.appendChild(span)
    }
}
creatbullets()

function getQuestions(ih){
    let questions = new XMLHttpRequest()
    questions.open('GET', '/questions.json')
    questions.send()

    questions.onreadystatechange = (e) => {
        if(questions.status === 200 && questions.readyState === 4){
            objquist = JSON.parse(questions.responseText)

            let h2 = document.createElement('h2')
            h2.textContent = objquist[ih].title
            qarea.appendChild(h2)

            for (let i = 0; i < 4; i++) {

                let answer = document.createElement('div')
                answer.classList.add('answer')
                let inpanswer = document.createElement('input')
                inpanswer.name = 'answer'
                inpanswer.type = "radio"
                inpanswer.dataset.answer = objquist[ih][`answer_${i + 1}`]

                let label = document.createElement('label')
                label.textContent = objquist[ih][`answer_${i + 1}`]
                if(i === 0){
                    inpanswer.checked = true
                }
                inpanswer.id = `${i}`
                label.setAttribute('for' , i)
                answer.appendChild(inpanswer)
                answer.appendChild(label)

                answersarea.appendChild(answer)
            }
    }
    }
    
}
if(ib == 0){
    getQuestions(ib)
}

function empty(){
    answersarea.innerHTML = ''
    qarea.innerHTML = ''
    if(ib === 9){
        let body = document.querySelector('.body')
        body.style = 'display:none;'
        let perfect = document.querySelector('.results div')
        let spanlevel = document.querySelector('.results div .level')
        let mark = document.querySelector('.results div .mark')
        if(tru === 9){
            perfect.style = 'display:block;'
            spanlevel.textContent = 'Perfect'
            spanlevel.classList.add('perfect')
            mark.textContent = tru
        }
        if(tru < 9 && tru > 4){
            spanlevel.textContent = 'Good'
            spanlevel.classList.add('good')
            perfect.style = 'display:block;'
            mark.textContent = tru
        }
        if(tru< 3){
            spanlevel.textContent = 'Bad'
            spanlevel.classList.add('bad')
            perfect.style = 'display:block;'
            mark.textContent = tru
        }
    }
}

function check(){
    supmit.addEventListener('click' , (e) => {
        if(ib === 9){
            empty()
        }else{
            let allinp = document.querySelectorAll('.answers-area input')
            for(let i = 0 ; i< allinp.length ; i++){
                if(allinp[i].checked){
                    if(allinp[i].dataset.answer === objquist[ib]['right_answer']){
                        tru++
                    }
                }
            }
            ib++
            if(ib < 9){
            spans.children[ib].classList.add('on')
            getQuestions(ib)
            empty()
            }else{
                empty()
            }
        }
    })
}
check()