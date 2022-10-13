import {React,useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@mui/material/Chip';


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


function RoleSkill() {
    const [skills, setSkills] = useState([]);
    const [role, setRole] = useState("")
    let { jobRole } = useParams();

    useEffect(() => {
        sessionStorage.setItem("userId", "130001");

        axios.post('http://127.0.0.1:5000/skills/complete/' + jobRole, {"userId":sessionStorage.userId})
        .then ((response) => {
            console.log(response)
            setRole(response.data.role)
            setSkills(response.data.data)
        })
        .catch(error => {
                console.log(error.message)
        })
    }, [])

    return (
        <Container sx={{mt:5}}>
            <Box sx={{ typography: { xs: 'h6', md:'h4'}}}>{role}</Box>
            <Box sx={{ typography: { xs: 'body2', md:'h6'}}}>Skills Needed</Box>

            <TableContainer component={Paper} sx={{marginTop:2}}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Code No</StyledTableCell>
                            <StyledTableCell sx={{borderRight: {xs:0, md:'0.5px solid grey'}}}>Name</StyledTableCell>
                            <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Description</StyledTableCell>
                            <StyledTableCell align='center' sx={{borderRight: { xs:0, md:'0.5px solid grey'}}}>Status</StyledTableCell>
                            <StyledTableCell align='center'>Select Skill</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {skills.map((skill) => (
                            <StyledTableRow key={skill.Skill_ID}>
                                <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{skill.Skill_ID}</StyledTableCell>
                                <StyledTableCell sx={{ borderRight: {xs:0, md:'0.5px solid grey'}} }>{skill.Skill_Name}</StyledTableCell>
                                <StyledTableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{skill.Skill_Desc}</StyledTableCell>
                                <StyledTableCell align='center' sx={{borderRight: {xs:0, md:'0.5px solid grey'}}}>
                                    {skill.Completion_Status == true ? <Chip label="Completed" color="success" size="small" /> : <Chip label="Incomplete" size="small" />}
                                </StyledTableCell>
                                <StyledTableCell align='center'><IconButton><ArrowForwardIosIcon></ArrowForwardIosIcon></IconButton></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default RoleSkill;