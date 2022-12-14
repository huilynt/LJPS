import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {Grid, Button, Link, Container, Chip} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';
import IconButton from '@material-ui/core/IconButton';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#9CCAFF",
        color: theme.palette.common.white

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    borderLeft: 0,
    borderRight:'0.5px solid grey',

    '&:last-child': {
        borderRight: 0,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:last-child td, &:last-child th': {
        borderBottom: 0,
    },
}));

function Roles() {
    const [jobroles, setJobRoles] = useState([]);
    let location = useLocation();
    console.log(location)
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/jobrole`)
        .then ((response) => {
            console.log(response)
            setJobRoles(response.data.data)
        })
        .catch(error => {
            console.log(error.message)
        })
    }, [])

    function deleteJobRole(e){
        console.log(e.currentTarget.id)
        let jobrole_id = e.currentTarget.id
        axios.delete(`http://127.0.0.1:5000/jobrole/` + jobrole_id)
        .then ((response) => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })

        window.location.reload(false)
    }

    function restoreJobRole(e){
        console.log(e.currentTarget.id)
        let jobrole_id = e.currentTarget.id
        axios.get(`http://127.0.0.1:5000/jobrole/restore/` + jobrole_id)
        .then ((response) => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message)
        })
        window.location.reload(false)
    }

    return (
        <Container sx={{mt:5}}>
            <Grid container sx={{borderBottom:1, display:'flex', alignItems: 'center', pb:1}}>
                <Grid item sx={{ typography: { xs: 'h6', md:'h4'}}} xs={8} md={4}>
                    All Roles
                </Grid>
                {location.pathname.toLowerCase() === "/hr/roles" ? 
                <Grid item xs={3} md={2} >
                <Link href={'/hr/roles/create'} underline="none">
                    <Button variant="contained" color="success" size="medium">Create</Button>
                </Link>
                </Grid>
                : <></>}

            </Grid>

            <TableContainer component={Paper} sx={{marginTop:2, marginBottom:10}}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Role ID</StyledTableCell>
                            <StyledTableCell sx={{borderRight: {xs:0, md:'0.5px solid grey'}}}>Name</StyledTableCell>
                            <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Description</StyledTableCell>
                            <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Status</StyledTableCell>
                            {location.pathname.toLowerCase() === "/hr/roles" ? <StyledTableCell align='center'>Edit Role</StyledTableCell>: <></>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobroles.map((jobrole) => (
                            <StyledTableRow key={jobrole.JobRole_ID}>
                                <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{jobrole.JobRole_ID}</StyledTableCell>
                                <StyledTableCell sx={{ borderRight: {xs:0, md:'0.5px solid grey'}} }>{jobrole.JobRole_Name}</StyledTableCell>
                                <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{jobrole.JobRole_Desc}</StyledTableCell>
                                <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{jobrole.JobRole_Status == "Retired" ? <Chip label="Retired" size="small" /> : <Chip label="Active" size="small" color="success" />}</StyledTableCell>
                                {location.pathname.toLowerCase() === "/hr/roles" ? 
                                    <StyledTableCell align='center'>
                                        <Stack direction="row" justifyContent='center' sx={{mx:2}}>
                                            <Link href={'/hr/edit/roles/' + jobrole.JobRole_ID} underline="none">
                                                <EditIcon sx={{mr:2}}></EditIcon>
                                            </Link>
                                            {jobrole.JobRole_Status !== "Retired" ?
                                                <Link underline="none" id={jobrole.JobRole_ID} onClick={deleteJobRole}>
                                                    <DeleteOutlineIcon sx={{ color: pink[200] }}></DeleteOutlineIcon>
                                                </Link> :
                                                <Link underline="none" id={jobrole.JobRole_ID} onClick={restoreJobRole}>
                                                    <RestoreFromTrashIcon sx={{ color: pink[100] }}></RestoreFromTrashIcon>
                                                </Link>}
                                        </Stack>
                                    </StyledTableCell> : <></>}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Roles;