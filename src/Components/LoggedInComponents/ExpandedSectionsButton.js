import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import GetSectionJSX from '../../Sections/SectionsMap'
import { Paragraph, Title } from '../../Sections/SectionElements'
import CloseIcon from '@material-ui/icons/Close';
export default function ExpandedSectionsButton({ handleToggle, handleSectionOnClick }) {
    // TO DO: remove this later. temporary hardcoded sections 
    const section = {
        "id": 0,
        "content": {
            "title": "This is a page title"
        }
    }

    const section1 = {
        "id": 0,
        "content": {
            "title": "OMG TITLE2"
        }
    }

    // TO DO: go over the sections in section maps and map them all with default sections data (use loreum ipsum). 
    // Might need to hardcore each section (IN A SEPERATE FILE called defaultSections.js) so that we can render it all in one go. 
    // const sectionIds = [title1, title2]
    return (
        <Grid
        >
            <Grid>
                <Button
                    onClick={handleToggle}
                >
                    <CloseIcon />
                </Button>
            </Grid>

            {/* goes through all sections in section maps and then renders them all*/}
            {/* uses handleSectionOnClick and parses on the section type */}

            {/* TO DO: make it work for ALLL sections without hardcoding in the form. so that its in a grid, button and then the get section
            <Grid>
                <Button
                    onClick={() => { handleSectionOnClick(section)}
                    }
                >
                    {GetSectionJSX(section, false)}
                </Button>
            </Grid>
            */}

            <Grid>
                <Button
                    onClick={() => { handleSectionOnClick(section) }
                    }
                >
                    {/*  */}
                    {GetSectionJSX(section, false)}
                </Button>
            </Grid>

            <Grid>
                <Button
                    onClick={() => { handleSectionOnClick(section1) }
                    }
                >
                    {GetSectionJSX(section1, false)}
                </Button>
            </Grid>

        </Grid>
    )
}
