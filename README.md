# 概要

下記ブログにて紹介する、SES でのドメイン検証を行うためのソースです。

agaroot-itp.com/blog/2209/

Route 53 のホストゾーンのルートドメインのドメイン検証を行います。

# 前提条件

前述の通り、Route 53 のホストゾーンのルートドメインのドメイン検証を行うので、ホストゾーン名が検証するドメインと一致するパブリックホストゾーンが必要です。

また、`mail.{検証するドメイン}`という MX レコードおよび TXT レコードを作成するので、既存でそういったレコードがある場合には削除するか、[ソースコード](./lib/wrapper/SESWrapper.ts)を変更いただく必要がございます。

# 各バージョン

- node: v20.12.1
- TypeScript: Version 3.7.5
- cdk: 2.137.0

# 構築手順

## GitHub の準備

1. 本ソースがプッシュされた GitHub リポジトリを作成してください。
1. システム構築用のブランチを作成してください。各ブランチ毎にシステムが構築されますので、例えば開発環境用に develop ブランチ、本番環境用に production ブランチといった具合にブランチを作成していくと良いでしょう。

## GitHub と AWS の接続

[GitHub リポジトリと AWS との接続を作成](https://docs.aws.amazon.com/ja_jp/codepipeline/latest/userguide/connections-github.html)します。

## 環境変数の記述

[.env](./.env)ファイルに環境変数を以下の通りに記述し、システム構築に用いるブランチにプッシュします。

- `APP_NAME`: アプリ名
- `ENV_NAME`: 環境名 e.g. dev, prod...
- `DB_NAME`: データベース(スキーマ)名
- `REPO_OWNER_NAME`: GitHub リポジトリの所有者名
- `REPO_NAME`: GitHub リポジトリ名
- `BRANCH_NAME`: ブランチ名
- `CONNECTION_ID`: 先の手順で作成した GitHub リポジトリと AWS の接続
- `HOSTED_ZONE_ID`: 検証を行うドメインのホストゾーン ID
- `ZONE_NAME`: 検証を行うドメインのホストゾーン名

## デプロイ

本ソースのトップディレクトリで、下記コマンドを実行します。

```
$ npm install
$ cdk bootstrap
$ cdk deploy
```

# 構築後の改修

CodePipeline で GitHub リポジトリと接続された CI/CD パイプラインが作成されています。なので以前のバージョンも含めたリリースの実行や実行中のリリース処理の中断なども行えます。
