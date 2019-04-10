let $allButtons = $('.allButtons button')
let $allImgs = $('.wrapper>ul>li')
let $imgWrap = $('.wrapper>ul')
let length = $allImgs.length
let currentIndex = 0
let imgWidth = $('li img').width()

makeFakeSlides()

for (let i = 0; i < length; i++) {
  $allButtons.eq(i).on('click', function (e) {
    currentIndex = $(e.currentTarget).index()
    goToCurrent()
  })
}

$('#prevImg').on('click', function () {
  currentIndex -= 1
  goToCurrent()
})

$('#nextImg').on('click', function () {
  currentIndex += 1
  goToCurrent()
})

let timer = window.setInterval(function(){
  currentIndex += 1
  goToCurrent()
},3000)
$('.wrapper').on('mouseover',()=>{
  window.clearInterval(timer)
})
$('.wrapper').on('mouseleave',()=>{
  timer = window.setInterval(function(){
    currentIndex += 1
    goToCurrent()
  },3000)
})

document.addEventListener('visibilitychange',function(){
  if(document.hidden){
    window.clearInterval(timer)
  }else{
    timer = window.setInterval(function(){
      currentIndex += 1
      goToCurrent()
    },3000)
  }
})





function goToCurrent() {
  slide()
  if(currentIndex === -1 || currentIndex === length){
    if (currentIndex === -1) {
      currentIndex = length - 1      
    } else if (currentIndex === length) {
      currentIndex = 0
    }
    $imgWrap.one('transitionend', function () {
      $imgWrap.hide().offset()
      slide().show()
    })
  }

  $allButtons.eq(currentIndex).addClass('active')
    .siblings().removeClass('active')
}

function slide(){
  $imgWrap.css({
    transform: `translateX(${currentIndex * -imgWidth}px)`
  })
  return $imgWrap
}


function makeFakeSlides(){
  let $firstImg = $allImgs.eq(0).clone()
  let $lastImg = $allImgs.eq(length - 1).clone()
  
  $lastImg.insertBefore($allImgs.eq(0))
  $firstImg.insertAfter($allImgs.eq(length - 1))
}