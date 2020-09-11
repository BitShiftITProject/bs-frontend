import React from 'react'
import clsx from 'clsx'

import { loggedInStyles } from '../../loggedInStyles'
import HeaderBreadcrumbs from '../HeaderBreadcrumbs'
// To add to app for testing use import EditPortfolioPage from "./Components/LoggedInComponents/EditPortfolioPage"

import {
    Container,
    Grid,
    Typography,
    Paper
} from '@material-ui/core'


export default function EditPortfolioPage(props) {
    const classes = loggedInStyles()
    const profilePaper = clsx(classes.paper, classes.fixedHeight)
    return (

        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth='lg' className={classes.container}>
                <HeaderBreadcrumbs />
                <div className={classes.breadcrumbSpacer} />
                <Grid container direction='row' spacing={0}>




                    <Grid item xs={12} md={4} lg={3} >
                        <Paper className={profilePaper}>

                            <Grid item container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start" xs={12} md={4} lg={3}>

                                <Grid item >
                                    <Typography variant='h5' component='h5' className={classes.profileName}>
                                        TITLE
                                    </Typography>
                                </Grid>

                                <Grid item >
                                    <Typography variant='h5' component='h5' className={classes.profileName}>
                                        EDUCATION STUFF
                                    </Typography>
                                </Grid>

                            </Grid>

                        </Paper>
                    </Grid>






                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={profilePaper} >
                            <Grid item >
                                <Typography variant='h5' component='h5' className={classes.profileName}>
                                    EDUCATION STUFdfgdfgdfgdfgdfgdfgdffffffffffffdsdvsdvsdvsdffffffffffffffffffffF
                            </Typography>
                            </Grid>

                        </Paper>
                    </Grid>



                </Grid>
            </Container>
        </main>



    )
}
