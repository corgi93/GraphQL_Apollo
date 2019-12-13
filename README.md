# graphQL

: rest api가 명확, 체계적인 리소스 접근 방식에 따랐다.
데이터가 엄청 복잡해지면 url경로가 기형적으로 길어진다.
그럼, 단일 요청으로 데이터를 가져올 수 없는 경우도 있습니다.

이것을 해결하고자 한 게 graphQL입니다. graphQL은 데이터 탐색, 검색,수정
을 위한 강력한 쿼리 구문을 사용하여 graph형식으로 데이터를 구성합니다.

# 특징
1. end-point가 하나!
2. 사용자가 원하는 리소스만 요청할 수 있다. 
    - 원하는 게 하나인 데 이것을 요청하기 위해서 오버 요청을 하거나 
    - 원하지 않는 것까지 요청하는 언더 요청을 할 필요가 없어진다.
3. 단일 요청으로 애플리케이션에 필요한 모든 데이터를 가져옵니다.

# 장점
- 느린 모바일 환경에서 rest api처럼 여러 url에서 로드할 필요 없이! 
  단일 url로 요청하여 빠르게 자원을 가져올 수 있습니다.

- project/v1/studentInfo 와 project/v2/university 처럼 두 가지 요청을 
서버에 보내면 이는 각 요청마다 데이터를 가졍는 데 실패합니다. 모바일 환경에서는 
원하는 데이터를 얻기 위해서 서버를 2번 요청해야 합니다. 

- 하지만! graphQL을 사용하면 student, university 객체에 대한 세부 사항을 fetch할 수 있습니다.

```
graphQL 쿼리는 아래의 형식과 같다.

 student {
     학번
     성
     이름
     학교{
        학교이름
        위치
     }
 }

위의 쿼리는 아래와 같이 요청한 field가 정확하게 포함됩니다.
{
   "data": {
      "students": [
         {
            "학번": "55054512",
            "성": "홍",
            "이름": "길동",
            "학교": {
               "학교이름": "조선대학교",
               "location": "조선대로 11길 22"
            }
         },
         
         {
            "학번": "14053022",
            "성": "김",
            "이름": "유생",
            "학교": {
               "학교이름": "성균관",
               "location": "조선대로 14길 43"
            }
         },
         
         {
            "학번": "55054512",
            "성": "김",
            "이름": "존",
            "학교": {
               "학교이름": "하버드대",
               "location": "메사추세츠 34길 12"
            }
         }
      ]
   }
}

```

# graphQL은필드 및 관련 데이터 형식을 기반으로 합니다. 
 - graphGL 쿼리에 유형이 일치하지 않으면 서버 측 프로그램은 명확하게 오류 메세지를 반환합니다.

 - 이것을 통해서 clinet application에서는 디버깅과 버그를 쉽게 잡을 수 있습니다.

 - graphQL은 또한 명시적인 데이터 변환 및 구문 분석을 줄이는 데 도움이 되는 client측 라이브러리를 제공합니다.

# students , univ 데이터 유형은 다음과 같다.

- graphQL에서 필요한 3가지 
## server : 서버를 띄울 js나 ts파일 네이밍은 보통 app.js , server.js ? (ts로 작성함)
## schema : graphQL의 스키마 정의 문법에 따라 작성 ex) schema.graphql
## resolver : query 에 대한 response를 처리 파일
 ```
type Query {
   students:[Student]
}

// !는 not null
type Student {
   학번:ID!
   성 : String!
   이름 :String!
   성명 :String!
   학교: Univ!
}

type Univ {
   id:ID!
   학교이름:String
   위치 :String
   순위 :Float
   학생정보:[Student]
}
 ```

- 참고 : https://www.tutorialspoint.com/graphql/graphql_introduction.htm