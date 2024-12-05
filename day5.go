package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

func main() {
	contents, _ := os.ReadFile("day5-1.txt")
	lines := strings.Split(strings.TrimSpace(string(contents)), "\n")

	print_order := make(map[string][]string)
	for _, s := range lines {
		p := strings.Split(s, "|")
		first := p[0]
		second := p[1]

		_, ok := print_order[first]
		if ok {
			print_order[first] = append(print_order[first], second)
		} else {
			print_order[first] = []string{second}
		}
	}

	contents, _ = os.ReadFile("day5-2.txt")
	lines = strings.Split(strings.TrimSpace(string(contents)), "\n")

	corrent_sum := 0
	wrong_sum := 0

	for _, s := range lines {
		pages := strings.Split(s, ",")

		if test_order(print_order, pages) {
			// get the middle number from the current line and add to total
			m, _ := strconv.Atoi(pages[len(pages)/2])
			corrent_sum += m
		} else {
			// bone head way is to just create all possible combinations of the array
			// and test each one individually
			//
			// https://en.wikipedia.org/wiki/Heap%27s_algorithm
			//
			// "it's a trap"
			//
			// instead rebuild the order one at a time testing as you go
			//
			fixed := []string{pages[0]}

			for _, next := range pages[1:] {
				for i := range len(fixed) + 1 {
					wrong := make([]string, len(fixed))
					copy(wrong, fixed)

					wrong = InsertStringIndex(wrong, next, i)
					if test_order(print_order, wrong) {
						fixed = wrong
						break
					}
				}
			}
			m, _ := strconv.Atoi(fixed[len(fixed)/2])
			wrong_sum += m
		}
	}
	fmt.Println(corrent_sum)
	fmt.Println(wrong_sum)
}

func test_order(print_order map[string][]string, pages []string) bool {
	// move thru update order
	for len(pages) > 0 {

		// current page and the update order
		test := pages[0]
		pages = RemoveStringIndex(pages, 0)

		// iterate thru the rest of the update list and test the print order vs the current page
		for _, after := range pages {
			if !slices.Contains(print_order[test], after) {
				return false
			}
		}
	}
	return true
}
