import { Text, Button } from '@chakra-ui/react';
import { NavLink } from '@remix-run/react'
import { Header } from '~/components/header'

export default function Index() {
  return (
    <div>
      <Header>
        <NavLink to="/login">
          <Button variant="link" color="gray.800" mr={4}>Log in</Button>
        </NavLink>
        <NavLink to="/register">
          <Button colorScheme="teal">Sign up</Button>
        </NavLink>
      </Header>
      <Text fontSize="2xl">flipnotes</Text>
    </div>
  );
}
