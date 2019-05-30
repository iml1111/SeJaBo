import random
from pprint import pprint
import time
import os
#input_list = [random.randint(1,4) for i in range(40)]
input_list = [1,2,3,4] * 10
shuffle_list = []
n = 115
block = {
1:{"w":9,"h":12},
2:{"w":11,"h":15},
3:{"w":14,"h":19},
4:{"w":17,"h":23}
}

def Find_block(n):
	for i in range(len(input_list)):
		if input_list[i] == n:
			return input_list.pop(i)
def main():
	width = 0
	while(True):
		if len(input_list) == 0:
			break
		if width + 8 >= n-1:
			width = 0
		v = random.randint(1, 100)
		if((width / n) * 100 <= 30):
			if(v <= 10):
				shuffle_list.append(Find_block(1))
			elif(v <= 30):
				shuffle_list.append(Find_block(2))
			elif(v <= 50):
				shuffle_list.append(Find_block(3))
			else:
				shuffle_list.append(Find_block(4))
		elif((width / n) * 100 <= 43):
			if(v <= 10):
				shuffle_list.append(Find_block(1))
			elif(v <= 50):
				shuffle_list.append(Find_block(2))
			elif(v <= 90):
				shuffle_list.append(Find_block(3))
			else:
				shuffle_list.append(Find_block(4))
		elif((width / n) * 100 <= 57):
			if(v <= 50):
				shuffle_list.append(Find_block(1))
			elif(v <= 70):
				shuffle_list.append(Find_block(2))
			elif(v <= 90):
				shuffle_list.append(Find_block(3))
			else:
				shuffle_list.append(Find_block(4))
		elif((width / n) * 100 <= 70):
			if(v <= 10):
				shuffle_list.append(Find_block(1))
			elif(v <= 40):
				shuffle_list.append(Find_block(2))
			elif(v <= 90):
				shuffle_list.append(Find_block(3))
			else:
				shuffle_list.append(Find_block(4))
		else:
			if(v <= 10):
				shuffle_list.append(Find_block(1))
			elif(v <= 30):
				shuffle_list.append(Find_block(2))
			elif(v <= 50):
				shuffle_list.append(Find_block(3))
			else:
				shuffle_list.append(Find_block(4))
		if shuffle_list[-1] is None:
			shuffle_list.pop()
			continue
		width = width + block[shuffle_list[-1]]['w']
	#print(shuffle_list)
	return shuffle_list
if __name__ == '__main__':
	main()