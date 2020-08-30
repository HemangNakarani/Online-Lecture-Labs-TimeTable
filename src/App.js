import React,{useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Router,Link } from '@reach/router';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, VideoCameraOutlined, PlusOutlined, GithubFilled,AppstoreAddOutlined ,SwapOutlined} from '@ant-design/icons';
import LabPage from './pages/LabPage/LabPage';
import AddPage from './pages/AddPage/AddPage';
import LecturePage from './pages/LecturePage/LecturePage';
import AllThings from './pages/AllThings/AllThings';
import ImpoExpo from './pages/ImpoExpo/ImpoExpo';
import ReactGa from 'react-ga';

function App() {

  const { Header, Content, Footer, Sider } = Layout;

  useEffect(()=>{
    ReactGa.initialize('UA-174022278-1');
    ReactGa.pageview('/');
  })

  return (
      <Layout>
        <Sider
          width="280px"
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            height: '100vh',
          }}
        >
        <h3 className="logo" style={{textAlign:"center",color:"#fff"}}>Hello Peeps! It's your personalised TimeTable<span role="img" aria-label="daglo">😀</span></h3>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{fontSize:"20px"}}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">Lectures</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/labs">Labs</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
              <Link to="/all">All Lectures/Labs</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SwapOutlined />}>
              <Link to="/ie">Import/Export</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<GithubFilled />}>
              <a href="https://github.com/HemangNakarani/Online-Lecture-Labs-TimeTable" rel="noopener noreferrer" target="_blank">Contribute</a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
        <Header className="site-layout-sub-header-background" style={{ padding: 0 , width:"100%" ,display:"flex" ,justifyContent:"space-between"}}>
          <h6 style={{fontSize:"24px", color:"#000", marginLeft:"24px",}}><b>Timetable</b><span role="img" aria-label="books">📚</span></h6>
          <Link to="/add"><Button style={{marginRight:"24px", marginTop:"16px"}} type="primary" shape="circle" icon={<PlusOutlined />} /></Link>
        </Header>
            <Content style={{ margin: '24px 16px 0', height:"75vh",overflowY:"scroll", alignContent:"center"}}>
              <div className="site-layout-background" style={{ padding: 24}}>
                <Router primary={false}>
                    <AllThings path="/all" />
                    <LecturePage path="/" />
                    <LabPage path="/labs" />
                    <AddPage path="/edit" />
                    <AddPage path="/add" />
                    <ImpoExpo path="/ie" />
                </Router>
              </div>
           </Content>
           <Footer style={{ textAlign: 'center', fontSize:"16px"}}><b>Created with ❤ By <a href="https://hemangnakarani.github.io" rel="noopener noreferrer" target="_blank">Hemang Nakarani</a></b></Footer>
        </Layout>
      </Layout>
  );
}

export default App;
