import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import {Row,Col,Divider,Switch} from 'antd';
import {Link} from '@reach/router';
import {CheckOutlined,CloseOutlined} from '@ant-design/icons';
import CardView from '../../components/CardView/CardView';
import ListEdit from '../../components/ListEdit';


function AllThings(){

    const [lectures,setLectures] = useState([]);
    const [labs,setLabs] = useState([]);
    const [filter,setFilter] = useState(true);

    async function foo(){
        const data1 = await ListEdit.getLectures("lectures",filter);
        setLectures(data1);
        const data2 = await ListEdit.getLectures("labs",filter);
        setLabs(data2);
    }

    useEffect(()=>{
        ListEdit.clearTemp();
        foo();
    },[filter]);

    return(
        <>
        <Switch
            style={{display:"inline-block"}}
            onChange={(checked)=>{
                setFilter(checked);
            }}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked/>

        <h3 style={{marginBottom:"32px"}}>Filter Just Today's Labs and Lectures</h3>
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
        <h1 style={{fontSize:"24px"}}>● LABS</h1>
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
                                    link={lab.LINK}
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

export default AllThings;