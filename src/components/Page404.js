import React from 'react'
import {Card, Result, Button} from 'antd'
export const Page404 = ({e}) => {
    return (
        <Card>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" href={"/"}>Back Home</Button>}
            />
        </Card>
    )
};