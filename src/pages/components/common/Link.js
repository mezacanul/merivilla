import NextLink from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'

const Link = ({ href, children, ...props }) => {
    return (
      <NextLink href={href} passHref legacyBehavior>
        <ChakraLink {...props}>
          {children}
        </ChakraLink>
      </NextLink>
    )
}

export default Link