import { z } from "zod";
import validator from "validator";

export const SignUpSchema = z
  .object({
    name: z.string().min(1, "Invalid input"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    phoneNumber: z.string().refine(validator.isMobilePhone),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
