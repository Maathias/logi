function drawingToBitstream(drawing) {
	const flattened = drawing.flat(),
		starting = flattened[0],
		rows = drawing.length,
		columns = drawing[0].length

	let bitstream = [columns, rows, starting]

	let prev = starting
	count = 1

	for (let i = 1; i < flattened.length + 1; i++) {
		if (i == flattened.length) {
			bitstream.push(count)
			break
		}
		if (flattened[i] == prev) {
			count++
		} else {
			bitstream.push(count)
			count = 1
		}
		prev = flattened[i]
	}

	return bitstream
}

function bitstreamToString(bitstream) {
	const buffer = new Uint8Array(bitstream),
		binary = String.fromCharCode(...buffer),
		base64 = btoa(binary)

	return base64
}

function stringToBitstream(base64) {
	const binary = atob(base64)
	const bitstream = binary.split('').map((char) => char.charCodeAt(0))
	return bitstream
}

function bitstreamToDrawing(bitstream) {
	const [x, y, start, ...rest] = bitstream

	let flat = [],
		prev = start

	// for every number in 'rest'
	// generate an array of 'prev' repeated i times
	// and add it to 'flat'
	// then set 'prev' to the opposite of 'prev'
	// and repeat
	for (let i of rest) {
		flat.push(...Array(i).fill(prev))
		prev = +!prev
	}

	// split 'flat' into 'y' arrays of length 'x'
	// and return the result

	let drawing = []

	for (let i = 0; i < y; i++) {
		drawing.push(flat.slice(i * x, (i + 1) * x))
	}

	return drawing
}
