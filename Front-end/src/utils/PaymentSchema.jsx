import { z } from "zod";
import validator from "validator";

export const PaymentSchema = z.object({
  firstName: z.string().min(1, "First name is required"), // First name is required
  secondName: z.string().min(1, "Second name is required"), // Second name is required
  email: z.string().email("Invalid email address"), // Valid email format required
  address: z.string().min(1, "Address is required"), // Address is required
  city: z.string().min(1, "City is required"), // City is required
  state: z.string().min(1, "State is required"), // State is required
  zipcode: z.string().min(1, "Zipcode is required"), // Zipcode is required
  country: z.string().min(1, "Country is required"), // Country is required
  phone: z.string().refine((value) => validator.isMobilePhone(value, "any"), {
    message: "Invalid phone number",
  }), // Phone validation
});

//amout array
//items array
//userId
