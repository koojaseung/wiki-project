import "../../styles/loader.css";
import * as React from "react";


export interface IProps {
    show: boolean;
}

export default class Loader extends React.Component<IProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {

        var css = { "display": this.props.show ? "block" :"none" };

        return <div className="loader-bg" style={css}>
            <div className="sk-circle">
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child"></div>
            </div>
        </div>;
    }
}