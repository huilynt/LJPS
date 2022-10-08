import Container from "@mui/material/Container";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#9CCAFF",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  borderLeft: 0,
  borderRight: "0.5px solid grey",

  "&:last-child": {
    borderRight: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));

function SkillCourses() {
  const [courses, setCourses] = useState([]);
  const [skill, setSkill] = useState("");
  const [role, setRole] = useState("");

  let { roleID, skillID } = useParams();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/jobrole/" + roleID)
      .then((response) => {
        setRole(response.data.data.JobRole_Name);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://127.0.0.1:5000/" + skillID + "/courses")
      .then((response) => {
        setCourses(response.data.data.courses);
        setSkill(response.data.data.skill.Skill_Name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Box sx={{ typography: { xs: "h6", md: "h4" } }}>{role}</Box>
          <Box sx={{ typography: { xs: "body2", md: "h6" } }}>
            Courses for {skill} Skill
          </Box>
        </Grid>

        <Grid
          item
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}>
          <Button variant="text">View added courses</Button>

          <Box>
            <TextField
              label="Search a course"
              variant="outlined"
              size="small"
              InputAdornment={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 200 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>{skill} Courses</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Add/Remove Course</StyledTableCell>
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {courses.map((course) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {course.Course_ID}
                </StyledTableCell>
                <StyledTableCell>{course.Course_Name}</StyledTableCell>
                <StyledTableCell>{course.Course_Desc}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    sx={{ backgroundColor: "lightgreen", color: "black" }}>
                    Add
                  </Button>
                  <Button
                    sx={{ backgroundColor: "lightcoral", color: "black" }}>
                    Remove
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Container sx={{ mt: 5 }}>
        <Button
          sx={{
            color: "black",
            float: "right",
            backgroundColor: "lightgreen",
          }}>
          Save
        </Button>
      </Container>
    </Container>
  );
}

export default SkillCourses;