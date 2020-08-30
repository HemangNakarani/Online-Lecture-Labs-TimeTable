import React from 'react';
import './style.css';
import 'antd/dist/antd.css';
import { Card, Typography, Button,Menu,Dropdown} from 'antd';
import {Link} from '@reach/router';
import { EditOutlined,LinkOutlined, DeleteOutlined ,DownOutlined} from '@ant-design/icons';
import ListEdit from '../ListEdit';

function CardView({list,setList,uuid,ccode,cname,link1,link2,link3,starttime,endtime,day,type}){

    const {Title,Text} = Typography;


    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<LinkOutlined />}>
                <a href={link1} style={{padding:"24px",margin:"16px"}} rel="noopener noreferrer" target="_blank">
                    Link 1 
                </a>
            </Menu.Item>
            <Menu.Item key="2" icon={<LinkOutlined />}>
                <a  href={link2} style={{padding:"24px",margin:"16px"}} rel="noopener noreferrer" target="_blank">
                        Link 2 
                </a>
            </Menu.Item>
            <Menu.Item key="3" icon={<LinkOutlined />}>
                <a  href={link3} style={{padding:"24px",margin:"16px"}} rel="noopener noreferrer" target="_blank">
                        Link 3 
                </a>
            </Menu.Item>
        </Menu>
      );

    const object = {
        UUID: uuid,
        COURSE_CODE: ccode,
        COURSE_NAME: cname,
        LINK1:link1,
        LINK2:link2,
        LINK3:link3,
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
                <Dropdown overlay={menu}>
                    <Button className="button">
                        Links <DownOutlined />
                    </Button>
                </Dropdown>,
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