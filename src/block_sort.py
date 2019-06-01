import random
from pprint import pprint
import time
import os
#2304 1296
n, m = 0, 0
block = {
1:{"w":9,"h":12},
2:{"w":11,"h":15},
3:{"w":14,"h":19},
4:{"w":17,"h":23}
}
#test case & Sort 여부
input_list = []
output_list = []
w = 0
def Find_block(n):
   for i in range(len(input_list)):
      if input_list[i]['size'] == n:
         return input_list.pop(i)

def find_next(input_list):
   v = random.randint(1, 100)
   if((w / n) * 100 <= 20):
      if(v <= 10):
         return Find_block(1)
      elif(v <= 10  + 20):
         return Find_block(2)
      elif(v <= 10 + 20 + 20):
         return Find_block(3)
      else:
         return Find_block(4)
   elif((w / n) * 100 <= 40):
      if(v <= 30):
         return Find_block(1)
      elif(v <= 30 + 30):
         return Find_block(2)
      elif(v <= 30 + 30 + 30):
         return Find_block(3)
      else:
         return Find_block(4)
   elif((w / n) * 100 <= 60):
      if(v <= 50):
         return Find_block(1)
      elif(v <= 50 + 20):
         return Find_block(2)
      elif(v <= 50 + 20 + 20):
         return Find_block(3)
      else:
         return Find_block(4)
   elif((w / n) * 100 <= 80):
      if(v <= 30):
         return Find_block(1)
      elif(v <= 30 + 30):
         return Find_block(2)
      elif(v <= 30 + 30 + 30):
         return Find_block(3)
      else:
         return Find_block(4)
   else:
      if(v <= 10):
         return Find_block(1)
      elif(v <= 10 + 20):
         return Find_block(2)
      elif(v <= 10 + 20 + 20):
         return Find_block(3)
      else:
         return Find_block(4)

def Overlap(A, B):
   return not any([
      A["start"]['x'] > B["end"]['x'],
      A['end']['x'] < B["start"]['x'],
      A['start']['y'] >  B['end']['y'],
      A['end']['y'] <  B['start']['y'],
      ])
def Invalid(A):
   return A['end']['x'] > n-1 or A['end']['y'] > m-1
def Blocking(i):
   w = 0
   h = 0
   max_height = 0
   max_height_flag = 0
   while(True):
      if h + block[i['size']]["h"] >= m: break
      w = 0
      while(True):
         if w + block[i['size']]["w"] >= n: break
         flag = 0
         current_block = {
            "start":{
            "x": w,
            "y": h
            }, 
            "end":{
            "x": w + block[i['size']]["w"]-1, 
            "y": h + block[i['size']]["h"]-1
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
         i.update(current_block)
         max_height = max(max_height, current_block['end']['y'])
         max_height_flag = 1
         return i
      if max_height_flag:
         h = max_height
         max_height_flag = 0
      else:
         h = h + 1

def main(input, req_w, req_h):
   global n
   global m
   global input_list
   global output_list
   n = req_w // 20
   m = 1000
   input_list = input
   output_list = []
   while(True):
      if len(input_list) == 0:
         break
      cur = find_next(input_list)
      if cur is None: continue
      else:
         output_list.append(Blocking(cur))
         if output_list[-1] is None:
            output_list.pop()
         for i in output_list:
            print(i['post_id'], end=' ')
         print()
   return output_list

if __name__ == '__main__':
   loop = 10000
   result_list = []
   for i in range(loop):
      result_list.append(main(input_list))
      print(i+1,"번째 완료")
   avg_time, avg_space, avg_count = 0, 0, 0
   for i in result_list:
      avg_space = avg_space + i['space']
      avg_count = avg_count + i['b_count']
   print("-"*10)
   print("평균 공간 적재 비율:",avg_space / loop,"%")
   print("평균 블럭 수:",avg_count /loop,"개")
