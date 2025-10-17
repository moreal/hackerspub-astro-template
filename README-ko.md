# Hackers' Pub Astro 템플릿

[Hackers' Pub](https://hackers.pub) GraphQL API를 사용하여 정적 블로그를 생성하는 Astro 템플릿입니다.

[English Documentation](./README.md)

## 기능

- 📝 Hackers' Pub에서 GraphQL을 통해 글 가져오기
- 🌍 자동 번역 감지를 통한 다국어 지원
- 🏷️ 태그 기반 탐색
- ⚡ 정적 사이트 생성 (SSG)
- 🎨 Tailwind CSS 스타일링
- 🔒 공개 범위 필터링
- 📅 상대 시간 표시
- 👍 리액션 표시

## 설치

1. 의존성 설치:

```bash
yarn install
```

2. `.env.example`을 `.env`로 복사하여 사이트 설정:

```bash
cp .env.example .env
```

3. `.env` 파일을 편집하여 설정:

```env
GRAPHQL_ENDPOINT=https://hackers.pub/graphql
HACKERSPUB_HANDLE=your-handle
MINIMUM_VISIBILITY=PUBLIC
SITE_TITLE=내 블로그
SITE_DESCRIPTION=Hackers' Pub으로 만든 블로그
```

**참고**:

- `HACKERSPUB_HANDLE`에는 도메인 없이 핸들만 입력하세요 (예: `moreal@hackers.pub` 대신 `moreal`).
- Astro는 자동으로 `.env` 파일을 로드하고 `import.meta.env`를 통해 사용할 수 있게 합니다.

또는 `src/config.ts` 파일을 직접 편집하여 설정을 하드코딩할 수도 있습니다.

## 개발

개발 서버 실행:

```bash
yarn dev
```

브라우저에서 [http://localhost:4321](http://localhost:4321)을 열어주세요.

## 빌드

정적 사이트 생성:

```bash
yarn build
```

빌드된 사이트 미리보기:

```bash
yarn preview
```

## GraphQL 코드 생성

`src/lib/graphql/queries.ts`에서 GraphQL 쿼리를 수정한 경우, 타입을 재생성하세요:

```bash
yarn codegen
```

## 코드 품질

### 타입 체크

코드 생성과 함께 타입 체크 실행:

```bash
yarn check
```

GraphQL 코드 생성 후 Astro 타입 체커를 실행합니다.

### 코드 포매팅

Prettier로 코드 포맷:

```bash
yarn format
```

코드가 올바르게 포맷되었는지 확인:

```bash
yarn format:check
```

### Git Hooks

이 프로젝트는 [Lefthook](https://github.com/evilmartians/lefthook)과 lint-staged를 사용하여 커밋 전에 자동으로 코드를 포맷합니다. pre-commit 훅이 스테이징된 파일에 Prettier를 실행합니다.

Lefthook은 `lefthook.yml`에 설정되어 있습니다.

### CI/CD

GitHub Actions 워크플로우가 push 및 pull request 시 자동으로 다음을 확인합니다:

- 코드 포매팅 (Prettier)
- 타입 체킹 (`astro check`)
- GraphQL 코드 생성

## 라우트

- `/` - 모든 글 목록 (최신순 정렬)
- `/posts/[year]/[slug]/` - 개별 글 페이지 (원본 언어)
- `/posts/[year]/[slug]/[locale]/` - 번역된 글 페이지
- `/tags` - 글 개수와 함께 표시되는 태그 목록
- `/tag/[tag]` - 태그별 글 목록
- `/about` - 소개 페이지 (작성자 정보 및 프로필)
- `/sitemap-index.xml` - 자동 생성되는 사이트맵
- `/robots.txt` - 사이트맵 참조가 포함된 robots.txt

## 다국어 지원

여러 언어 버전이 있는 글은 각 번역마다 별도의 URL을 갖습니다. 시스템은 자동으로:

- `/posts/[year]/[slug]/[locale]/`에 각 언어별 페이지 생성
- `/posts/[year]/[slug]/`에 원본 언어 표시
- 현재 번역 중인 글 필터링 (`beingTranslated: true`)
- 각 페이지에 언어 전환 링크 제공
- 원본 언어에 "(Original)" 라벨 표시
- 번역이 어느 언어에서 번역되었는지 표시
- SEO를 위한 적절한 `hreflang` 태그 포함

글을 볼 때 독자는 사용 가능한 모든 언어 버전을 확인하고 페이지 상단의 언어 링크를 사용하여 전환할 수 있습니다.

## 설정

### 사이트 URL

사이트맵 생성을 위해 `astro.config.mjs`에서 사이트 URL 설정:

```javascript
export default defineConfig({
  site: "https://yourdomain.com",
  // ...
});
```

사이트맵 통합이 절대 URL을 생성하려면 이 설정이 필요합니다.

### GraphQL 엔드포인트

환경 변수에서 GraphQL 엔드포인트 URL 설정:

```env
GRAPHQL_ENDPOINT=https://hackers.pub/graphql
```

### 공개 범위 레벨

`MINIMUM_VISIBILITY` 설정은 표시할 글을 제어합니다:

- `PUBLIC` - 공개 글만 표시 (기본값)
- `UNLISTED` - 공개 및 목록에 없는 글
- `FOLLOWERS` - 공개, 목록에 없는 글 및 팔로워 전용 글
- `DIRECT` - 모든 글

### 사이트 설정

`src/config.ts`를 편집하여 커스터마이징:

```typescript
export const siteConfig = {
  graphqlEndpoint:
    import.meta.env.GRAPHQL_ENDPOINT || "https://hackers.pub/graphql",
  handle: import.meta.env.HACKERSPUB_HANDLE || "user",
  minimumVisibility: (import.meta.env.MINIMUM_VISIBILITY || "PUBLIC") as
    | "PUBLIC"
    | "UNLISTED"
    | "FOLLOWERS"
    | "DIRECT",
  title: import.meta.env.SITE_TITLE || "My Blog",
  description:
    import.meta.env.SITE_DESCRIPTION || "A blog powered by Hackers' Pub",
} as const;
```

## 스타일링

이 템플릿은 Tailwind CSS와 Typography 플러그인(`@tailwindcss/typography`)을 사용하여 글의 HTML 콘텐츠에 적절한 스타일을 적용합니다. `prose` 클래스는 다음 요소에 자동으로 아름다운 타이포그래피 기본값을 적용합니다:

- 제목 (h1-h6)
- 단락
- 목록 (ul, ol)
- 링크
- 코드 블록
- 인용문
- 테이블
- 기타 등등

`tailwind.config.mjs`에서 타이포그래피 스타일을 커스터마이징할 수 있습니다.

## 기술 스택

- [Astro](https://astro.build) - 정적 사이트 생성기
- [React](https://react.dev) - UI 컴포넌트 (클라이언트 사이드 인터랙티비티)
- [Tailwind CSS](https://tailwindcss.com) - 스타일링
- [GraphQL Codegen](https://the-guild.dev/graphql/codegen) - 타입 안전 GraphQL 클라이언트
- [graphql-request](https://github.com/jasonkuhrt/graphql-request) - GraphQL 클라이언트

## 라이선스

MIT
