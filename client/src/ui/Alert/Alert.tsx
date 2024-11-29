// MUI-dependencies
import { Alert, Snackbar } from "@mui/material"



export const AlertComponent = ({open, handleClose, status, value} : {open: boolean, handleClose: any, status: any, value: string}) => {


    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={status}
                variant="filled"
                sx={{ 
                    justifyContent: "center"
                }}
            >
                {value}
            </Alert>
        </Snackbar>
    )
}
