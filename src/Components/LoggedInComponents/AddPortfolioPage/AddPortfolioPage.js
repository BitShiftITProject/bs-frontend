import React from 'react'

import { loggedInStyles } from '../../loggedInStyles'
import HeaderBreadcrumbs from '../HeaderBreadcrumbs'
// To add to app for testing use import AddPortfolioPage from "./Components/LoggedInComponents/AddPortfolioPage"

import {
    Container,
    Grid,
    Typography
} from '@material-ui/core'


export default function AddPortfolioPage() {
    const classes = loggedInStyles()

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth='lg' className={classes.container}>
                <HeaderBreadcrumbs />
                <div className={classes.breadcrumbSpacer} />
                <Grid container direction='row' spacing={0}>
                    {/* <HomeProfile xs={12} md={4} lg={3} /> */}
                    <Typography >{"DIB"}</Typography>
                </Grid>
            </Container>
        </main>


    )
}
