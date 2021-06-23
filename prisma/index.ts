// query issuance command: npx ts-node prisma/index.ts

import { PrismaClient } from "@prisma/client";
// ベタ書き用（queryRaw の型引数）
// import { User } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  /**
   *
   * 下記 query lesson
   *
   */
  /**
   * NOTE: 単純な検索
   */
  // 1件検索
  // const alice = await prisma.user.findUnique({
  //   where: { email: "alice@example.com" },
  // });
  // console.log(alice);
  // リスト検索
  // const users = await prisma.user.findMany();
  // console.log(users);
  /**
   * NOTE: Join検索
   */
  // ユーザー詳細
  // Bob に紐づいた投稿を検索する
  //   const bob = await prisma.user.findUnique({
  //     where: { email: "bob@example.com" },
  //     include: { posts: true },
  //   });
  //   console.log(bob);
  // 投稿一覧
  // 投稿一覧（ページング）を取得する
  // タイトルをキーワードで絞り込み、取得件数を絞り込む
  // const posts = await prisma.post.findMany({
  //   where: {
  //     title: {
  //       startsWith: "title",
  //     },
  //   },
  //   take: 5,
  //   orderBy: {
  //     id: "asc",
  //   },
  //   include: {
  //     author: true,
  //   },
  // });
  // console.log(posts);
  /**
   * NOTE: Native Query ［パラメータ埋め込み］
   * Prisma では、SQLベタ書きも利用できる
   */
  // const email = "alice@example.com";
  // const alice = await prisma.$queryRaw<User>(
  //   `SELECT * FROM "postgres"."User" WHERE "postgres"."User"."email" = '${email}';`
  // );
  // console.log(alice);
  // SQLインジェクション確認
  // ※ この方式を検索フォームなどのユーザ入力を受け付ける箇所で利用するのは、危険なことを確認
  // const email = "'' OR 1=1 ORDER BY 1 DESC";
  // const alice = await prisma.$queryRaw(
  //   `SELECT * FROM "postgres"."User" WHERE "postgres"."User"."email" = ${email};`
  // );
  // console.log(alice);
  /**
   * Native Query ［パラメータ指定］
   */
  // const alice = await prisma.$queryRaw(
  //   `SELECT * FROM "postgres"."User" WHERE "postgres"."User"."email" = $1`,
  //   "alice@example.com"
  // );
  // console.log(alice);
  // SQLインジェクション確認
  // const alice = await prisma.$queryRaw(
  //   `SELECT * FROM "postgres"."User" WHERE "postgres"."User"."email" = $1`,
  //   "'' OR 1=1 ORDER BY 1 DESC"
  // );
  // console.log(alice);
  /**
   *
   * 下記 transaction lesson
   *
   */
  const john = await prisma.user.create({
    data: {
      name: "john",
      email: "john@example.com",
      profile: {
        create: {
          bio: "I like turtles",
        },
      },
    },
  });
  console.log(john);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
