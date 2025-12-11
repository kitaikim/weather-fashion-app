# 주우재 착샷 추천 웹앱

날씨에 맞는 주우재 스타일 패션을 추천해주는 웹앱입니다.

## 실행 방법

1. `index.html` 파일을 더블클릭하거나 브라우저로 드래그하세요
2. 도시 이름을 입력하고 "날씨 확인" 버튼을 클릭하세요
3. 또는 "내 위치" 버튼을 눌러 현재 위치의 날씨를 확인하세요

## 기능

- 도시별 날씨 정보 확인
- 현재 위치 기반 날씨 확인
- 온도와 날씨에 따른 착샷 추천
  - 25도 이상: 여름 룩
  - 15-25도: 봄/가을 룩
  - 5-15도: 쌀쌀한 날씨 룩
  - 5도 이하: 겨울 룩
  - 비오는 날: 레인 룩

## 데모 모드

현재는 데모 모드로 실행됩니다 (샘플 데이터 사용).

실제 날씨 정보를 사용하려면:

1. https://openweathermap.org/api 에서 무료 API 키를 발급받으세요
2. `index.html` 파일을 열어 `API_KEY` 변수에 발급받은 키를 입력하세요

```javascript
const API_KEY = '여기에_발급받은_API_키_입력';
```

## 샘플 이미지 교체하기

착샷 이미지를 실제 주우재 사진으로 교체하려면:

1. `index.html` 파일 열기
2. `outfitDatabase` 객체에서 각 `image` URL을 실제 이미지 URL로 교체

```javascript
image: 'https://실제이미지주소.jpg'
```

## 기술 스택

- HTML5
- CSS3
- JavaScript (Vanilla)
- OpenWeatherMap API

## 브라우저 지원

- Chrome, Firefox, Safari, Edge 최신 버전
