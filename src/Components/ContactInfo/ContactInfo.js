import React from "react";
import './ContactInfo.css';
import { TextField, FormControl, Button } from '@material-ui/core';

const ContactInfo = () => {
    return (
        <div className="contact_info">
            <FormControl>
                {/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
                <label htmlFor="contact_info__number">Mobile Number:</label>
                <TextField id="contact_info__number" type="tel" placeholder="0000000000" required />

                <label htmlFor="contact_info__email" className="contact_info__email"> Email: </label>
                <TextField id="contact_info__email" type="email" placeholder="email@domain.com" required ></TextField>

                <label htmlFor="contact_info__address"> Address: </label>
                <TextField id="contact_info__address" type="text" placeholder="Address" required />

                <label htmlFor="contact_info__github"> Github: </label>
                <TextField id="contact_info__github" type="url" />

                <label htmlFor="contact_info__linkedin"> Linkedin: </label>
                <TextField id="contact_info__linkedin" type="url" />

                <Button className="contact_info__button" type="submit" variant="contained" color="primary"> SAVE DETAILS </Button>

            </FormControl>
        </div>)
}

export default ContactInfo;
