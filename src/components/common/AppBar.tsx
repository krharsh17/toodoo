import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useAuth} from "../auth/AuthUserContext";
import {APP_NAME, TITLE_LOGOUT, TITLE_VIEW_OPTIONS} from "../../utils/Constants";

/**
 * App Bar component to show the app name
 * and a profile icon for managing profile-related activities
 * @constructor
 */
const ResponsiveAppBar: React.FC = () => {
    // State container for anchor over which the dropdown menu for profile options has to be displayed
    const [anchorElUser, setAnchorElUser] = React.useState<Element | null>(null);

    // Context hook for Firebase Auth object
    const auth = useAuth()

    /**
     * Event handler for opening profile options menu
     * @param event
     */
    const handleOpenUserMenu = (event: React.FormEvent) => {
        setAnchorElUser(event.currentTarget);
    };

    /**
     * Event handler for closing profile options menu
     */
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /**
     * Click event handler to sign the user out when clicking on log out option
     */
    const onSignOutClick = () => {
        auth.signOut()
        handleCloseUserMenu()
    }

    return (
        <AppBar position="sticky" elevation={0}>
            <Container maxWidth="xl">
                <Toolbar>

                    {/* App Logo */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2}}
                    >
                        {APP_NAME.toLowerCase()}
                    </Typography>

                    {/* Flex box to automatically adjust to screen width and keep side elements anchored */}
                    <Box sx={{flexGrow: 1}}/>

                    {/* Profile avatar and profile options */}
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title={TITLE_VIEW_OPTIONS}>
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                {auth.authUser?.email ?
                                    <Avatar>{auth.authUser?.email[0].toUpperCase()}</Avatar>
                                    : <div/>}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key={TITLE_LOGOUT} onClick={onSignOutClick}>
                                <Typography textAlign="center">{TITLE_LOGOUT}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
