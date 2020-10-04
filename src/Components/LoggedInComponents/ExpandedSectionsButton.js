import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import GetSectionJSX from '../../Sections/SectionsMap'
import { Paragraph, Title } from '../../Sections/SectionElements'

export default function ExpandedSectionsButton({ handleToggle, handleSectionOnClick }) {
    const section = {
        "id": 0,
        "content": {
            "title": "This is a page title"
        }
    }

    const section1 = {
        "id": 0,
        "content": {
            "title": "OMG TITILE"
        }
    }

    // const sectionIds = [title1, title2]
    return (
        <Grid
        >
            <Grid>
                <Button
                    onClick={handleToggle}
                >
                    (X)
                </Button>
            </Grid>

            {/* needs to go through all the sections in section maps and then render them all*/}
            {/*uses handle sections on click and parse on the section type */}

            <Grid>
                <Button
                    onClick={() => { handleSectionOnClick(section) }
                    }
                >
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
