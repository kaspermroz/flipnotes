import { ActionFunction, json, redirect } from "@remix-run/node";
import { Input, Textarea, Button, Text, Box } from "@chakra-ui/react";

import { db } from "~/utils/db.server";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    title: string | undefined;
    content: string | undefined;
  };
  fields?: {
    title: string;
    content: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const title = await form.get("title");
  const content = await form.get("content");

  if (typeof title !== "string" || typeof content !== "string") {
    return badRequest({ formError: "Form submitted incorrectly" });
  }

  const groupId = params.groupId;
  if (!groupId) {
    return badRequest({ formError: "Group ID not present in the url" });
  }

  const fields = { title, content };
  const flipnote = await db.flipnote.create({
    data: { title, content, groupId },
  });
  if (!flipnote) {
    return badRequest({ fields, formError: "Could not create flipnote" });
  }

  return redirect(`/app/${groupId}/${flipnote.id}`);
};

export default function New() {
  return (
    <Box minW={500} maxW={500}>
      <Text fontSize="xl" mb={6}>
        <b>Create a new flipnote</b>
      </Text>
      <form method="post">
        <Input
          variant="outline"
          bg="gray.100"
          borderColor="#CBD5E0"
          mb={6}
          placeholder="Title"
          name="title"
        />
        <Textarea
          variant="outline"
          bg="gray.100"
          borderColor="#CBD5E0"
          mb={6}
          placeholder="Content"
          rows={5}
          name="content"
        />
        <Button type="submit" colorScheme="teal">
          Create
        </Button>
      </form>
    </Box>
  );
}
