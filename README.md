## Commit Message Rule

|타입이름|내용|
|:----:|:-----------------:|
|FEAT|새로운 기능에 대한 커밋|
|FIX|버그 수정에 대한 커밋|
|BUILD|빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋|
|CHORE|그 외 자잘한 수정에 대한 커밋|
|CI|ci 관련 설정 수정에 대한 커밋|
|DOCS|문서 수정에 대한 커밋|
|STYLE|코드 스타일 혹은 포맷 등에 관한 커밋|
|REFACTOR|코드 리팩토링에 대한 커밋|
|TEST|테스트 코드 수정에 대한 커밋|
|PERF|성능 개선에 대한 커밋|
|UI|UI 구현 혹은 UI 수정에 대한 커밋|

## Github Flow

![image](https://github.com/user-attachments/assets/4de22506-585b-4960-bbdf-78596ab8b572)

1. Branch 생성
- 새로운 기능이나 버그 수정 작업을 수행하기 위해 브랜치를 생성한다.
- 네이밍 규칙은 ```feature/[개발할 기능]``` 으로 한다.
- ex) ```feature/community```, ```feature/meeting```


2. Commit 작성
- 브랜치에서 변경 사항을 커밋으로 저장한다.
- 커밋은 작업의 단위이며, 코드 변경 내용을 기록한다.


3. Pull Request
- 변경 사항을 본래 브랜치로 병합하기 위해 PR를 생성한다.


4. 리뷰 및 피드백
- PR를 생성한 후 다른 개발자들이 코드를 검토하고 피드백을 제공한다.


5. 병합
- PR이 승인되면 변경 사항을 본래 브랜치로 병합한다.
