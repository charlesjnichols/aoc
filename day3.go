package main

import (
	"fmt"
	"log"
	"os"
	"regexp"
	"strings"
)

func main() {
	contents, err := os.ReadFile("day3.txt")
	if err != nil {
		log.Fatal(err)
	}

	calc := true

	sum := 0
	conditional_sum := 0

	for _, s := range strings.Split(strings.TrimSpace(string(contents)), "\n") {
		// don't do mul(123,4)
		re := regexp.MustCompile(`don't|do|mul\((\d+),(\d+)\)`)
		match := re.FindAllStringSubmatch(s, -1)
		for _, m := range match {
			if strings.Contains(m[0], "don't") {
				calc = false
			} else if strings.Contains(m[0], "do") {
				calc = true
			}
			one, _ := stringToInteger(m[1])
			two, _ := stringToInteger(m[2])

			sum += (one * two)
			if calc {
				conditional_sum += (one * two)
			}
		}
	}
	fmt.Println(sum)
	fmt.Println(conditional_sum)

}
