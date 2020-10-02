import React, { Component } from 'react'
import {Paragraph, Title} from './SectionElements'

function MapSection (section, editting) {
    let sectionId = section.id;
    switch(sectionId) {
        case 0:
            // Title Section
            return (Title(editting, section.content.title));
            break;
        case 1:
            // Paragraph Section
            return (Paragraph(editting, section.content.paragraph));
            break;
        default:
            // Return blank section
            return (<div></div>);
    }
}

// Returns the section JSX for a given section data object
const GetSectionJSX = (section, editting) => {
    return (
        <div id="section">
            {MapSection(section, editting)}
        </div>
    )
}

export default GetSectionJSX;