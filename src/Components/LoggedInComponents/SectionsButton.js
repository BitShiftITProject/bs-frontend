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
            {!expanded && (
                <div>
                    {/* for now will just show a default section, later when its clicked, itll expand and show the
                    types of sections avaliable like the dropdown bar but with an image of how the section would look  */}
                    <Button
                        onClick={handleToggle}
                    >
                        Add Sections
                        </Button>
                </div>
            )}

            {/* if its true for expand then show the expanded version */}

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
