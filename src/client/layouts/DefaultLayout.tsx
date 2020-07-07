import * as React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

interface IProps {
    children?: React.ReactNode;
}

type Props = IProps;

export default class DefaultLayout extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }
    public render() {

        return <div id="userLayout" className="layout">
            <Header />
            <div className="container container-content">
                {this.props.children}
            </div>
            <Footer />
        </div>;
    }
}