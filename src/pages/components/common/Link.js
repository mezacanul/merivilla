import NextLink from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'

const Link = ({ href, children, ...props }) => {
    return (
        <ChakraLink as={NextLink} href={href} {...props}>
          {children}
        </ChakraLink>
      )
    // return (
    //   <NextLink href={href} passHref legacyBehavior>
    //     <ChakraLink {...props}>
    //       {children}
    //     </ChakraLink>
    //   </NextLink>
    // )
}

export default Link