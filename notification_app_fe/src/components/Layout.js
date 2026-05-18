import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AffordMed Notifications
          </Typography>
          <Button color="inherit" component={Link} to="/notifications">
            Notifications
          </Button>
          <Button color="inherit" component={Link} to="/student-inbox">
            Student Inbox
          </Button>
          <Button color="inherit" component={Link} to="/priority-inbox">
            Priority Inbox
          </Button>
          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </Box>
  );
}

export default Layout;
