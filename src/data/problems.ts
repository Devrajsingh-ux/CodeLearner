import type { Problem, SupportedLanguage } from "@/types";

// ── Supported languages ──────────────────────────────────────────────────────

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  {
    id: "javascript",
    label: "JavaScript",
    monacoId: "javascript",
    icon: "⚡",
    color: "#F7DF1E",
    judge0Id: 63,
    fileExt: "js",
  },
  {
    id: "typescript",
    label: "TypeScript",
    monacoId: "typescript",
    icon: "🔷",
    color: "#3178C6",
    judge0Id: 74,
    fileExt: "ts",
  },
  {
    id: "python",
    label: "Python",
    monacoId: "python",
    icon: "🐍",
    color: "#3776AB",
    judge0Id: 71,
    fileExt: "py",
  },
  {
    id: "java",
    label: "Java",
    monacoId: "java",
    icon: "☕",
    color: "#ED8B00",
    judge0Id: 62,
    fileExt: "java",
  },
  {
    id: "cpp",
    label: "C++",
    monacoId: "cpp",
    icon: "⚙️",
    color: "#00599C",
    judge0Id: 54,
    fileExt: "cpp",
  },
  {
    id: "go",
    label: "Go",
    monacoId: "go",
    icon: "🐹",
    color: "#00ADD8",
    judge0Id: 60,
    fileExt: "go",
  },
  {
    id: "rust",
    label: "Rust",
    monacoId: "rust",
    icon: "🦀",
    color: "#CE422B",
    judge0Id: 73,
    fileExt: "rs",
  },
  {
    id: "csharp",
    label: "C#",
    monacoId: "csharp",
    icon: "💜",
    color: "#9B4F96",
    judge0Id: 51,
    fileExt: "cs",
  },
];

// ── Problem starters by language ─────────────────────────────────────────────

type StarterMap = Partial<Record<SupportedLanguage["id"], string>>;

function starters(
  js: string,
  ts: string,
  py: string,
  java: string,
  cpp: string,
  go: string,
  rust: string,
  cs: string,
): StarterMap {
  return { javascript: js, typescript: ts, python: py, java, cpp, go, rust, csharp: cs };
}

// ── Problems dataset ─────────────────────────────────────────────────────────

export const problems: Problem[] = [
  // ── #1 Two Sum ─────────────────────────────────────────────────────────────
  {
    id: "two-sum",
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    acceptance: 49.1,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return **indices** of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    hints: [
      "A brute-force approach is O(n²). Can you do it in one pass?",
      "Use a hash map to store the complement of each number.",
    ],
    starterCode: starters(
      `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your solution here
}

// Test
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]`,
      `function twoSum(nums: number[], target: number): number[] {
  // Your solution here
}

// Test
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]`,
      `def two_sum(nums: list[int], target: int) -> list[int]:
    # Your solution here
    pass

# Test
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
print(two_sum([3, 2, 4], 6))       # [1, 2]`,
      `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your solution here
        return new int[]{};
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        System.out.println(Arrays.toString(s.twoSum(new int[]{2,7,11,15}, 9)));
        System.out.println(Arrays.toString(s.twoSum(new int[]{3,2,4}, 6)));
    }
}`,
      `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your solution here
    return {};
}

int main() {
    vector<int> a = {2, 7, 11, 15};
    auto r = twoSum(a, 9);
    cout << "[" << r[0] << ", " << r[1] << "]" << endl;
    return 0;
}`,
      `package main

import "fmt"

func twoSum(nums []int, target int) []int {
    // Your solution here
    return nil
}

func main() {
    fmt.Println(twoSum([]int{2, 7, 11, 15}, 9))
    fmt.Println(twoSum([]int{3, 2, 4}, 6))
}`,
      `use std::collections::HashMap;

fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    // Your solution here
    vec![]
}

fn main() {
    println!("{:?}", two_sum(vec![2, 7, 11, 15], 9));
    println!("{:?}", two_sum(vec![3, 2, 4], 6));
}`,
      `using System;
using System.Collections.Generic;

class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Your solution here
        return Array.Empty<int>();
    }

    static void Main() {
        var s = new Solution();
        Console.WriteLine(string.Join(", ", s.TwoSum(new[]{2,7,11,15}, 9)));
        Console.WriteLine(string.Join(", ", s.TwoSum(new[]{3,2,4}, 6)));
    }
}`,
    ),
  },

  // ── #2 Valid Palindrome ────────────────────────────────────────────────────
  {
    id: "valid-palindrome",
    number: 2,
    title: "Valid Palindrome",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"],
    acceptance: 44.7,
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    examples: [
      {
        input: `s = "A man, a plan, a canal: Panama"`,
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: `s = "race a car"`,
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 2 × 10⁵",
      "s consists only of printable ASCII characters.",
    ],
    hints: [
      "Strip non-alphanumeric characters and compare forward vs reverse.",
      "Two-pointer approach avoids creating an extra string.",
    ],
    starterCode: starters(
      `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Your solution here
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false`,
      `function isPalindrome(s: string): boolean {
  // Your solution here
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false`,
      `def is_palindrome(s: str) -> bool:
    # Your solution here
    pass

print(is_palindrome("A man, a plan, a canal: Panama"))  # True
print(is_palindrome("race a car"))  # False`,
      `class Solution {
    public boolean isPalindrome(String s) {
        // Your solution here
        return false;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isPalindrome("A man, a plan, a canal: Panama"));
        System.out.println(sol.isPalindrome("race a car"));
    }
}`,
      `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(string s) {
    // Your solution here
    return false;
}

int main() {
    cout << boolalpha << isPalindrome("A man, a plan, a canal: Panama") << endl;
    cout << boolalpha << isPalindrome("race a car") << endl;
    return 0;
}`,
      `package main

import "fmt"

func isPalindrome(s string) bool {
    // Your solution here
    return false
}

func main() {
    fmt.Println(isPalindrome("A man, a plan, a canal: Panama"))
    fmt.Println(isPalindrome("race a car"))
}`,
      `fn is_palindrome(s: String) -> bool {
    // Your solution here
    false
}

fn main() {
    println!("{}", is_palindrome("A man, a plan, a canal: Panama".to_string()));
    println!("{}", is_palindrome("race a car".to_string()));
}`,
      `using System;

class Solution {
    public bool IsPalindrome(string s) {
        // Your solution here
        return false;
    }

    static void Main() {
        var sol = new Solution();
        Console.WriteLine(sol.IsPalindrome("A man, a plan, a canal: Panama"));
        Console.WriteLine(sol.IsPalindrome("race a car"));
    }
}`,
    ),
  },

  // ── #3 Reverse Linked List ────────────────────────────────────────────────
  {
    id: "reverse-linked-list",
    number: 3,
    title: "Reverse Linked List",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    acceptance: 74.6,
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
      },
      {
        input: "head = []",
        output: "[]",
      },
    ],
    constraints: [
      "The number of nodes in the list is in the range [0, 5000].",
      "-5000 ≤ Node.val ≤ 5000",
    ],
    hints: ["Track prev, curr, next pointers as you iterate.", "Recursive solution: reverse(head.next) then fix pointers."],
    starterCode: starters(
      `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
  // Your solution here
}

// Helper: build list from array
function build(arr) {
  let dummy = new ListNode(); let cur = dummy;
  for (const v of arr) { cur.next = new ListNode(v); cur = cur.next; }
  return dummy.next;
}
function toArr(head) {
  const r = [];
  while (head) { r.push(head.val); head = head.next; }
  return r;
}
console.log(toArr(reverseList(build([1,2,3,4,5])))); // [5,4,3,2,1]`,
      `class ListNode {
  val: number; next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) { this.val = val; this.next = next; }
}

function reverseList(head: ListNode | null): ListNode | null {
  // Your solution here
  return null;
}

function build(arr: number[]): ListNode | null {
  let dummy = new ListNode(); let cur = dummy;
  for (const v of arr) { cur.next = new ListNode(v); cur = cur.next; }
  return dummy.next;
}
function toArr(head: ListNode | null): number[] {
  const r: number[] = [];
  while (head) { r.push(head.val); head = head.next; }
  return r;
}
console.log(toArr(reverseList(build([1,2,3,4,5]))));`,
      `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    # Your solution here
    pass

def build(arr):
    dummy = ListNode()
    cur = dummy
    for v in arr:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def to_list(head):
    r = []
    while head:
        r.append(head.val)
        head = head.next
    return r

print(to_list(reverse_list(build([1, 2, 3, 4, 5]))))`,
      `class ListNode {
    int val; ListNode next;
    ListNode(int v) { this.val = v; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        // Your solution here
        return null;
    }

    public static void main(String[] args) {
        // Build list 1->2->3->4->5
        ListNode h = new ListNode(1);
        h.next = new ListNode(2); h.next.next = new ListNode(3);
        h.next.next.next = new ListNode(4); h.next.next.next.next = new ListNode(5);
        ListNode r = new Solution().reverseList(h);
        while (r != null) { System.out.print(r.val + " "); r = r.next; }
    }
}`,
      `#include <bits/stdc++.h>
using namespace std;

struct ListNode { int val; ListNode* next; ListNode(int v): val(v), next(nullptr){} };

ListNode* reverseList(ListNode* head) {
    // Your solution here
    return nullptr;
}

int main() {
    ListNode* h = new ListNode(1);
    h->next = new ListNode(2); h->next->next = new ListNode(3);
    h->next->next->next = new ListNode(4); h->next->next->next->next = new ListNode(5);
    auto r = reverseList(h);
    while (r) { cout << r->val << " "; r = r->next; }
    cout << endl;
    return 0;
}`,
      `package main

import "fmt"

type ListNode struct { Val int; Next *ListNode }

func reverseList(head *ListNode) *ListNode {
    // Your solution here
    return nil
}

func main() {
    h := &ListNode{Val: 1, Next: &ListNode{Val: 2, Next: &ListNode{Val: 3, Next: &ListNode{Val: 4, Next: &ListNode{Val: 5}}}}}
    r := reverseList(h)
    for r != nil { fmt.Print(r.Val, " "); r = r.Next }
    fmt.Println()
}`,
      `#[derive(Debug)]
struct ListNode { val: i32, next: Option<Box<ListNode>> }

fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    // Your solution here
    None
}

fn main() {
    let list = Some(Box::new(ListNode { val: 1, next: Some(Box::new(ListNode { val: 2, next: Some(Box::new(ListNode { val: 3, next: None })) })) }));
    let reversed = reverse_list(list);
    println!("{:?}", reversed);
}`,
      `using System;

class ListNode { public int val; public ListNode next; public ListNode(int v){ val=v; } }

class Solution {
    public ListNode ReverseList(ListNode head) {
        // Your solution here
        return null;
    }

    static void Main() {
        var h = new ListNode(1);
        h.next = new ListNode(2); h.next.next = new ListNode(3);
        var r = new Solution().ReverseList(h);
        while (r != null) { Console.Write(r.val + " "); r = r.next; }
        Console.WriteLine();
    }
}`,
    ),
  },

  // ── #4 FizzBuzz ────────────────────────────────────────────────────────────
  {
    id: "fizz-buzz",
    number: 4,
    title: "Fizz Buzz",
    difficulty: "Easy",
    tags: ["Math", "String", "Simulation"],
    acceptance: 68.0,
    description: `Given an integer \`n\`, return a string array where:

- \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by 3 and 5.
- \`answer[i] == "Fizz"\` if \`i\` is divisible by 3.
- \`answer[i] == "Buzz"\` if \`i\` is divisible by 5.
- \`answer[i] == i\` (as a string) if none of the above conditions are true.

**1-indexed**: start from 1 up to and including n.`,
    examples: [
      { input: "n = 3", output: '["1","2","Fizz"]' },
      { input: "n = 5", output: '["1","2","Fizz","4","Buzz"]' },
      {
        input: "n = 15",
        output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]',
      },
    ],
    constraints: ["1 ≤ n ≤ 10⁴"],
    hints: ["Check divisibility by 15 first, then 3, then 5."],
    starterCode: starters(
      `/**
 * @param {number} n
 * @return {string[]}
 */
function fizzBuzz(n) {
  // Your solution here
}

console.log(fizzBuzz(15));`,
      `function fizzBuzz(n: number): string[] {
  // Your solution here
  return [];
}

console.log(fizzBuzz(15));`,
      `def fizz_buzz(n: int) -> list[str]:
    # Your solution here
    pass

print(fizz_buzz(15))`,
      `import java.util.*;

class Solution {
    public List<String> fizzBuzz(int n) {
        // Your solution here
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(new Solution().fizzBuzz(15));
    }
}`,
      `#include <bits/stdc++.h>
using namespace std;

vector<string> fizzBuzz(int n) {
    // Your solution here
    return {};
}

int main() {
    for (auto& s : fizzBuzz(15)) cout << s << " ";
    cout << endl;
    return 0;
}`,
      `package main

import "fmt"

func fizzBuzz(n int) []string {
    // Your solution here
    return nil
}

func main() { fmt.Println(fizzBuzz(15)) }`,
      `fn fizz_buzz(n: i32) -> Vec<String> {
    // Your solution here
    vec![]
}

fn main() { println!("{:?}", fizz_buzz(15)); }`,
      `using System;
using System.Collections.Generic;

class Solution {
    public IList<string> FizzBuzz(int n) {
        // Your solution here
        return new List<string>();
    }

    static void Main() {
        Console.WriteLine(string.Join(", ", new Solution().FizzBuzz(15)));
    }
}`,
    ),
  },

  // ── #5 Maximum Depth of Binary Tree ───────────────────────────────────────
  {
    id: "max-depth-binary-tree",
    number: 5,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    tags: ["Tree", "DFS", "BFS", "Recursion"],
    acceptance: 73.8,
    description: `Given the \`root\` of a binary tree, return its **maximum depth**.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10⁴].",
      "-100 ≤ Node.val ≤ 100",
    ],
    hints: ["Recursive: depth = 1 + max(depth(left), depth(right))"],
    starterCode: starters(
      `class TreeNode {
  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  // Your solution here
}

const t = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(maxDepth(t)); // 3`,
      `class TreeNode {
  val: number; left: TreeNode | null; right: TreeNode | null;
  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) { this.val = val; this.left = left; this.right = right; }
}

function maxDepth(root: TreeNode | null): number {
  // Your solution here
  return 0;
}

const t = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(maxDepth(t)); // 3`,
      `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def max_depth(root) -> int:
    # Your solution here
    pass

t = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(max_depth(t))  # 3`,
      `class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int v) { this.val = v; }
    TreeNode(int v, TreeNode l, TreeNode r) { this.val=v; this.left=l; this.right=r; }
}

class Solution {
    public int maxDepth(TreeNode root) {
        // Your solution here
        return 0;
    }

    public static void main(String[] args) {
        TreeNode t = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
        System.out.println(new Solution().maxDepth(t));
    }
}`,
      `#include <bits/stdc++.h>
using namespace std;

struct TreeNode { int val; TreeNode *left, *right; TreeNode(int v):val(v),left(nullptr),right(nullptr){} TreeNode(int v,TreeNode*l,TreeNode*r):val(v),left(l),right(r){} };

int maxDepth(TreeNode* root) {
    // Your solution here
    return 0;
}

int main() {
    auto t = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    cout << maxDepth(t) << endl;
    return 0;
}`,
      `package main

import "fmt"

type TreeNode struct { Val int; Left, Right *TreeNode }

func maxDepth(root *TreeNode) int {
    // Your solution here
    return 0
}

func main() {
    t := &TreeNode{3, &TreeNode{Val:9}, &TreeNode{20, &TreeNode{Val:15}, &TreeNode{Val:7}}}
    fmt.Println(maxDepth(t))
}`,
      `struct TreeNode { val: i32, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>> }

fn max_depth(root: Option<Box<TreeNode>>) -> i32 {
    // Your solution here
    0
}

fn main() {
    let t = Some(Box::new(TreeNode {
        val: 3,
        left: Some(Box::new(TreeNode { val: 9, left: None, right: None })),
        right: Some(Box::new(TreeNode { val: 20, left: None, right: None })),
    }));
    println!("{}", max_depth(t));
}`,
      `using System;

class TreeNode { public int val; public TreeNode left, right; public TreeNode(int v){val=v;} public TreeNode(int v,TreeNode l,TreeNode r){val=v;left=l;right=r;} }

class Solution {
    public int MaxDepth(TreeNode root) {
        // Your solution here
        return 0;
    }

    static void Main() {
        var t = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
        Console.WriteLine(new Solution().MaxDepth(t));
    }
}`,
    ),
  },

  // ── #6 Longest Common Prefix ──────────────────────────────────────────────
  {
    id: "longest-common-prefix",
    number: 6,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    tags: ["String", "Trie"],
    acceptance: 41.7,
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string \`""\`.`,
    examples: [
      { input: `strs = ["flower","flow","flight"]`, output: `"fl"` },
      {
        input: `strs = ["dog","racecar","car"]`,
        output: `""`,
        explanation: "There is no common prefix among the input strings.",
      },
    ],
    constraints: [
      "1 ≤ strs.length ≤ 200",
      "0 ≤ strs[i].length ≤ 200",
      "strs[i] consists of only lowercase English letters.",
    ],
    hints: ["Compare character by character using the first string as reference."],
    starterCode: starters(
      `/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  // Your solution here
}

console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"]));    // ""`,
      `function longestCommonPrefix(strs: string[]): string {
  // Your solution here
  return "";
}

console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"]));    // ""`,
      `def longest_common_prefix(strs: list[str]) -> str:
    # Your solution here
    pass

print(longest_common_prefix(["flower","flow","flight"]))  # "fl"
print(longest_common_prefix(["dog","racecar","car"]))      # ""`,
      `class Solution {
    public String longestCommonPrefix(String[] strs) {
        // Your solution here
        return "";
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        System.out.println(s.longestCommonPrefix(new String[]{"flower","flow","flight"}));
        System.out.println(s.longestCommonPrefix(new String[]{"dog","racecar","car"}));
    }
}`,
      `#include <bits/stdc++.h>
using namespace std;

string longestCommonPrefix(vector<string>& strs) {
    // Your solution here
    return "";
}

int main() {
    vector<string> a = {"flower","flow","flight"};
    cout << longestCommonPrefix(a) << endl;
    vector<string> b = {"dog","racecar","car"};
    cout << longestCommonPrefix(b) << endl;
    return 0;
}`,
      `package main

import "fmt"

func longestCommonPrefix(strs []string) string {
    // Your solution here
    return ""
}

func main() {
    fmt.Println(longestCommonPrefix([]string{"flower","flow","flight"}))
    fmt.Println(longestCommonPrefix([]string{"dog","racecar","car"}))
}`,
      `fn longest_common_prefix(strs: Vec<&str>) -> String {
    // Your solution here
    String::new()
}

fn main() {
    println!("{}", longest_common_prefix(vec!["flower","flow","flight"]));
    println!("{}", longest_common_prefix(vec!["dog","racecar","car"]));
}`,
      `using System;

class Solution {
    public string LongestCommonPrefix(string[] strs) {
        // Your solution here
        return "";
    }

    static void Main() {
        var s = new Solution();
        Console.WriteLine(s.LongestCommonPrefix(new[]{"flower","flow","flight"}));
        Console.WriteLine(s.LongestCommonPrefix(new[]{"dog","racecar","car"}));
    }
}`,
    ),
  },

  // ── #7 Binary Search ──────────────────────────────────────────────────────
  {
    id: "binary-search",
    number: 7,
    title: "Binary Search",
    difficulty: "Easy",
    tags: ["Array", "Binary Search"],
    acceptance: 55.3,
    description: `Given an array of integers \`nums\` which is sorted in **ascending order**, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, return its index. Otherwise, return \`-1\`.

You must write an algorithm with **O(log n)** runtime complexity.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums at index 4." },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums." },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁴",
      "-10⁴ < nums[i], target < 10⁴",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order.",
    ],
    hints: ["Maintain left and right pointers; check mid each iteration."],
    starterCode: starters(
      `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // Your solution here
}

console.log(search([-1,0,3,5,9,12], 9));  // 4
console.log(search([-1,0,3,5,9,12], 2));  // -1`,
      `function search(nums: number[], target: number): number {
  // Your solution here
  return -1;
}

console.log(search([-1,0,3,5,9,12], 9));  // 4
console.log(search([-1,0,3,5,9,12], 2));  // -1`,
      `def search(nums: list[int], target: int) -> int:
    # Your solution here
    pass

print(search([-1,0,3,5,9,12], 9))   # 4
print(search([-1,0,3,5,9,12], 2))   # -1`,
      `class Solution {
    public int search(int[] nums, int target) {
        // Your solution here
        return -1;
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        System.out.println(s.search(new int[]{-1,0,3,5,9,12}, 9));
        System.out.println(s.search(new int[]{-1,0,3,5,9,12}, 2));
    }
}`,
      `#include <bits/stdc++.h>
using namespace std;

int search(vector<int>& nums, int target) {
    // Your solution here
    return -1;
}

int main() {
    vector<int> v = {-1,0,3,5,9,12};
    cout << search(v, 9) << endl;
    cout << search(v, 2) << endl;
    return 0;
}`,
      `package main

import "fmt"

func search(nums []int, target int) int {
    // Your solution here
    return -1
}

func main() {
    fmt.Println(search([]int{-1,0,3,5,9,12}, 9))
    fmt.Println(search([]int{-1,0,3,5,9,12}, 2))
}`,
      `fn search(nums: Vec<i32>, target: i32) -> i32 {
    // Your solution here
    -1
}

fn main() {
    println!("{}", search(vec![-1,0,3,5,9,12], 9));
    println!("{}", search(vec![-1,0,3,5,9,12], 2));
}`,
      `using System;

class Solution {
    public int Search(int[] nums, int target) {
        // Your solution here
        return -1;
    }

    static void Main() {
        var s = new Solution();
        Console.WriteLine(s.Search(new[]{-1,0,3,5,9,12}, 9));
        Console.WriteLine(s.Search(new[]{-1,0,3,5,9,12}, 2));
    }
}`,
    ),
  },

  // ── #8 Merge Intervals ────────────────────────────────────────────────────
  {
    id: "merge-intervals",
    number: 8,
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    acceptance: 46.1,
    description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
      },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
      "intervals[i].length == 2",
      "0 ≤ starti ≤ endi ≤ 10⁴",
    ],
    hints: ["Sort intervals by start time.", "Iterate and extend the last merged interval if overlap found."],
    starterCode: starters(
      `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  // Your solution here
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
console.log(merge([[1,4],[4,5]]));`,
      `function merge(intervals: number[][]): number[][] {
  // Your solution here
  return [];
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
console.log(merge([[1,4],[4,5]]));`,
      `def merge(intervals: list[list[int]]) -> list[list[int]]:
    # Your solution here
    pass

print(merge([[1,3],[2,6],[8,10],[15,18]]))
print(merge([[1,4],[4,5]]))`,
      `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        // Your solution here
        return new int[][]{};
    }

    public static void main(String[] args) {
        int[][] r = new Solution().merge(new int[][]{{1,3},{2,6},{8,10},{15,18}});
        for (int[] i : r) System.out.println(Arrays.toString(i));
    }
}`,
      `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    // Your solution here
    return {};
}

int main() {
    vector<vector<int>> v = {{1,3},{2,6},{8,10},{15,18}};
    for (auto& i : merge(v)) cout << "[" << i[0] << "," << i[1] << "] ";
    cout << endl;
    return 0;
}`,
      `package main

import "fmt"

func merge(intervals [][]int) [][]int {
    // Your solution here
    return nil
}

func main() { fmt.Println(merge([][]int{{1,3},{2,6},{8,10},{15,18}})) }`,
      `fn merge(mut intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    // Your solution here
    vec![]
}

fn main() { println!("{:?}", merge(vec![vec![1,3],vec![2,6],vec![8,10],vec![15,18]])); }`,
      `using System;
using System.Collections.Generic;

class Solution {
    public int[][] Merge(int[][] intervals) {
        // Your solution here
        return Array.Empty<int[]>();
    }

    static void Main() {
        var r = new Solution().Merge(new int[][]{ new[]{1,3}, new[]{2,6}, new[]{8,10}, new[]{15,18} });
        foreach (var i in r) Console.WriteLine($"[{i[0]},{i[1]}]");
    }
}`,
    ),
  },

  // ── #9 Climbing Stairs ────────────────────────────────────────────────────
  {
    id: "climbing-stairs",
    number: 9,
    title: "Climbing Stairs",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    acceptance: 51.8,
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb **1** or **2** steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "1. 1+1 steps\n2. 2 steps" },
      {
        input: "n = 3",
        output: "3",
        explanation: "1. 1+1+1 steps\n2. 1+2 steps\n3. 2+1 steps",
      },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    hints: ["Notice the pattern: ways(n) = ways(n-1) + ways(n-2)", "This is Fibonacci!"],
    starterCode: starters(
      `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // Your solution here
}

console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3
console.log(climbStairs(10)); // 89`,
      `function climbStairs(n: number): number {
  // Your solution here
  return 0;
}

console.log(climbStairs(2));  // 2
console.log(climbStairs(3));  // 3
console.log(climbStairs(10)); // 89`,
      `def climb_stairs(n: int) -> int:
    # Your solution here
    pass

print(climb_stairs(2))   # 2
print(climb_stairs(3))   # 3
print(climb_stairs(10))  # 89`,
      `class Solution {
    public int climbStairs(int n) {
        // Your solution here
        return 0;
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        System.out.println(s.climbStairs(2));   // 2
        System.out.println(s.climbStairs(3));   // 3
        System.out.println(s.climbStairs(10));  // 89
    }
}`,
      `#include <bits/stdc++.h>
using namespace std;

int climbStairs(int n) {
    // Your solution here
    return 0;
}

int main() {
    cout << climbStairs(2) << " " << climbStairs(3) << " " << climbStairs(10) << endl;
    return 0;
}`,
      `package main

import "fmt"

func climbStairs(n int) int {
    // Your solution here
    return 0
}

func main() {
    fmt.Println(climbStairs(2), climbStairs(3), climbStairs(10))
}`,
      `fn climb_stairs(n: i32) -> i32 {
    // Your solution here
    0
}

fn main() {
    println!("{} {} {}", climb_stairs(2), climb_stairs(3), climb_stairs(10));
}`,
      `using System;

class Solution {
    public int ClimbStairs(int n) {
        // Your solution here
        return 0;
    }

    static void Main() {
        var s = new Solution();
        Console.WriteLine($"{s.ClimbStairs(2)} {s.ClimbStairs(3)} {s.ClimbStairs(10)}");
    }
}`,
    ),
  },

  // ── #10 LRU Cache ─────────────────────────────────────────────────────────
  {
    id: "lru-cache",
    number: 10,
    title: "LRU Cache",
    difficulty: "Hard",
    tags: ["Hash Table", "Linked List", "Design"],
    acceptance: 42.3,
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:

- \`LRUCache(int capacity)\` Initialize the LRU cache with **positive** size \`capacity\`.
- \`int get(int key)\` Return the value of the key if it exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds \`capacity\`, **evict** the least recently used key.

The functions \`get\` and \`put\` must each run in **O(1)** average time complexity.`,
    examples: [
      {
        input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
        output: "[null,null,null,1,null,-1,null,-1,3,4]",
      },
    ],
    constraints: [
      "1 ≤ capacity ≤ 3000",
      "0 ≤ key ≤ 10⁴",
      "0 ≤ value ≤ 10⁵",
      "At most 2 × 10⁵ calls will be made to get and put.",
    ],
    hints: [
      "Combine a HashMap with a doubly-linked list.",
      "Move accessed nodes to the front; evict from the back.",
    ],
    starterCode: starters(
      `class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  /** @param {number} key @return {number} */
  get(key) {
    // Your solution here
    return -1;
  }

  /** @param {number} key @param {number} value @return {void} */
  put(key, value) {
    // Your solution here
  }
}

const cache = new LRUCache(2);
cache.put(1, 1); cache.put(2, 2);
console.log(cache.get(1));    // 1
cache.put(3, 3);
console.log(cache.get(2));    // -1
cache.put(4, 4);
console.log(cache.get(1));    // -1
console.log(cache.get(3));    // 3
console.log(cache.get(4));    // 4`,
      `class LRUCache {
  private capacity: number;
  private map: Map<number, number>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key: number): number {
    // Your solution here
    return -1;
  }

  put(key: number, value: number): void {
    // Your solution here
  }
}

const cache = new LRUCache(2);
cache.put(1, 1); cache.put(2, 2);
console.log(cache.get(1));    // 1
cache.put(3, 3);
console.log(cache.get(2));    // -1`,
      `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        # Your solution here

    def get(self, key: int) -> int:
        # Your solution here
        return -1

    def put(self, key: int, value: int) -> None:
        # Your solution here
        pass

cache = LRUCache(2)
cache.put(1, 1); cache.put(2, 2)
print(cache.get(1))   # 1
cache.put(3, 3)
print(cache.get(2))   # -1`,
      `import java.util.*;

class LRUCache extends LinkedHashMap<Integer, Integer> {
    private final int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer,Integer> e) {
        return size() > capacity;
    }

    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1); cache.put(2, 2);
        System.out.println(cache.get(1));  // 1
        cache.put(3, 3);
        System.out.println(cache.get(2));  // -1
    }
}`,
      `#include <bits/stdc++.h>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int,int>> lst;
    unordered_map<int, list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) {
        // Your solution here
        return -1;
    }

    void put(int key, int value) {
        // Your solution here
    }
};

int main() {
    LRUCache cache(2);
    cache.put(1,1); cache.put(2,2);
    cout << cache.get(1) << endl;   // 1
    cache.put(3,3);
    cout << cache.get(2) << endl;   // -1
    return 0;
}`,
      `package main

import (
    "container/list"
    "fmt"
)

type LRUCache struct {
    cap   int
    list  *list.List
    cache map[int]*list.Element
}

type entry struct{ key, val int }

func Constructor(capacity int) LRUCache {
    return LRUCache{cap: capacity, list: list.New(), cache: make(map[int]*list.Element)}
}

func (c *LRUCache) Get(key int) int {
    // Your solution here
    return -1
}

func (c *LRUCache) Put(key, value int) {
    // Your solution here
}

func main() {
    c := Constructor(2)
    c.Put(1,1); c.Put(2,2)
    fmt.Println(c.Get(1)) // 1
    c.Put(3,3)
    fmt.Println(c.Get(2)) // -1
}`,
      `use std::collections::HashMap;

struct LRUCache {
    capacity: usize,
    map: HashMap<i32, i32>,
    order: Vec<i32>,
}

impl LRUCache {
    fn new(capacity: i32) -> Self {
        LRUCache { capacity: capacity as usize, map: HashMap::new(), order: Vec::new() }
    }

    fn get(&mut self, key: i32) -> i32 {
        // Your solution here
        -1
    }

    fn put(&mut self, key: i32, value: i32) {
        // Your solution here
    }
}

fn main() {
    let mut cache = LRUCache::new(2);
    cache.put(1, 1); cache.put(2, 2);
    println!("{}", cache.get(1)); // 1
    cache.put(3, 3);
    println!("{}", cache.get(2)); // -1
}`,
      `using System.Collections.Generic;
using System;

class LRUCache {
    private readonly int _capacity;
    private readonly Dictionary<int,LinkedListNode<(int key,int val)>> _map;
    private readonly LinkedList<(int key,int val)> _list;

    public LRUCache(int capacity) {
        _capacity = capacity;
        _map = new();
        _list = new();
    }

    public int Get(int key) {
        // Your solution here
        return -1;
    }

    public void Put(int key, int value) {
        // Your solution here
    }

    static void Main() {
        var c = new LRUCache(2);
        c.Put(1,1); c.Put(2,2);
        Console.WriteLine(c.Get(1)); // 1
        c.Put(3,3);
        Console.WriteLine(c.Get(2)); // -1
    }
}`,
    ),
  },
];
