# SeJaBo
Sejong University Project / Team IML 

## What is SeJaBo?
Information sharing SNS service for Sejong University students
![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LbSgAnmT2Kj3lFsJTf5%2F-LgfTJXWtCWzHo6gC5AG%2F-LgfW_Yvdq-bNIfkTUS0%2Fimage.png?alt=media&token=303c5558-1acd-4954-9662-410d1961427e)
SeJaBo이란 세종(SJ)대학교 + 대자보의 합성어로, 기존의 교내의 대자보 게시판을 대체하기 위해 제작한 서비스로, 세종대학교와 관련된 정보를 홍보하기 위한 SNS 서비스이다.

## System 구조
![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LbSgAnmT2Kj3lFsJTf5%2F-LeBDyfCSGBtSo3MM21M%2F-LeBE9ovjft87N3GlchT%2F%EC%8B%9C%EC%8A%A4%ED%85%9C%EA%B5%AC%EC%84%B1%EB%8F%84.png?alt=media&token=31544d9b-c548-428c-bbf5-fa20e1883bb0)
![img](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LbSgAnmT2Kj3lFsJTf5%2F-LggiDjGxFRSXGK3HJs5%2F-LggiEFOdns7QzztEEWb%2Fimage.png?alt=media&token=16afe70c-7eb1-44bd-bb3c-bdde59bda7be)

![img](https://postfiles.pstatic.net/MjAxOTA2MDZfNjIg/MDAxNTU5ODMyOTU0ODM1.cbMqhaesAILeGZBn8TRKMtCLxfMoXmLBb9PI8RZu9TQg.IJ4ogu-TpcSIPYri35aYE4sFkaonNCpBy1pn2RzfSJQg.PNG.shino1025/image.png?type=w773)

### 세종대학교 포탈을 통한 학교 구성원 인증

Web Crawling을 통한 학교의 학번 및 실명 인증으로 해당 포스터가 게시될 때, 게시한 사용자의 학번과 실명이 게시되게 하여 기존의 승인 절차를 자동화할 수 있다.


### 게시글 배포, 수정, 삭제에 대한 자동화

1개의 게시물 데이터를 복수의 대자보에 게시할 수 있으며, 포스터 수정을 통한 변경사항은 각 대자보에 실시간으로 반영된다. 또한 만료일에 의한 삭제 및 사용자 임의의 삭제 또한 모든 대자보 게시판에 실시간으로 변경사항이 반영된다.


### 블록 기반의 인터페이스

게시되는 정보에는 보편적으로 우선순위가 적용된다. 세자보는 해당 공지의 출처 및 관심도, 포스터의 크기, 게시글의 남은 유효기간을 고려하며, 정해진 블록 목록에서의 공간 배치 효율을 고려하여 실제 UI에 블록을 배치한다.

## You need this
1. Python 3.7
2. MySQL 5.7.25 or 8.0.5
3. Not Supported Internet Explorer

## How to use

```c
$ cd SeJaBo
$ pip install -r requirements.txt
$ cd src
$ python app.py
```
