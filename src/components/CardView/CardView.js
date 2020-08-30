import React from 'react';
import './style.css';
import 'antd/dist/antd.css';
import { Card, Typography, Button } from 'antd';
import {Link} from '@reach/router';
import { EditOutlined,LinkOutlined, DeleteOutlined } from '@ant-design/icons';
import ListEdit from '../ListEdit';

function CardView({list,setList,uuid,ccode,cname,link1,link2,starttime,endtime,day,type}){

    const {Title,Text} = Typography;

    const object = {
        UUID: uuid,
        COURSE_CODE: ccode,
        COURSE_NAME: cname,
        LINK1:link1,
        LINK2:link2,
        START_TIME:starttime,
        END_TIME:endtime,
        DAY:day,
        TYPE:type,
   }

   function handleDelete(){

        var dummyList = [];

        for(let index=0 ; index< list.length; index++)
        {
                if (list[index].UUID !== uuid)
                {
                    dummyList.push(list[index]);
                }
                else
                {
                    ListEdit.deleteEntry(type,uuid);
                }
        }
        setList(dummyList);
   }

    return(
        <Card
            style={{backgroundColor:"#ffffc9",margin:"12px"}}
            actions={[
            <Button className="button" href={link1} target="_blanck"><LinkOutlined key="link1" />1</Button>,
            <Button className="button" href={link2} target="_blanck"><LinkOutlined key="link2" />2</Button>,
            <Link to="/edit"><Button className="button" onClick={()=>{localStorage.setItem("temp",JSON.stringify(object))}}><EditOutlined key="edit" /></Button></Link>,
            <Button className="button" target="_blanck" onClick={()=>{handleDelete()}}><DeleteOutlined key="delete"/></Button>,
            ]}
        >
        
        <Title level={3}>{ccode}</Title>
        <Text style={{fontSize:"16px", color:"grey"}}><b>{cname}</b></Text>
        <br/>
        <br/>
        <Text style={{fontSize:"16px",width:"100%"}}>
        {` ● ${day}`}
        </Text>
        <br/>
        <Text style={{fontSize:"16px",width:"100%"}}>
        {` ● ${starttime} to ${endtime}`}   
        </Text>
        </Card>
    );
};

export default CardView;