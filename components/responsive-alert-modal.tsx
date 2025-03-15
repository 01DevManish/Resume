"use client";

import * as React from "react";

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hook/use-media-query";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger } from "./ui/dialog";

type BaseProps = {
  children: React.ReactNode;
};

type RootAlertModelProps = BaseProps & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type AlertModelProps = BaseProps & {
  className?: string;
  asChild?: true;
  onClick?: () => void;
};

const desktop = "(min-width: 640px)";

const AlertModel = ({ children, ...props }: RootAlertModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AlertModel = isDesktop ? Dialog : Drawer;

  return <AlertModel {...props}>{children}</AlertModel>;
};

const AlertModelTrigger = ({
  className,
  children,
  onClick,
  ...props
}: AlertModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AlertModelTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <AlertModelTrigger {...props} className={className} onClick={onClick}>
      {children}
    </AlertModelTrigger>
  );
};

const AlertModelClose = ({
  className,
  children,
  onClick,
  ...props
}: AlertModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AlertModelClose = isDesktop ? AlertDialogCancel : DrawerClose;

  return (
    <AlertModelClose {...props} className={className} onClick={onClick}>
      {children}
    </AlertModelClose>
  );
};

const AlertModelContent = ({
  className,
  children,
  ...props
}: AlertModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AlertModelContent = isDesktop ? AlertDialogContent : DrawerContent;

  return (
    <AlertModelContent {...props} className={className}>
      {children}
    </AlertModelContent>
  );
};

const AlertModelDescription = ({
  className,
  children,
  ...props
}: AlertModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AlertModelDescription = isDesktop
    ? AlertDialogDescription
    : DrawerDescription;

  return (
    <AlertModelDescription {...props} className={className}>
      {children}
    </AlertModelDescription>
  );
};

const AlertModelHeader = ({
  className,
  children,
  ...props
}: AlertModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AlertModelHeader = isDesktop ? AlertDialogHeader : DrawerHeader;

  return (
    <AlertModelHeader {...props} className={className}>
      {children}
    </AlertModelHeader>
  );
};

const AlertModelTitle = ({
  className,
  children,
  ...props
}: AlertModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AlertModelTitle = isDesktop ? AlertDialogTitle : DrawerTitle;

  return (
    <AlertModelTitle className={className} {...props}>
      {children}
    </AlertModelTitle>
  );
};

const AlertModelBody = ({ className, children, ...props }: AlertModelProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const AlertModelFooter = ({
  className,
  children,
  ...props
}: AlertModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const AlertModelFooter = isDesktop ? AlertDialogFooter : DrawerFooter;

  return (
    <AlertModelFooter className={className} {...props}>
      {children}
    </AlertModelFooter>
  );
};

export {
  AlertModel,
  AlertModelBody,
  AlertModelClose,
  AlertModelContent,
  AlertModelDescription,
  AlertModelFooter,
  AlertModelHeader,
  AlertModelTitle,
  AlertModelTrigger,
};
