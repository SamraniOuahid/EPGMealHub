import { Box, Container, Typography, IconButton, Stack, Link } from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Copyright,
} from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        bgcolor: 'primary.main',
        color: 'white',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Copyright fontSize="small" />
            <Typography variant="body2">
              {new Date().getFullYear()} EPG MealHub. Tous droits réservés.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <IconButton
              component={Link}
              href="#"
              target="_blank"
              sx={{ color: 'white' }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              component={Link}
              href="#"
              target="_blank"
              sx={{ color: 'white' }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              component={Link}
              href="#"
              target="_blank"
              sx={{ color: 'white' }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              component={Link}
              href="#"
              target="_blank"
              sx={{ color: 'white' }}
            >
              <LinkedIn />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}