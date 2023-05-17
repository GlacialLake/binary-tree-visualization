# binary-tree-visualization

## summary

Draw a binary tree in the browser based on the pre-order traversal sequence (including empty leaves).

## dependencies

It should work on any modern browser.

## usage

The program needs two things to draw the tree.
First, you enter the maximum number of nodes that each row can contain (so the program can adjust the node size).
Second, you enter the pre-order traversal sequence, where non-empty nodes are positive integers and empty leaves are denoted by '#'.

For example, if you give the following input,

> 32

> 1 2 3 # # 4 # # 5 6 7 # # 8 # # #

you will get the following result.

![](example.png)
