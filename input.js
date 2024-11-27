function renderInput(canvas, x, y) {
	if (!canvas) return

	let boxes = document.createElement('div')

	boxes.classList.add('boxes')

	canvas.appendChild(boxes)

	for (let i = 0; i < y * 5; i++) {
		let line = document.createElement('div')
		for (let j = 0; j < x * 5; j++) {
			let box = document.createElement('box')
			box.setAttribute('d', 'empty')

			flip = (b) =>
				b.setAttribute('d', b.getAttribute('d') == 'full' ? 'empty' : 'full')

			box.addEventListener('mouseover', function (e) {
				if (e.buttons == 1) {
					flip(this)
				}
			})
			box.addEventListener('mousedown', function () {
				flip(this)
			})

			// box.addEventListener('click', () => {
			// 	box.setAttribute(
			// 		'd',
			// 		box.getAttribute('d') == 'full' ? 'empty' : 'full'
			// 	)
			// })

			line.appendChild(box)
		}
		boxes.appendChild(line)
	}
}

function canvasToDrawing(canvas) {
	if (!canvas) return

	const rowLength = canvas.querySelector('.boxes > div').children.length,
		rawBoxes = canvas.querySelectorAll('box')

	let boxes = Array.from(rawBoxes).reduce((acc, curr, i) => {
		if (i % rowLength === 0) acc.push([])
		acc[acc.length - 1].push(curr)
		return acc
	}, [])

	let drawing = []

	for (let row of boxes) {
		let current = []
		for (let box of row) {
			current.push(box.getAttribute('d') == 'full' ? 1 : 0)
		}
		drawing.push(current)
	}

	return drawing
}

function transposeInput(canvas, x, y) {
	const boxes = canvas.getElementsByClassName('boxes')[0]

	if (x != 0) {
		const children = Array.from(boxes.children)
		let toMove

		if (x > 0) {
			toMove = children.slice(-Math.abs(x))
			toMove.forEach((child) => boxes.prepend(child))
		} else {
			toMove = children.slice(0, Math.abs(x))
			toMove.forEach((child) => boxes.appendChild(child))
		}
	}

	if (y != 0) {
		for (let line of boxes.children) {
			const children = Array.from(line.children)
			let toMove

			if (y > 0) {
				toMove = children.slice(-Math.abs(y))
				toMove.forEach((child) => line.prepend(child))
			} else {
				toMove = children.slice(0, Math.abs(y))
				toMove.forEach((child) => line.appendChild(child))
			}
		}
	}
}
