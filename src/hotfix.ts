import { prisma } from "./db";

const fixAuthorImages = async () =>
{
  try
  {
    const authors = await prisma.author.findMany();

    for (const author of authors)
    {
      if (author.image)
      {
        const fixedImage = author.image.replace("/authors/", "/");

        if (fixedImage !== author.image)
        {
          await prisma.author.update({
            where: { id: author.id },
            data: { image: fixedImage },
          });
          console.log(`Updated author ${author.id}: ${fixedImage}`);
        }
      }
    }

    console.log("All author images fixed.");
  }
  catch (error)
  {
    console.error("Error updating author images:", error.message);
  }
};

// fixAuthorImages();

const updateAuthorImages = async () => {
  try {
    const authors = await prisma.author.findMany();

    for (const author of authors) {
      if (author.image && author.image.endsWith(".jpg")) {
        const updatedImage = author.image.replace(".jpg", "-M.jpg");

        await prisma.author.update({
          where: { id: author.id },
          data: { image: updatedImage },
        });

        console.log(`Updated author ${author.id}: ${updatedImage}`);
      }
    }

    console.log("All author images updated.");
  } catch (error) {
    console.error("Error updating author images:", error.message);
  }
};

updateAuthorImages();

