import React from "react";
import {notification, Tabs, Spin} from 'antd';
import {PresentationsSingleDay} from "./PresentationsSingleDay";
import API from "../../services/api";
const {TabPane}=Tabs;

class PresentationsList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading: true,
            sessions: []
        }
    }

    componentDidMount(){
        API.get(`/sessions`,{})
            .then(response => {
                this.setState({sessions:response.data});
                this.setState({loading:false});
            })
            .catch(errInfo => {
                notification['error']({
                    message: 'Error!',
                    description: errInfo.toString()
                })
            });
    }

    render(){
        if(this.state.loading===true){
            return(<div><Spin size={"large"}/></div>)
        }else{
            return(<div className="PresentationsList">
                <Tabs defaultActiveKey="Monday" size={"large"} type={"Card"} tabPosition={"left"}>
                    <TabPane tab="Monday" key="Monday">
                        <PresentationsSingleDay day={'2019-09-02'} sessions={this.state.sessions}/>
                    </TabPane>
                    <TabPane tab="Tuesday" key="Tuesday">
                        <PresentationsSingleDay day={'2019-09-03'} sessions={this.state.sessions}/>
                    </TabPane>
                    <TabPane tab="Wednesday" key="Wednesday">
                        <PresentationsSingleDay day={'2019-09-04'} sessions={this.state.sessions}/>
                    </TabPane>
                    <TabPane tab="Thursday" key="Thursday">
                        <PresentationsSingleDay day={'2019-09-05'} sessions={this.state.sessions}/>
                    </TabPane>
                    <TabPane tab="Friday" key="Friday">
                        <PresentationsSingleDay day={'2019-09-06'} sessions={this.state.sessions}/>
                    </TabPane>
                </Tabs>
            </div>)
        }
    }
}

export default PresentationsList;