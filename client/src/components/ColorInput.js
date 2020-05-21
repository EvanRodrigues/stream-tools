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

    updateState = (event) => {
        this.setState({ ...this.state, color: event.currentTarget.value });
    };

    open = () => {
        this.setState({ ...this.state, isOpen: true });
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
                <div className="colorPickerContainer">
                    <input
                        type="text"
                        className="formInput hexColorInput"
                        value={color}
                        onChange={this.updateState}
                        onFocus={this.open}
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
                    disableAlpha={true}
                />
            </div>
        );
    }
}

export default onClickOutside(ColorInput);
