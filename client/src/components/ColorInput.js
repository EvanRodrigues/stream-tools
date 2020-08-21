import React, { Component } from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import onClickOutside from "react-onclickoutside";
import {
    setTextColor,
    setBackgroundColor,
    setLayerOneColor,
    setLayerTwoColor,
    setLayerThreeColor,
} from "../actions/colors";

export class ColorInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    chooseSetter = (color) => {
        switch (this.props.name) {
            case "textColor":
                return this.props.setTextColor(color);
            case "backgroundColor":
                return this.props.setBackgroundColor(color);
            case "layerOneColor":
                return this.props.setLayerOneColor(color);
            case "layerTwoColor":
                return this.props.setLayerTwoColor(color);
            case "layerThreeColor":
                return this.props.setLayerThreeColor(color);
            default:
                return;
        }
    };

    updateColor = (event, setColor) => {
        this.chooseSetter(event.currentTarget.value);
        this.validateColor(event.currentTarget.value);
    };

    open = () => {
        this.setState({ ...this.state, isOpen: true });
    };

    handleClickOutside = (event) => {
        this.setState({ ...this.state, isOpen: false });
    };

    handleChange = (color, event) => {
        this.chooseSetter(color["hex"]);
        this.validateColor(color["hex"]);
    };

    handleChangeComplete = () => {};

    validateColor = (colorInput) => {
        const colorRegex = /^#([(a-f|\d)]{6}|[(a-f|\d)]{3})$/;

        if (colorRegex.test(colorInput) === false) {
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

const mapDispatchToProps = (dispatch) => {
    return {
        setTextColor: (color) => dispatch(setTextColor(color)),
        setBackgroundColor: (color) => dispatch(setBackgroundColor(color)),
        setLayerOneColor: (color) => dispatch(setLayerOneColor(color)),
        setLayerTwoColor: (color) => dispatch(setLayerTwoColor(color)),
        setLayerThreeColor: (color) => dispatch(setLayerThreeColor(color)),
    };
};

export default connect(null, mapDispatchToProps)(onClickOutside(ColorInput));
