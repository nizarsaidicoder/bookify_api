import { PrismaClient } from "@prisma/client";
import axios from "axios";
import * as fs from "fs";

const authors: string[] = [
  "J. R. R. Tolkien",
  "George Orwell",
  "Stephen King",
  "Agatha Christie",
  "J. K. Rowling",
  "Mark Twain",
  "Charles Dickens",
  "Jane Austen",
  "Fyodor Dostoevsky",
  "Ernest Hemingway",
  "William Shakespeare",
  "Gabriel Garcia Marquez",
  "Haruki Murakami",
  "Leo Tolstoy",
  "Victor Hugo",
  "Franz Kafka",
  "Oscar Wilde",
  "Jules Verne",
  "Edgar Allan Poe",
  "Arthur Conan Doyle",
  "H. P. Lovecraft",
  "Isaac Asimov",
  "Philip K. Dick",
  "Ray Bradbury",
  "Aldous Huxley",
  "Virginia Woolf",
  "Homer",
  "Dante Alighieri",
  "James Joyce",
  "Miguel de Cervantes",
  "Emily Brontë",
  "Bram Stoker",
  "Mary Shelley",
  "F. Scott Fitzgerald",
  "George R. R. Martin",
  "Terry Pratchett",
  "Douglas Adams",
  "C. S. Lewis",
  "Kurt Vonnegut",
  "John Steinbeck",
  "Herman Melville",
  "H. G. Wells",
  "Margaret Atwood",
  "Sylvia Plath",
  "Toni Morrison",
  "J. D. Salinger",
  "Alexandre Dumas",
  "Gustave Flaubert",
  "Marcel Proust",
  "Henrik Ibsen",
  "Anton Chekhov",
  "Joseph Conrad",
  "Robert Louis Stevenson",
  "Thomas Hardy",
  "Rudyard Kipling",
  "Jack London",
  "Edith Wharton",
  "Louisa May Alcott",
  "Nathaniel Hawthorne",
  "Emily Dickinson",
  "Homer",
  "Hermann Hesse",
  "Italo Calvino",
  "Umberto Eco",
  "Orhan Pamuk",
  "Kazuo Ishiguro",
  "Chinua Achebe",
  "Ngũgĩ wa Thiong'o",
  "Salman Rushdie",
  "Paulo Coelho",
  "Jorge Luis Borges",
  "Roberto Bolaño",
  "Carlos Fuentes",
  "Mario Vargas Llosa",
  "Isabel Allende",
  "Kobo Abe",
  "Yukio Mishima",
  "Natsume Sōseki",
  "Banana Yoshimoto",
  "Osamu Dazai",
  "Shusaku Endo",
  "Gabriel Okara",
  "Wole Soyinka",
  "Ben Okri",
  "Chimamanda Ngozi Adichie",
  "Zadie Smith",
  "Arundhati Roy",
  "V. S. Naipaul",
  "R. K. Narayan",
  "Jhumpa Lahiri",
  "Harper Lee",
  "John Grisham",
  "Dan Brown",
  "E. L. James",
  "Suzanne Collins",
  "Rick Riordan",
  "Brandon Sanderson",
  "Patrick Rothfuss",
  "Robert Jordan",
  "Michael Crichton",
  "Clive Barker",
  "Neal Stephenson",
  "William Gibson",
  "Frank Herbert",
  "Ursula K. Le Guin",
  "Anne Rice",
  "Robin Hobb",
  "J. M. Coetzee",
  "Jean-Paul Sartre",
  "Albert Camus",
  "Simone de Beauvoir",
  "Milan Kundera",
  "Samuel Beckett",
  "Kenzaburō Ōe",
  "Yasunari Kawabata",
  "Clarice Lispector",
  "Elena Ferrante",
  "László Krasznahorkai",
  "Olga Tokarczuk",
  "Michel Houellebecq",
  "Roberto Calasso",
  "William Faulkner",
  "Truman Capote",
  "Flannery O'Connor",
  "Eudora Welty",
  "Carson McCullers",
  "Zora Neale Hurston",
  "Langston Hughes",
  "Ralph Ellison",
  "James Baldwin",
  "Richard Wright",
  "Octavia Butler",
  "N. K. Jemisin",
  "Andre Norton",
  "Diana Wynne Jones",
  "Garth Nix",
  "T. H. White",
  "Roald Dahl",
  "Beatrix Potter",
  "L. Frank Baum",
  "A. A. Milne",
  "J. M. Barrie",
  "Lewis Carroll",
  "J. R. Ackerley",
  "David Foster Wallace",
  "Jonathan Franzen",
  "Don DeLillo",
  "Thomas Pynchon",
  "Bret Easton Ellis",
  "Chuck Palahniuk",
  "Irvine Welsh",
  "Boris Pasternak",
  "Aleksandr Solzhenitsyn",
  "Nikolai Gogol",
  "Ivan Turgenev",
  "Maxim Gorky",
  "Mikhail Bulgakov",
  "Andrei Platonov",
  "Vladimir Nabokov",
  "Yevgeny Zamyatin",
  "Sergei Lukyanenko",
  "Victor Pelevin",
  "Stanisław Lem",
  "Andrzej Sapkowski",
  "Natsuo Kirino",
  "Hideo Yokoyama",
  "Keigo Higashino",
  "Edogawa Rampo",
  "Mo Yan",
  "Gao Xingjian",
  "Jin Yong",
  "Amy Tan",
  "Celeste Ng",
  "Lisa See",
  "Liu Cixin",
  "Ken Liu",
  "George Saunders",
  "Raymond Chandler",
  "Dashiell Hammett",
  "James M. Cain",
  "Patricia Highsmith",
  "Gillian Flynn",
  "Tana French",
  "Jo Nesbø",
  "Stieg Larsson",
  "Henning Mankell",
  "Fred Vargas",
  "James Ellroy",
  "Walter Mosley",
  "Sara Paretsky",
  "Mickey Spillane",
  "David Baldacci",
  "Lee Child",
  "Robert Ludlum",
  "Tom Clancy",
  "Frederick Forsyth",
  "Nelson DeMille",
  "Stephenie Meyer",
  "Nicholas Sparks",
  "Colleen Hoover",
  "Elin Hilderbrand",
  "Kristin Hannah",
  "Debbie Macomber",
  "Maeve Binchy",
  "Jodi Picoult",
  "Danielle Steel",
  "Nora Roberts",
  "Barbara Cartland",
  "Georgette Heyer",
  "Daphne du Maurier",
  "Wilkie Collins",
  "Edith Nesbit",
  "Lucy Maud Montgomery",
  "Anna Sewell",
  "Frances Hodgson Burnett",
  "Astrid Lindgren",
  "Tove Jansson",
  "Cornelia Funke",
  "Philip Pullman",
  "Christopher Paolini",
];

const prisma = new PrismaClient();
// load json file "authors_list.json"

// Example : https://covers.openlibrary.org/b/id/5543033.jpg
const bookImageURL = "https://covers.openlibrary.org/b/id/";

// https://openlibrary.org/search.json?author=:author_name
const authorsURL = "https://openlibrary.org/search.json?author";

// 1st : Parse the authors_list.json file
// 2nd : Fetch the author ids from the openlibrary API (use the authorsURL)
// 3rd : Compare the size of the authors_list.json and the fetched author ids

// fetchAuthorIds() : Fetch the author ids from the openlibrary API
// Helper function to add a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAuthorIds = async () =>
{
  try
  {
    const authors = JSON.parse(fs.readFileSync("./authors_list.json", "utf-8"));
    const authorIds: string[] = [];

    for (const author of authors)
    {
      try
      {
        const url = `${authorsURL}=${encodeURIComponent(author)}`;
        console.log(url);
        const response = await axios.get(url);
        const authorId = response.data.docs[0]?.author_key[0] || null;
        authorIds.push(authorId);
        console.log(`Author: ${author} fetched with ID: ${authorId}`);
      }
      catch (error)
      {
        console.error(`Error fetching author: ${author}`, error.message);
      }

      // Wait for 500ms before the next request
      await delay(50);
    }

    console.log("Author IDs fetched:", authorIds);
    return authorIds.filter((id) => id !== null); // Remove null values
  }
  catch (error)
  {
    console.error("Error reading file:", error.message);
    return [];
  }
};

// 4th : Store the fetched author ids to a new file authors_ids.json
export const storeAuthorIds = async () =>
{
  const authorIds = await fetchAuthorIds();
  fs.writeFileSync("./authors_ids.json", JSON.stringify(authorIds, null, 2));
};

const authorInfoURL = "https://openlibrary.org/authors/";

// 5th : Fetch the author information from the openlibrary API
const fetchAuthorInfo = async (authorId: string) =>
{
  try
  {
    const response = await axios.get(`${authorInfoURL}${authorId}.json`);
    return response.data;
  }
  catch (error)
  {
    console.error(
      `Error fetching author info for ID: ${authorId}`,
      error.message,
    );
    return null;
  }
};

// 6th : Extract the author information (first name, last name, birth date, death date,bio)
const extractAuthorInfo = (authorInfo: any) =>
{
  const { name, birth_date, death_date, bio } = authorInfo;
  const names = name.split(" ");
  const lastname = names.pop();
  const firstname = names.join(" ");
  return { firstname, lastname, birth_date, death_date, bio };
};

// 7th fetch the image of the author
// Example : https://covers.openlibrary.org/a/id/5543033.jpg
const authorImageURL = "https://covers.openlibrary.org/a/olid/";

// https://openlibrary.org/authors/:author_id/works.json?limit=30
const authorWorksURL = "https://openlibrary.org/authors/";

// 8th : Fetch the works of the author
const fetchAuthorWorks = async (authorId: string) =>
{
  try
  {
    const response = await axios.get(
      `${authorWorksURL}${authorId}/works.json?limit=30`,
    );
    return response.data;
  }
  catch (error)
  {
    console.error(
      `Error fetching author works for ID: ${authorId}`,
      error.message,
    );
    return null;
  }
};

// 9th : Extract the keys of the works
const extractAuthorWorks = (authorWorks: any) =>
{
  return authorWorks.entries.map((entry: any) => entry.key);
};

// create an object that have the author_id, firstname, lastname, birth_date, death_date, bio, image, and works_ids
// 10th : Store the author information to a new file authors_info.json

export const storeAuthorInfo = async () =>
{
  try
  {
    const authorIds = JSON.parse(
      fs.readFileSync("./authors_ids.json", "utf-8"),
    );
    const authorsInfo: any[] = [];

    for (const authorId of authorIds)
    {
      const authorInfo = await fetchAuthorInfo(authorId);
      if (!authorInfo) continue;

      const { firstname, lastname, birth_date, death_date, bio } =
        extractAuthorInfo(authorInfo);
      const image = `${authorImageURL}${authorInfo.key}.jpg`;
      const works = await fetchAuthorWorks(authorId);
      const worksIds = extractAuthorWorks(works);

      const author = {
        authorId,
        firstname,
        lastname,
        birth_date,
        death_date,
        bio,
        image,
        worksIds,
      };

      console.log("Author info:", author);

      authorsInfo.push(author);
    }

    fs.writeFileSync(
      "./authors_info.json",
      JSON.stringify(authorsInfo, null, 2),
    );
    console.log("Authors info stored to file");
  }
  catch (error)
  {
    console.error("Error reading file:", error.message);
  }
};

// storeAuthorInfo();

// 11th : Fetch the works information from the openlibrary API

// Example :  https://openlibrary.org/works/OL45883W.json
const bookURL = "https://openlibrary.org";
// You'll find the works ids in the authors_info.json file

// take only the books that have description
// 12th : Store the works information to a new file books_info.json

export const fetchBookInfo = async (workId: string) =>
{
  try
  {
    const url = `${bookURL}${workId}.json`;
    console.log(url);
    const response = await axios.get(url);
    return response.data;
  }
  catch (error)
  {
    console.error(`Error fetching book info for ID: ${workId}`, error.message);
    return null;
  }
};

export const storeBookInfo = async () =>
{
  try
  {
    const authorsInfo = JSON.parse(
      fs.readFileSync("./authors_info.json", "utf-8"),
    );
    const booksInfo: any[] = [];

    for (const author of authorsInfo)
    {
      for (const workId of author.worksIds)
      {
        const bookInfo = await fetchBookInfo(workId);
        if (!bookInfo) continue;

        const { title, description, cover_id } = bookInfo;
        if (!description) continue;
        const image = `${bookImageURL}${cover_id}.jpg`;
        const subjects = bookInfo.subjects || [];

        const book = {
          workId,
          title,
          description,
          image,
          subjects,
        };

        console.log("Book info:", book);

        booksInfo.push(book);
      }
    }

    fs.writeFileSync("./books_info.json", JSON.stringify(booksInfo, null, 2));
    console.log("Books info stored to file");
  }
  catch (error)
  {
    console.error("Error reading file:", error.message);
  }
};

// storeBookInfo();

// Fill the database with the authors and books information

const genres = [
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
  "Crime",
  "Comedy",
  "Drama",
  "Memoir",
  "Poetry",
  "Young Adult",
  "Graphic Novel",
  "Satire",
  "Paranormal",
  "Psychological Thriller",
  "Action",
  "Bildungsroman",
  "Gothic",
  "Erotica",
  "Supernatural",
  "Political Fiction",
  "Biographical Fiction",
  "War",
  "Steampunk",
  "Cyberpunk",
  "Space Opera",
];

const fillDatabase = async () =>
{
  const booksInfo = JSON.parse(fs.readFileSync("./books_info.json", "utf-8"));
  try
  {
    const authorsInfo = JSON.parse(
      fs.readFileSync("./authors_info.json", "utf-8"),
    );

    // Insert authors into the database
    for (const author of authorsInfo)
    {
      const { id, firstname, lastname, birth_date, death_date, bio, image } =
        author;

      let birthDate = null;
      let deathDate = null;

      try
      {
        birthDate = new Date(birth_date);
      }
      catch (error)
      {
        birthDate = null;
      }

      try
      {
        deathDate = new Date(death_date);
      }
      catch (error)
      {
        deathDate = null;
      }

      // Check if the dates are valid
      if (birthDate && isNaN(birthDate.getTime())) birthDate = null;
      if (deathDate && isNaN(deathDate.getTime())) deathDate = null;

      const biography = bio ? bio.value : null;

      const dbAuthor = await prisma.author.create({
        data: {
          firstname,
          lastname,
          birthDate,
          deathDate,
          bio: biography,
          image,
        },
      });

      console.log("Author added to the database:", dbAuthor);
    }

    //   // Get authors count after inserting authors
    const authorsCount = await prisma.author.count();
    console.log("Authors count:", authorsCount);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: "nizar.saidi.coder@gmail.com",
        username: "admin",
        password: "admin123",
      },
    });
    console.log("Admin user created:", admin);
    // const admin = {
    //   id: 1,
    // };
    // Insert books into the database
    for (const book of booksInfo)
    {
      let { title, description, image } = book;
      if (description.value) description = description.value;

      // Take from 2 to 5 random genres
      const randomGenres = genres.sort(() => 0.5 - Math.random()).slice(0, 5);

      // Ensure the random year is between 1900 and 2021
      const randomPublishYear = Math.floor(
        Math.random() * (2021 - 1900) + 1900,
      );

      // Ensure the random rating is between 1 and 5
      const randomRating = Math.floor(Math.random() * 5 + 1);

      // Ensure the random author is valid (between 1 and authorsCount)
      let randomAuthor = Math.floor(Math.random() * authorsCount) + 1;

      let authorExists = false;
      while (!authorExists)
      {
        const author = await prisma.author.findUnique({
          where: { id: randomAuthor },
        });
        if (author)
        {
          authorExists = true;
        }
        else
        {
          randomAuthor = Math.floor(Math.random() * authorsCount) + 1;
        }
        console.log("Random author:", randomAuthor);
      }

      // Create the book with the random values
      const dbBook = await prisma.book.create({
        data: {
          title,
          description,
          cover: image,
          publicationYear: randomPublishYear,
          tags: {
            connectOrCreate: randomGenres.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          author: {
            connect: { id: randomAuthor },
          },
          rating: {
            create: {
              value: randomRating,
              user: {
                connect: { id: admin.id },
              },
            },
          },
        },
      });

      console.log("Book added to the database:", dbBook);
    }
  }
  catch (error)
  {
    console.error("Error reading file:", error.message);
  }
};

// fillDatabase();

// eliminate from the db all the authors whose name is not a-z or A-Z

const cleanDatabase = async () =>
{
  const authors = await prisma.author.findMany();
  for (const author of authors)
  {
    const { firstname, lastname } = author;
    if (!/^[a-zA-Z]+$/.test(firstname) || !/^[a-zA-Z]+$/.test(lastname))
    {
      console.log("Deleting author:", author);
      await prisma.author.delete({
        where: { id: author.id },
      });
    }
  }
};

cleanDatabase();
