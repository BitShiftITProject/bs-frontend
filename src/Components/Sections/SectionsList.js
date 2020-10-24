import React from 'react'
import { Grid } from '@material-ui/core'

import { GetElementJSX } from './SectionsMap'
import SectionContainer from './SectionEdit/SectionContainer'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useTheme } from '@material-ui/core/styles'



export default function SectionsList({ sections, editing, startSectionEdit, handleSectionDelete, handleSetPageSection }) {
  // the grid for the drop and drag related sections
  const grid = sections ? sections.length : 0

  // reorders the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };


  const theme = useTheme()

  // styles for when theyre being dragged
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the sections look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging
      ? // theme.palette.background.paperHover
      'lightgreen'
      : theme.palette.background.paperLight,

    // styles we need to apply on draggables
    ...draggableStyle
  })

  // // styles for when theyre being dragged 
  // const getItemStyle = (isDragging, draggableStyle) => ({
  //   // some basic styles to make the sections look a bit nicer
  //   userSelect: "none",
  //   padding: grid * 2,
  //   margin: `0 0 ${grid}px 0`,

  //   // change background colour if dragging
  //   background: isDragging ? "lightgreen" : "grey",

  //   // styles we need to apply on draggables
  //   ...draggableStyle
  // });

  // when done with dragging 
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newSections = reorder(
      sections,
      result.source.index,
      result.destination.index
    );
    if (handleSetPageSection) {
      handleSetPageSection(newSections)
    }
  }








  const sectionList =
    /* -------------------------------------------------------------------------- */
    /*               ACTUAL SECTIONS (Has content from Page object)               */
    /* -------------------------------------------------------------------------- */

    /* ---------------------------- Editable Sections --------------------------- */

    handleSectionDelete ? (
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {/* map the sections as dragable items */}
                {sections.map((section, sectionIndex) => (
                  <Draggable key={sectionIndex} draggableId={`item-${sectionIndex}`} index={sectionIndex}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <SectionContainer
                          key={sectionIndex}
                          sectionIndex={sectionIndex}
                          startSectionEdit={startSectionEdit}
                          handleSectionDelete={handleSectionDelete}
                        >
                          <Grid container direction='row' spacing={2}>
                            {section.map((element, elementIndex) => (
                              <Grid item key={elementIndex} xs={12 / section.length}>
                                {GetElementJSX(element, editing, sectionIndex, elementIndex)}
                              </Grid>
                            ))}
                          </Grid>
                        </SectionContainer>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      </div>

    ) : (
        /* ------------------------ Public Portfolio Sections ----------------------- */

        <div>
          {sections.map((section, sectionIndex) => {
            return (
              <div key={sectionIndex}>
                <Grid container direction='row' spacing={2}>
                  {section.map((element, elementIndex) => (
                    <Grid item key={elementIndex} xs={12 / section.length}>
                      {GetElementJSX(element, editing, sectionIndex, elementIndex)}
                    </Grid>
                  ))}
                </Grid>
              </div>
            )
          })}
        </div>
      )

  return sectionList
}
