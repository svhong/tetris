import React, { Component } from "react";
import { StyledMusicButton } from "./styles/StyledMusicButton";

export default class Music extends Component {
    state = {
        play: false
    };

    audio = new Audio(this.props.url);

    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            if (this.state.play) {
                this.audio.play();
                // added event listener to loop the song.
                this.audio.addEventListener("ended", () => {
                    this.audio.play();
                }, false);
            } else {
                this.audio.pause();
            }
            // this.state.play ? this.audio.play() : this.audio.pause();
        });
    }
    render() {
        return (
            <StyledMusicButton onClick={this.togglePlay}>
                {this.state.play ? "Pause Music" : "Play Music"}
            </StyledMusicButton>
        )
    }
}