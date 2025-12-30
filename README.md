# tmn-todo-240103

> **Status**: 🎨 DESIGNING

## 概要

シンプルで使いやすいToDoアプリケーション。タスクの追加、編集、削除、完了状態の管理ができます。

## 機能

- [ ] タスク追加
- [ ] タスク編集
- [ ] タスク削除
- [ ] タスク完了/未完了トグル

## 画面

| パス | 画面名 | 説明 |
|------|--------|------|
| `/` | ToDoリスト | 全てのタスクを表示し、新規タスク追加、タスク管理を行うメインページ |

## データ

### Todo

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | string | タスクの一意の識別子 |
| title | string | タスクのタイトル |
| completed | boolean | タスクの完了状態 |
| createdAt | string | タスク作成日時 |

## 認証

なし

---

## Tech Stack

- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS + shadcn/ui
- Database: Vercel KV
- Hosting: Vercel
