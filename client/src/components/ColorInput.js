import React, { Component } from "react";
import { SketchPicker } from "react-color";
import onClickOutside from "react-onclickoutside";

export class ColorInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    updateColor = (event, setColor) => {
        this.validateColor(event.currentTarget.value);
        setColor(event.currentTarget.value);
    };

    open = () => {
        this.setState({ ...this.state, isOpen: true });
    };

    handleClickOutside = (event) => {
        this.setState({ ...this.state, isOpen: false });
    };

    handleChange = (color, event, setColor) => {
        this.validateColor(color["hex"]);
        setColor(color["hex"]);
    };

    handleChangeComplete = () => {};

    validateColor = (colorInput) => {
        const colorRegex = /^\#([(a-f|\d)]{6}|[(a-f|\d)]{3})$/;

        if (colorRegex.test(colorInput) == false) {
            this.props.setError("Color not formatted correctly!");
        } else {
            this.props.setError("");
        }
    };

    render() {
        const labelText = this.props.label;
        let color = this.props.color;
        let setColor = this.props.setColor;
        let isOpen = this.state.isOpen;

        return (
            <div className="colorInputContainer">
                <label>{labelText}</label>
                <div className="colorPickerContainer">
                    <input
                        type="text"
                        className="formInput hexColorInput"
                        name={this.props.name}
                        value={color}
                        onChange={(event) => this.updateColor(event, setColor)}
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
                    onChange={(color, event) =>
                        this.handleChange(color, event, setColor)
                    }
                    onChangeComplete={this.handleChangeComplete}
                    disableAlpha={true}
                />
            </div>
        );
    }
}

export default onClickOutside(ColorInput);
