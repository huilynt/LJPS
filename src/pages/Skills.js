import { useEffect, useState, React } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {Grid, Button, Link, Container} from '@mui/material';
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
import Box from '@mui/material/Box';
import IconButton from '@material-ui/core/IconButton';
import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';



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

function Skills() {
    const [skills, setSkills] = useState([]);
    let location = useLocation();
    console.log(location)

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/skill`)
        .then ((response) => {
            console.log(response)
            setSkills(response.data.data)
        })
        .catch(error => {
            console.log(error.message)
        })
    }, [])

    return (
        <Container sx={{mt:5}}>
            <Grid container sx={{borderBottom:1, display:'flex', alignItems: 'center', pb:1}}>
                <Grid item sx={{ typography: { xs: 'h6', md:'h4'}}} xs={8} md={4}>
                    All Skills
                </Grid>
                {location.pathname.toLowerCase() === "/hr/skills" ? 
                <Grid item xs={3} md={2} >
                <Link href={'/hr/skills/create'} underline="none">
                    <Button variant="contained" color="success" size="medium">Create</Button>
                </Link>
                </Grid>
                : <></>}

            </Grid>

            <TableContainer component={Paper} sx={{marginTop:2, marginBottom:10}}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Code No</StyledTableCell>
                            <StyledTableCell sx={{borderRight: {xs:0, md:'0.5px solid grey'}}}>Name</StyledTableCell>
                            <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Description</StyledTableCell>
                            {location.pathname.toLowerCase() === "/hr/skills" ? <StyledTableCell align='center'>Edit Skill</StyledTableCell>: <></>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {skills.map((skill) => (
                            <StyledTableRow key={skill.Skill_ID}>
                                <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{skill.Skill_ID}</StyledTableCell>
                                <StyledTableCell sx={{ borderRight: {xs:0, md:'0.5px solid grey'}} }>{skill.Skill_Name}</StyledTableCell>
                                <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{skill.Skill_Desc}</StyledTableCell>
                                {location.pathname.toLowerCase() === "/hr/skills" ? 
                                    <StyledTableCell align='center'>
                                        <Stack direction="row" justifyContent='center'>
                                            <Link href={'/hr/edit/skills/' + skill.Skill_ID} underline="none">
                                                <IconButton><EditIcon></EditIcon></IconButton>
                                            </Link>
                                            <Link underline="none" >
                                                <IconButton><DeleteOutlineIcon sx={{ color: pink[200] }}></DeleteOutlineIcon></IconButton>
                                            </Link>
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

export default Skills;