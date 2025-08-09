import React, { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const classess = cva(
  "border h-12 rounded-full px-6 font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-500 text-white border-cyan-500 hover:bg-cyan-600 hover:border-cyan-600",
        secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
      },
      size: {
        sm: "h-10",
        lg: "h-14 px-8",
      },
    },
  }
);

const Button = (
  props: {
    variant: "primary" | "secondary";
    size?: "sm" | "lg";
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { variant, className, size, ...rest } = props;

  return (
    <button className={cn(classess({ variant, size }), className)} {...rest} />
  );
};

export default Button;
