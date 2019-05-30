import random
from pprint import pprint
import time
import os
import asd
#n = int(input("n:")) // 20
#m = int(input("m:")) // 20
n, m = 115, 64
block = {
1:{"w":9,"h":12},
2:{"w":11,"h":15},
3:{"w":14,"h":19},
4:{"w":17,"h":23}
}
#test case & Sort 여부
output_list = []
def Overlap(A, B):
	return not any([
		A["start"]['x'] > B["end"]['x'],
		A['end']['x'] < B["start"]['x'],
		A['start']['y'] >  B['end']['y'],
		A['end']['y'] <  B['start']['y'],
		])
def Invalid(A):
	return A['end']['x'] > n-1 or A['end']['y'] > m-1
def Blocking(idx, i):
	w, h = 0, 0
	max_height = 0
	max_height_flag = 0
	while(True):
		if h + block[i]["h"] >= m: break
		w = 0
		while(True):
			if w + block[i]["w"] >= n: break
			flag = 0
			current_block = {
				"start":{
				"x": w,
				"y": h
				}, 
				"end":{
				"x": w + block[i]["w"]-1, 
				"y": h + block[i]["h"]-1
				}
			}
			if Invalid(current_block):
				w = w + 1
				continue
			for embed in output_list:
				if Overlap(current_block, embed):
					flag = 1
					w = embed['end']['x'] + 1
					break
			if flag == 1:
				continue
			current_block.update({"size":i})
			output_list.append(current_block)
			max_height = max(max_height, current_block['end']['y'])
			max_height_flag = 1
			return True
		if max_height_flag:
			h = max_height
			max_height_flag = 0
		else:
			h = h + 1

def main():
	#input_list = [random.randint(1,1) for i in range(100)]
	#input_list = [random.randint(4,4) for i in range(100)]
	#input_list = [random.randint(1,4) for i in range(100)]
	#input_list = [random.randint(1,4) for i in range(32)]
	#input_list = [i for i in range(1,5)]*8
	#input_list = sorted(input_list, reverse = True)
	#input_list = sorted(input_list)
	input_list = asd.main()
	start_time = time.time()
	for idx,i in enumerate(input_list):
		Blocking(idx, i)
	end_time = time.time()
	result = 0
	for i in output_list:
		result = result + block[i['size']]['w']* block[i['size']]['h']
		'''
	print("적재된 공간 비율:", (result/(n*m))*100,"%")
	print("총 블럭수:",len(input_list))
	print("적재된 블럭수:",len(output_list))
	print("총 면적:", n*m)
	print("사용 면적:", result)
	print("소요 시간:",time.time() - start_time)
	'''
	return {
	"time":end_time - start_time, 
	"space":(result/(n*m))*100,
	"b_count":len(output_list)
	}

if __name__ == '__main__':
	loop = 3000
	result_list = []
	for i in range(loop):
		result_list.append(main())
		print(i+1,"번째 완료")
	avg_time, avg_space, avg_count = 0, 0, 0
	for i in result_list:
		avg_space = avg_space + i['space']
		avg_time = avg_time + i['time']
		avg_count = avg_count + i['b_count']
	print("-"*10)
	print("평균 공간 적재 비율:",avg_space / loop,"%")
	print("평균 소요 시간:",avg_time / loop,"초")
	print("평균 블럭 수:",avg_count /loop,"개")
