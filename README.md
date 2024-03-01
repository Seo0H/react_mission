# React Mission Repo - seo0h

- 담당자 : @Seo0H

## 기간

- 24.02.16 ~ 03.02

## 목표 / 요구사항

- 설문조사 폼 제작

- [x] UI는 상단, 중앙, 하단의 레이아웃을 가지고 있습니다.
- [x] 상단에는 로고가 위치합니다.
- [x] 하단은 CTA 버튼이 위치합니다.
- [x] 중앙에는 설문 조사 form이 위치하고 input에 자동 focus 됩니다.
- [x] 중앙 가장 위에 현재 설문조사 progress 상태를 볼 수 있습니다. (현재 진행률)

- [x] 유저가 입장하면 `/api/question/common`으로 질문지를 받는다.
- [x] 유저가 대상이 아닌 경우 `/no_target`으로 redirect 시킨다.
- [x] 유저 답변을 `/api/answers/common`으로 post 요청하고, 다음 질문지 `typeID와` `userId를` 받는다.

- [x] 공통 질문을 통해 얻은 `typeID를` 이용해 `/api/question/:typeID`에 요청해 질문지를 받는다.
- [x] 질문지는 `data.forms`에 제시된 순서로 user에게 답변을 받는다.
- [x] 답변을 다 받으면`/api/answers/:typeID`에 post로 작성한 답변과 userId을 업로드한다.
- [x] nextTypeId가 없으면 `/thanks` 페이지로 이동 후 설문조사를 종료한다.

- [x] 한/영 지원 : 모든 api는 ?lang=en을 통해 질문을 영어로 받을 수 있다.

## 사용 라이브러리

- **Dependency**
  - React
  - React router dom
- **Dev dependency**
  - Typescript
  - Jest, react testing lib
  - Css module
  - Json server ([server 코드](./server/json-server.js))
    - mock api를 이용해 실제 http get, post request를 구현하기 위해 사용했습니다.
    - ⚠️ json server 문법 상 get 요청 시 question id 와 lang 을 동시에 요청하기 위해서는 [`/api?id=:id&lang=:lang`](./src/api/form/index.ts) 과 같이 변경헤야 하기에 일단 해당 방식으로 구현했습니다.
      추후 프로덕션 서버가 존재힌다면 `/api/:id?lang=:lang` 과 같은 형식으로 요청을 보내도록 수정이 필요합니다.
  - Eslint, prettier
  - Babel
  - Webpack

---

## 로컬 실행 방법

1. 의존성을 다운로드합니다.

```
npm i
```

2. json-server를 실행합니다. localhost:3000 에서 실행됩니다.

```
npm run server
```

3. 프로그램을 실행합니다. localhost:3300 에서 실행됩니다.

```
npm run start
```

---

## 프로젝트 / 로직 구조

## 로직 구조 다이어그램

> 이미지를 클릭하시면 크게 보실 수 있습니다.

> ![image](https://github.com/Seo0H/react_mission/assets/108770949/10e103dd-77cb-41a0-b64b-a357fd2bc76f)

### Form Inputs 로직 - [ConditionalInput 컴포넌트](./src/components/form/conditional-input/conditional-input.tsx)

> `"text"| "number" | "checkbox" | "radio" | "radioNumber" | "radioWithInput"`
>
> - type별 input 폴더 위치 : [`src/components/common/form`](./src/components/common/form)
> - 조건부 Input 컴포넌트 (`<ConditionalInputs/>`) 위치 : [`/src/components/form/conditional-input/conditional-input`](./src/components/form/conditional-input/conditional-input.tsx)

- common/form 컴포넌트는 제어, 비제어 모드 둘 다 사용이 가능하도록 설계했습니다.
- `Radio`나 `Checkbox`가 `RadioGroup`과 `CheckboxGroup`와 같이 사용될 경우 내부 상태를 `Context`를 이용해 공유하도록 구현했습니다.
  - `radio`와 `checkbox`의 경우 chakra ui의 구현 방식을 참고하여 구현했습니다. ([chakra ui radio-group 코드 링크](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/src/radio-group/radio-group-root.tsx)),

### Form State 관리, 핸들링 - [`useForm`](./src/hooks/use-form/use-form.ts) 커스텀 훅 / FormProvider

- 비제어 모드로 폼을 컨트롤 할 수 있는 커스텀 훅입니다.
- `option`으로 `autofocus` 를 넘길 수 있습니다. (기본값 false)
- [react hook form](https://github.com/react-hook-form/react-hook-form)의 구조를 참고해 제작했습니다.
- 사용법 (`onSubmit` 으로 전체를 검증하는 경우의 예시입니다. 개별 질문에 대한 검증은 [validateSingleValue](./src/hooks/use-form/logic/create-form-control.ts#L144-L158) 함수를 이용해 가능합니다.)

  ```tsx
  const App = () => {
    const uniqId = useId();
    const { register, handleSubmit, formState } = useForm<Form>({ autoFocus: true });
    const { isValid, errors } = formState;

    return (
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <label htmlFor='userName'> 이름 : </label>
        <input
          {...register('userName', {
            required: true,
            requiredMessage: '필수 질문입니다.',
            validates: [{ type: 'not', target: '', validateText: '공백은 허용되지 않습니다.' }],
          })}
        />
        {isValid &&
          errors.userName?.message?.map((el, idx) => <span key={`${idx}-username-error-${uniqId}`}>{el}</span>)}
        <label htmlFor='age'>나이 :</label>
        <input
          {...register('age', {
            required: true,
            requiredMessage: '필수 질문입니다.',
            validates: [{ type: 'minMax', target: [20, '-'], validateText: '20살 이상이여야 합니다.' }],
          })}
        />
        {isValid && errors.age?.message?.map((el, idx) => <span key={`${idx}-age-error-${uniqId}`}>{el}</span>)}
        <button type='submit'>제출하기</button>
      </form>
    );
  };
  ```

### question ID - URL query parameter

```
  /question/:questionId?lang=ko
```

- `id`의 초기값은 `common`으로 세팅됩니다. [`common` 질문 이후 받아오는 `question id`에 의해 다음 질문으로 넘어갑니다.](./src/components/form/form-controller/hooks/use-form-submit.ts#L61-L65)

### fetch - [API factory class](./src/api/factory/factory.ts), [Router Loader](./src/routes/loaders.ts)

- API factory class 를 이용해 통일된 fetch 로직 관리하도록 했습니다.
- form get 요청은 react router dom의 loader를 이용해 받아오도록 했습니다. - ui랜더링 전 prefetching 을 위함

### Error 처리

- `Route` 관련 에러 : react router dom의 [error element](./src/views/error/index.tsx)를 사용했습니다.
- `ferch` 관련 에러 : [Error tost](./src/components/form/form-controller/form-controller.tsx#L46) 를 이용해 에러 상태가 사용자에게 보여지도록 했습니다.

### 다국어 지원 - [useLanguage](./src/hooks/use-language/use-language.ts) 커스텀 훅 / LanguageProvider

- `useLanguage` : React Router Dom에서 제공하는 `useUrlParams`를 이용해 url의 lang 키 값을 관리하고 현재 상태를 반환합니다.
- `LanguageProvider` : 전역에서 useLanguage의 리턴 값을 전달하는 제공자입니다.

### 추가 구현 사항 : Enter를 이용한 폼 컨트롤 - [PressEnter 컴포넌트](./src/components/press-enter/press-enter.tsx)

- `PressEnter` : 전역에서 enter 이벤트를 감지하며 해당 이밴트 후 실행할 콜백 함수를 인자로 받습니다.
- 주어진 예시 디자인에서 Enter를 이용한 폼 컨트롤이 가능했기에 추가 구현했습니다.

### 최적화

- `webpack` : [코드 스플리팅 적용](./webpack.prod.js#L76-L79)
- `react router` 로 전환되는 page 컴포넌트에 [`lazy` 로딩 적용](./src/routes/index.tsx#L10-L14)

### 테스팅 - jest, react-testing-library

- [유효성 검사를 담당하는 함수](./src/hooks/use-form/logic/validate-field.test.ts)와 [common form 컴포넌트에서의 제어 비제어 작동 여부](./src/components/common/form)를 테스트하며 진행했습니다.

---

## 추후 개선되어야 할 요소

- **질문 별 유저 접근권한 추가** : id를 url에서 관리하기에 url을 이용해 다른 유저의 질문에도 접근 가능한 상태입니다. 유저 별 허용된 질문을 세션에 담아 유저 권한을 체크하는 로직이 추가되면 더 좋았을 것 같습니다.

---

## 일정 관리

- Jira를 통한 일정 및 이슈 트래킹 ([Jira DB 노션 링크](https://www.notion.so/f06e8fc435784db3ac4131579933c386?pvs=21))

---

### 코드 규칙 (convention)

- 커밋 컨벤션

> [gitmessage.txt](./docs/.gitmessage.txt)

```
# chore: 빌드 프로세스나 도구 관련 변경
# docs: documentation 변경
# feat: 새로운 기능
# fix: 버그 수정
# perf: 성능 개선
# delete: 미사용 코드, 파일 삭제
# refactor: 버그를 수정하거나 기능을 추가하지 않는 코드 변경, 리팩토링
# style: 코드 의미에 영향을 주지 않는 변경사항 ( white space, formatting, colons )
# test: 누락된 테스트 추가 또는 기존 테스트 수정
# revert: 작업 되돌리기
# ui: css 관련 작업사항
```

- 참고 문서 : [Angular 커밋 형식 참조 시트](https://gist.github.com/brianclements/841ea7bffdb01346392c)

- 코드 컨벤션: eslint, prettier
