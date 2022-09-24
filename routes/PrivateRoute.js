
import { Navigate, useLocation } from 'react-router-dom';
import useFirebase from '../src/hooks/useFirebase';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const PrivateRoute = ({ children }) => {
    
    let { user, loading } = useFirebase();
    let location = useLocation();

    
    if (loading) {
        return <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    }

    if (!user?.email) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default PrivateRoute;
