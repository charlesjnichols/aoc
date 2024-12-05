package main

import (
	"fmt"
	"log"
	"os"
	"strings"
)

type coord struct {
	x int
	y int
}

func day4() {
	contents, err := os.ReadFile("day4.txt")
	if err != nil {
		log.Fatal(err)
	}

	lines := strings.Split(strings.TrimSpace(string(contents)), "\n")

	puzzle := make([][]string, len(lines))
	for y, s := range lines {
		letters := strings.Split(s, "")
		puzzle[y] = letters
	}

	dirs := []string{"north", "south", "east", "west", "north-east", "north-west", "south-east", "south-west"}
	holiday := "XMAS"
	depth := 4

	match := 0
	for y := range lines {
		for x := range lines[y] {
			for _, dir := range dirs {
				if strings.Contains(dir_to_word(puzzle, dir, x, y, depth), holiday) {
					match++
				}
			}
		}
	}
	fmt.Println(match)

	match = 0
	holiday = "MAS"
	depth = 3

	for y := range lines {
		for x := range lines[y] {
			x_match := 0
			if strings.Contains(dir_to_word(puzzle, "south-east", x-1, y-1, depth), holiday) {
				x_match++
			}
			if strings.Contains(dir_to_word(puzzle, "south-west", x+1, y-1, depth), holiday) {
				x_match++
			}
			if strings.Contains(dir_to_word(puzzle, "north-east", x-1, y+1, depth), holiday) {
				x_match++
			}
			if strings.Contains(dir_to_word(puzzle, "north-west", x+1, y+1, depth), holiday) {
				x_match++
			}
			if x_match == 2 {
				match++
			}
		}
	}
	fmt.Println(match)

}

func dir_to_word(puzzle [][]string, dir string, x int, y int, depth int) string {
	word := ""

	to_visit := travel_in_dir(dir, coord{x, y}, depth)
	for _, c := range to_visit {
		if c.y >= 0 && c.y < len(puzzle) && c.x >= 0 && c.x < len(puzzle) {
			word += puzzle[c.y][c.x]
		}
	}
	return word
}

func travel_in_dir(dir string, loc coord, depth int) []coord {
	if depth <= 1 {
		return []coord{loc}
	} else {
		fibs := travel_in_dir(dir, loc, depth-1)
		next := neighbor_coord(dir, loc, depth)
		return append(fibs, next)
	}
}

func neighbor_coord(dir string, loc coord, depth int) coord {
	x, y := loc.x, loc.y

	// 0 based array
	depth--

	if strings.Contains(dir, "north") {
		y -= depth
	}
	if strings.Contains(dir, "south") {
		y += depth
	}
	if strings.Contains(dir, "east") {
		x += depth
	}
	if strings.Contains(dir, "west") {
		x -= depth
	}
	return coord{x, y}
}
