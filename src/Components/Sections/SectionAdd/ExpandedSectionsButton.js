import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { GetSectionJSX } from '../SectionsMap'
import CloseIcon from '@material-ui/icons/Close'
export default function ExpandedSectionsButton({ handleToggle, handleSectionOnClick }) {
  // TODO: remove this later. temporary hardcoded sections
  const section = {
    id: 0,
    content: {
      title: 'This is a page title'
    }
  }

  const section1 = {
    id: 0,
    content: {
      title: 'OMG TITLE2'
    }
  }

  // TODO: go over the sections in section maps and map them all with default sections data (use loreum ipsum).
  // Might need to hardcore each section (IN A SEPERATE FILE called defaultSections.js) so that we can render it all in one go.
  // const sectionIds = [title1, title2]
  return (
    <Grid>
      <Grid>
        <Button onClick={handleToggle}>
          <CloseIcon />
        </Button>
      </Grid>

      {/* goes through all sections in section maps and then renders them all*/}
      {/* uses handleSectionOnClick and parses on the section type */}

      {/* TODO: make it work for ALLL sections without hardcoding in the form. so that its in a grid, button and then the get section
            I reccomend making it so that theres a (+) add button on the side or maybe onHover, it shows a (+) so that they know if they click it, itll add
            to the screen. (can make it so that if they click the section or button itll add it, doesnt have to be JUST the button, but definately think that there should 
                be SOME SORT of (+) so that they know if they click it itll show up)
            <Grid>
                <Button
                    onClick={() => { handleSectionOnClick(section)}
                    }
                >
                    {GetSectionJSX(section, false)} <button> (+) </Button>
                </Button>
            </Grid>
            */}

      <Grid>
        <Button
          onClick={() => {
            handleSectionOnClick(section)
          }}
        >
          {/*  */}
          {GetSectionJSX(section, false)}
        </Button>
      </Grid>

      <Grid>
        <Button
          onClick={() => {
            handleSectionOnClick(section1)
          }}
        >
          {GetSectionJSX(section1, false)}
        </Button>
      </Grid>
    </Grid>
  )
}
