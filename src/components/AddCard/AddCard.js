import React,{useState,useEffect} from 'react';
import 'antd/dist/antd.css';
import './AddCard.css';
import { Card, Input,TimePicker,Menu, Dropdown, Typography ,Button,Radio,message} from 'antd';
import { UserOutlined, VideoCameraOutlined,NumberOutlined , PushpinOutlined} from '@ant-design/icons';
import ListEdit from '../ListEdit'
import {navigate} from '@reach/router';
import moment from 'moment';

const weekdays= ["Select the Day of Week","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const {Title} = Typography;
const dateFormat = 'h:mm a';

function AddCard(){
  
    const [day,setDay] = useState(weekdays[0]);
    const [uuid,setUUID] = useState("");
    const [courseName,setCourseName] = useState("");
    const [courseCode,setCourseCode] = useState("");
    const [link1,setLink1] = useState("");
    const [link2,setLink2] = useState("");
    const [startTime,setStartTime] = useState("8:30 am");
    const [endTime,setEndTime] = useState("9:45 am");
    const [type,setType] = useState("");

    async function foo(){
      var object = await localStorage.getItem("temp");
      if(object===""){}
      else if (object===null){}
      else
      {
          object = JSON.parse(object);
          setUUID(object.UUID);
          setCourseName(object.COURSE_NAME);
          setCourseCode(object.COURSE_CODE);
          setLink1(object.LINK1);
          setLink2(object.LINK2);
          setStartTime(object.START_TIME);
          setEndTime(object.END_TIME);
          setDay(object.DAY);
          setType(object.TYPE);
          ListEdit.clearTemp();
      }
    }

    useEffect(()=>{
        foo();
    },[]);

    function handleMenuClick(e) {
        setDay(weekdays[parseInt(e.key)]);
      }

    function ValidateFields()
    {
        if(courseName==="")
        {
          message.error("Enter Course Name");
          return false;
        }

        if(courseCode==="")
        {
          message.error("Enter Course Code");
          return false;
        }

        if(link1==="")
        {
          message.error("Enter Atleast one Link");
          return false;
        }

        if(startTime==="")
        {
          message.error("Enter Start Time of Lecture");
          return false;
        }

        if(endTime==="")
        {
          message.error("Enter End Time of Lecture");
          return false;
        }

        if(day==="" || day===weekdays[0])
        {
          message.error("Enter the day of Week");
          return false;
        }
        
        if(type==="")
        {
          message.error("Enter the type Entry");
          return false;
        }

         return true;
    }

    
    const {RangePicker} = TimePicker; 
    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<PushpinOutlined />}>
            {weekdays[1]}
          </Menu.Item>
          <Menu.Item key="2" icon={<PushpinOutlined />}>
            {weekdays[2]}
          </Menu.Item>
          <Menu.Item key="3" icon={<PushpinOutlined />}>
            {weekdays[3]}
          </Menu.Item>
          <Menu.Item key="4" icon={<PushpinOutlined />}>
            {weekdays[4]}
          </Menu.Item>
          <Menu.Item key="5" icon={<PushpinOutlined />}>
            {weekdays[5]}
          </Menu.Item>
          <Menu.Item key="6" icon={<PushpinOutlined />}>
            {weekdays[6]}
          </Menu.Item>
          <Menu.Item key="7" icon={<PushpinOutlined />}>
            {weekdays[7]}
          </Menu.Item>
        </Menu>
      )

    return(
        <Card
            className="card"
            style={{backgroundColor:"#F3F1FF",margin:"12px"}}
        >
        <Title className="input" level={3}>Add/Edit</Title>
        <Input className="input" size="large" placeholder="Course Name" prefix={<UserOutlined />} value={courseName} onChange={(e)=>setCourseName(e.target.value)} />
        <Input className="input" size="large" placeholder="Course Code" prefix={<NumberOutlined/>} value={courseCode} onChange={(e)=>setCourseCode(e.target.value)} />
        <Input className="input" size="large" placeholder="Lecture/Lab Link 1" prefix={<VideoCameraOutlined />} value={link1} onChange={(e)=>setLink1(e.target.value)} />
        <Input className="input" size="large" placeholder="Lecture/Lab Link 2" prefix={<VideoCameraOutlined />} value={link2} onChange={(e)=>setLink2(e.target.value)} />

        <RangePicker format="h:mm a" className="input"
            value={
              [moment(startTime, dateFormat),moment(endTime, dateFormat)] 
            }

            onOk={(val)=>{
                
                if(val['1']!==null)
                {
                    setStartTime(moment(val['0']._d).format("h:mm a"));
                    setEndTime(moment(val['1']._d).format("h:mm a"));
                }

            }}
        />

        <div className="input"><Dropdown.Button overlay={menu}> {day} </Dropdown.Button></div>

        <div className="input">
          <Radio.Group value={type} size="large" onChange={(e)=>{setType(e.target.value)}}>
            <Radio.Button value="lectures">Lecture</Radio.Button>
            <Radio.Button value="labs">Lab</Radio.Button>
          </Radio.Group>
        </div>

        <Button 
            type="primary" 
            className="input" 
            style={{backgroundColor:"#141414"}} 
            onClick={()=>{
                if(ValidateFields()===true)  
                {
                  ListEdit.addLecture(uuid,courseCode,courseName,link1,link2,startTime,endTime,day,type)
                  navigate('/all');
                }
                else {}
            }}>
            Submit
        </Button>
        </Card>
    );
};

export default AddCard;