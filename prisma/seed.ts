import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const user = await db.user.create({
    data: {
      username: "test",
      // hashed `P@ssw0rd!`
      passwordHash:
        "$2a$12$2HDFpAaPAajBfIKsiyVNfeBFZa2QZeqc4PiIeFl9cFgwLdtGkZWm6",
    },
  });

  const group = await db.group.create({
    data: {
      name: "Test Group",
      userId: user.id,
    },
  });

  await Promise.all(
    getFlipnotes().map(({ title, content }) => {
      const data = { title, content, groupId: group.id };

      return db.flipnote.create({ data });
    })
  );
}

seed();

const getFlipnotes = () => [
  {
    title: "React",
    content: "Cool JS library 😎",
  },
  {
    title: "useState",
    content: "React hook for using state within single component",
  },
  {
    title: "useEffect",
    content: "React foor for using async side effects",
  },
];
