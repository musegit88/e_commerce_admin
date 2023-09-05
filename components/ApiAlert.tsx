"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./ui/badge";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  // const handleCopy = () => {

  // }

  function handleCopy(description: string) {
    navigator.clipboard.writeText(description);
    toast.success("copied to the clipboard");
  }

  return (
    <Alert>
      <Server className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <code className="relative px-[4.8px] py-[3.2px] text-sm font-mono font-semibold bg-muted rounded-full">
          {description}
        </code>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopy(description)}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
