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

	sum := 0

	for _, s := range lines {
		pages := strings.Split(s, ",")

		if test_order(print_order, pages) {
			// get the middle number from the current line and add to total
			m, _ := strconv.Atoi(pages[len(pages)/2])
			sum += m
		}
	}
	fmt.Println(sum)
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
