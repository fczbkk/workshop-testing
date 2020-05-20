let a = { x: 100, y: 200 }

document.addEventListener('click', function (e) {
  console.log(Math.sqrt(Math.pow(a.x - e.pageX, 2) + Math.pow(a.y - e.pageY, 2)))
})
