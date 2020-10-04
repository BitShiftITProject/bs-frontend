import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import ExpandedSectionsButton from './ExpandedSectionsButton.js'
export default function SectionsButton({ handleSectionOnClick }) {
    const [expanded, setExpand] = useState(false)

    const handleToggle = () => {
        setExpand((expanded) => !expanded)
    }
    return (
        <Grid
        >
            {/* when clicked, itll show the types of sections avaliable with an image of how the section would look overall*/}
            {!expanded && (
                <div>

                    <Button
                        onClick={handleToggle}
                    >
                        Add Sections
                        </Button>
                </div>
            )}

            {/* Show the expanded version of sections*/}
            {expanded && (
                <div>
                    <ExpandedSectionsButton
                        handleToggle={handleToggle}
                        handleSectionOnClick={handleSectionOnClick}
                    />
                </div>
            )
            }
        </Grid >
    )
}
