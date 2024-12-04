package main

import (
	"fmt"
	"log"
	"os"
	"strings"
)

func day2() {

	contents, err := os.ReadFile("day2.txt")
	if err != nil {
		log.Fatal(err)
	}

	numSafe := 0
	dampnedSafe := 0

	for _, s := range strings.Split(strings.TrimSpace(string(contents)), "\n") {
		line := strings.Fields(s)
		numbers, _ := stringToIntegers(line)

		_, safe := checkReport(numbers)

		if safe {
			numSafe++
		} else {
			for i := range len(numbers) {
				dampned := RemoveIndex(numbers, i)
				_, safe = checkReport(dampned)
				if safe {
					dampnedSafe++
					break
				}
			}
		}

	}
	fmt.Println(numSafe)
	fmt.Println(numSafe + dampnedSafe)

}

func checkReport(numbers []int) (int, bool) {
	lineOrder := (numbers[0] < numbers[1])

	for i := range numbers {
		if i == 0 {
			continue
		}
		safe, dir := checkPairs(i, numbers)

		if dir != lineOrder {
			return i, false
		}

		if !safe {
			return i, false
		}
	}
	return -1, true
}

func checkPairs(i int, numbers []int) (bool, bool) {
	diff := numbers[i] - numbers[i-1]
	diff = max(diff, -diff)
	if diff > 3 || diff == 0 {
		return false, (numbers[i-1] < numbers[i])
	}
	return true, (numbers[i-1] < numbers[i])
}
