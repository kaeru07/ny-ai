# 麻雀牌譜 待ち牌当てクイズ (MVP)

天鳳等の牌譜から局面を切り出して「待ち牌」を当てるクイズWebアプリです。  
まずは**サンプル問題で確実に動くMVP**として構築し、後から天鳳牌譜の取り込み・自動抽出を拡張できる設計にしています。

## 実装方針

1. **クイズアプリ本体を先に成立**
   - サンプル問題で1問ずつ出題
   - 34種牌から複数選択回答
   - 正誤判定・解説表示・成績表示
2. **取り込みの統一形式を定義**
   - `QuizProblem` 型を中心に画面・データ処理を統一
   - JSONアップロードで `QuizProblem[]` を読めるようにする
3. **天鳳パーサは拡張可能な入口を用意**
   - `parser/tenhouParser.ts` に将来拡張用の入口を作成
   - MVPでは「変換済みJSON」を優先対応
4. **抽出ロジックは設計を先行**
   - Pattern A/B の抽出APIスケルトンを定義
   - 実装は後続タスクで段階的に追加

## ディレクトリ構成

```txt
.
├─ app/
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ PlayerBoard.tsx
│  └─ TileChip.tsx
├─ data/
│  └─ sampleProblems.ts
├─ lib/
│  ├─ extractorDesign.ts
│  ├─ tile.ts
│  └─ types.ts
├─ parser/
│  └─ tenhouParser.ts
├─ package.json
├─ tailwind.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
└─ README.md
```

## ローカル起動方法

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## Vercelデプロイ方法

1. GitHubにpush
2. Vercelで `New Project` からこのリポジトリを選択
3. Framework Preset は `Next.js`（自動検出）
4. Build Command / Output Directory はデフォルトのままでOK
5. 環境変数は不要
6. `Deploy`

## JSON問題フォーマット

アップロードは `QuizProblem[]` を受け付けます。最小例:

```json
[
  {
    "id": "q1",
    "source": "sample",
    "round": "東1局",
    "turn": 8,
    "targetPlayer": 0,
    "doraIndicators": ["3p"],
    "players": [
      { "hand": ["2m"], "melds": [], "discards": ["9m"] },
      { "hand": [], "melds": [], "discards": [] },
      { "hand": [], "melds": [], "discards": [] },
      { "hand": [], "melds": [], "discards": [] }
    ],
    "waits": ["1m", "7m"],
    "winningTile": "7m",
    "difficulty": "beginner"
  }
]
```

`difficulty` は `beginner | intermediate | advanced`。

## 牌譜取り込み基盤

- `parser/tenhouParser.ts`
  - 入口: `parseTenhouToQuizProblems(input: string)`
  - 文字列先頭が `<` の場合はXML扱いとして未実装エラー
  - JSON文字列なら `QuizProblem[]` として基本バリデーション

## 自動抽出ロジック（設計）

`lib/extractorDesign.ts` に以下を定義:

- `ExtractPattern`
  - `A_TENPAI_BEFORE_WIN`
  - `B_AFTER_LAST_DISCARD`
- `extractQuizProblemsFromWinningLog(...)`
  - 将来、牌譜イベント列から局面スナップショットを作るためのスタブ

抽出時に保持すべき情報（設計済み）:
- 局名
- 巡目
- 対象プレイヤー
- 手牌 / 副露 / 河
- ドラ表示牌
- 正解待ち牌
- 実際の和了牌
- 解説文

## 問題データ

`data/sampleProblems.ts` に **5問** を収録。
- 初級: 門前中心
- 中級: 多面待ちあり
- 上級: 副露あり

## UI仕様への対応

- スマホ最適化: 1カラム中心 + レスポンシブ
- 手牌表示: 牌チップコンポーネント利用
- 河表示: プレイヤーごとに表示
- 対象プレイヤー強調: ハイライト表示
- 回答候補: 全34種
- 同種牌: 1回選択でON/OFF
- 操作ボタン: 「クリア」「回答」「次へ」
- 設定: ヒントON/OFF
- 成績表示: `正解数 / 出題数`

## 今後の拡張候補

1. 天鳳XMLイベント列パーサ実装
2. 鳴き・暗槓・加槓・赤牌の厳密対応
3. 和了直前局面の自動抽出（A/B）本実装
4. 問題の重複排除・難易度自動推定
5. 問題共有URL / ローカル保存
6. 牌画像スプライト対応（現在はテキスト牌）
