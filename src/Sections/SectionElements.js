import React, { Component } from 'react'

import {
    Grid,
    Paper,
    Fab,
    Divider,
    List,
    TextField,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from '@material-ui/core'

export const Paragraph = (editting, content) => {
    if(!editting){
        return (
            <p>{content}</p>
        );
    }else{
        return (
            <TextField value={content}/>
        );
    }
}

export const Title = (editting, content) => {
    if(!editting){
        return (
            <h1>{content}</h1>
        );
    }else{
        return (
            <TextField value={content}/>
        );
    }
}