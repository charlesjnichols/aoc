package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	contents, _ := os.ReadFile("day6-page.txt")
	lines := strings.Split(strings.TrimSpace(string(contents)), "\n")

	puzzle := make([][]string, len(lines))
	for y, s := range lines {
		objs := strings.Split(s, "")
		puzzle[y] = objs
	}

	protect, loop := 0, 0
	x, y, dir := find(puzzle)

	for x != -1 && protect < (len(puzzle)*len(puzzle)) {
		// fmt.Println(dir)
		// print(puzzle)

		if dir == "^" || dir == "v" {
			if test(puzzle, x, y, x-1, y, dir) || test(puzzle, x, y, x+1, y, dir) {
				loop++
			}
		} else if dir == ">" || dir == "<" {
			if test(puzzle, x, y, x, y-1, dir) || test(puzzle, x, y, x, y+1, dir) {
				loop++
			}
		}

		puzzle, x, y, dir = walk(puzzle, x, y, dir)
		protect++

	}
	// print(puzzle)
	fmt.Println(loop, answer(puzzle))

}

func test(puzzle [][]string, start_x int, start_y int, block_x int, block_y int, dir string) bool {

	test_puzzle := make([][]string, len(puzzle))
	copy(test_puzzle, puzzle)

	for y := range puzzle {
		test_puzzle[y] = make([]string, len(puzzle))
		copy(test_puzzle[y], puzzle[y])
	}

	if block_x == -1 || block_x >= len(puzzle) || block_y == -1 || block_y >= len(puzzle) {
		return false
	}

	test_puzzle[block_y][block_x] = "O"

	x, y := next(start_x, start_y, dir)
	if x == -1 || x >= len(puzzle) || y == -1 || y >= len(puzzle) {
		return false
	}

	test_protect := 0

	for test_protect < (len(puzzle) * len(puzzle)) {
		test_protect++
		test_puzzle, x, y, dir = walk(test_puzzle, x, y, dir)
		if x == -1 || y == -1 {
			return false
		}
		if start_x == x && start_y == y {
			test_puzzle[y][x] = "+"
			fmt.Println("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
			print(puzzle)
			print(test_puzzle)
			fmt.Println("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
			fmt.Println("")
			return true
		}
		// print(test_puzzle)
	}
	return false
}

func answer(puzzle [][]string) int {
	count := 0
	for _, y := range puzzle {
		for _, x := range y {
			if x != "." && x != "#" && x != "O" {
				count++
			}
		}
	}
	return count
}

func print(puzzle [][]string) {
	for _, y := range puzzle {
		for _, x := range y {
			fmt.Print(x)
		}
		fmt.Println()
	}
	fmt.Println()
}

func find(puzzle [][]string) (x int, y int, dir string) {
	re := regexp.MustCompile(`\^|\>|\<|v`)

	for y, row := range puzzle {
		for x, room := range row {
			if re.MatchString(room) {
				return x, y, room
			}
		}
	}
	return -1, -1, "done"
}

func fill(current string, dir string) string {
	if current == "-" || current == "|" {
		return "+"
	}
	return dir
}

func next(x int, y int, dir string) (int, int) {
	if dir == "^" {
		y -= 1
	} else if dir == "v" {
		y += 1
	} else if dir == "<" {
		x -= 1
	} else if dir == ">" {
		x += 1
	}
	return x, y
}

func walk(puzzle [][]string, start_x int, start_y int, dir string) ([][]string, int, int, string) {
	end_x, end_y := next(start_x, start_y, dir)

	if end_x >= len(puzzle) || end_x < 0 || end_y >= len(puzzle) || end_y < 0 {
		return puzzle, -1, -1, "done"
	}

	if puzzle[end_y][end_x] == "#" || puzzle[end_y][end_x] == "O" {
		if dir == "^" {
			dir = ">"
		} else if dir == "v" {
			dir = "<"
		} else if dir == "<" {
			dir = "^"
		} else if dir == ">" {
			dir = "v"
		}
		puzzle[start_y][start_x] = "+"
		return walk(puzzle, start_x, start_y, dir)

	}
	if dir == "^" {
		puzzle[start_y][start_x] = fill(puzzle[start_y][start_x], "|")
	} else if dir == "v" {
		puzzle[start_y][start_x] = fill(puzzle[start_y][start_x], "|")
	} else if dir == "<" {
		puzzle[start_y][start_x] = fill(puzzle[start_y][start_x], "-")
	} else if dir == ">" {
		puzzle[start_y][start_x] = fill(puzzle[start_y][start_x], "-")
	}

	return puzzle, end_x, end_y, dir
}
