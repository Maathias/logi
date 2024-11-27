function drawingToHeaders(drawing) {
	const flippedDrawing = drawing[0].map((_, i) => drawing.map((row) => row[i]))

	var columnValues = [],
		rowValues = []

	for (let row of drawing) {
		let current = []
		for (let i = 0; i < row.length; i++) {
			if (row[i] == 0) continue
			else {
				let j = i,
					count = 0
				while (row[j] == 1 && j < row.length) {
					count++
					j++
				}
				i = j
				current.unshift(count)
			}
		}
		rowValues.push(current)
	}

	for (let column of flippedDrawing) {
		let current = []
		for (let i = 0; i < column.length; i++) {
			if (column[i] == 0) continue
			else {
				let j = i,
					count = 0
				while (column[j] == 1 && j < column.length) {
					count++
					j++
				}
				i = j
				current.push(count)
			}
		}
		columnValues.push(current)
	}

	return { columnValues, rowValues }
}

function renderHeaders(canvas, headers) {
	if (!canvas) return

	const { columnValues, rowValues } = headers

	let columns = document.createElement('div'),
		rows = document.createElement('div'),
		boxes = document.createElement('div')

	columns.classList.add('columns')
	rows.classList.add('rows')
	boxes.classList.add('boxes')

	canvas.innerHTML = ''

	canvas.appendChild(columns)
	canvas.appendChild(rows)
	canvas.appendChild(boxes)

	const longestRow = Math.max(
		...rowValues.map((row) => row.map((val) => val).length)
	)

	console.log(longestRow)

	canvas.style.setProperty('--headers', `${longestRow * 20}px`)

	for (let colVal of columnValues) {
		let div = document.createElement('div')
		for (let val of colVal) {
			let span = document.createElement('span')
			span.textContent = val
			div.appendChild(span)
		}
		columns.appendChild(div)
	}

	for (let rowVal of rowValues) {
		let div = document.createElement('div')
		for (let val of rowVal) {
			let span = document.createElement('span')
			span.textContent = val
			div.appendChild(span)
		}
		rows.appendChild(div)
	}
}

function renderDrawing(canvas, drawing, filled = false) {
	let boxes = canvas.querySelector('.boxes')

	for (let row of drawing) {
		let line = document.createElement('div')
		for (let val of row) {
			let box = document.createElement('box'),
				d = val ? 'full' : 'empty'

			if (filled) box.setAttribute('d', d)
			line.appendChild(box)
		}
		boxes.appendChild(line)
	}
}
