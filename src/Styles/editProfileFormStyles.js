import { makeStyles} from '@material-ui/core/styles'

const editProfileFormStyles = makeStyles((theme) => ({
    editProfileForm: {
      '& .MuiChip-root': {
        marginBottom: theme.spacing(0),
        marginTop: theme.spacing(0)
      },
  
      '& .MuiInputLabel-outlined:focus-': {
        overflow: 'hidden'
      }
    }
  }))

export {editProfileFormStyles}
