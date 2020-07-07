import { Route, RouteProps, Redirect } from "react-router";
import * as React from "react";

export interface IProps extends RouteProps {
    layout: React.ComponentClass<any>;
}

export const AppRoute = ({ component: Component, layout: Layout, path: Path, ...rest }: IProps) => {
    return <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />;
}