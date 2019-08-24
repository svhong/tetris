import styled from "styled-components";

export const StyledStage = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(45vw / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 100%;
    max-width: 45vw;
    background: rgb(0,0,0,0.4);
    position:relative;
    left: 50%;
    transform: translate(-50%);

`