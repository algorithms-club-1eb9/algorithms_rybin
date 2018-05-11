class sortClass {
    constructor (arr) {
        this.arr = arr;
    }

    bubbleSort (arr) {
        if (!arr) return -1;
        if (arr.length === 1) return arr;

        for (let i = 0; i < arr.length; i ++) {
            for (let j = 0; j < arr.length - i; j++) {
                if (this.isLess(arr[j + 1], arr[j])) {
                    arr = this.swap (arr, j, j + 1)
                }
            }
        }

        return arr;
    }

    insertionSort (arr) {
        if (!arr) return -1;
        if (arr.length === 1) return arr;

        for (let i = 1; i < arr.length; i += 1) {
            if (this.isLess(arr[i], arr[i - 1])) {
                let temp = i;
                while (this.isLess(arr[temp], arr[temp - 1])) {
                    arr = this.swap(arr, temp, temp - 1)
                    temp -= 1;
                }
            }
        }

        return arr
    }

    selectionSort (arr) {
        if (!arr) return -1;
        if (arr.length === 1) return arr;

        for (let i = 0; i < arr.length; i++) {
            let minIndex = i;

            for (let j = i + 1; j < arr.length; j++) {
				if (this.isLess(arr[j], arr[minIndex])) {
					minIndex = j;
				}
            }
            
            if (i !== minIndex) {
				arr = this.swap(arr, i, minIndex);
			}
        }

        return arr
    }

    shellSort (arr) {
        if (!arr) return -1;
        if (arr.length === 1) return arr;

        for (let k = arr.length; k > 0; k = parseInt(k / 3)) {
            for (let i = k; i < arr.length; i += k) {
				for (let j = i; j > 0; j -= k) {
					if (this.isLess(arr[j], arr[j - k])) {
						arr = this.swap(arr, j, j - k);
					}
				}
			}
        }

        return arr;
    }

    mergeSort (arr) {
        if (!arr) return -1;
        if (arr.length === 1) return arr;

        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        return this.merge(this.mergeSort(right), this.mergeSort(left));
    }

    quickSort (arr, left = 0, right = arr.length - 1) {
        if (!arr) return -1;
        if (arr.length === 1) return arr;

        let leftIndex = this.partition(arr, left, right);

        if (this.isLess(left, leftIndex - 1)) {
            this.quickSort(arr, left, leftIndex - 1);
        }
        
        if (this.isLess(leftIndex, right)) {
            this.quickSort(arr, leftIndex, right);
        }

        return arr;
    }

    swap (arr, firstIndex, secondIndex) {
		const temp = arr[firstIndex];
		arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = temp;

        return arr;
    }
    
    isLess (firstEl, secondEl) {
        return firstEl < secondEl
    }

    merge (leftArr, rightArr) {
        let result = []
        let leftIndex = 0
        let rightIndex = 0
      
        while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
            if (this.isLess(leftArr[leftIndex], rightArr[rightIndex])) {
                result.push(leftArr[leftIndex])
                leftIndex++
            } else {
                result.push(rightArr[rightIndex])
                rightIndex++
            }
        }
      
        return result.concat(leftArr.slice(leftIndex)).concat(rightArr.slice(rightIndex))
    }

    partition (arr, left, right) {
        const baseEl = arr[Math.floor( (left + right) / 2)];
      
        let leftIndex = left;
        let rightIndex = right;
        
        while (leftIndex <= rightIndex) {
            while (arr[leftIndex] < baseEl) {
                leftIndex++;
            }
          
            while (arr[rightIndex] > baseEl) {
                rightIndex--;
            }
          
            if (leftIndex <= rightIndex) {
                arr = this.swap(arr, left, right);
                leftIndex++;
                rightIndex--;
            }
        }
        
        return leftIndex;
    }
}

module.exports = new sortClass();