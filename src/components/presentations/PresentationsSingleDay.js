import React, {useEffect, useState} from "react";
import {PresentationObject} from "./PresentationObject";
import {Row, notification} from 'antd';
import API from "../../services/api";

export const PresentationsSingleDay = (props) => {
    const [presentations,setPresentations]=useState([]);
    useEffect(() => {
            API.get(`/presentations?date=${props.day}`,{})
                .then(response => {
                    setPresentations(response.data);
                })
                .catch(errInfo => {
                    notification['error']({
                        message: 'Error!',
                        description: errInfo.toString()
                    })
                });
        // eslint-disable-next-line
    },[]);

    return (
        <div className="PresentationsSingleDay">
            <Row>
                {presentations.map(pres =>
                    <PresentationObject key={pres.id} id={pres.id} date={pres.date}
                                        keywords={pres.keywords} authors={pres.authors}
                                        title={pres.title} file={pres.filename}
                                        session={pres.session} sessions={props.sessions}/>)
                }
            </Row>
        </div>
    )
};