import React,{useEffect,useState} from 'react';
import './ImpoExpo.css';
import 'antd/dist/antd.css';
import {Divider,Card, Typography,Input,Button,Alert} from 'antd';
import {navigate} from '@reach/router';
import { UserOutlined} from '@ant-design/icons';


function ImpoExpo(){

    const {Paragraph} = Typography;
    const [lecture,setLectures] = useState(""); 
    const [lab,setLabs] = useState("");

    const [lecturedata,setLectureData] = useState(""); 
    const [labdata,setLabData] = useState("");

    async function foo(){

        const lecstring = await localStorage.getItem("lectures");
        setLectures(lecstring);
        const labstring = await localStorage.getItem("labs");
        setLabs(labstring);
    }

    async function setLocalstorage(type,data){
        await localStorage.setItem(type,data);
    }

    useEffect(()=>{
        foo();
    },[])

    return(
        <>
            <Card
                className="card"
                style={{backgroundColor:"#F3F1FF",margin:"12px"}}
        >
            <Alert
                className="input"
                message="Informational Notes"
                description="I request you to don't mess with data. Just Copy and past your data, otherwise it can cause another problems in app."
                type="info"
                showIcon
            />
            <h3 className="input" style={{fontSize:"24px"}}>Lecture-Data of your App</h3>
            <Paragraph className="input" copyable ellipsis={{rows:2}}>
                {lecture}
            </Paragraph>

            <Divider orientation="left"/>
            <h3 className="input" style={{fontSize:"24px"}}>Lab-Data of your App</h3>
            <Paragraph className="input" copyable ellipsis={{rows:2}}>
                {lab}
            </Paragraph>

            <Divider orientation="left"/>
            <h3 className="input" style={{fontSize:"24px"}}>Import Data</h3>
            <Divider orientation="left"/>
            <Input className="input" size="large" placeholder="Paste Here LECTURE data of your friend" prefix={<UserOutlined />} onChange={(e)=>setLectureData(e.target.value)} />
            <Button 
                type="primary" 
                className="input" 
                style={{backgroundColor:"#141414", height:"40px"}} 
                onClick={()=>{
                    console.log(lecturedata)
                    setLocalstorage("lectures",lecturedata);
                    navigate("/all");
                }}>
                Set Lecture Data
            </Button>
            <Input className="input" size="large" placeholder="Paste Here LAB data of your friend" prefix={<UserOutlined />} onChange={(e)=>setLabData(e.target.value)} />
            <Button 
                type="primary" 
                className="input" 
                style={{backgroundColor:"#141414", height:"40px"}} 
                onClick={()=>{
                    console.log(labdata)
                    setLocalstorage("labs",labdata);
                    navigate("/all");
                }}>
                Set Lab Data
            </Button>
        </Card>
        </>
    );

};

export default ImpoExpo;