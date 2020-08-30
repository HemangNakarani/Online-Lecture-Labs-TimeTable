import React,{useEffect,useState} from 'react';
import './style.css';
import 'antd/dist/antd.css';
import {Row,Col,Divider} from 'antd';
import {Link} from '@reach/router';
import CardView from '../../components/CardView/CardView';
import ListEdit from '../../components/ListEdit';


function LecturePage(){

    const [lectures,setLectures] = useState([]);

    async function foo(){
        const data = await ListEdit.getLectures("lectures",true);
        setLectures(data)
    }

    useEffect(()=>{
        ListEdit.clearTemp();
        foo();
    },[]);

    return(
        <>
        <h1 style={{fontSize:"24px"}}>● Lectures</h1>
        <Divider  orientation="left"/>
        <Row justify="space-between">
            {
                lectures.length>0?
               lectures.map((lecture,index)=>{
                return (
                    <Col xs={24} md={12} key={index} >
                        <CardView 
                            list={lectures}
                            setList={setLectures}
                            uuid= {lecture.UUID}
                            ccode={lecture.COURSE_CODE}
                            cname={lecture.COURSE_NAME} 
                            link1={lecture.LINK1}
                            link2={lecture.LINK2}
                            link3={lecture.LINK3}
                            starttime={lecture.START_TIME}
                            endtime={lecture.END_TIME}
                            day={lecture.DAY}
                            type="lectures"
                        ></CardView>
                    </Col>)
               }):
               <Link to="/add"><div style={{textAlign:"center",fontSize:"32px", color:"grey",margin:"16px"}}>Tap Here to Add Lectures</div></Link> 
            }
        </Row>
     </>
    );

};

export default LecturePage;