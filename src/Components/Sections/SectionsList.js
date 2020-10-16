import React, {useState, useEffect} from 'react'
import { Typography, Grid } from '@material-ui/core'
import { useIntl } from 'react-intl'

import { GetSectionJSX, sectionIdsByCategory } from './SectionsMap'
import SectionContainer from './SectionEdit/SectionContainer'
import SectionTemplate from './SectionAdd/SectionTemplate'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';





export default function SectionsList({ sections, editing, handleSectionAdd, handleSectionDelete,handleSetPageSection }) {
  const intl = useIntl()

  const grid = sections.length

  // reorders the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
    };

  // styles for when theyre being dragged 
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the sections look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  });

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
    if (handleSetPageSection){
    handleSetPageSection(newSections)
  }
  }








  const sectionList =
    /* -------------------------------------------------------------------------- */
    /*               ACTUAL SECTIONS (Has content from Page object)               */
    /* -------------------------------------------------------------------------- */

    sections ? (
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
                  {sections.map((item, idx) => (
                    <Draggable key={idx} draggableId={`item-${idx}`} index={idx}>
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
                                  key={idx}
                                  sectionId={item.id}
                                  index={idx}
                                  handleSectionDelete={handleSectionDelete}
                                >
                                  {GetSectionJSX(item, editing, idx)}
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
          {sections.map((section, idx) => (
            <div key={idx}>{GetSectionJSX(section, editing, idx)}</div>
          ))}
        </div>
      )
    ) : (
      /* -------------------------------------------------------------------------- */
      /*                   SECTION TEMPLATES IN ADD SECTIONS MENU                   */
      /* -------------------------------------------------------------------------- */

      <div>
        {Object.keys(sectionIdsByCategory).map((category) => (
          <div key={category}>
            <Grid container style={{ padding: 8 }}>
              <Typography variant='overline'>{intl.formatMessage({ id: category })}</Typography>
            </Grid>
            {sectionIdsByCategory[category].map((id, idx) => {
              const exampleSection = { id }
              const editing = true
              return (
                <SectionTemplate key={id} sectionId={id} handleSectionAdd={handleSectionAdd}>
                  {GetSectionJSX(exampleSection, editing, idx)}
                </SectionTemplate>
              )
            })}
          </div>
        ))}
      </div>
    )

  return sectionList
}
