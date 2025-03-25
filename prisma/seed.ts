import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authors = [
  {
    firstname: "J. R. R.",
    lastname: "Tolkien",
    books: {
      create: [
        {
          title: "The Hobbit",
          publication_year: 1937,
          tags: {
            connect: [{ name: "Fantasy" }, { name: "Adventure" }],
          },
        },
        {
          title: "The Lord of the Rings",
          publication_year: 1954,
          tags: {
            connect: [{ name: "Fantasy" }, { name: "Adventure" }],
          },
        },
      ],
    },
  },
  {
    firstname: "George",
    lastname: "Orwell",
    books: {
      create: [
        {
          title: "1984",
          publication_year: 1949,
          tags: {
            connect: [{ name: "Dystopian" }, { name: "Modernist" }],
          },
        },
      ],
    },
  },
  {
    firstname: "Stephen",
    lastname: "King",
    books: {
      create: [
        {
          title: "It",
          publication_year: 1986,
          tags: {
            connect: [{ name: "Horror" }, { name: "Thriller" }],
          },
        },
      ],
    },
  },
];

const tags = [
  "Adventure",
  "Fantasy",
  "Horror",
  "Dystopian",
  "Romance",
  "Modernist",
  "Science Fiction",
  "Mystery",
  "Thriller",
  "Historical Fiction",
  "Non-Fiction",
];
const resetAutoIncrement = async () =>
{
  try
  {
    // SQLite uses the sqlite_sequence table to track auto-increment counters
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name IN ('Author', 'Tag', 'User', 'Rating', 'Comment')`;

    console.log("Auto-increment values reset to 1.");
  }
  catch (error)
  {
    console.error("Error resetting auto-increment values:", error.message);
  }
};

async function main()
{
  // clean
  // await prisma.book.deleteMany();
  // await prisma.author.deleteMany();
  // await prisma.tag.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.rating.deleteMany();
  // await prisma.comment.deleteMany();
  // await resetAutoIncrement();
  // for (const tag of tags)
  // {
  //   await prisma.tag.create({
  //     data: {
  //       name: tag,
  //     },
  //   });
  // }
  // for (const author of authors)
  // {
  //   await prisma.author.create({
  //     data: author,
  //   });
  // }
}

main()
  .then(async () =>
  {
    await prisma.$disconnect();
  })
  .catch(async (e) =>
  {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
