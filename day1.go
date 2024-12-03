package main

import (
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"

	"github.com/samber/lo"
)

func day0() {

	contents, err := os.ReadFile("day1-page.txt")
	if err != nil {
		log.Fatal(err)
	}

	var first, second []int
	for _, s := range strings.Split(strings.TrimSpace(string(contents)), "\n") {
		words := strings.Fields(s)

		left, _ := strconv.Atoi(words[0])
		right, _ := strconv.Atoi(words[1])

		first, second = append(first, left), append(second, right)
	}

	sort.Ints(first)
	sort.Ints(second)

	distance, similarity := 0, 0

	for _, i := range lo.Range(len(first)) {
		v := first[i] - second[i]

		src := first[i]
		count := lo.CountBy(second, func(comp int) bool {
			return comp == src
		})
		similarity += src * count
		distance += max(v, -v)
	}
	fmt.Println(distance, similarity)

}
