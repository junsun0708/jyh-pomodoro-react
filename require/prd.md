## Project overview (프로젝트 개요):
이 부분은 프로젝트의 전반적인 목적과 주요 특징을 설명합니다.

1. 이 프로젝트는 '포모도로 기법'을 기반으로 한 타이머를 통해 사용자의 생산성 향상을 돕습니다.
2. 포모도로 기법은 25분 작업과 5분 휴식을 반복하며, 4회 작업 후에는 30분간의 긴 휴식을 취합니다.

## Core functionalities (핵심 기능):
이 섹션에서는 포모도로 타이머의 주요 기능들을 나열합니다.

기능:

1. 포모도로 타이머를 시작, 정지, 넘기기할 수 있어야 합니다.
2. 25분 작업이 끝나면 5분간 휴식이 진행되며, 25분 작업을 4회 완료한 후에는 30분의 휴식이 주어집니다.

## Doc (문서):
이 부분은 프로젝트 개발에 사용될 기술 스택과 도구들을 설명합니다.

1. React, TailwindCSS, TypeScript를 활용하여 웹사이트를 제작합니다.
2. 필요한 npm 패키지를 설치하여 사용합니다.

## Current file structure (현재 파일 구조):
jyh-pomodoro-react/
├── app/                        # Next.js 앱 디렉토리
│   ├── layout.tsx             # 앱 레이아웃 컴포넌트
│   ├── page.tsx               # 메인 페이지 컴포넌트
│   ├── globals.css            # 전역 스타일
│   └── fonts/                 # 폰트 파일
│       ├── GeistVF.woff       # Geist Sans 폰트
│       └── GeistMonoVF.woff   # Geist Mono 폰트
├── components/                 # 공통 컴포넌트
│   └── Timer/                 # 타이머 관련 컴포넌트 (예정)
├── require/                    # 프로젝트 요구사항
│   └── prd.md                 # 프로젝트 요구사항 문서
├── public/                    # 정적 파일
├── package.json              # 프로젝트 의존성 및 스크립트
├── tsconfig.json             # TypeScript 설정
├── tailwind.config.ts        # Tailwind CSS 설정
├── postcss.config.mjs        # PostCSS 설정
├── next.config.ts            # Next.js 설정
└── .eslintrc.json           # ESLint 설정

주요 구성 요소:
1. app/: Next.js 13+ App Router 구조를 따르는 메인 애플리케이션 코드
2. components/: 재사용 가능한 React 컴포넌트들
3. require/: 프로젝트 요구사항 및 문서
4. public/: 이미지 등 정적 자원
5. 설정 파일들: TypeScript, Tailwind, Next.js 등의 설정

향후 추가될 구조:
1. Timer 관련 컴포넌트
2. 상태 관리 로직
3. 타이머 설정 관련 유틸리티 함수
4. 테스트 코드