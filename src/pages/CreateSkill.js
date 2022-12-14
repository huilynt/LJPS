import { React, useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CreateConfirm from '../components/CreateConfirm'
import Alert from '@mui/material/Alert';

function CreateSkill(){
    const [skill, setSkill] = useState(
        {
            Skill_ID: "",
            Skill_Name: "",
            Skill_Desc: ""
        }
    );
    const [createConfirm, setCreateConfirm] = useState(false);
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const handleChange = (event) => {
        const value = event.target.value;
        setSkill({ 
            ...skill,
            [event.target.name]: value
        });
    };

    function saveChanges(e) {
        e.preventDefault();

        skill.Skill_ID = skill.Skill_ID.trim()
        skill.Skill_Name = skill.Skill_Name.trim()

        if(skill.Skill_ID === "" || skill.Skill_Name === "" || skill.Skill_Desc === ""){
            setError("All fields must be filled")
        }
        else if(skill.Skill_ID.length > 50){
            setError("Skill ID too long")
        }
        else if(skill.Skill_Name.length > 50){
            setError("Skill Name too long")
        }
        else if(skill.Skill_Desc.length > 255){
            setError("Skill Description too long")
        }
        else{
            axios.post('http://127.0.0.1:5000/skill/create', skill)
            .then((response) =>{
                setCreateConfirm(true);
            })
            .catch(error => {
                console.log(error)
                setError("The skill ID or name entered is already in used. Kindly enter another ID or name.");
            })
        }
    };



    function cancelChanges(){
        navigate("/hr/Skills")
    }

    return (
        <Container sx={{mt:5}}>
            <Box sx={{ typography: { xs: 'h6', md:'h4'}}}>Create Skill</Box>
            {error.length > 0 ? <Alert sx={{mb:-3, mt:2}} severity="error">{error}</Alert> : <></>}
            {/* <form onSubmit={saveChanges} > */}
                <Box sx={{my:5, py:5, px:2, border:'1px dashed grey'}} component="form">
                    <Stack direction={{xs:"column", md:"row" }} spacing={5}>
                        <Stack spacing={2} sx={{width: {xs:"100%",md:"50%"}}}>
                            <FormControl>
                                <InputLabel htmlFor="skill-id">ID</InputLabel>
                                <OutlinedInput
                                id="skill-id"
                                value={skill.Skill_ID}
                                onChange={handleChange}
                                name="Skill_ID"
                                label="skill-id"
                                sx={{ m: 2, mb:3}}
                                />  
                            </FormControl>
                            
                            <FormControl>
                                <InputLabel htmlFor="skill-name">Name</InputLabel>
                                <OutlinedInput
                                    id="skill-name"
                                    value={skill.Skill_Name}
                                    onChange={handleChange}
                                    name="Skill_Name"
                                    label="skill-name"
                                    sx={{ m: 2, mb:3}}
                                />  
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="skill-desc">Description</InputLabel>
                                <OutlinedInput
                                    id="skill-desc"
                                    label="skill-desc"
                                    name="Skill_Desc"
                                    multiline
                                    rows={8}
                                    value={skill.Skill_Desc}
                                    onChange={handleChange}
                                    sx={{ m: 2 }}
                                />
                            </FormControl>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{mt:2}}>
                        <Button variant="outlined" color="error" onClick={cancelChanges}>Cancel</Button>
                        <Button variant="contained" color="success" onClick={saveChanges}>Save</Button>
                    </Stack>
                    {createConfirm === true ? <CreateConfirm name="Skills"/> : <></>}
            </Box>
        {/* </form> */}
        
        </Container>
    );
}

export default CreateSkill;