import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
prisma.$connect();
prisma.$extends({
  result: {
    book: {
      updateRating: {
        needs: { id: true },
        async compute(book)
        {
          const ratings = await prisma.rating.findMany({
            where: { bookId: book.id },
          });
          const new_rating =
            ratings.reduce((acc, rating) => acc + rating.value, 0) /
            ratings.length;
          await prisma.book.update({
            where: { id: book.id },
            data: { avgRating: new_rating },
          });
        },
      },
    },
  },
});
export { prisma };
