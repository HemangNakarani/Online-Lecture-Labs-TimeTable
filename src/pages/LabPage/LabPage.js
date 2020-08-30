import React,{useEffect,useState} from 'react';
import './style.css';
import 'antd/dist/antd.css';
import {Row,Col,Divider} from 'antd';
import {Link} from '@reach/router';
import CardView from '../../components/CardView/CardView';
import ListEdit from '../../components/ListEdit';


function LabPage(){

    const [labs,setLabs] = useState([]);

    async function foo(){
        const data = await ListEdit.getLectures("labs",true);
        setLabs(data)
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
                labs.length > 0?
                    labs.map((lab,index)=>{
                        return (
                            <Col xs={24} md={12} key={index} >
                                <CardView 
                                    id={index}
                                    list={labs}
                                    setList={setLabs}
                                    uuid= {lab.UUID}
                                    ccode={lab.COURSE_CODE}
                                    cname={lab.COURSE_NAME} 
                                    link1={lab.LINK1}
                                    link2={lab.LINK2}
                                    link3={lab.LINK3}
                                    starttime={lab.START_TIME}
                                    endtime={lab.END_TIME}
                                    day={lab.DAY}
                                    type="labs"
                                ></CardView>
                            </Col>)
                    }):
                   <Link to="/add"><div style={{textAlign:"center",fontSize:"32px", color:"grey",margin:"16px"}}>Tap Here to Add Labs</div></Link> 
            }
        </Row>
        </>
    );

};

export default LabPage;