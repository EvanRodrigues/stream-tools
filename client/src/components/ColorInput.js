import React, { Component } from "react";
import { SketchPicker } from "react-color";
import onClickOutside from "react-onclickoutside";

export class ColorInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#fff",
            backgroundColor: "#fff",
            isOpen: false,
        };
    }

    updateState = () => {};

    toggle = () => {
        this.setState({ ...this.state, isOpen: !this.state.isOpen });
    };

    handleClickOutside = (event) => {
        this.setState({ ...this.state, isOpen: false });
    };

    handleChange = (color, event) => {
        this.setState({ ...this.state, color: color["hex"] });
    };

    handleChangeComplete = () => {};

    render() {
        const labelText = this.props.label;
        let color = this.state.color;
        let isOpen = this.state.isOpen;

        return (
            <div className="colorInputContainer">
                <label>{labelText}</label>
                <div className="display">
                    <input
                        type="text"
                        value={color}
                        onFocus={this.toggle}
                        onChange={this.updateState}
                    />
                    <div
                        className="displayColor"
                        style={{ backgroundColor: color }}
                    />
                </div>

                <SketchPicker
                    className={isOpen ? "colorInput -active" : "colorInput"}
                    color={color}
                    onChange={this.handleChange}
                    onChangeComplete={this.handleChangeComplete}
                />
            </div>
        );
    }
}

export default onClickOutside(ColorInput);
