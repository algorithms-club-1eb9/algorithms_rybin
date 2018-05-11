module.exports = (arr, elToFind) => {
	let first = 0;
	let	last = arr.length - 1;

	while (first < last) {
	    const mid = Math.floor((last - first) / 2);

		if (arr[mid] >= elToFind) {
            last = mid;
        } else {
            first = mid + 1;
        }
    }

    return (arr[last] === elToFind) ? last : -1;
};