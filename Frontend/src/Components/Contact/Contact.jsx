import React, { useState } from "react";
import styles from "./Contact.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure toast styles are applied

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!formData.firstName) validationErrors.firstName = "Enter a first name.";
        if (!formData.lastName) validationErrors.lastName = "Enter a last name.";
        if (!formData.email) validationErrors.email = "Enter a valid email.";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({}); // Clear errors if validation passes

        try {
            const response = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.firstName, // Convert to lowercase
                    lastName: formData.lastName,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                }),
                 // Match backend schema
            });
            const result = await response.json();
            console.log("Result:", result);
            if (result.msg === "Contact saved successfully") {
                toast.success("Form submitted successfully!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            }
            else if(result.msg === "Email already exists"){
                toast.error("Email already exists");
            } 
            else {
                toast.error("Form submission failed!");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            toast.error("An error occurred while submitting the form.");
        }
    };

    return (
        <div className={styles.contactContainer}>
            <h1 className={styles.heading}>Contact Us</h1>
            <div className={styles.contact}>
                <div className={styles.address}>
                    <h2>ADDRESS</h2>
                    <p>500 Terry Francine Street <br /> San Francisco, CA 94158</p>
                    <iframe
                        src="https://www.google.com/maps/embed?..."
                        width="600"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                    <h2>TO SPEAK WITH AN AGENT, PLEASE CALL OR EMAIL US:</h2>
                    <p>Email: info@mysite.com</p>
                    <p>Tel: 123-456-7890</p>
                    <p>Fax: 123-456-7890</p>
                </div>
                <div className={styles.details}>
                    <p className={styles.formTitle}>ALTERNATIVELY YOU CAN FILL IN THE FOLLOWING CONTACT FORM:</p>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label>First Name *</label>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    value={formData.firstName} 
                                    onChange={handleChange} 
                                    className={errors.firstName ? styles.errorInput : styles.inputfield}
                                />
                                {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Last Name *</label>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                    className={errors.lastName ? styles.errorInput : styles.inputfield}
                                />
                                {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Email *</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className={errors.email ? styles.errorInput : styles.inputfield}
                            />
                            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Subject</label>
                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} className={styles.inputfield} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} className={styles.textarea}></textarea>
                        </div>
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
            <div className={styles.footer}>
            © 2025 [Luxury Estates]. All Rights Reserved.  
            123 Main Street, Your City, Country | Call us: (123) 456-7890 | Email: contact@luxuryestates.com
            </div>
        </div>
    );
};

export default Contact;
